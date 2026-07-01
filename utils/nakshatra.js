import { NAKSHATRAS } from "../constants/nakshatra.js";

const NAKSHATRA_SIZE = 360 / 27;
const PADA_SIZE = NAKSHATRA_SIZE / 4;

export function getNakshatra(longitude) {
    const normalized =
        ((longitude % 360) + 360) % 360;

    const index =
        Math.floor(
            normalized / NAKSHATRA_SIZE
        );

    const offset =
        normalized % NAKSHATRA_SIZE;

    const pada =
        Math.floor(offset / PADA_SIZE) + 1;

    return {

        nakshatra: NAKSHATRAS[index].name,

        nakshatraLord: NAKSHATRAS[index].lord,

        pada

    };
}