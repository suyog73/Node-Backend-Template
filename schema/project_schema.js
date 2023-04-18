const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    pimage: {
        type: [String],
        required: true
    },
    plogo: {
        type: String,
        required: true
    },
    pdesc: {
        type: String,
        required: true
    },
    stack: {
        type: [String],
        required: true
    },
    gitHub: {
        type: String,
        required: true
    },
    pUrl: {
        type: String
    },
    ownerId: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    groupArray: {
        type: [String]
    },
    branch: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Project", projectSchema);
