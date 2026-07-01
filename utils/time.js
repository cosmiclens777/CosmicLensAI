export function localToUTC(date, time, timezone) {
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);

    // Convert everything into total minutes
    const totalLocalMinutes =
        hour * 60 + minute;

    const offsetMinutes = timezone * 60;

    const totalUTCMinutes =
        totalLocalMinutes - offsetMinutes;

    const utcHour = Math.floor(totalUTCMinutes / 60);
    const utcMinute = totalUTCMinutes % 60;

    // Create safe UTC date
    const utcDate = new Date(Date.UTC(year, month - 1, day));

    utcDate.setUTCHours(utcHour, utcMinute, 0, 0);

    return {
        year: utcDate.getUTCFullYear(),
        month: utcDate.getUTCMonth() + 1,
        day: utcDate.getUTCDate(),
        hour: utcDate.getUTCHours(),
        minute: utcDate.getUTCMinutes(),
        second: utcDate.getUTCSeconds()
    };
}