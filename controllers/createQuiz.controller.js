// import { OpenAI } from 'openai';

// // 💡 यहाँ माथि फंक्सन बाहिर 'new OpenAI()' राख्नु हुँदैन!

// export const generateQuiz = async(req, res) => {
//     const { topic, prompt } = req.body;
//     if (!topic || !prompt) {
//         return res.status(400).json({ error: "Topic and prompt are required." });
//     }

//     try {
//         //  ट्याक्क फंक्सन भित्र इनिसियलाइज गर्ने (यसो गर्दा .env मिसिङ देखाउँदैन)
//         const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//         const response = await openai.chat.completions.create({
//             model: 'gpt-4o-mini',
//             response_format: { type: "json_object" }, // सफा JSON अब्जेक्ट माग्ने
//             messages: [{
//                     role: 'system',
//                     content: 'You are a helpful assistant designed to output strict JSON. Your response must be a single JSON array matching the requested schema without any markdown formatting.'
//                 },
//                 { role: 'user', content: prompt }
//             ]
//         });

//         const rawJsonString = response.choices[0].message.content;
//         let quizJson = JSON.parse(rawJsonString);

//         // यदि एरे कुनै अब्जेक्टको की (Key) भित्र बेरिएर आयो भने त्यसलाई सिधै एरे बनाउने सेफ गार्ड
//         if (!Array.isArray(quizJson) && typeof quizJson === 'object') {
//             const keys = Object.keys(quizJson);
//             if (keys.length === 1 && Array.isArray(quizJson[keys[0]])) {
//                 quizJson = quizJson[keys[0]];
//             }
//         }

//         // सिधै फ्रन्टइन्डलाई JSON रेस्पोन्स पठाइदिने
//         res.json(quizJson);

//     } catch (error) {
//         console.error("OpenAI Quiz Controller Error:", error);
//         res.status(500).json({ error: "Failed to generate structured GPT Quiz payload." });
//     }
// };


import { GoogleGenAI, Type } from '@google/genai';

export const generateQuiz = async(req, res) => {
    const { topic, prompt } = req.body;
    if (!topic || !prompt) {
        return res.status(400).json({ error: "Topic and prompt are required." });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        // जेमिनीलाई ट्याक्कै फ्रन्टइन्डले चिन्ने संरचना (Strict JSON Schema) दिने
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a 10-question MCQ quiz for Class 12 Computer Science on the topic: "${topic}". Context: ${prompt}`,
            config: {
                responseMimeType: "application/json",
                // responseSchema ले जेमिनीलाई गलत साँचोमा डेटा पठाउनै दिँदैन
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            q: { type: Type.STRING, description: "The quiz question text." },
                            o: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "Array of exactly 4 options."
                            },
                            a: { type: Type.INTEGER, description: "The zero-based index of the correct answer (0, 1, 2, or 3)." }
                        },
                        required: ["q", "o", "a"]
                    }
                },
                systemInstruction: `You are an expert Class 12 Computer Science examiner in Nepal. 
                Your job is to generate highly accurate technical MCQs matching the requested topic. 
                Do NOT generate general knowledge questions like capitals or history unless explicitly requested. 
                The quiz must strictly be based on Nepalese Class 12 Computer Science syllabus concepts (e.g., DBMS, Networking, C Programming).
                Ensure the "a" property holds the exact index integer of the correct answer string from the "o" array.`
            }
        });

        const rawJsonString = response.text;
        let quizJson = JSON.parse(rawJsonString);

        // सेफ गार्ड एरे चेक
        if (!Array.isArray(quizJson) && typeof quizJson === 'object') {
            const keys = Object.keys(quizJson);
            if (keys.length === 1 && Array.isArray(quizJson[keys[0]])) {
                quizJson = quizJson[keys[0]];
            }
        }

        res.json(quizJson);

    } catch (error) {
        console.error("Gemini Quiz Controller Error:", error);
        res.status(500).json({ error: "Failed to generate structured Gemini Quiz payload." });
    }
};