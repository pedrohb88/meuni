const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'moderator'],
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', schema);