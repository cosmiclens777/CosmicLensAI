import { Router } from "express";
import chartRoutes from "./chart.routes.js";
import studentNotesRoutes from "./notes.routes.js";

const router = Router();

router.use("/chart", chartRoutes);
router.use("/studentNotes",studentNotesRoutes)

export default router;
