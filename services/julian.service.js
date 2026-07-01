/**
 * Convert Gregorian Date & UTC time to Julian Day
 */

export function calculateJulianDay(
    year,
    month,
    day,
    hour,
    minute,
    second = 0
) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);

    const dayFraction =
        (hour + minute / 60 + second / 3600) / 24;

    const JD =
        Math.floor(365.25 * (year + 4716)) +
        Math.floor(30.6001 * (month + 1)) +
        day +
        B -
        1524.5 +
        dayFraction;

    return JD;
}