import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateQuiz = async (req, res) => {
    const { topic, prompt } = req.body;
    if (!topic || !prompt) return res.status(400).json({ error: "Topic and prompt are required." });

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            response_format: { type: "json_object" }, // यसले सफा JSON मात्र दिन्छ
            messages: [
                { 
                    role: 'system', 
                    content: 'You are a helpful assistant designed to output strict JSON. Your response must be a single JSON array matching the requested schema without any markdown formatting.' 
                },
                { role: 'user', content: prompt }
            ]
        });

        const rawJsonString = response.choices[0].message.content;
        let quizJson = JSON.parse(rawJsonString);
        
        // यदि GPT ले एरेलाई कुनै की (Key) भित्र बेरेर पठायो भने त्यसलाई सिधै एरे बनाउने सेफ गार्ड
        if (!Array.isArray(quizJson) && typeof quizJson === 'object') {
            const keys = Object.keys(quizJson);
            if (keys.length === 1 && Array.isArray(quizJson[keys[0]])) {
                quizJson = quizJson[keys[0]];
            }
        }
        
        res.json(quizJson);

    } catch (error) {
        console.error("OpenAI Quiz Error:", error);
        res.status(500).json({ error: "Failed to generate structured GPT Quiz." });
    }
};
