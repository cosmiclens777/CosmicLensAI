import swiss from "./swiss.service.js";

import { getSign } from "../utils/zodiac.js";
import { getNakshatra } from "../utils/nakshatra.js";
import { getHouse } from "../utils/house.js";
import { calculateKetu } from "../utils/ketu.js";

import {
    PLANETS,
    PLANET_NAMES
} from "../constants/planets.js";

class ChartService {

    getPlanet(jd, planetId, houseCusps) {

        const data = swiss.planet(jd, planetId);

        if (!data) {
            throw new Error(
                `Unable to calculate planet ${planetId}`
            );
        }

        return {

            id: planetId,

            name: PLANET_NAMES[planetId],

            longitude: Number(data.longitude),

            latitude: Number(data.latitude),

            distance: Number(data.distance),

            speed: Number(data.speed),

            retrograde: planetId === PLANETS.TRUE_NODE ?
                true :
                data.speed < 0,

            house: getHouse(
                data.longitude,
                houseCusps
            ),

            ...getSign(data.longitude),

            ...getNakshatra(data.longitude)

        };
    }

    getAscendant(houseData) {

        const longitude = Number(
            houseData.ascendant
        );

        return {

            id: -1,

            name: "Ascendant",

            longitude,

            house: 1,

            ...getSign(longitude),

            ...getNakshatra(longitude)

        };
    }

    getAllPlanets(jd, latitude, longitude) {

        const houseData = swiss.houses(
            jd,
            latitude,
            longitude,
            "P"
        );

        const houseCusps =
            houseData.cusps ||
            houseData.houses;

        if (!houseCusps) {
            throw new Error(
                "Native addon did not return house cusps."
            );
        }

        // -------------------------
        // Rahu
        // -------------------------

        const rahu = this.getPlanet(
            jd,
            PLANETS.TRUE_NODE,
            houseCusps
        );

        // -------------------------
        // Ketu
        // -------------------------

        const ketuLongitude =
            calculateKetu(rahu.longitude);

        const ketu = {

            id: PLANETS.KETU,

            name: "Ketu",

            longitude: ketuLongitude,

            latitude: 0,

            distance: rahu.distance,

            speed: -Math.abs(rahu.speed),

            retrograde: true,

            house: getHouse(
                ketuLongitude,
                houseCusps
            ),

            ...getSign(ketuLongitude),

            ...getNakshatra(ketuLongitude)

        };

        return {

            ascendant: this.getAscendant(
                houseData
            ),

            houses: houseData,

            planets: [

                this.getPlanet(
                    jd,
                    PLANETS.SUN,
                    houseCusps
                ),

                this.getPlanet(
                    jd,
                    PLANETS.MOON,
                    houseCusps
                ),

                this.getPlanet(
                    jd,
                    PLANETS.MERCURY,
                    houseCusps
                ),

                this.getPlanet(
                    jd,
                    PLANETS.VENUS,
                    houseCusps
                ),

                this.getPlanet(
                    jd,
                    PLANETS.MARS,
                    houseCusps
                ),

                this.getPlanet(
                    jd,
                    PLANETS.JUPITER,
                    houseCusps
                ),

                this.getPlanet(
                    jd,
                    PLANETS.SATURN,
                    houseCusps
                ),

                rahu,

                ketu

            ]

        };
    }

}

export default new ChartService();