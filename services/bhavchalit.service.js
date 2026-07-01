import swiss from "./swiss.service.js";

import { getSign } from "../utils/zodiac.js";
import { getNakshatra } from "../utils/nakshatra.js";
import { getHouse } from "../utils/house.js";

import { calculateKetu } from "../utils/ketu.js";

import {
    PLANETS,
    PLANET_NAMES
} from "../constants/planets.js";

class BhavaChalitService {

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

            retrograde: data.speed < 0,

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

    getChart(jd, latitude, longitude) {

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

        const planets = [

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

            this.getPlanet(
                jd,
                PLANETS.TRUE_NODE,
                houseCusps
            )

        ];

        //-----------------------------
        // Add Ketu
        //-----------------------------

        const rahu = planets.find(
            p => p.id === PLANETS.TRUE_NODE
        );

        planets.push(

            calculateKetu(
                rahu,
                houseCusps
            )

        );

        return {

            ascendant: this.getAscendant(
                houseData
            ),

            houses: houseData,

            planets

        };

    }

}

export default new BhavaChalitService();