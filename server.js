require('dotenv').config();

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb'); 
//mongoose.connect('mongodb://localhost:27017/artgallery')
//  .then(() => console.log('MongoDB connected'))
//  .catch(err => console.error('MongoDB connection error:', err));

// Use the MongoDB URI from environment variable, fallback to localhost for local dev
const MONGODB_URI = process.env.MONGODB_AUTH_URI;

const dbURI = process.env.MONGODB_AUTH_URI || 'mongodb://localhost:27017/artgallery';
mongoose.connect(dbURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const artworks = require('./routes/artwork');
const contact = require('./routes/contact');
const commission = require('./routes/commission');

const app = express();
const PORT = process.env.PORT || 3000;

const auth = require('./routes/auth');
app.use('/api/auth', auth);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/artworks', artworks);
app.use('/api/contact', contact);
app.use('/api/commission', commission);

// Hardcoded chatbot endpoint
app.post('/api/chat', (req, res) => {
  const query = req.body.query.toLowerCase();
  let response = "Sorry, I didn't get that.";
  const faqs = [
    { keywords: ["buy", "purchase"], reply: "To buy an artwork, inquire from gallery page." },
    /* ... other keywords */
  ];
  for (let faq of faqs) {
    faq.keywords.forEach(k => {
      if (query.includes(k)) response = faq.reply;
    });
  }
  res.json({ reply: response });
});

//const uri = "mongodb://localhost:27017"; // Update if needed
//const client = new MongoClient(uri);
//const dbName = "artgallery"; // Change DB name

// MongoClient for direct MongoDB actions (signup/signin)
const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
const dbName = "artgallery";

const tracer = require('dd-trace').init({
  logInjection: true
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");

    // Check if user exists
    const existing = await users.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists." });
    }
    await users.insertOne({ username, email, password });
    res.json({ message: "User registered." });
  } catch (err) {
    console.error('Error during sign in:', err);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");
    const user = await users.findOne({ username, password });
    if (user) {
      res.json({ message: "Sign In Successful!" });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    console.error('Error during sign in:', err);
    res.status(500).json({ message: "Server error." });
  }
});

app.listen(PORT,"0.0.0.0", () => console.log(`Server listening at http://localhost:${PORT}`));
