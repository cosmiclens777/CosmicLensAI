import { OpenAI } from 'openai';
import PDFDocument from 'pdfkit';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generatePDF = async (req, res) => {
    const { topic, prompt } = req.body;
    if (!topic || !prompt) return res.status(400).json({ error: "Topic and prompt are required." });

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }]
        });

        const aiText = response.choices[0].message.content;
        const doc = new PDFDocument({ margin: 40 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${topic.replace(/[^a-zA-Z0-9]/g, "_")}.pdf"`);
        doc.pipe(res);

        // PDF Styling
        doc.fillColor('#0f172a').fontSize(22).text(`AI Generated Interactive Sheet`, { align: 'center' });
        doc.moveDown(0.5);
        doc.fillColor('#0284c7').fontSize(16).text(`Topic: ${topic}`, { align: 'center' });
        doc.moveDown(1);
        doc.moveTo(40, doc.y).lineTo(570, doc.y).strokeColor('#cbd5e1').stroke();
        doc.moveDown(1.5);

        doc.fillColor('#334155').fontSize(12).text(aiText, { lineGap: 5, paragraphGap: 12, align: 'justify' });
        doc.end();

    } catch (error) {
        console.error("OpenAI PDF Error:", error);
        if (!res.headersSent) res.status(500).json({ error: "Failed to generate PDF notes via GPT." });
    }
};
