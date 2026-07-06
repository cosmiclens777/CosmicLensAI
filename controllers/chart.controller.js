import Chart from "../models/chart.model.js";
import { calculateJulianDay } from "../services/julian.service.js";
import { localToUTC } from "../utils/time.js";

import chartService from "../services/chart.service.js";
import divisionalService from "../services/divisional.service.js";
import { formatDegree } from "../utils/degree.js";

import aspectService from "../services/aspect.service.js";
import shadbalaService from "../services/shadbala.service.js";
// -------------------------------------
// Helper: enrich planet data
// -------------------------------------
function enrichPlanet(planet, chartType) {
    const deg = formatDegree(planet.longitude);

    return {
        ...planet,

        chartType: chartType,

        longitude: planet.longitude,
        sign: planet.signNumber,
        house: planet.house,

        formattedDegree: deg.formatted,

        degree: {
            d: deg.degree,
            m: deg.minute,
            s: deg.second
        },

        strength: {
            digbala: null,
            shadbala: null
        },

        aspects: []
    };
}

// -------------------------------------
// SAFE ENGINE WRAPPERS
// -------------------------------------
function applyAspects(chart) {
    if (!chart || !chart.planets) {
        return chart;
    }

    try {
        return aspectService.addAspects(chart);
    } catch (err) {
        return {
            ...chart,
            aspectsError: err.message,
            planets: chart.planets.map(function(p) {
                return {
                    ...p,
                    aspects: []
                };
            })
        };
    }
}

function applyShadbala(chart) {
    if (!chart || !chart.planets) {
        return chart;
    }

    try {
        return shadbalaService.calculate(chart);
    } catch (err) {
        return {
            ...chart,
            shadbalaError: err.message,
            planets: chart.planets.map(function(p) {
                return {
                    ...p,
                    strength: p.strength || {
                        digbala: null,
                        shadbala: null
                    }
                };
            })
        };
    }
}

// -------------------------------------
// MAIN ASTRO CONTROLLER
// -------------------------------------
export const generateFullAstroChart = (req, res) => {
    try {
        const {
            date,
            time,
            timezone,
            latitude,
            longitude
        } = req.body;

        // validation
        if (!date || !time || timezone == null) {
            return res.status(400).json({
                success: false,
                error: "date, time, and timezone are required"
            });
        }

        // UTC
        const utc = localToUTC(date, time, timezone);

        // JD
        const jd = calculateJulianDay(
            utc.year,
            utc.month,
            utc.day,
            utc.hour,
            utc.minute,
            utc.second
        );

        // base chart
        const birthChart = chartService.getAllPlanets(
            jd,
            latitude,
            longitude
        );

        const divisions = [
            1, 2, 3, 4, 7, 9, 10, 12, 16,
            20, 24, 27, 30, 40, 45, 60
        ];

        const charts = {};

        // -----------------------------
        // D1 (base chart + engines)
        // -----------------------------
        let d1 = divisionalService.getD1(birthChart);

        d1.planets = d1.planets.map(function(p) {
            return enrichPlanet(p, "D1");
        });

        d1 = applyAspects(d1);
        d1 = applyShadbala(d1);

        charts.D1 = d1;

        // -----------------------------
        // OTHER DIVISIONAL CHARTS
        // -----------------------------
        for (let i = 0; i < divisions.length; i++) {
            const d = divisions[i];

            if (d === 1) {
                continue;
            }

            try {
                let chart = divisionalService.getD(birthChart, d);

                if (chart && chart.planets) {
                    chart.planets = chart.planets.map(function(p) {
                        return enrichPlanet(p, "D" + d);
                    });
                }

                chart = applyAspects(chart);
                chart = applyShadbala(chart);

                charts["D" + d] = chart;

            } catch (err) {
                charts["D" + d] = {
                    error: err.message
                };
            }
        }

        // -----------------------------
        // RESPONSE
        // -----------------------------
        return res.json({
            success: true,

            meta: {
                jd: jd,
                timestamp: new Date().toISOString()
            },

            input: {
                date: date,
                time: time,
                timezone: timezone,
                latitude: latitude,
                longitude: longitude
            },

            birthChart: charts.D1,
            divisionalCharts: charts,

            engines: {
                aspects: "active",
                shadbala: "active"
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message || "Internal Server Error"
        });
    }
};
