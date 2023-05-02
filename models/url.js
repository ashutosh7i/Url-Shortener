//This module is a model that will handle the database part

//importing mongoose
const mongoose = require("mongoose")

//making a Schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: { type: String },
        ip: { type: String }
    }]
},
    { timestamps: true }
)

//making a model
const URL = mongoose.model('url', urlSchema);

//exporting model
module.exports = URL;