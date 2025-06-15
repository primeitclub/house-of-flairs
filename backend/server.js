const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/found-items', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Import routes
const foundItemsRoutes = require('./routes/foundItems');
const lostItemsRoutes = require('./routes/lostItems');

// Use routes
app.use('/api/found-items', foundItemsRoutes);
app.use('/api/lost-items', lostItemsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('Email configuration is valid.');
  } catch (error) {
    console.error('Email configuration error:', error);
  }
};

verifyConnection();

const sendEvidenceEmail = async (item, evidence) => {
  const mailOptions = {
    from: `"Lost and Found" <${process.env.EMAIL_USER}>`,
    to: item.contactEmail,
    subject: `New Evidence for ${item.itemName}`,
    text: `New evidence has been submitted for your ${item.type} item: ${item.itemName}. Description: ${evidence.description}`,
    html: `<p>New evidence has been submitted for your ${item.type} item: ${item.itemName}.</p><p>Description: ${evidence.description}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendEvidenceEmail }; 