const express = require("express");
const router = express.Router();
const Admin = require("../Models/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(404).json({ message: "Admin nahi mila!" });

        // Password check (Agar plain text hai toh admin.password === password)
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Galat Password!" });

        // Token generate karein
        const token = jwt.sign({ id: admin._id }, "YOUR_SECRET_KEY", { expiresIn: "1d" });
        res.json({ token, username: admin.username });
    } catch (err) {
        res.status(500).json(err);
    }
});

// ✅ YAHAN DEFINE HAI ROUTE
router.post("/register-admin-secret", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Password ko hash (encrypt) karna zaroori hai
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin successfully register ho gaya!" });
    } catch (err) {
        res.status(500).json({ message: "Registration fail", error: err.message });
    }
});

module.exports = router;