//--------------------------------------------------
// Aspect Engine (Clean + Extensible)
//--------------------------------------------------

const DEFAULT_ORB = 8;

// Aspect definitions (Western base system)
const ASPECTS = [{
        name: "conjunction",
        angle: 0,
        orb: DEFAULT_ORB,
        weight: 1.0
    },
    {
        name: "sextile",
        angle: 60,
        orb: 6,
        weight: 0.6
    },
    {
        name: "square",
        angle: 90,
        orb: 7,
        weight: 0.8
    },
    {
        name: "trine",
        angle: 120,
        orb: 7,
        weight: 0.9
    },
    {
        name: "opposition",
        angle: 180,
        orb: 8,
        weight: 1.0
    }
];

//--------------------------------------------------
// Normalize angle (0–360)
//--------------------------------------------------
function normalize(angle) {
    return ((angle % 360) + 360) % 360;
}

//--------------------------------------------------
// Calculate difference between two longitudes
//--------------------------------------------------
function getAngleDifference(lon1, lon2) {
    const diff = Math.abs(normalize(lon1) - normalize(lon2));
    return diff > 180 ? 360 - diff : diff;
}

//--------------------------------------------------
// Check single aspect between two planets
//--------------------------------------------------
export function getAspect(p1, p2) {
    const diff = getAngleDifference(p1.longitude, p2.longitude);

    for (const aspect of ASPECTS) {
        if (Math.abs(diff - aspect.angle) <= aspect.orb) {
            return {
                type: aspect.name,
                angle: aspect.angle,
                actualDifference: diff,
                orb: Math.abs(diff - aspect.angle),
                weight: aspect.weight,
                planet1: p1.name,
                planet2: p2.name
            };
        }
    }

    return null;
}

//--------------------------------------------------
// Get ALL aspects for one planet
//--------------------------------------------------
export function getPlanetAspects(planet, planets) {
    return planets
        .filter(p => p.name !== planet.name)
        .map(p => getAspect(planet, p))
        .filter(Boolean);
}

//--------------------------------------------------
// Build full aspect matrix (recommended for engine)
//--------------------------------------------------
export function buildAspectMatrix(planets) {
    return planets.map(p1 => ({
        planet: p1.name,
        longitude: p1.longitude,
        aspects: getPlanetAspects(p1, planets)
    }));
}

//--------------------------------------------------
// Calculate aspect strength score
//--------------------------------------------------
export function calculateAspectScore(planets) {
    let score = 0;

    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const aspect = getAspect(planets[i], planets[j]);

            if (aspect) {
                score += aspect.weight;
            }
        }
    }

    return score;
}

//--------------------------------------------------
// Export default (optional convenience)
//--------------------------------------------------
export default {
    getAspect,
    getPlanetAspects,
    buildAspectMatrix,
    calculateAspectScore
};