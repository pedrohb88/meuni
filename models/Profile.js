const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    birthday: {
        type: Date
    },
    college: {
        type: String
    },
    degree: {
        type: String
    },
    xp: {
        type: Number,
        default: 0
    },
    badges: [
        {
            title: {type: String},
            color: {type: String}
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('Profile', schema);