// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Needed for password hashing

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // IMPORTANT: Ensures no two users have the same username
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // IMPORTANT: Ensures no two users have the same email
        trim: true,
        lowercase: true, // Always store emails in lowercase for consistent lookups
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Basic email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Simple validation: password must be at least 6 characters
    }
}, {
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

// --- BEFORE SAVING A USER: HASH THE PASSWORD ---
// This is a Mongoose "pre-save hook". It runs automatically before a user is saved.
userSchema.pre('save', async function(next) {
    // Only hash the password if it's new or has been modified
    if (!this.isModified('password')) {
        return next(); // If password hasn't changed, skip hashing
    }

    // Generate a salt (a random string to make hashing more secure)
    const salt = await bcrypt.genSalt(10); // '10' is the cost factor (higher = more secure, slower)
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed with saving the user to the database
});

// --- FOR LOGIN: COMPARE ENTERED PASSWORD WITH HASHED PASSWORD ---
// This is a custom method added to the user model, making it easy to check passwords.
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compares plaintext with hashed
};

// Create the Mongoose Model
const User = mongoose.model('User', userSchema);

module.exports = User;