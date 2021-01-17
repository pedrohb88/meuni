const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },

    text: {
        type: String,
        required: true
    },

    replies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },

            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

    upVotes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    
    downVotes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],

    date: {
        type: Date,
        default: Date.now
    }
});

    
module.exports = Post = mongoose.model('Info', schema);