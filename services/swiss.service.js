import { createRequire } from "module";

const require = createRequire(
    import.meta.url);

const swe = require("../native/build/Release/swe.node");

class SwissService {

    /**
     * Julian Day
     */
    julianDay(year, month, day, hour) {
        return swe.julianDay(
            year,
            month,
            day,
            hour
        );
    }

    /**
     * Planet Position
     */
    planet(jd, planetId) {
        return swe.calculatePlanet(
            jd,
            planetId
        );
    }

    /**
     * Houses + Ascendant
     */
    houses(
        jd,
        latitude,
        longitude,
        system = "P"
    ) {
        return swe.calculateHouses(
            jd,
            latitude,
            longitude,
            system,
            64 // SEFLG_SIDEREAL
        );
    }

}

export default new SwissService();