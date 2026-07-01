#include <napi.h>

extern "C" {
#include "swephexp.h"
}

static bool initialized = false;
static const char* EPHE_PATH = "D:\\kundali-ai\\server\\ephemeris";

//--------------------------------------------------
// Initialize Swiss Ephemeris
//--------------------------------------------------

void InitializeSwiss()
{
    if (initialized)
        return;

    swe_set_ephe_path((char*)EPHE_PATH);
    swe_set_sid_mode(SE_SIDM_LAHIRI, 0, 0);

    initialized = true;
}

//--------------------------------------------------
// Julian Day
//--------------------------------------------------

Napi::Number JulianDay(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    InitializeSwiss();

    if (info.Length() != 4)
    {
        Napi::TypeError::New(
            env,
            "Expected: year, month, day, hour"
        ).ThrowAsJavaScriptException();

        return Napi::Number::New(env, 0);
    }

    int year = info[0].As<Napi::Number>().Int32Value();
    int month = info[1].As<Napi::Number>().Int32Value();
    int day = info[2].As<Napi::Number>().Int32Value();
    double hour = info[3].As<Napi::Number>().DoubleValue();

    double jd = swe_julday(
        year,
        month,
        day,
        hour,
        SE_GREG_CAL
    );

    return Napi::Number::New(env, jd);
}

//--------------------------------------------------
// Planet Calculation
//--------------------------------------------------

Napi::Object CalculatePlanet(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    InitializeSwiss();

    if (info.Length() != 2)
    {
        Napi::TypeError::New(
            env,
            "Expected: julianDay, planetId"
        ).ThrowAsJavaScriptException();

        return Napi::Object::New(env);
    }

    double jd = info[0].As<Napi::Number>().DoubleValue();
    int planet = info[1].As<Napi::Number>().Int32Value();

    char serr[256] = {0};
    double xx[6];

    int ret = swe_calc_ut(
        jd,
        planet,
        SEFLG_SWIEPH |
        SEFLG_SPEED |
        SEFLG_SIDEREAL,
        xx,
        serr
    );

    if (ret < 0)
    {
        Napi::Error::New(env, serr)
            .ThrowAsJavaScriptException();

        return Napi::Object::New(env);
    }

    Napi::Object obj = Napi::Object::New(env);

    obj.Set("longitude", xx[0]);
    obj.Set("latitude", xx[1]);
    obj.Set("distance", xx[2]);
    obj.Set("speed", xx[3]);
    obj.Set("speedLatitude", xx[4]);
    obj.Set("speedDistance", xx[5]);

    return obj;
}

//--------------------------------------------------
// House Calculation
//--------------------------------------------------

Napi::Object CalculateHouses(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    InitializeSwiss();

    if (info.Length() != 5)
    {
        Napi::TypeError::New(
            env,
            "Expected: jd, latitude, longitude, houseSystem, flags"
        ).ThrowAsJavaScriptException();

        return Napi::Object::New(env);
    }

    double jd = info[0].As<Napi::Number>().DoubleValue();
    double latitude = info[1].As<Napi::Number>().DoubleValue();
    double longitude = info[2].As<Napi::Number>().DoubleValue();

    char houseSystem =
        info[3].As<Napi::String>().Utf8Value()[0];

    int flags = SEFLG_SIDEREAL;

    double cusps[13];
    double ascmc[10];

    int ret = swe_houses_ex(
        jd,
        flags,
        latitude,
        longitude,
        houseSystem,
        cusps,
        ascmc
    );

    if (ret == ERR)
    {
        Napi::Error::New(
            env,
            "House calculation failed"
        ).ThrowAsJavaScriptException();

        return Napi::Object::New(env);
    }

    Napi::Object result = Napi::Object::New(env);

    Napi::Array cuspArray = Napi::Array::New(env, 12);

    for (int i = 1; i <= 12; i++)
    {
        cuspArray.Set(i - 1, cusps[i]);
    }

    result.Set("cusps", cuspArray);

    result.Set("ascendant", ascmc[0]);
    result.Set("mc", ascmc[1]);
    result.Set("armc", ascmc[2]);
    result.Set("vertex", ascmc[3]);
    result.Set("equatorialAscendant", ascmc[4]);
    result.Set("coAscendantKoch", ascmc[5]);
    result.Set("coAscendantMunkasey", ascmc[6]);
    result.Set("polarAscendant", ascmc[7]);

    return result;
}

//--------------------------------------------------
// Module Exports
//--------------------------------------------------

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(
        "julianDay",
        Napi::Function::New(env, JulianDay)
    );

    exports.Set(
        "calculatePlanet",
        Napi::Function::New(env, CalculatePlanet)
    );

    exports.Set(
        "calculateHouses",
        Napi::Function::New(env, CalculateHouses)
    );

    return exports;
}

NODE_API_MODULE(swe, Init)