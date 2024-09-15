from flask import Flask, jsonify, request, send_file, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
from bs4 import BeautifulSoup
import pandas as pd
import wayback
from tqdm import tqdm
from datetime import datetime
from weasyprint import HTML
import io
import pandas as pd
import requests
import zipfile
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes and origins
socketio = SocketIO(app, cors_allowed_origins="*")

def convert_json(csv, json_payload=None):
    df = pd.read_csv(csv)
    df.set_index('date', inplace=True)
    json_payload = json.loads(json_payload)
    invoice = []
    for column in df.columns:
        result = {
            'items' : [], 
            'to_addr' : {'person_name': column},
            'duedate' : datetime.today().strftime("%B %-d, %Y"),
            'from_addr' : json_payload
        }
        for index, value in df[column].items():
            if pd.notna(value):
                result['items'].append({
                    'title': index, 
                    'charge': value
                })
        invoice.append(result)
    return invoice

@app.route('/invoice', methods=['GET', 'POST'])
def invoice():
    if request.method == 'POST':
        posted_data = request.get_json()
    else:
        posted_data = {}
    today = datetime.today().strftime("%B %-d, %Y")
    default_data = {
        'duedate': 'August 1, 2019',
        'from_addr': {
            'addr1': '12345 Sunny Road',
            'addr2': 'Sunnyville, CA 12345',
            'company_name': 'Python Tip'
        },
        'items': [{
                'charge': 300.0,
                'title': 'website design'
            },
            {
                'charge': 75.0,
                'title': 'Hosting (3 months)'
            },
            {
                'charge': 10.0,
                'title': 'Domain name (1 year)'
            }
        ],
        'to_addr': {
            'person_name': 'John Dilly'
        }
    }

    duedate = posted_data.get('duedate', default_data['duedate'])
    from_addr = posted_data.get('from_addr', default_data['from_addr'])
    to_addr = posted_data.get('to_addr', default_data['to_addr'])
    items = posted_data.get('items', default_data['items'])

    total = sum([i['charge'] for i in items])
    rendered = render_template('invoice.html',
                               date=today,
                               from_addr=from_addr,
                               to_addr=to_addr,
                               items=items,
                               total=total,
                               duedate=duedate)
    html = HTML(string=rendered)
    rendered = html.write_pdf()
    return rendered

@app.route('/csv', methods=['POST'])
def csv():
    import json
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    json_payload = request.form['json']
    invoice_json = convert_json(file, json_payload)
    socketio.emit('invoice', 'Data received. Generating invoices...')
    pdfs = []
    for json in invoice_json:
        response = requests.post('http://127.0.0.1:5001/invoice', json=json)
        pdfs.append(response.content)
    zip_buffer = io.BytesIO()
    socketio.emit('invoice', 'Invoices generated. Zipping...')
    with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
        for i, pdf in enumerate(pdfs):
            name = invoice_json[i]['to_addr']['person_name'].strip()
            zip_file.writestr(f'invoice_{name}.pdf', pdf)
    zip_buffer.seek(0)
    return send_file(zip_buffer, as_attachment=True, download_name='invoices.zip')

@app.route('/generate-csv', methods=['POST'])
def generate_csv():
    import csv
    socketio.emit('template', 'Data received. Processing dates...')
    files = request.files['file']
    data = pd.read_csv(files)
    data = list(data.columns)
    now = datetime.now()
    year = now.year
    month = now.month
    if month == 12:
        next_month = datetime(year + 1, 1, 1)
    else:
        next_month = datetime(year, month + 1, 1)
    days_in_month = (next_month - datetime(year, month, 1)).days
    dates = [(datetime(year, month, day)).strftime("%Y-%m-%d") for day in range(1, days_in_month + 1)]
    fieldnames = ['date'] + data
    socketio.emit('template', 'Dates generated. Generating CSV...')
    with open('/tmp/invoice_template.csv', 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for date in dates:
            row = {'date': date}
            for name in data:
                row[name] = ''
            writer.writerow(row)
    return send_file('/tmp/invoice_template.csv', as_attachment=True)

@app.route('/scrape', methods=['POST'])
def scrape():
    client = wayback.WaybackClient()
    url = request.json.get('url', '')
    proxy = request.json.get('proxy', '')
    if proxy:
        os.environ['HTTP_PROXY'] = proxy
        os.environ['HTTPS_PROXY'] = proxy
    try:
        items = client.search(url)
    except:
        data_list = pd.DataFrame(columns=['date', 'content'])
        return data_list.to_json()
    data_list = []
    socketio.emit('progress', 'Url found. Processing...')
    for i, item in enumerate(items):
        if i >= 3:
            break
        item_data = {}
        item_data['date'] = item.timestamp
        try:
            content = client.get_memento(item).content
            soup = BeautifulSoup(content, 'html.parser')
            text = soup.get_text()
            item_data['content'] = text
        except:
            item_data['content'] = None
        data_list.append(item_data)
        socketio.emit('progress', f'Processing... {i + 1}')
    socketio.emit('progress', 'Processing complete.')
    data_list = pd.DataFrame(data_list)
    preview = data_list.head(3).to_json()
    socketio.emit('preview', preview)
    csv_data = data_list.to_csv(index=False)
    file_path = os.path.join('/tmp', 'data.csv')
    with open(file_path, 'w') as f:
        f.write(csv_data)
    return send_file(file_path, as_attachment=True)

@app.route('/echo', methods=['GET', 'POST'])
def echo():
    if request.method == 'GET':
        input_data = request.args.get('input', '')
    elif request.method == 'POST':
        input_data = request.json.get('input', '')
        socketio.emit('text-response', input_data)
    return jsonify({"input": input_data})

@app.route('/echo-file', methods=['POST'])
def echo_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    file_path = os.path.join('/tmp', file.filename)
    file.save(file_path)
    socketio.emit('file_upload', file.filename)
    return send_file(file_path, as_attachment=True)

@socketio.on('connect_error')
def handle_connect_error(e):
    print(f"Connection error: {e}")

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)