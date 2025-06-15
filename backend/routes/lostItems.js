const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const LostItem = require('../models/LostItem');
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

// Create a new lost item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const lostItem = new LostItem({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    const savedItem = await lostItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all lost items
router.get('/', async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific lost item
router.get('/:id', async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a lost item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const updatedItem = await LostItem.findByIdAndUpdate(
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

// Delete a lost item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await LostItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit evidence for a lost item
router.post('/:id/evidence', upload.array('files'), async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
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