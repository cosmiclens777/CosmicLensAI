import { Router } from "express";
import chartRoutes from "./chart.routes.js";

const router = Router();

router.use("/chart", chartRoutes);

export default router;