const express = require("express");
const Service = require("../Models/ServiceModel");
const router = express.Router();
const upload = require("../Middlewere/Multer"); // Multer import kiya
const { verifyToken } = require("../Middlewere/authMiddleware");

//  GET active services (frontend)
router.get("/", async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ order: 1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  GET all services (admin)
router.get("/all", verifyToken, async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  POST new service (Multer added)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        let data = { ...req.body };

        // Naya active banane se pehle baaki sabko deactivate kar do
        if (data.isActive === "true" || data.isActive === true) {
            await Hero.updateMany({}, { isActive: false });
        }


        if (req.file) data.image = `uploads/${req.file.filename}`;

        const service = new Service(data);
        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//  PUT (Update service) - YAHAN BADLAV HAI
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
    try {
        let updateData = { ...req.body };

        // 1. Image update logic
        if (req.file) {
            updateData.image = `uploads/${req.file.filename}`;
        }

        // 2. Array/JSON Parsing (Kyunki FormData string bhejta hai)
        Object.keys(updateData).forEach(key => {
            const value = updateData[key];
            if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
                try {
                    updateData[key] = JSON.parse(value);
                } catch (e) {
                    // console.log("Not a JSON array, skipping parse for:", key);
                }
            }
        });

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedService) return res.status(404).json({ message: "Service not found" });

        res.json(updatedService);
    } catch (error) {
        console.error("Update Error:", error);
        res.status(400).json({ message: error.message });
    }
});

//  DELETE service
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
