const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
require("dotenv").config()
const PORT = process.env.PORT || 5000;
const authRoutes = require("./Routes/AuthRoute");
const path = require('path');
const os = require("os");


function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (let name of Object.keys(interfaces)) {
        for (let iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "localhost";
}





const app = express()
app.use(cors());

// Middleware
app.use(express.json());

// Server.js mein dono rakhein
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes Use Karein
app.use("/api/auth", authRoutes);
app.use("/api/hero", require("./Routes/HeroRoute"));
app.use("/api/services", require("./Routes/ServiceRoute"));
app.use("/api/projects", require("./Routes/ProjectRoute"));
app.use("/api/skills", require("./Routes/SkillRoutes"));
app.use("/api/contact-msg", require("./Routes/ContactMsgRoute"));
app.use("/api/contact-info", require("./Routes/ContactInfoRoute"))

app.use((req, res) => {
    res.status(404).json({ message: "Bhai, ye API endpoint exit nahi karta!" });
});



// mongoose.connect(process.env.DB_URL)
//  .then(() => {
//         console.log("MongoDB connected");
//         app.listen(PORT, () => {
//             console.log(`Server running on http://localhost:${PORT}`);
//         })
//     })
//     .catch(err => console.log("MongoDB connection error:", err));


mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB connected");

        const IP = getLocalIP();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on:`);
            console.log(`Local: http://localhost:${PORT}`);
            console.log(`Mobile: http://${IP}:${PORT}`);
        });
    })
    .catch(err => console.log("MongoDB connection error:", err));

