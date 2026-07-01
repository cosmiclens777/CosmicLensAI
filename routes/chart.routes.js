import { Router } from "express";

import { generateFullAstroChart } from "../controllers/chart.controller.js";

import { validate } from "../middleware/validate.js";
import { chartSchema } from "../validators/chart.validator.js";

import { apiKeyMiddleware } from "../middleware/apiKey.middleware.js";

const router = Router();

/**
 * FULL ASTRO API ROUTE
 * - API Key protected
 * - Request validated
 * - Returns D1–D60 + aspects + shadbala-ready structure
 */
router.post(
    "/",
    apiKeyMiddleware,
    validate(chartSchema),
    generateFullAstroChart
);

export default router;