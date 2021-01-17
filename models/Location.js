const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    photo: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String, 
        required: true,
    },
    housingCost: [
        {
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        }
    }],
    transportCost: [{
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        }
    }],
    feedCost: [{
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        }
    }],
    studentBenefits: [
        {
            value: {type: String},
            description: {type: String},
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            college: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'College'
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
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        }
    }],
    locationDetailing: [{
        value: {type: String},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        }
    }],
    availableHousingPlaces: [{
        value: {type: String},
        description: {type: String},
        rentCost: {type: Number},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        }
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