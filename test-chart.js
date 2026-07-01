import swiss from "./services/swiss.service.js";
import chart from "./services/chart.service.js";

// 30 July 1999
// 10:12 AM IST = 04:42 UTC

const jd = swiss.julianDay(
    1999,
    7,
    30,
    4.7
);

const d1 = chart.getAllPlanets(
    jd,
    28.4595, // Gurugram latitude
    77.0266 // Gurugram longitude
);

console.log(
    JSON.stringify(
        d1,
        null,
        4
    )
);