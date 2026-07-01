export default class Chart {
    constructor(data) {
        this.date = data.date;
        this.time = data.time;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.timezone = data.timezone;
        this.ayanamsa = data.ayanamsa || "lahiri";
    }
}