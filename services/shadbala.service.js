class ShadbalaService {

    //--------------------------------------------------
    // MAIN ENTRY
    //--------------------------------------------------
    calculate(chart) {
        if (!chart || !Array.isArray(chart.planets)) {
            return chart;
        }

        const enrichedPlanets = chart.planets.map(p => {
            const sthana = this.sthanaBala(p);
            const dig = this.digBala(p);
            const kala = this.kalaBala(p);
            const cheshta = this.cheshtaBala(p);

            const total =
                sthana.score +
                dig.score +
                kala.score +
                cheshta.score;

            return {
                ...p,
                shadbala: {
                    sthana,
                    dig,
                    kala,
                    cheshta,
                    total: Math.round(total)
                }
            };
        });

        return {
            ...chart,
            planets: enrichedPlanets
        };
    }

    //--------------------------------------------------
    // 1. STHANA BALA (Sign strength)
    //--------------------------------------------------
    sthanaBala(planet) {

        const sign = planet.signNumber;

        // simple dignity model (you can improve later)
        const EXALTED = {
            Sun: 0, // Aries
            Moon: 2, // Taurus
            Mars: 9, // Capricorn
            Mercury: 5, // Virgo
            Jupiter: 3, // Cancer
            Venus: 11, // Pisces
            Saturn: 6 // Libra
        };

        const DEBILITATED = {
            Sun: 6,
            Moon: 8,
            Mars: 3,
            Mercury: 11,
            Jupiter: 9,
            Venus: 5,
            Saturn: 0
        };

        let score = 50; // base

        if (EXALTED[planet.name] === sign) score = 100;
        else if (DEBILITATED[planet.name] === sign) score = 10;

        return { score };
    }

    //--------------------------------------------------
    // 2. DIG BALA (Directional strength)
    //--------------------------------------------------
    digBala(planet) {

        let score = 50;

        // simplified classical mapping
        switch (planet.name) {

            case "Sun":
                // strongest in 10th house
                score = planet.house === 10 ? 100 : 60;
                break;

            case "Moon":
                score = planet.house === 4 ? 100 : 60;
                break;

            case "Mars":
                score = planet.house === 3 ? 100 : 60;
                break;

            case "Mercury":
                score = planet.house === 1 ? 100 : 60;
                break;

            case "Jupiter":
                score = planet.house === 5 ? 100 : 60;
                break;

            case "Venus":
                score = planet.house === 7 ? 100 : 60;
                break;

            case "Saturn":
                score = planet.house === 6 ? 100 : 60;
                break;

            default:
                score = 50;
        }

        return { score };
    }

    //--------------------------------------------------
    // 3. KALA BALA (Time strength - simplified)
    //--------------------------------------------------
    kalaBala(planet) {

        // retrograde bonus (if available from swiss ephemeris later)
        const isRetro = planet.retrograde === true;

        let score = 50;

        if (isRetro) score += 20;

        // Sun stronger in daytime (simple proxy)
        if (planet.name === "Sun") score += 20;

        // Moon stronger at night (not fully implemented yet)
        if (planet.name === "Moon") score += 20;

        return { score: Math.min(100, score) };
    }

    //--------------------------------------------------
    // 4. CHESHTA BALA (motion strength)
    //--------------------------------------------------
    cheshtaBala(planet) {

        let score = 50;

        // if fast-moving (Moon, Mercury)
        if (["Moon", "Mercury"].includes(planet.name)) {
            score = 80;
        }

        // slow planets (Saturn) lower dynamic strength
        if (planet.name === "Saturn") {
            score = 40;
        }

        // retrograde increases internal strength
        if (planet.retrograde) {
            score += 15;
        }

        return { score: Math.min(100, score) };
    }
}

export default new ShadbalaService();