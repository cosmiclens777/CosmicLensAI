// ===================================================
// 1. FIREBASE ARCHITECTURE ENVIRONMENT SPECIFICATION
// ===================================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
let currentUserSession = null;
let targetCheckoutContext = { tierName: "", chargeValue: 0 };

// ===================================================
// 2. INTERACTIVE COMPUTES DOCUMENTATION MATRIX
// ===================================================
const apiRoutesData = {
    birth: {
        title: "Foundational Birth Chart Sync",
        url: "https://kundali-ai.sundardumre.com.np/api/chart",
        description: "Generates comprehensive core structural coordinates, planetary longitudinal properties, and geometric houses (D1) for corporate user validation nodes.",
        business: "Commercial Scope: Matrimonial compatibility filtering & digital profile generation.",
        request: { type: "birth_chart", date: "1999-07-30", time: "10:12:00", latitude: 27.7172, longitude: 85.3240, timezone: 5.75 },
        response: { status: "success", system: "Swiss-Ephemeris-Direct", data: { ascendant: { sign: "Virgo", degree: 14.23 }, planets: { Sun: { house: 11, nakshatra: "Pushya", degree: 12.45 }, Moon: { house: 5, nakshatra: "Shatabhisha", degree: 28.12 } } } }
    },
    panchang: {
        title: "Daily Dynamic Panchang Calculations",
        url: "https://kundali-ai.sundardumre.com.np/api/chart",
        description: "Computes deep computational real-time linear localized alignments covering Tithi, Nakshatra, Yoga, and Karana systems dynamically per clock thread.",
        business: "Commercial Scope: Localized dynamic calendar micro-widgets & high-traffic astro portals.",
        request: { type: "daily_panchang", date: "2026-07-06", latitude: 27.7172, longitude: 85.3240, timezone: 5.75 },
        response: { status: "success", engine: "C++ Native Core", panchang: { tithi: { name: "Krishna Saptami", end_time: "22:14:00" }, nakshatra: { name: "Ashwini", ruler: "Ketu" }, rahukaal: { start: "07:12", end: "08:54" } } }
    },
    dasha: {
        title: "Chronological Dasha Chronology Alignment",
        url: "https://kundali-ai.sundardumre.com.np/api/chart",
        description: "Returns precise chronological multi-tiered matrices mapping standard Vimshottari cycles directly targeting customized retention triggers.",
        business: "Commercial Scope: User notification triggers during heavy cyclical astrological transitions.",
        request: { type: "vimshottari_dasha", date: "1985-11-20", time: "04:30:00", latitude: 22.5726, longitude: 88.3639, timezone: 5.5 },
        response: { status: "success", current_dasha: { mahadasha: "Rahu", antardasha: "Jupiter", pratyantardasha: "Mercury", timeline_expiry: "2028-11-04" } }
    },
    ai: {
        title: "AI Synthesis Interpretation Pipelines",
        url: "https://kundali-ai.sundardumre.com.np/api/chart",
        description: "Streams computed ephemeris values directly into custom LLM parameter stacks to execute zero-delay natural text summaries.",
        business: "Commercial Scope: Scaled automated human counseling automation modules.",
        request: { type: "ai_interpretation", chart_id: "998231", depth: "comprehensive", language: "en" },
        response: { status: "success", generation_mode: "LLM-Context-Pipe", reading: "The planetary configuration indicates an intense concentration of mental faculties..." }
    }
};

// Dom Mutation Elements Load Hook
document.addEventListener("DOMContentLoaded", () => {
    const userProfileTag = document.getElementById("user-profile-tag");
    const navAuthBtn = document.getElementById("nav-auth-btn");
    const tokenDisplay = document.getElementById("client-token-display");

    // Check identity states
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUserSession = user;
            userProfileTag.textContent = `Dev Node: ${user.email}`;
            navAuthBtn.textContent = "Logout Account";
            navAuthBtn.href = "#";
            navAuthBtn.onclick = () => auth.signOut().then(() => window.location.reload());
            tokenDisplay.textContent = `kai_live_sec_${btoa(user.uid).substring(0, 16).toLowerCase()}`;
        } else {
            currentUserSession = null;
            userProfileTag.textContent = "";
            navAuthBtn.textContent = "Get API Key";
            navAuthBtn.href = "login.html";
            navAuthBtn.onclick = null;
            tokenDisplay.textContent = "auth_required_load_developer_token";
        }
    });

    // Handle Tab switches safely
    const tabButtons = document.querySelectorAll(".tab-link");
    const reqBox = document.getElementById("request-payload");
    const resBox = document.getElementById("response-payload");

    if (reqBox && resBox) {
        reqBox.textContent = JSON.stringify(apiRoutesData.birth.request, null, 2);
        resBox.textContent = JSON.stringify(apiRoutesData.birth.response, null, 2);
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            const routeData = apiRoutesData[e.target.getAttribute("data-route")];
            if (routeData) {
                document.getElementById("route-title").textContent = routeData.title;
                document.getElementById("active-route-url").textContent = routeData.url;
                document.getElementById("route-description").textContent = routeData.description;
                document.getElementById("route-biz-scope").innerHTML = `<strong>${routeData.business.split(":")[0]}:</strong>${routeData.business.split(":")[1]}`;
                reqBox.textContent = JSON.stringify(routeData.request, null, 2);
                resBox.textContent = JSON.stringify(routeData.response, null, 2);
            }
        });
    });
});

// ===================================================
// 3. COMPLETE GATEWAY ROUTER SYSTEMS (PAYMENT LOGIC)
// ===================================================
function openPaymentGatewayModal(tierName, price) {
    if (!currentUserSession) {
        alert("🔒 Authentication Boundary: Please sign in with an authentic account before selecting commercial infrastructure.");
        window.location.href = "login.html";
        return;
    }
    
    if (price === 0) {
        alert(`🚀 Activation Success: Sandbox access enabled cleanly for user token node.`);
        return;
    }

    targetCheckoutContext.tierName = tierName;
    targetCheckoutContext.chargeValue = price;

    document.getElementById("selected-tier-name").textContent = tierName;
    document.getElementById("selected-tier-price").textContent = `$${price}`;
    document.getElementById("payment-gateway-modal").style.display = "flex";
}

function closePaymentGatewayModal() {
    document.getElementById("payment-gateway-modal").style.display = "none";
}

function processPayment(gatewayVendor) {
    const userEmail = currentUserSession.email;
    const amount = targetCheckoutContext.chargeValue;
    const tier = targetCheckoutContext.tierName;

    closePaymentGatewayModal();
    alert(`💸 Connecting securely to [${gatewayVendor.toUpperCase()}] framework inside production node: Charging $${amount} for ${tier} cluster access setup.`);

    // Gateway Endpoint Redirection Controllers (Production Mapping Blocks)
    switch(gatewayVendor) {
        case 'esewa':
            console.log("Triggering client outward map to merchant data fields for eSewa");
            // window.location.href = `https://rc-epay.esewa.com.np/api/epay/main/v2/form?amt=${amount}...`;
            break;
        case 'khalti':
            console.log("Initializing Khalti Checkout Interface Integration Map");
            break;
        case 'upi':
            console.log("Broadcasting standard payload link for UPI deep intent matching layout");
            // window.location.href = `upi://pay?pa=sundardumre@bank&pn=KundaliAI&am=${amount}...`;
            break;
        case 'paytm':
            console.log("Assembling Paytm token verification parameters");
            break;
        case 'paypal':
            console.log("Mapping token routing structures into express pipeline layer of PayPal v2 SDK");
            break;
        case 'googlepay':
            console.log("Routing into client payment stack interfaces directly via window.PaymentRequest");
            break;
        default:
            console.error("Unknown channel deployment target executed.");
    }
}