const express = require("express");
const router = express.Router();
const Project = require("../Models/ProjectModel");
const upload = require("../Middlewere/Multer"); // Multer import kiya
const { verifyToken } = require("../Middlewere/authMiddleware");

//  GET active projects (frontend)
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find({ isActive: true }).sort({ order: 1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  GET all projects (admin)
router.get("/all", verifyToken, async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST new project (Multer Added)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        let data = { ...req.body };

        // Naya active banane se pehle baaki sabko deactivate kar do
        if (data.isActive === "true" || data.isActive === true) {
            await Hero.updateMany({}, { isActive: false });
        }

        // Image path handling
        if (req.file) {
            data.image = `uploads/${req.file.filename}`;
        }

        // Array parsing for techStack/features
        Object.keys(data).forEach(key => {
            if (typeof data[key] === "string" && data[key].startsWith("[")) {
                try {
                    data[key] = JSON.parse(data[key]);
                } catch (e) { /* normal string */ }
            }
        });

        const project = new Project(data);
        const saved = await project.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  PUT (Update project) - Multer & Parsing Added
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
    try {
        let updateData = { ...req.body };

        // 1. Image handling
        if (req.file) {
            updateData.image = `uploads/${req.file.filename}`;
        }

        // 2. Array parsing (TechStack wagera ke liye)
        Object.keys(updateData).forEach(key => {
            const value = updateData[key];
            if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
                try {
                    updateData[key] = JSON.parse(value);
                } catch (e) {
                    // console.log("Parsing skip for:", key);
                }
            }
        });

        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Project not found" });
        res.json(updated);
    } catch (err) {
        console.error("Project Update Error:", err);
        res.status(500).json(err);
    }
});

//  DELETE project
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

