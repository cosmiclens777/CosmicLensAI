import { ZODIAC } from "../constants/zodiac.js";

export function getSign(longitude) {
    const normalized =
        ((longitude % 360) + 360) % 360;

    const signIndex =
        Math.floor(normalized / 30);

    return {

        sign: ZODIAC[signIndex],

        signNumber: signIndex + 1,

        degreeInSign: normalized % 30

    };
}