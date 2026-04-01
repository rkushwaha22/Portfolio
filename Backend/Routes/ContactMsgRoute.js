const express = require("express");
const router = express.Router();
const Contact = require("../Models/ContactMsgModel");
const { verifyToken } = require("../Middlewere/authMiddleware");

// Save message
router.post("/", async (req, res) => {
    try {
        const msg = new Contact(req.body);
        await msg.save();
        res.json({ message: "Message sent successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});
//  GET all contacts (admin ke liye)
router.get("/all",verifyToken, async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json(err);
    }
});
// / 2. DELETE message (YAHAN 404 KA ISSUE HAI - ISE ADD KAREIN)
router.delete("/:id",verifyToken, async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Message nahi mila!" });
        }

        res.json({ message: "Message successfully delete ho gaya" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});





module.exports = router;