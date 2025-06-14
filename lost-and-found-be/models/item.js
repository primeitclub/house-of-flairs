
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // This field is mandatory
        trim: true      // Remove leading/trailing whitespace
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        // Restrict to these specific values for consistency
        enum: ['Electronics', 'Documents', 'Clothing', 'Keys', 'Jewelry', 'Bags', 'Other'],
        default: 'Other' // Default category if not specified
    },
    location: { // Where the item was lost or found
        type: String,
        required: true
    },
    date: { // When the item was lost or found
        type: Date,
        default: Date.now // Automatically set to current date/time when created
    },
    image: { // URL to an uploaded image (e.g., from Cloudinary)
        type: String,
        default: '' // Can be an empty string if no image
    },
    status: {
        type: String,
        // Restrict to these specific values for item lifecycle
        enum: ['Lost', 'Found', 'Claimed', 'Returned'],
        default: 'Lost' // Default status when reported
    }
    // You can add a 'reportedBy' field later if you implement user authentication:
    // reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true // Mongoose will automatically add 'createdAt' and 'updatedAt' fields
});

// Create the Mongoose model from the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item; 