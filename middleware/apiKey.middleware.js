export const apiKeyMiddleware = (req, res, next) => {
    const clientKey = (req.headers["x-api-key"] || "").trim();
    const serverKey = (process.env.API_KEY || "").trim();



    if (!clientKey) {
        return res.status(401).json({
            success: false,
            error: "API key missing"
        });
    }

    if (clientKey !== serverKey) {
        return res.status(401).json({
            success: false,
            error: "Invalid API key"
        });
    }

    next();
};
