import { z } from "zod";

export const chartSchema = z.object({
    date: z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) && value === date.toISOString().split("T")[0];
    }, {
        message: "Invalid date",
    }),

    time: z.string().regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/, {
            message: "Time must be between 00:00 and 23:59",
        }
    ),

    latitude: z.number().min(-90).max(90),

    longitude: z.number().min(-180).max(180),

    timezone: z.number().min(-12).max(14),

    ayanamsa: z.enum(["lahiri", "raman", "krishnamurti"]).default("lahiri"),
});