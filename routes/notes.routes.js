
import { Router } from "express";

import { generatePDF } from '../controllers/createNote.controller.js';
import { generateQuiz } from '../controllers/createQuiz.controller.js';

const router = Router();

router.post('/generate-pdf', generatePDF);
router.post('/generate-quiz', generateQuiz);

export default router;
