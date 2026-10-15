
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })
  : null;

// GET route
app.get("/api/health", (req, res) => {
  res.json({ message: "AI Project Analyzer backend is running!" });
});

// POST route
app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question.",
      });
    }

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing in .env",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
    });

    res.json({ answer: response.text });
  } catch (error) {
    console.error("Gemini error:", error.message);

    res.status(500).json({
      error: "Unable to generate an answer. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
