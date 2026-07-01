export function normalizeLongitude(longitude) {
    return ((longitude % 360) + 360) % 360;
}