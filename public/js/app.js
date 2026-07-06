
// ===================================================================
// DYNAMIC API DOCUMENTATION ROUTER & MOCK DATABASE METRIC STACKS
// ===================================================================

const ROUTE_DOCUMENTATION_DATABASE = {
    birth: {
        title: "Foundational Birth Chart Sync",
        url: `${SERVER_BACKEND_ENDPOINT}/api/v1/chart/birth`,
        scope: "Commercial Scope: System Profiling Engine",
        desc: "Computes the absolute planetary longitude alignments mapped directly through native C++ ephemeris computation routines at the exact coordinates of birth time matrices.",
        request: JSON.stringify({
            year: 2026,
            month: 7,
            day: 6,
            hours: 16,
            minutes: 11,
            coordinates: { latitude: 27.7172, longitude: 85.3240, timezone: 5.75 }
        }, null, 4),
        response: JSON.stringify({
            status: "success",
            latency: "42ms",
            data: {
                ascendant: { sign: "Virgo", degree: 14.238 },
                planets: { Sun: { sign: "Gemini", degree: 20.45 }, Moon: { sign: "Aries", degree: 3.12 } }
            }
        }, null, 4)
    },
    panchang: {
        title: "Daily Panchang Engine Node",
        url: `${SERVER_BACKEND_ENDPOINT}/api/v1/panchang/metrics`,
        scope: "Commercial Scope: Micro-Muhurta Temporal Tracking",
        desc: "Resolves fundamental cosmic daily attributes including Tithi, Nakshatra, Yoga, Karana, and specific tracking loops for localized Rahu Kaal anomalies.",
        request: JSON.stringify({
            date: "2026-07-06",
            latitude: 27.7172,
            longitude: 85.3240,
            timezone: 5.75
        }, null, 4),
        response: JSON.stringify({
            status: "success",
            metrics: {
                tithi: { name: "Krishna Saptami", end_time: "2026-07-06T22:15:00Z" },
                nakshatra: { name: "Ashwini", ruling_planet: "Ketu" }
            }
        }, null, 4)
    },
    dasha: {
        title: "Chronological Vimshottari Dasha Engine",
        url: `${SERVER_BACKEND_ENDPOINT}/api/v1/astrology/dasha-tree`,
        scope: "Commercial Scope: Chronological Life Metrics Monitoring",
        desc: "Generates highly granular, 120-year multi-nested planetary operational sequence timelines computed directly from precise lunar longitudes.",
        request: JSON.stringify({
            birth_moon_degree: 3.12,
            birth_nakshatra: "Ashwini",
            max_nested_level: 3
        }, null, 4),
        response: JSON.stringify({
            status: "success",
            mahadashas: [
                { planet: "Ketu", start: "2024-03-01", end: "2031-03-01", antardashas: [
                    { planet: "Ketu", start: "2024-03-01", end: "2024-07-28" }
                ]}
            ]
        }, null, 4)
    },
    ai: {
        title: "AI Interpretation Framework",
        url: `${SERVER_BACKEND_ENDPOINT}/api/v1/intelligence/interpret`,
        scope: "Commercial Scope: Dynamic Generative Synthesis Parsing",
        desc: "Pipes calculated mathematical chart parameters directly into contextual transformers to generate natural language interpretations.",
        request: JSON.stringify({
            planetary_positions: "Sun in Gemini, Moon in Aries",
            aspects: ["Mars square Saturn"],
            locale: "en"
        }, null, 4),
        response: JSON.stringify({
            status: "success",
            ai_synthesis: "The presence of the Moon in Aries brings a dynamic, proactive mindset, while the Sun in Gemini amplifies communication channels..."
        }, null, 4)
    }
};

// --- INITIALIZE DOCUMENTATION CONTROL EVENT STREAM ---
document.addEventListener("DOMContentLoaded", () => {
    initializeApiDocumentationRouter();
    mockFirebaseUserEnvironmentState();
});

function initializeApiDocumentationRouter() {
    const tabTriggers = document.querySelectorAll(".tab-link");
    
    // Set default initial rendering targets
    renderApiRouteDisplayPanel("birth");

    tabTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Remove previous active rendering configuration states
            tabTriggers.forEach(t => t.classList.remove("active"));
            
            // Activate clicked state target
            btn.classList.add("active");
            
            const targetRouteKey = btn.getAttribute("data-route");
            renderApiRouteDisplayPanel(targetRouteKey);
        });
    });
}

function renderApiRouteDisplayPanel(routeKey) {
    const dataNode = ROUTE_DOCUMENTATION_DATABASE[routeKey];
    if (!dataNode) return;

    // DOM Target Injection Points
    document.getElementById("active-route-url").textContent = dataNode.url;
    document.getElementById("route-title").textContent = dataNode.title;
    document.getElementById("route-description").textContent = dataNode.desc;
    document.getElementById("route-biz-scope").innerHTML = `<strong>Commercial Scope:</strong> ${dataNode.scope}`;
    document.getElementById("request-payload").textContent = dataNode.request;
    document.getElementById("response-payload").textContent = dataNode.response;
}

// -------------------------------------------------------------------
// FIREBASE AUTH DUMMY STATE WORKER FOR UI PREVIEW
// -------------------------------------------------------------------
function mockFirebaseUserEnvironmentState() {
    const tokenDisplay = document.getElementById("client-token-display");
    const userTag = document.getElementById("user-profile-tag");
    const navAuthBtn = document.getElementById("nav-auth-btn");

    // Mock verification check: standard production safety checks
    setTimeout(() => {
        if (tokenDisplay) {
            tokenDisplay.textContent = "sk_live_2026_cosmic_lens_sundar_dumre_9941x";
        }
        if (userTag && navAuthBtn) {
            userTag.innerHTML = `👋 Dev mode: <span style="color:#10b981; font-weight:700;">Er. Sundar Dumre</span>`;
            navAuthBtn.textContent = "Dashboard";
            navAuthBtn.href = "#dashboard";
        }
    }, 800);
}

// ===================================================================
// KUNDALI AI TRANSACTION & ELEMENT MANAGEMENT SYSTEM HUB
// ===================================================================

const STRIPE_PUBLISHABLE_KEY = "pk_test_YOUR_STRIPE_PUBLISHABLE_KEY";
const SERVER_BACKEND_ENDPOINT = "https://kundali-ai.sundardumre.com.np";

let stripeSdkInstance = null;
let activeStripeElements = null;
let checkoutSelectedTier = null;
let checkoutSelectedAmount = 0;

// Universal Initialization Thread Hook
document.addEventListener("DOMContentLoaded", () => {
    instantiateCorePaymentPlatforms();
});

function instantiateCorePaymentPlatforms() {
    // 1. Initializing Stripe Object with explicit logging fail-safes
    if (typeof Stripe !== 'undefined') {
        stripeSdkInstance = Stripe(STRIPE_PUBLISHABLE_KEY);
    } else {
        console.error("Stripe SDK Error: Cloud dependency script missed or blocked inside window layout.");
    }

    // 2. Map & Mount Multi-Channel Smart Targets across all tiers
    const configurationsTiersList = [
        { amt: 0, id: 'Sandbox' },
        { amt: 19, id: 'Production' },
        { amt: 99, id: 'Enterprise' }
    ];

    configurationsTiersList.forEach(tier => {
        mountStandalonePayPalButtons(tier.amt, tier.id);
        mountStripeExpressGooglePayButtons(tier.amt, tier.id);
    });
}

// -------------------------------------------------------------------
// STRUCTURAL TIERS ACCORDION INTERACTIVE ACTIONS
// -------------------------------------------------------------------
function handleTierSelectionToggle(tierId, cost) {
    const targetingCardId = `tier-card-${tierId}`;
    
    document.querySelectorAll('.price-card').forEach(card => {
        if (card.id !== targetingCardId) {
            card.classList.remove('active-checkout-layout');
        }
    });

    const activeCardNode = document.getElementById(targetingCardId);
    if (activeCardNode) {
        activeCardNode.classList.toggle('active-checkout-layout');
    }
}

// -------------------------------------------------------------------
// PAYPAL SMART CHECKOUT MOUNT SEQUENCE
// -------------------------------------------------------------------
function mountStandalonePayPalButtons(priceValue, tierName) {
    const containerTargetSelector = `#paypal-smart-button-${tierName}`;
    if (!document.querySelector(containerTargetSelector)) return;

    if (typeof paypal !== 'undefined') {
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'pay',
                height: 40
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: `Cosmic Lens AI Platform Subscription Tier: ${tierName}`,
                        amount: { currency_code: "USD", value: priceValue.toString() }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(transactionDetails) {
                    alert(`🚀 Settlement Captured! Thank you ${transactionDetails.payer.name.given_name}. Order Registered.`);
                    window.location.href = "/payment-success.html";
                });
            },
            onError: function(err) {
                console.error("PayPal Pipeline Exception Trace: ", err);
                alert("❌ Order creation rejected across PayPal international payment nodes.");
            }
        }).render(containerTargetSelector);
    } else {
        console.warn(`PayPal dependency asset deferred on tier ${tierName}`);
    }
}

// -------------------------------------------------------------------
// STRIPE EXPRESS GOOGLE PAY INTEGRATION MODULE
// -------------------------------------------------------------------
async function mountStripeExpressGooglePayButtons(priceValue, tierName) {
    if (!stripeSdkInstance || priceValue === 0) return; // Skip sandbox or empty instance pools

    const allocationNodeTarget = `#stripe-express-gpay-${tierName}`;
    const domElementRef = document.querySelector(allocationNodeTarget);
    if (!domElementRef) return;

    const nativePaymentRequestObject = stripeSdkInstance.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: { label: `Kundali AI - ${tierName} Activation`, amount: priceValue * 100 },
        requestPayerName: true,
        requestPayerEmail: true,
    });

    const dynamicElementsGroup = stripeSdkInstance.elements();
    const expressGpayButton = dynamicElementsGroup.create('paymentRequestButton', {
        paymentRequest: nativePaymentRequestObject,
        style: { paymentRequestButton: { theme: 'dark', height: '40px', type: 'buy' } }
    });

    // Hardware wallet availability handshake confirmation
    const localCompatibilityStatus = await nativePaymentRequestObject.canMakePayment();
    if (localCompatibilityStatus) {
        expressGpayButton.mount(allocationNodeTarget);
    } else {
        domElementRef.style.display = 'none'; // Clear target out if device environment limits are encountered
    }

    // Capture token trigger hooks upon confirmation matching
    nativePaymentRequestObject.on('paymentmethod', async (event) => {
        try {
            const resultFetch = await fetch(`${SERVER_BACKEND_ENDPOINT}/api/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: priceValue * 100, currency: "usd" })
            });
            const payloadIntent = await resultFetch.json();

            const { error: processingError, paymentIntent } = await stripeSdkInstance.confirmCardPayment(
                payloadIntent.clientSecret,
                { payment_method: event.paymentMethod.id },
                { handleActions: false }
            );

            if (processingError) {
                event.complete('fail');
                alert(`❌ Device Token Settlement Failed: ${processingError.message}`);
            } else {
                event.complete('success');
                if (paymentIntent.status === "succeeded") {
                    window.location.href = "/payment-success.html";
                }
            }
        } catch (serverExceptionErr) {
            event.complete('fail');
            console.error("Gateway Pipeline Link Broken: ", serverExceptionErr);
        }
    });
}

// -------------------------------------------------------------------
// STRIPE COMPREHENSIVE CARD MODAL CONTROLLER
// -------------------------------------------------------------------
async function openStripeModalOverlay(priceValue, tierName) {
    if (!stripeSdkInstance) {
        alert("🔒 Gateway Failure: Stripe library could not mount. Ensure secure HTTPS context.");
        return;
    }

    if (priceValue === 0) {
        alert("🪐 Sandbox Framework: Free instances require zero token ledger clearing.");
        return;
    }

    checkoutSelectedTier = tierName;
    checkoutSelectedAmount = priceValue;

    const overlayBackdropNode = document.getElementById("stripe-modal-backdrop");
    const operationalErrorDisplay = document.getElementById("stripe-runtime-error-box");
    const confirmSubmitButton = document.getElementById("stripe-submit-processing-btn");

    document.getElementById("stripe-modal-amount-text").textContent = `$${priceValue}`;
    overlayBackdropNode.style.display = "flex";
    operationalErrorDisplay.style.display = "none";
    confirmSubmitButton.disabled = true;

    try {
        const networkResponse = await fetch(`${SERVER_BACKEND_ENDPOINT}/api/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: priceValue * 100, currency: "usd" })
        });

        if (!networkResponse.ok) throw new Error("Transaction server endpoint threw an operational error exception.");
        const parsedPayload = await networkResponse.json();

        activeStripeElements = stripeSdkInstance.elements({
            clientSecret: parsedPayload.clientSecret,
            appearance: { theme: 'night', variables: { colorPrimary: '#8a5cf6', colorBackground: '#141026' } }
        });

        const billingFormPaymentElement = activeStripeElements.create("payment");
        billingFormPaymentElement.mount("#stripe-checkout-element");

        const billingLinkAuthenticationElement = activeStripeElements.create("linkAuthentication");
        billingLinkAuthenticationElement.mount("#stripe-link-authentication-element");

        billingFormPaymentElement.on('ready', () => {
            confirmSubmitButton.disabled = false;
        });

        // Wire explicit execution hook to the form capture actions directly inside runtime variables
        document.getElementById("stripe-payment-form").onsubmit = executeFinalStripePaymentPipeline;

    } catch (err) {
        console.error(err);
        operationalErrorDisplay.textContent = `Setup Node Failure: ${err.message}`;
        operationalErrorDisplay.style.display = "block";
    }
}

async function executeFinalStripePaymentPipeline(event) {
    event.preventDefault();
    if (!stripeSdkInstance || !activeStripeElements) return;

    const actionButton = document.getElementById("stripe-submit-processing-btn");
    const outputErrorField = document.getElementById("stripe-runtime-error-box");

    actionButton.disabled = true;
    actionButton.textContent = "Authorizing Ledger Transaction Mapping...";

    const { error: confirmationExecutionError } = await stripeSdkInstance.confirmPayment({
        elements: activeStripeElements,
        confirmParams: {
            return_url: `${window.location.origin}/payment-success.html`,
        },
    });

    if (confirmationExecutionError) {
        outputErrorField.textContent = confirmationExecutionError.message;
        outputErrorField.style.display = "block";
        actionButton.disabled = false;
        actionButton.textContent = "Confirm Transaction Settlement";
    }
}

function closeStripeModalOverlay() {
    document.getElementById("stripe-modal-backdrop").style.display = "none";
}

// -------------------------------------------------------------------
// REGIONAL CHANNELS WALLET METADATA HANDLERS
// -------------------------------------------------------------------
function executeLocalWalletChannel(vendorName, amount, planId) {
    alert(`💸 Local Ledger Route Active: Redirecting to secure ${vendorName.toUpperCase()} terminal loops for $${amount} processing on [Plan Node: ${planId}].`);
}