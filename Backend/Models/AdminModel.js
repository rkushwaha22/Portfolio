const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // Ise hash karke save karna chahiye
});

module.exports = mongoose.model("Admin", adminSchema);