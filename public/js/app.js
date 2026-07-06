// Documentation Database Matrix (Handles State Transitions)
const apiRoutesData = {
    birth: {
        title: "Foundational Birth Chart Sync",
        url: "https://kundali-ai.sundardumre.com.np/api/chart",
        description: "Generates comprehensive core structural coordinates, planetary longitudinal properties, and geometric houses (D1) for corporate user validation nodes.",
        business: "Commercial Scope: Matrimonial compatibility filtering & digital profile generation.",
        request: {
            type: "birth_chart",
            date: "1999-07-30",
            time: "10:12:00",
            latitude: 27.7172,
            longitude: 85.3240,
            timezone: 5.75
        },
        response: {
            status: "success",
            system: "Swiss-Ephemeris-Direct",
            data: {
                ascendant: { sign: "Virgo", degree: 14.23 },
                planets: {
                    Sun: { house: 11, nakshatra: "Pushya", degree: 12.45 },
                    Moon: { house: 5, nakshatra: "Shatabhisha", degree: 28.12 }
                }
            }
        }
    },
    panchang: {
        title: "Daily Dynamic Panchang Calculations",
        url: "https://kundali-ai.sundardumre.com.np/api/chart",
        description: "Computes deep computational real-time linear localized alignments covering Tithi, Nakshatra, Yoga, and Karana systems dynamically per clock thread.",
        business: "Commercial Scope: Localized dynamic calendar micro-widgets & high-traffic astro portals.",
        request: {
            type: "daily_panchang",
            date: "2026-07-06",
            latitude: 27.7172,
            longitude: 85.3240,
            timezone: 5.75
        },
        response: {
            status: "success",
            engine: "C++ Native Core",
            panchang: {
                tithi: { name: "Krishna Saptami", end_time: "22:14:00" },
                nakshatra: { name: "Ashwini", ruler: "Ketu" },
                rahukaal: { start: "07:12", end: "08:54" }
            }
        }
    },
    dasha: {
        title: "Chronological Dasha Chronology Alignment",
        url: "https://kundali-ai.sundardumre.com.np/api/chart",
        description: "Returns precise chronological multi-tiered matrices mapping standard Vimshottari cycles directly targeting customized retention triggers.",
        business: "Commercial Scope: User notification triggers during heavy cyclical astrological transitions.",
        request: {
            type: "vimshottari_dasha",
            date: "1985-11-20",
            time: "04:30:00",
            latitude: 22.5726,
            longitude: 88.3639,
            timezone: 5.5
        },
        response: {
            status: "success",
            current_dasha: {
                mahadasha: "Rahu",
                antardasha: "Jupiter",
                pratyantardasha: "Mercury",
                timeline_expiry: "2028-11-04"
            }
        }
    },
    ai: {
        title: "AI Synthesis Interpretation Pipelines",
        url: "https://kundali-ai.sundardumre.com.np/api/chart",
        description: "Streams computed ephemeris values directly into custom LLM parameter stacks to execute zero-delay natural text summaries.",
        business: "Commercial Scope: Scaled automated human counseling automation modules.",
        request: {
            type: "ai_interpretation",
            chart_id: "998231",
            depth: "comprehensive",
            language: "en"
        },
        response: {
            status: "success",
            generation_mode: "LLM-Context-Pipe",
            reading: "The planetary configuration indicates an intense concentration of mental faculties in the eleventh house, driving professional gains via analytical tech domains..."
        }
    }
};

// Event Handler Initializers
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-link");
    const routeTitle = document.getElementById("route-title");
    const routeUrl = document.getElementById("active-route-url");
    const routeDesc = document.getElementById("route-description");
    const bizBadge = document.querySelector(".biz-badge strong");
    const reqBox = document.getElementById("request-payload");
    const resBox = document.getElementById("response-payload");

    tabButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Remove previous focus state classes
            tabButtons.forEach(btn => btn.classList.remove("active"));
            
            // Activate current pointer targeting
            e.target.classList.add("active");
            
            const targetedKey = e.target.getAttribute("data-route");
            const routeData = apiRoutesData[targetedKey];

            if (routeData) {
                // Smoothly transit structural documentation content
                routeTitle.textContent = routeData.title;
                routeUrl.textContent = routeData.url;
                routeDesc.textContent = routeData.description;
                bizBadge.parentElement.innerHTML = `<strong>${routeData.business.split(":")[0]}:</strong>${routeData.business.split(":")[1]}`;
                
                // Stringify data formats cleanly inside viewports
                reqBox.textContent = JSON.stringify(routeData.request, null, 2);
                resBox.textContent = JSON.stringify(routeData.response, null, 2);
            }
        });
    });
});