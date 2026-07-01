class AspectService {

    /**
     * Main entry
     * Adds aspects to a chart (planets only for now)
     */
    addAspects(chart) {
        const planets = chart.planets.map(p => ({
            ...p,
            aspects: this.calculatePlanetAspects(p, chart.planets)
        }));

        return {
            ...chart,
            planets
        };
    }

    /**
     * Calculate all aspects from one planet to others
     */
    calculatePlanetAspects(sourcePlanet, allPlanets) {
        const aspects = [];

        for (const targetPlanet of allPlanets) {

            if (sourcePlanet.name === targetPlanet.name) continue;

            const aspect = this.getAspect(sourcePlanet, targetPlanet);

            if (aspect) {
                aspects.push({
                    planet: targetPlanet.name,
                    type: aspect.type,
                    strength: aspect.strength
                });
            }
        }

        return aspects;
    }

    /**
     * Determine aspect relationship
     */
    getAspect(p1, p2) {

        const diff = this.angleDiff(p1.longitude, p2.longitude);

        // 7th house aspect (180°)
        if (this.isWithin(diff, 180, 6)) {
            return {
                type: "7th aspect",
                strength: this.getStrength(diff, 180)
            };
        }

        // Mars special aspects: 4th (90°), 8th (240°)
        if (p1.name === "Mars") {
            if (this.isWithin(diff, 90, 6)) {
                return {
                    type: "4th aspect (Mars)",
                    strength: this.getStrength(diff, 90)
                };
            }

            if (this.isWithin(diff, 240, 6)) {
                return {
                    type: "8th aspect (Mars)",
                    strength: this.getStrength(diff, 240)
                };
            }
        }

        // Jupiter special aspects: 5th (120°), 9th (240°)
        if (p1.name === "Jupiter") {
            if (this.isWithin(diff, 120, 6)) {
                return {
                    type: "5th aspect (Jupiter)",
                    strength: this.getStrength(diff, 120)
                };
            }

            if (this.isWithin(diff, 240, 6)) {
                return {
                    type: "9th aspect (Jupiter)",
                    strength: this.getStrength(diff, 240)
                };
            }
        }

        // Saturn special aspects: 3rd (60°), 10th (300°)
        if (p1.name === "Saturn") {
            if (this.isWithin(diff, 60, 6)) {
                return {
                    type: "3rd aspect (Saturn)",
                    strength: this.getStrength(diff, 60)
                };
            }

            if (this.isWithin(diff, 300, 6)) {
                return {
                    type: "10th aspect (Saturn)",
                    strength: this.getStrength(diff, 300)
                };
            }
        }

        return null;
    }

    /**
     * Angular difference (0–360 normalized)
     */
    angleDiff(l1, l2) {
        const diff = Math.abs(l1 - l2) % 360;
        return diff > 180 ? 360 - diff : diff;
    }

    /**
     * Check if aspect is within orb
     */
    isWithin(actual, target, orb) {
        return Math.abs(actual - target) <= orb;
    }

    /**
     * Aspect strength (closer = stronger)
     */
    getStrength(actual, target) {
        const diff = Math.abs(actual - target);
        const maxOrb = 6;

        const strength = 100 - (diff / maxOrb) * 100;

        return Math.max(0, Math.round(strength));
    }
}

export default new AspectService();