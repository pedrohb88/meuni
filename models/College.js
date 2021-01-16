const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    acronym: {
        value: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    collegeType: {
        value: {type: String, enum: ['pública', 'privada']},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    restaurant: {
        value: {type: Boolean},
        description: {type: String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    location: {
        value: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    courses: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        }
    ],
    scholarships: [
        {   
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            title: {type: String, required: true},
            description: {type: String, required: true},
        }
    ],
    enterMethods: [
        {   
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            title: {type: String, required: true},
            description: {type: String, required: true},
        }
    ],
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

schema.pre('validate', function(next) {
    if (this.location.length > 1) throw("Uma instituição só pode estar localizada em um lugar.");
    next();
});

module.exports = Post = mongoose.model('College', schema);