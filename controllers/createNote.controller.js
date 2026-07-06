// import { OpenAI } from 'openai';
import { GoogleGenAI } from '@google/genai';
export const generatePDF = async(req, res) => {
    const { topic, prompt } = req.body;

    if (!topic || !prompt) {
        return res.status(400).json({ error: "Topic and prompt are required." });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: `You are an expert Class 12 Computer Science and Physics educator in Nepal, fully familiar with the National Examinations Board (NEB) curriculum and past board exam patterns. 
                
                Generate high-quality, comprehensive, and easy-to-understand study notes based on the user's topic. Use clean markdown styling with clear headings, subheadings, bullet points, and code blocks where necessary.
                
                CRITICAL FOR DIAGRAMS & IMAGES:
                Whenever explaining a technical, programming, or scientific concept (like OSI Model, Logic Gates, Data Structures, Networking Topologies, RAM/ROM Architecture, Physics Ray Diagrams), you MUST embed highly accurate educational diagrams using Wikipedia/Wikimedia or Unsplash Markdown syntax:
                - ![Diagram Description](https://upload.wikimedia.org/wikipedia/commons/thumb/.../filename.png/600px-filename.png)
                - ![Image Description](https://images.unsplash.com/photo-[id]?w=600&auto=format&fit=crop)
                
                CRITICAL FOR NEB PAST QUESTIONS SECTION:
                At the very end of the notes, you MUST append a dedicated section titled "🇳🇵 NEB Past Board Exam Questions".
                Under this section, generate realistic past board questions (from 2075 to recent 2081/2082/2083 exams) strictly following the NEB marks distribution:
                1. **Group A: Very Short / MCQs (1 Mark each)** - Provide 3-4 sample questions.
                2. **Group B: Short Answer Questions (5 Marks each)** - Provide 2-3 conceptual/analytical questions.
                3. **Group C: Long Answer Questions (8 Marks each)** - Provide 1-2 detailed or program/numerical-based questions.
                Specify the tentative exam year next to each question (e.g., [NEB 2079], [NEB 2081 Supp.]) to give students a real exam feel.`
            }
        });

        const aiText = response.text;

        res.json({
            success: true,
            topic: topic,
            text: aiText
        });

    } catch (error) {
        console.error("Gemini AI Note Generation Error:", error);
        res.status(500).json({ error: "Failed to generate visual notes with NEB questions from Gemini AI." });
    }
};

// export const generatePDF = async(req, res) => {
//     const { topic, prompt } = req.body;
//     if (!topic || !prompt) {
//         return res.status(400).json({ error: "Topic and prompt are required." });
//     }

//     try {
//         const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//         // OpenAI बाट सिधै टेक्स्ट रेस्पोन्स मगाउने
//         const response = await openai.chat.completions.create({
//             model: 'gpt-4o-mini',
//             messages: [{ role: 'user', content: prompt }]
//         });

//         const aiText = response.choices[0].message.content;

//         // फ्रन्टइन्डलाई सिधै शुद्ध टेक्स्ट अब्जेक्ट पठाइदिने
//         res.json({
//             success: true,
//             topic: topic,
//             text: aiText
//         });

//     } catch (error) {
//         console.error("OpenAI Text Generation Error:", error);
//         res.status(500).json({ error: "Failed to generate notes from AI." });
//     }
// };

// // 💡 यहाँ माथि dotenv इम्पोर्ट गर्नु पर्दैन, तर openai इन्सट्यान्सलाई फङ्क्सन भित्र राख्नुपर्छ

// export const generatePDF = async(req, res) => {
//     const { topic, prompt } = req.body;
//     if (!topic || !prompt) return res.status(400).json({ error: "Topic and prompt are required." });

//     try {
//         //  ट्याक्क फङ्क्सन भित्र इनिसियलाइज गर्ने (एकदम सुरक्षित तरिका)
//         const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//         const response = await openai.chat.completions.create({
//             model: 'gpt-4o-mini',
//             messages: [{ role: 'user', content: prompt }]
//         });

//         const aiText = response.choices[0].message.content;
//         const doc = new PDFDocument({ margin: 40 });

//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename="${topic.replace(/[^a-zA-Z0-9]/g, "_")}.pdf"`);
//         doc.pipe(res);

//         // PDF Styling
//         doc.fillColor('#0f172a').fontSize(22).text(`AI Generated Interactive Sheet`, { align: 'center' });
//         doc.moveDown(0.5);
//         doc.fillColor('#0284c7').fontSize(16).text(`Topic: ${topic}`, { align: 'center' });
//         doc.moveDown(1);
//         doc.moveTo(40, doc.y).lineTo(570, doc.y).strokeColor('#cbd5e1').stroke();
//         doc.moveDown(1.5);

//         doc.fillColor('#334155').fontSize(12).text(aiText, { lineGap: 5, paragraphGap: 12, align: 'justify' });
//         doc.end();

//     } catch (error) {
//         console.error("OpenAI PDF Error:", error);
//         if (!res.headersSent) res.status(500).json({ error: "Failed to generate PDF notes via GPT." });
//     }
// };
