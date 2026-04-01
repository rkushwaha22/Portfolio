const express = require("express");
const router = express.Router();
const Skill = require("../Models/SkillModel");
const upload = require("../Middlewere/Multer"); // Multer import kiya
const { verifyToken } = require("../Middlewere/authMiddleware");

//  GET active skills (frontend)
router.get("/", async (req, res) => {
    try {
        const skills = await Skill.find({ isActive: true }).sort({ order: 1 });
        res.json(skills);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  GET all skills (admin)
router.get("/all", verifyToken, async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1 });
        res.json(skills);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  POST new skill (Multer added)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        let data = { ...req.body };

        // Naya active banane se pehle baaki sabko deactivate kar do
        if (data.isActive === "true" || data.isActive === true) {
            await Hero.updateMany({}, { isActive: false });
        }


        // Image path save karein agar file upload hui hai
        if (req.file) {
            data.image = `uploads/${req.file.filename}`;
        }

        const skill = new Skill(data);
        const saved = await skill.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  PUT (Update skill) - Multer + Body Parsing
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
    try {
        let updateData = { ...req.body };

        // 1. Image check
        if (req.file) {
            updateData.image = `uploads/${req.file.filename}`;
        }

        // 2. Generic Parsing (Just in case skills mein koi array ho)
        Object.keys(updateData).forEach(key => {
            const value = updateData[key];
            if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
                try {
                    updateData[key] = JSON.parse(value);
                } catch (e) { }
            }
        });

        const updated = await Skill.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Skill nahi mili" });
        res.json(updated);
    } catch (err) {
        console.error("Skill Update Error:", err);
        res.status(500).json(err);
    }
});

//  DELETE skill
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: "Skill deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
