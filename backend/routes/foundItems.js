const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const FoundItem = require('../models/FoundItem');
const nodemailer = require('nodemailer');
const { sendEvidenceEmail } = require('../config/emailConfig');

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

// Create a new found item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const foundItem = new FoundItem({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    
    const savedItem = await foundItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all found items
router.get('/', async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific found item
router.get('/:id', async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a found item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    
    const updatedItem = await FoundItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a found item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await FoundItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit evidence for a found item
router.post('/:id/evidence', upload.array('files'), async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Extract evidence info
    const description = req.body.description || '';
    const files = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Create evidence object
    const evidence = {
      description,
      files,
      submittedAt: new Date()
    };

    // Add evidence to the item
    item.evidence.push(evidence);

    // Save the updated item
    await item.save();

    // Send email notification
    const emailSent = await sendEvidenceEmail(item, evidence);

    res.json({ 
      message: 'Evidence submitted successfully',
      evidence: item.evidence[item.evidence.length - 1],
      emailSent
    });
  } catch (err) {
    console.error('Error submitting evidence:', err);
    res.status(500).json({ message: 'Failed to submit evidence' });
  }
});

module.exports = router; 