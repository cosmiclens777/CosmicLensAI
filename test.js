import swiss from "./services/swiss.service.js";
import chartService from "./services/chart.service.js";
import divisionalService from "./services/divisional.service.js";
import { formatDegree } from "./utils/degree.js";
import aspectService from "./services/aspect.service.js"; // future
import shadbalaService from "./services/shadbala.service.js"; // future

// -------------------------------------
// Birth Details
// -------------------------------------
const jd = swiss.julianDay(1999, 7, 30, 4.7);

// Gurugram, India
const latitude = 28.4595;
const longitude = 77.0266;

// -------------------------------------
// Base Chart (D1 source)
// -------------------------------------
const birthChart = chartService.getAllPlanets(
    jd,
    latitude,
    longitude
);

// -------------------------------------
// Helper: enrich planet
// -------------------------------------
function enrichPlanet(p, chartType) {
    const deg = formatDegree(p.longitude);

    return {
        ...p,

        // raw + formatted
        longitude: p.longitude,
        formattedDegree: deg.formatted,

        // astrology basics
        sign: p.signNumber,
        house: p.house,

        // placeholders for future engines
        strength: {
            digbala: null,
            shadbala: null
        },

        aspects: [], // aspectService.calculate(p, chartType)

        // UI-friendly
        degree: {
            d: deg.degree,
            m: deg.minute,
            s: deg.second
        }
    };
}

// -------------------------------------
// Build Divisional Charts
// -------------------------------------
const divisions = [
    1, 2, 3, 4, 7, 9, 10, 12, 16, 20, 24, 27, 30, 40, 45, 60
];

const charts = {};

// D1 special handling
charts.D1 = divisionalService.getD1(birthChart);
charts.D1.planets = charts.D1.planets.map(p =>
    enrichPlanet(p, "D1")
);

// other Vargas
for (const d of divisions) {
    if (d === 1) continue;

    try {
        const chart = divisionalService.getD(
            birthChart,
            d
        );

        chart.planets = chart.planets.map(p =>
            enrichPlanet(p, `D${d}`)
        );

        charts[`D${d}`] = chart;

    } catch (err) {
        charts[`D${d}`] = {
            error: err.message
        };
    }
}

// -------------------------------------
// API RESPONSE (frontend ready)
// -------------------------------------
const apiResponse = {
    meta: {
        jd,
        latitude,
        longitude,
        timestamp: new Date().toISOString()
    },

    birthChart: {
        ...charts.D1
    },

    divisionalCharts: charts,

    engines: {
        aspectEngine: "pending",
        shadbalaEngine: "pending",
        note: "hooks ready for integration"
    }
};

// export for API server
export default apiResponse;

// optional (if you want direct run)
export { apiResponse };