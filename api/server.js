import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cacheFilePath = path.join(__dirname, '..', 'public', 'static', 'cache.json');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for the contact_messages collection
const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
}, { collection: 'contact_messages' });

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

// Define a schema and model for the sentiments collection
const sentimentSchema = new mongoose.Schema({
  date: Date,
  publication: String,
  url: String,
  text: String,
  positive: Number,
  neutral: Number,
  negative: Number,
}, { collection: 'sentiments' });

const Sentiment = mongoose.model('Sentiment', sentimentSchema);

// Define a route to handle form submissions
app.post('/submit', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const newContactMessage = new ContactMessage({
    name,
    email,
    phone,
    message,
  });

  try {
    await newContactMessage.save();
    res.status(201).send('Data submitted successfully');
  } catch (error) {
    res.status(400).send('Error submitting data');
  }
});

// Define a route to get the cached sentiment data
app.get('/sentiments', (req, res) => {
  fs.readFile(cacheFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading cached data');
    }
    try {
      const cachedData = JSON.parse(data);
      return res.json(cachedData);
    } catch (parseError) {
      return res.status(500).send('Error parsing cached data');
    }
  });
});

// Function to fetch and cache sentiment data
const cacheSentimentData = async () => {
  try {
    const sentiments = await Sentiment.aggregate([
      {
        $addFields: {
          date: { $toDate: "$date" }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          averagePositive: { $avg: "$positive" },
          averageNeutral: { $avg: "$neutral" },
          averageNegative: { $avg: "$negative" },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          averagePositive: 1,
          averageNeutral: 1,
          averageNegative: 1,
        },
      },
    ]);

    fs.writeFile(cacheFilePath, JSON.stringify(sentiments, null, 2), (err) => {
      if (err) {
        console.error('Error writing cache file:', err);
      } else {
        console.log('Sentiment data cached successfully');
      }
    });
  } catch (error) {
    console.error('Error caching sentiment data:', error);
  }
};

// Schedule the job to run daily at midnight
cron.schedule('0 0 * * *', cacheSentimentData);

// Initial cache population
cacheSentimentData();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});