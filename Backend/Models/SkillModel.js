const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [String], // ["HTML", "CSS"]
    percent: { type: Number, required: true },
    icon: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);