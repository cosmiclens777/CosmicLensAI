import { generatePDF } from '../controllers/createNote.controller.js';
import { generateQuiz } from '../controllers/createQuiz.Controller.js';

const router = express.Router();

router.post('/generate-pdf', generatePDF);
router.post('/generate-quiz', generateQuiz);
