export function formatDegree(longitude) {

    const absoluteDegree = longitude;

    const signDegreeFloat = longitude % 30;

    const degree = Math.floor(signDegreeFloat);

    const minuteFloat = (signDegreeFloat - degree) * 60;

    const minute = Math.floor(minuteFloat);

    const second = Math.round((minuteFloat - minute) * 60);

    return {
        absoluteDegree: absoluteDegree, // 0–360 (keep for backend)

        degreeInSign: signDegreeFloat, // 0–30 (IMPORTANT)

        degree: degree,
        minute: minute,
        second: second,

        formatted: `${degree}° ${minute}' ${second}"`
    };
}