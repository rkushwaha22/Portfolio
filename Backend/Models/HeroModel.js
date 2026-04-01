const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
    name: String ,
    roles: [String],
    subtitle: String,
    image: String,
    experience: String,
    social: {
        facebook: String,
        instagram: String,
        linkedin: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);