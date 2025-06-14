// routes/itemRoutes.js
const express = require('express');
const router = express.Router(); // Creates a new router object for handling requests
const Item = require('../models/item'); // Import your Mongoose Item model

// @route   GET /api/items
// @desc    Get all lost/found items
// @access  Public (for now)
router.get('/', async (req, res) => {
    try {
        // Find all documents in the 'items' collection, sorted by most recent first
        const items = await Item.find().sort({ date: -1 });
        res.json(items); // Send the items back as JSON
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); // Generic server error
    }
});

// @route   POST /api/items
// @desc    Create a new lost/found item
// @access  Public (for now)
router.post('/', async (req, res) => {
    // Destructure relevant fields from the request body
    const { name, description, category, location, image, status } = req.body;

    try {
        // Create a new instance of the Item model
        const newItem = new Item({
            name,
            description,
            category,
            location,
            image,
            status: status || 'Lost' // Use provided status, or default to 'Lost'
        });

        // Save the new item to the MongoDB database
        const item = await newItem.save();
        res.status(201).json(item); // Send back the newly created item (201 Created status)
    } catch (err) {
        console.error(err.message);
        // Handle validation errors (e.g., missing required fields)
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Validation Error', details: err.message });
        }
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/items/:id
// @desc    Get a single item by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        // Find an item by its unique ID
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' }); // 404 Not Found
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        // Handle case where ID format is invalid
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid Item ID format' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/items/:id
// @desc    Update an item by ID
// @access  Private (ideally, only the reporter or admin)
router.put('/:id', async (req, res) => {
    const { name, description, category, location, image, status } = req.body;

    try {
        let item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Update item fields if they are provided in the request body
        if (name) item.name = name;
        if (description) item.description = description;
        if (category) item.category = category;
        if (location) item.location = location;
        if (image) item.image = image;
        if (status) item.status = status;

        const updatedItem = await item.save(); // Save the updated item
        res.json(updatedItem); // Send back the updated item
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid Item ID format' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item by ID
// @access  Private (ideally, only the reporter or admin)
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Using deleteOne with _id is a common way to delete
        await Item.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Item removed successfully' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid Item ID format' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router; // Export the router for use in server.js