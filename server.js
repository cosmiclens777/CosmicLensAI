import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/index.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==============================
// Middleware
// ==============================

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// Landing Page
// ==============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==============================
// API Routes
// ==============================

app.use("/api", routes);

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found"
    });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║        🔮 Kundali AI API Server              ║
║                                              ║
║   🚀 Running on Port : ${PORT.toString().padEnd(18)}║
║                                              ║
║   🌐 Local: http://localhost:${PORT}          ║
║   📖 Landing Page: /                         ║
║   ⚡ API Base URL: /api                      ║
║                                              ║
║   Made by Er. Sundar Dumre ❤️               ║
║                                              ║
╚══════════════════════════════════════════════╝
`);
});
