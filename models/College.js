const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    photo: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    address: {
        type: String,
    },
    district: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    cep: {
        type: String
    },
    website: {
        type: String
    },
    organization: {
        type: String
    },
    acronym: {
       type: String,
    },
    collegeType: {
        type: String
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    institutional: [],
    enterMethods: [],
    costs: [],
    scholarships: [],
    courses: [],
    community: [],
    interestingPlaces: [],
    forum: [],

    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Post = mongoose.model('College', schema);