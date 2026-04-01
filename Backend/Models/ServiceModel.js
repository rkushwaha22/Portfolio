const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String, // URL store hoga
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Service", ServiceSchema);
