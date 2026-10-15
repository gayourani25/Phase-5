require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get('/api/status', (req, res) => {
    res.json({ message: "Server is running successfully!" });
});

app.post('/api/ask', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question || question.trim() === '') {
            return res.status(400).json({ error: 'Question is required.' });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
        });

        res.json({ answer: response.text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});