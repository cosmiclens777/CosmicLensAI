import { getSign } from "../utils/zodiac.js";
import { getNakshatra } from "../utils/nakshatra.js";

class DivisionalService {


    getHouse(longitude, ascLongitude) {
        const diff = (longitude - ascLongitude + 360) % 360;
        return Math.floor(diff / 30) + 1;
    }

    VARGA_MAP = {
        1: "getD1",
        2: "getHora",
        3: "getDrekkana",
        4: "getChaturthamsa",
        7: "getSaptamsa",
        9: "getNavamsa",
        10: "getDasamsa",
        12: "getDwadasamsa",
        16: "getShodasamsa",
        20: "getVimsamsa",
        24: "getChaturvimsamsa",
        27: "getSaptavimsamsa",
        30: "getTrimsamsa",
        40: "getKhavedamsa",
        45: "getAkshavedamsa",
        60: "getShastiamsa"
    };

    getVarga(chart, d) {
        const method = this[`getD${d}`] || this[VARGA_MAP[d]];
        if (!method) throw new Error(`Unsupported D${d}`);
        return method.call(this, chart);
    }

    applyVargaRules(chart, result, division) {
        switch (division) {
            case 9:
                return this.applyD9Rules(result);
            default:
                return result;
        }
    }

    applyD9Rules(result) {
            const ascSign = result.ascendant.signNumber;

            result.planets = result.planets.map(planet => ({
                ...planet,
                house: this.getHouse(planet.signNumber, ascSign)
            }));

            return result;
        }
        /**
         * Generic divisional chart generator
         */
    generate(chart, division) {
        const ascendant = this.transformAscendant(chart.ascendant, division);

        const planets = chart.planets.map(planet =>
            this.transformPlanet(
                planet,
                division,
                ascendant.longitude
            )
        );

        return {
            ascendant,
            planets
        };
    }

    /**
     * Transform Ascendant
     */
    transformAscendant(ascendant, division) {

        const longitude =
            this.getDivisionLongitude(
                ascendant.longitude,
                division
            );

        return {

            ...ascendant,

            longitude,

            ...getSign(longitude),

            ...getNakshatra(longitude)

        };
    }

    /**
     * Transform Planet
     */
    transformPlanet(planet, division, ascLongitude) {

        const longitude =
            this.getDivisionLongitude(
                planet.longitude,
                division
            );

        const house =
            this.getHouse(longitude, ascLongitude);

        return {
            ...planet,
            longitude,
            house,
            ...getSign(longitude),
            ...getNakshatra(longitude)
        };
    }

    /**
     * Main dispatcher
     */
    getDivisionLongitude(longitude, division) {

            switch (division) {

                case 1:
                    return this.getD1(longitude);

                case 2:
                    return this.getHora(longitude);

                case 3:
                    return this.getDrekkana(longitude);

                case 4:
                    return this.getChaturthamsa(longitude);

                case 7:
                    return this.getSaptamsa(longitude);

                case 9:
                    return this.getNavamsa(longitude);

                case 10:
                    return this.getDasamsa(longitude);

                case 12:
                    return this.getDwadasamsa(longitude);

                case 16:
                    return this.getShodasamsa(longitude);

                case 20:
                    return this.getVimsamsa(longitude);

                case 24:
                    return this.getChaturvimsamsa(longitude);

                case 27:
                    return this.getSaptavimsamsa(longitude);

                case 30:
                    return this.getTrimsamsa(longitude);

                case 40:
                    return this.getKhavedamsa(longitude);

                case 45:
                    return this.getAkshavedamsa(longitude);

                case 60:
                    return this.getShastiamsa(longitude);

                default:
                    throw new Error(
                        `Unsupported division D${division}`
                    );

            }

        }
        //--------------------------------------------------
        // D1 (clean + reusable)
        //--------------------------------------------------
    getD1(chart) {
        const ascLongitude = chart.ascendant.longitude;

        return {
            ascendant: {
                ...chart.ascendant,
                house: 1,
            },
            planets: chart.planets.map(p => ({
                ...p,
                house: this.getHouse(p.longitude, ascLongitude),
            })),
        };
    }

    //--------------------------------------------------
    // UNIVERSAL D ENTRY POINT (FIXED)
    //--------------------------------------------------
    getD(chart, division) {

        // ✅ Special case: D1 (no transformation needed)
        if (division === 1) {
            return this.getD1(chart);
        }

        // ✅ All other divisional charts
        const result = this.generate(chart, division);

        return this.applyVargaRules(chart, result, division);
    }


    getHora(longitude) {

        longitude = this.normalize(longitude);

        const sign = Math.floor(longitude / 30);

        const degree = longitude % 30;

        const isOddSign = sign % 2 === 0;

        let horaSign;

        if (isOddSign) {

            // Aries, Gemini, Leo, Libra, Sagittarius, Aquarius

            horaSign = degree < 15 ? 4 : 3;

        } else {

            // Taurus, Cancer, Virgo, Scorpio, Capricorn, Pisces

            horaSign = degree < 15 ? 3 : 4;

        }

        // Stretch 15° to 30°
        const degreeInHora = (degree % 15) * 2;

        return this.normalize(
            horaSign * 30 + degreeInHora
        );

    }

    getDrekkana(longitude) {

        longitude = this.normalize(longitude);

        const sign = Math.floor(longitude / 30);

        const degree = longitude % 30;

        const drekkana = Math.floor(degree / 10);

        let d3Sign;

        switch (drekkana) {

            case 0:
                d3Sign = sign;
                break;

            case 1:
                d3Sign = (sign + 4) % 12; // 5th sign
                break;

            case 2:
                d3Sign = (sign + 8) % 12; // 9th sign
                break;

        }

        // Convert 10° section to 30°
        const degreeInDrekkana =
            (degree % 10) * 3;

        return this.normalize(
            d3Sign * 30 +
            degreeInDrekkana
        );

    }

    getChaturthamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 7.5;
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // Odd signs: Aries, Gemini, Leo, Libra, Sagittarius, Aquarius
        const isOddSign = signIndex % 2 === 0;

        // Chaturthamsa mapping (0-based index)
        const oddMap = [0, 3, 6, 9]; // same, 4th, 7th, 10th
        const evenMap = [0, 9, 6, 3]; // same, 10th, 7th, 4th

        const map = isOddSign ? oddMap : evenMap;

        const targetSignIndex = (signIndex + map[segmentIndex]) % SIGNS;

        // scale within segment (7.5° → 30°)
        const newDegreeInSign = offsetInSegment * 4;

        return targetSignIndex * 30 + newDegreeInSign;
    }
    getSaptamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 7; // ~4.285714°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // Odd signs: Aries, Gemini, Leo, Libra, Sagittarius, Aquarius
        const isOddSign = signIndex % 2 === 0;

        // D7 mapping pattern
        // Odd signs: start from same sign and move forward
        // Even signs: start from 7th sign and move backward
        let startOffset;

        if (isOddSign) {
            startOffset = 0;
        } else {
            startOffset = 6; // start from 7th sign (0-based)
        }

        const targetSignIndex =
            (signIndex + startOffset + segmentIndex) % SIGNS;

        // scale back to full sign space
        const newDegreeInSign = offsetInSegment * 7;

        return targetSignIndex * 30 + newDegreeInSign;
    }

    getNavamsa(longitude) {

        longitude = this.normalize(longitude);

        const sign = Math.floor(longitude / 30);

        const degreeInSign = longitude % 30;

        // Each Navamsa = 3°20'
        const part = 30 / 9;

        const navamsaIndex =
            Math.floor(degreeInSign / part);

        // Starting sign
        let startSign;

        // Movable
        if ([0, 3, 6, 9].includes(sign)) {

            startSign = sign;

        }

        // Fixed
        else if ([1, 4, 7, 10].includes(sign)) {

            startSign = (sign + 8) % 12;

        }

        // Dual
        else {

            startSign = (sign + 4) % 12;

        }

        const navamsaSign =
            (startSign + navamsaIndex) % 12;

        const offset =
            degreeInSign % part;

        const degreeInsideNavamsa =
            offset * 9;

        return this.normalize(
            navamsaSign * 30 +
            degreeInsideNavamsa
        );

    }

    getDasamsa(longitude) {
        const SIGNS = 12;

        // normalize
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 10; // 3°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // Odd signs: Aries, Gemini, Leo, Libra, Sagittarius, Aquarius
        const isOddSign = signIndex % 2 === 0;

        let startSign;

        if (isOddSign) {
            // natural forward zodiac flow
            startSign = signIndex;
        } else {
            // reverse-style shift (career challenges before rise)
            startSign = (signIndex + 8) % SIGNS;
            // 8 = symbolic shift toward Capricorn axis logic
        }

        const targetSignIndex = (startSign + segmentIndex) % SIGNS;

        // scale back to full 30° sign space
        const newDegreeInSign = offsetInSegment * 10;

        return targetSignIndex * 30 + newDegreeInSign;
    }

    getDwadasamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 12; // 2.5°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // D12 follows simple forward zodiac mapping
        const targetSignIndex = (signIndex + segmentIndex) % SIGNS;

        // scale back into full 30° sign space
        const newDegreeInSign = offsetInSegment * 12;

        return targetSignIndex * 30 + newDegreeInSign;
    }
    getShodasamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 16; // 1.875°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // Odd signs: Aries, Gemini, Leo, Libra, Sagittarius, Aquarius
        const isOddSign = signIndex % 2 === 0;

        let targetSignIndex;

        if (isOddSign) {
            // forward progression (comfort flows naturally)
            targetSignIndex = (signIndex + segmentIndex) % SIGNS;
        } else {
            // reverse progression (comfort achieved through correction)
            targetSignIndex = (signIndex - segmentIndex + SIGNS) % SIGNS;
        }

        // scale back to full 30° space
        const newDegreeInSign = offsetInSegment * 16;

        return targetSignIndex * 30 + newDegreeInSign;
    }

    getVimsamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 20; // 1.5°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // Odd signs: Aries, Gemini, Leo, Libra, Sagittarius, Aquarius
        const isOddSign = signIndex % 2 === 0;

        let baseShift;

        if (isOddSign) {
            baseShift = 0; // direct spiritual flow
        } else {
            baseShift = 6; // shifted karma axis (Capricorn-like discipline zone)
        }

        const targetSignIndex = (signIndex + baseShift + segmentIndex) % SIGNS;

        // scale back into full sign space
        const newDegreeInSign = offsetInSegment * 20;

        return targetSignIndex * 30 + newDegreeInSign;
    }

    getChaturvimsamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 24; // 1.25°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // Odd signs: Aries, Gemini, Leo, Libra, Sagittarius, Aquarius
        const isOddSign = signIndex % 2 === 0;

        let targetSignIndex;

        if (isOddSign) {
            // forward learning flow
            targetSignIndex = (signIndex + segmentIndex) % SIGNS;
        } else {
            // reverse learning flow (hard-earned knowledge)
            targetSignIndex = (signIndex - segmentIndex + SIGNS) % SIGNS;
        }

        // scale back into full 30° sign space
        const newDegreeInSign = offsetInSegment * 24;

        return targetSignIndex * 30 + newDegreeInSign;
    }

    getSaptavimsamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 27; // ~1.111111°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // Odd signs: Aries, Gemini, Leo, Libra, Sagittarius, Aquarius
        const isOddSign = signIndex % 2 === 0;

        let targetSignIndex;

        if (isOddSign) {
            // natural vitality flow
            targetSignIndex = (signIndex + segmentIndex) % SIGNS;
        } else {
            // resistance-based strength formation
            targetSignIndex = (signIndex - segmentIndex + SIGNS) % SIGNS;
        }

        // scale back into full sign space
        const newDegreeInSign = offsetInSegment * 27;

        return targetSignIndex * 30 + newDegreeInSign;
    }

    getTrimsamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 6; // 5 segments per sign
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        const isOddSign = signIndex % 2 === 0;

        // planetary-to-zodiac offset mapping (simplified engine model)
        const oddMap = [0, 6, 4, 2, 10]; // Mars, Saturn, Jupiter, Mercury, Venus
        const evenMap = [10, 6, 2, 4, 0]; // Venus, Saturn, Mercury, Jupiter, Mars

        const map = isOddSign ? oddMap : evenMap;

        const targetSignIndex = (signIndex + map[segmentIndex]) % SIGNS;

        // scale back into full sign space
        const newDegreeInSign = (offsetInSegment / segmentSize) * 30;

        return targetSignIndex * 30 + newDegreeInSign;
    }

    getKhavedamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 40; // 0.75°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        const isOddSign = signIndex % 2 === 0;

        // karmic lineage shift logic
        let baseShift;

        if (isOddSign) {
            // natural inheritance flow
            baseShift = 0;
        } else {
            // emotional/maternal distortion axis
            baseShift = 4; // Cancer-axis symbolic shift
        }

        const targetSignIndex = (signIndex + baseShift + segmentIndex) % SIGNS;

        // scale back into full 30° space
        const newDegreeInSign = offsetInSegment * 40;

        return targetSignIndex * 30 + newDegreeInSign;
    }
    getAkshavedamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 45; // 0.666666...
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        const isOddSign = signIndex % 2 === 0;

        let shift;

        if (isOddSign) {
            // stable behavioral flow
            shift = 0;
        } else {
            // slight distortion / conditioning shift
            shift = 3; // small karmic perturbation
        }

        const targetSignIndex = (signIndex + shift + segmentIndex) % SIGNS;

        // scale back into full sign space
        const newDegreeInSign = offsetInSegment * 45;

        return targetSignIndex * 30 + newDegreeInSign;
    }
    getShastiamsa(longitude) {
        const SIGNS = 12;

        // normalize 0–360
        longitude = ((longitude % 360) + 360) % 360;

        const signIndex = Math.floor(longitude / 30);
        const degreeInSign = longitude % 30;

        const segmentSize = 30 / 60; // 0.5°
        const segmentIndex = Math.floor(degreeInSign / segmentSize);
        const offsetInSegment = degreeInSign % segmentSize;

        // karmic 60-cycle base mapping wheel
        const d60Wheel = [
            0, 6, 3, 9, 2, 8, 1, 7, 4, 10, 5, 11
        ];

        const isOddSign = signIndex % 2 === 0;

        // base anchor shift
        const baseShift = isOddSign ? 0 : 4;

        // cycle position inside 60-step wheel
        const wheelIndex = segmentIndex % 12;

        const targetSignIndex =
            (signIndex + baseShift + d60Wheel[wheelIndex]) % SIGNS;

        // scale back into full sign space
        const newDegreeInSign = offsetInSegment * 60;

        return targetSignIndex * 30 + newDegreeInSign;
    }

    //--------------------------------------------------
    // Helper Methods
    //--------------------------------------------------

    normalize(angle) {

        return ((angle % 360) + 360) % 360;

    }

    getSignIndex(longitude) {

        return Math.floor(longitude / 30);

    }

    getDegreeInSign(longitude) {

        return longitude % 30;

    }

}

export default new DivisionalService();