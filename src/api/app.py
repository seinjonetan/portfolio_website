from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
from bs4 import BeautifulSoup
import pandas as pd
import wayback
from tqdm import tqdm

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes and origins
socketio = SocketIO(app, cors_allowed_origins="*")

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