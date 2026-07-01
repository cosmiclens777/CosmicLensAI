houses(jd, latitude, longitude, system = "P") {
    return swe.calculateHouses(
        jd,
        latitude,
        longitude,
        system,
        0
    );
}