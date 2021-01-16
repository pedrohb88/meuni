const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String, 
        required: true,
    },
    housingCost: {
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    transportCost: {
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    feedCost: {
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    studentBenefits: [
        {
            value: {type: String},
            description: {type: String},
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    interestingPlaces: [{
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }],
    locationDetailing: [{
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }],
    availableHousingPlaces: [{
        value: {type: String},
        description: {type: String},
        rentCost: {type: Number},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }],
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
            name: {
                type: String,
            },
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
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('Location', schema);