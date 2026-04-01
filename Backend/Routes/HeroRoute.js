const express = require("express");
const router = express.Router();
const Hero = require("../Models/HeroModel");
const { verifyToken } = require("../Middlewere/authMiddleware");
const multer = require("multer");
const { storage } = require("../Middlewere/Multer"); // Destructure storage
const upload = multer({ storage: storage });
const { verifyToken } = require("../Middlewere/authMiddleware");

//  GET active hero (Frontend - Public)
router.get("/", async (req, res) => {
    try {
        const hero = await Hero.findOne({ isActive: true });
        res.json(hero);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all heroes (Admin - Protected)
router.get("/all", verifyToken, async (req, res) => {
    try {
        const heroes = await Hero.find();
        res.json(heroes);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  POST (Create new hero - Protected + Multer Added)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        let data = { ...req.body };

        // Naya active banane se pehle baaki sabko deactivate kar do
        if (data.isActive === "true" || data.isActive === true) {
            await Hero.updateMany({}, { isActive: false });
        }
        
        // Image check
        if (req.file) {
            data.image = req.file.path;
        }

        // Roles parsing (Array handling)
        if (data.roles && typeof data.roles === "string") {
            try {
                data.roles = JSON.parse(data.roles);
            } catch (e) {
                data.roles = data.roles.split(",").map(r => r.trim());
            }
        }

        const hero = new Hero(data);
        const saved = await hero.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  PUT (Update - Protected + Multer)
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
    try {
        let updateData = { ...req.body };

        // roles ko sahi se parse karein
        if (updateData.roles && typeof updateData.roles === "string") {
            try {
                updateData.roles = JSON.parse(updateData.roles);
            } catch (e) {
                updateData.roles = updateData.roles.split(",").map(r => r.trim());
            }
        }

        if (req.file) {
            updateData.image =req.file.path;
        }

        const updated = await Hero.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Hero.findByIdAndDelete(req.params.id);
        res.json({ message: "Hero deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
