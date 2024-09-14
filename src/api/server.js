import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});