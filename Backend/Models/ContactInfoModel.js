const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema({
    location: String,
    phone: String,
    email: String,
    description: String
}, { timestamps: true });

module.exports = mongoose.model("ContactInfo", contactInfoSchema);