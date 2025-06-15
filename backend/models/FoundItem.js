const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Vehicles', 'Personal Items', 'Clothes', 'Backpacks', 'Wallets', 
           'Keys', 'ATM', 'Instruments', 'Sports', 'Tools', 'Documents', 'Others']
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'returned'],
    default: 'available'
  },
  contactName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  evidence: [{
    description: String,
    files: [String],
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FoundItem', foundItemSchema); 