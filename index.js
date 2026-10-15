const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Express Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Gemini AI Client Setup
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// GET route (Static & API Health Check)
app.get("/api/health", (req, res) => {
    res.json({ message: "AI Project Analyzer backend is running!" });
});

// POST route for Gemini AI
app.post("/api/ask", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({ error: "Please enter a question." });
        }

        // Standard Gemini API generateContent call
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question,
        });

        return res.json({ answer: response.text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: "Failed to generate answer from Gemini API." });
    }
});

// Express Server Listener
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});