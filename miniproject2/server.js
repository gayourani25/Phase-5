const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


app.post("/journal-prompt", async (req, res) => {
    try {
        const { mood } = req.body;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Write one short and encouraging journal prompt for someone feeling ${mood}.`
        });

        res.json({
            prompt: result.text
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Gemini request failed"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
