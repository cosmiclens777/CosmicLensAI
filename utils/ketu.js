export function calculateKetu(rahuLongitude) {

    let longitude = rahuLongitude + 180;

    if (longitude >= 360) {
        longitude -= 360;
    }

    return longitude;
}