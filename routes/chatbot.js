const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Requirement = require('../models/Requirement');

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY); // Standardized constructor

// Setup initial context for the chatbot
const systemInstruction = `
You are HealthGuard Bot, a friendly, professional AI assistant for the HealthGuard platform.
The HealthGuard platform currently offers the following features:
1. Dashboard with health tips
2. Symptom Checker
3. Medicine Information Search
4. Habit Tracker (Water, Sleep, Steps etc.)
5. Medical Report Analyzer (Blood test normal ranges)
6. Emergency First Aid instructions

Your job is to answer the user's questions about the platform, health awareness, and provide guidance on how to use the website.
Keep your responses very concise, ideally 1-3 short sentences. Use basic Markdown for formatting (bolding, lists).

CRITICAL INSTRUCTION:
If the user asks for a feature, tool, or capability that HealthGuard DOES NOT currently have (for example: diet planning, appointment booking, mental health counseling, etc.), you MUST do two things:
1. Politely inform them that the website does not currently support that feature, but you will gladly log it as a request for the admin team.
2. Extract the core feature they are requesting into a short summary string.

You MUST respond strictly in the following JSON format:
{
  "reply": "Your friendly text response to the user here.",
  "requirement": "A short summary of the requested feature here (e.g. 'Diet Planning Tool'). If they did not request a new feature, set this to null."
}
Do not output anything other than standard JSON.
`;

router.post('/', async (req, res) => {
    try {
        const { message, userId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            return res.status(500).json({ 
                error: 'AI is currently offline. Administrator needs to configure the Gemini API Key.' 
            });
        }

        // Use the same model as reports.js
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Call Gemini API
        const result = await model.generateContent(
             systemInstruction + "\n\nUser Message: " + message
        );

        const response = await result.response;
        const rawText = response.text();
        let aiData;
        
        try {
            aiData = JSON.parse(rawText);
        } catch (e) {
            console.error("Failed to parse AI JSON response:", rawText);
            return res.status(500).json({ error: 'Chatbot malfunctioned' });
        }

        const reply = aiData.reply;
        const requirementDesc = aiData.requirement;

        // If the AI detected a new requirement, log it to the database
        if (requirementDesc && requirementDesc !== "null") {
            const newReq = new Requirement({
                description: requirementDesc,
                userId: userId || null
            });
            await newReq.save();
            console.log("✅ Logged new user requirement:", requirementDesc);
        }

        res.json({ reply, loggedRequirement: !!requirementDesc });

    } catch (error) {
        console.error('Chatbot Error:', error);
        res.status(500).json({ error: 'Failed to communicate with AI' });
    }
});

// Medicine Suggestion Route
router.post('/suggest-medicine', async (req, res) => {
    try {
        const { symptoms, description } = req.body;
        
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            return res.status(500).json({ error: 'AI Offline' });
        }

        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const medicalContext = `
        Analyze these symptoms: ${symptoms.join(', ')} and description: "${description}".
        
        TASK:
        1. Suggest 2-3 common OTC medicines (name, brand, usage) for awareness.
        2. Provide 3-4 specific "General Advice & Precautions" (e.g., stay hydrated, rest, when to seek urgent care).
        3. MUST include disclaimer: "This is not medical advice. Consult a doctor."
        
        Respond ONLY in valid JSON:
        {
          "suggestions": [{"name": "...", "brand": "...", "usage": "..."}],
          "advice": ["Advice 1", "Advice 2", ...],
          "disclaimer": "..."
        }`;

        const result = await model.generateContent(medicalContext);
        const aiResp = await result.response;
        const text = aiResp.text();

        // Clean potential markdown blocks
        const cleanJson = text.replace(/```json|```/gi, '').trim();
        const aiData = JSON.parse(cleanJson);
        res.json(aiData);
    } catch (error) {
        console.error('Medicine Suggestion Error:', error);
        res.status(500).json({ error: 'Failed to generate suggestions' });
    }
});

module.exports = router;
