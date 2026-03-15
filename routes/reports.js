const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Report = require('../models/Report');

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

router.post('/analyze-vision', async (req, res) => {
    try {
        const { image, userId } = req.body; // image is base64 string

        if (!image) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
            Analyze this medical blood report image. 
            Keep your response short and technical.
            1. Extract key parameters like Hemoglobin, WBC, Platelets, Glucose, etc.
            2. For each, give the value and whether it is High, Low, or Normal.
            3. Provide a 2-sentence summary of the overall health status.
            4. Suggest the next step (e.g. "Consult a doctor", "Maintain current diet").

            Respond strictly in valid JSON format like this:
            {
                "parameters": [
                    {"name": "Hemoglobin", "value": "12.5", "status": "Low"},
                    {"name": "WBC", "value": "7000", "status": "Normal"}
                ],
                "summary": "Overall health is good, but hemoglobin is slightly low.",
                "recommendation": "Consult a nutritionist."
            }
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: image.split(',')[1], // Remove base64 prefix
                    mimeType: "image/jpeg"
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();
        
        // Clean potential markdown code blocks from AI response
        const cleanJson = text.replace(/```json|```/gi, '').trim();
        const analysisData = JSON.parse(cleanJson);

        // Save report to database
        const newReport = new Report({
            userId,
            analysisResult: analysisData,
            imageUrl: image.substring(0, 100) + "..." // Store a snippet for ref
        });
        await newReport.save();

        res.json(analysisData);

    } catch (error) {
        console.error('Vision Analysis Error:', error);
        res.status(500).json({ error: 'Failed to analyze report image' });
    }
});

module.exports = router;
