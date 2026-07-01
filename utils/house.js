export function getHouse(longitude, cusps) {

    const normalized =
        ((longitude % 360) + 360) % 360;

    for (let i = 0; i < 12; i++) {

        const start = cusps[i];
        const end = cusps[(i + 1) % 12];

        // Normal house
        if (start < end) {
            if (normalized >= start && normalized < end) {
                return i + 1;
            }
        }

        // House crossing 360°
        else {
            if (
                normalized >= start ||
                normalized < end
            ) {
                return i + 1;
            }
        }
    }

    return 12;
}