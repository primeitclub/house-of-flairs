const express = require('express');
const router = express.Router();
const FoundItem = require('../models/FoundItem');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all found items
router.get('/', async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single found item
router.get('/:id', async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new found item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      image: req.file ? req.file.path : undefined,
      verificationQuestions: JSON.parse(req.body.verificationQuestions || '[]')
    };

    const item = new FoundItem(itemData);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Verify ownership
router.post('/:id/verify', upload.single('evidence'), async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const answers = JSON.parse(req.body.answers);
    const allAnswersCorrect = item.verificationQuestions.every((qa, index) => 
      qa.answer.toLowerCase() === answers[index].toLowerCase()
    );

    if (allAnswersCorrect) {
      // Handle evidence if provided
      if (req.file) {
        // Save evidence file path or handle as needed
        console.log('Evidence file received:', req.file.path);
      }
      if (req.body.evidenceDescription) {
        // Save evidence description or handle as needed
        console.log('Evidence description:', req.body.evidenceDescription);
      }
      
      res.json({ verified: true });
    } else {
      res.json({ verified: false });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a found item
router.delete('/:id', async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await item.remove();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 