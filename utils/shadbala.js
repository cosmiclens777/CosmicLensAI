export function calculateShadbala(planet, house) {

    const NAISARGIKA = {
        Sun: 60,
        Moon: 51,
        Venus: 43,
        Jupiter: 34,
        Mercury: 26,
        Mars: 17,
        Saturn: 8
    };

    // ---------------------------
    // 1. Naisargika Bala
    // ---------------------------
    const natural = NAISARGIKA[planet.name] || 20;

    // ---------------------------
    // 2. Dig Bala
    // ---------------------------
    const dig = getDigbala(planet.name, house).digbala;

    // ---------------------------
    // 3. Sthana Bala (simple model)
    // ---------------------------
    const isOwnSign = planet.sign === planet.ownSign;
    const isExalted = planet.sign === planet.exaltation;

    let sthana = 0;

    if (isExalted) sthana = 60;
    else if (isOwnSign) sthana = 50;
    else sthana = 20;

    // ---------------------------
    // 4. Kala Bala (simple day/night logic)
    // ---------------------------
    const isDay = true; // you can plug sunrise logic later

    let kala = 30;
    if (planet.name === "Sun" && isDay) kala += 20;
    if (planet.name === "Moon" && !isDay) kala += 20;

    // ---------------------------
    // 5. Chesta Bala (motion)
    // ---------------------------
    let chesta = 20;
    if (planet.retrograde) chesta = 60;

    // ---------------------------
    // 6. Drik Bala (aspect strength placeholder)
    // ---------------------------
    let drik = planet.aspectScore || 20;

    // ---------------------------
    // TOTAL SHADBALA
    // ---------------------------
    const total =
        natural +
        dig +
        sthana +
        kala +
        chesta +
        drik;

    return {
        planet: planet.name,
        shadbala: total,
        breakdown: {
            natural,
            dig,
            sthana,
            kala,
            chesta,
            drik
        }
    };
}