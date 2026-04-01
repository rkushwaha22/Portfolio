const express = require("express");
const router = express.Router();
const ContactInfo = require("../Models/ContactInfoModel");
const upload = require("../Middlewere/Multer"); // Multer import zaroori hai
const { verifyToken } = require("../Middlewere/authMiddleware");

//  GET active contact (frontend)
router.get("/", async (req, res) => {
    try {
        const contact = await ContactInfo.findOne(); 
        res.json(contact);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all contacts (admin)
router.get("/all", verifyToken, async (req, res) => {
    try {
        const contacts = await ContactInfo.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST (Multer added for FormData parsing)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        const contact = new ContactInfo(req.body);
        await contact.save();
        res.json(contact);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  PUT (Update - Multer is MUST here)
router.put("/:id", verifyToken,upload.single("image"),  async (req, res) => {
    try {
        // FormData se data aa raha hai, isliye req.body ab access ho payegi
        const updated = await ContactInfo.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        
        if (!updated) return res.status(404).json({ message: "Data nahi mila" });
        res.json(updated);
    } catch (err) {
        console.error("Contact Info Update Error:", err);
        res.status(500).json(err);
    }
});

//  DELETE
router.delete("/:id",verifyToken, async (req, res) => {
    try {
        await ContactInfo.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

