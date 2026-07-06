/**
 * Kundali AI - Frontend Integration Engine
 * Mapped strictly to production base endpoint: https://kundali-ai.sundardumre.com
 * Powered by: Er. Sundar Dumre (2026)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Structural Safeguarded Bootstrapping
    initPlaygroundTabs();
    initPlaygroundForm();
    initThemeToggler();
    initBackToTop();
    initLiveStatsCounter();
});

/**
 * 1. Playground Navigation Tabs Component Code Logic
 */
function initPlaygroundTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Deactivate existing states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Toggle selected paths
            button.classList.add('active');
            const targetBlock = document.getElementById(targetTab);
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
        });
    });
}

/**
 * 2. API Request Payload Form Simulation Handler
 */
function initPlaygroundForm() {
    const playgroundForm = document.getElementById('api-playground-form');
    if (!playgroundForm) return;

    playgroundForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btnText = document.querySelector('.btn-text');
        const loader = document.querySelector('.loader-spinner');
        const jsonBlock = document.querySelector('#json-res pre code');

        // Render loader interface structure
        if (btnText && loader) {
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        }

        // Simulating standard Express REST processing calculations 
        setTimeout(() => {
            if (btnText && loader) {
                btnText.classList.remove('hidden');
                loader.classList.add('hidden');
            }

            // Extract values safely
            const dateVal = document.getElementById('play-date')?.value || '1999-07-30';
            const timeVal = document.getElementById('play-time')?.value || '10:12';
            const latVal = document.getElementById('play-lat')?.value || '27.7172';
            const lngVal = document.getElementById('play-lng')?.value || '85.3240';
            const tzVal = document.getElementById('play-tz')?.value || '5.75';

            // Update visible node objects properties with accurate inputs logging context
            if (jsonBlock) {
                jsonBlock.innerHTML = `{
  "status": "success",
  "endpoint_triggered": "https://kundali-ai.sundardumre.com/api/chart",
  "method": "POST",
  "data": {
    "ascendant": "Libra",
    "moon_sign": "Taurus",
    "sun_sign": "Cancer",
    "nakshatra": "Rohini",
    "input_parameters_logged": {
       "date": "${dateVal}",
       "time": "${timeVal}",
       "latitude": ${latVal},
       "longitude": ${lngVal},
       "timezone": ${tzVal}
    },
    "current_dasha": "Moon-Rahu-Saturn",
    "yogas_detected": ["Gajakesari Yoga", "Budhaditya Yoga"],
    "is_manglik": false,
    "engine_latency": "43.2ms",
    "caching": "REDIS_CLUSTER_HIT"
  }
}`;
            }

            alert('🔮 POST Request successfully compiled! Check output details on the JSON Output window tab.');
        }, 1100);
    });
}

/**
 * 3. LocalStorage Persistent Dark/Light Theme Switching Systems Rules
 */
function initThemeToggler() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    // Load active cached theme preference configurations profile parameters
    const cachedPreference = localStorage.getItem('kundali-theme-state') || 'dark-theme';
    document.body.className = cachedPreference;
    
    const icon = toggleBtn.querySelector('i');
    if (icon) {
        icon.className = cachedPreference === 'light-theme' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.className = 'light-theme';
            if (icon) icon.className = 'fas fa-sun';
            localStorage.setItem('kundali-theme-state', 'light-theme');
        } else {
            document.body.className = 'dark-theme';
            if (icon) icon.className = 'fas fa-moon';
            localStorage.setItem('kundali-theme-state', 'dark-theme');
        }
    });
}

/**
 * 4. Back To Top Floating Action Controllers Element Trigger
 */
function initBackToTop() {
    const bttElement = document.getElementById('back-to-top');
    if (!bttElement) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            bttElement.classList.add('visible');
        } else {
            bttElement.classList.remove('visible');
        }
    });

    bttElement.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * 5. High-Performance Intersection Observer Numbers Counter Engine
 */
function initLiveStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    const targetBounds = document.getElementById('status');
    if (!counters.length || !targetBounds) return;

    let processExecuted = false;

    const runIncrementalSteps = () => {
        counters.forEach(counter => {
            const finalValue = +counter.getAttribute('data-target');
            const activeValue = +counter.innerText.replace(/[^0-9.]/g, '');
            const jumpingDelta = finalValue / 35; // Numerical distribution mapping segments

            if (activeValue < finalValue) {
                if (finalValue % 1 === 0) {
                    counter.innerText = Math.ceil(activeValue + jumpingDelta) + (finalValue === 60 ? '+' : '');
                } else {
                    counter.innerText = (activeValue + jumpingDelta).toFixed(2) + '%';
                }
                setTimeout(runIncrementalSteps, 25);
            } else {
                // Formatting assignments correction guarantees upon final output states
                if (finalValue === 99.99) counter.innerText = '99.99%';
                else if (finalValue === 45) counter.innerText = '45ms';
                else if (finalValue === 60) counter.innerText = '60+';
            }
        });
    };

    // Utilizing optimized native browser viewport layout bounds processing engine checks
    const interactionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !processExecuted) {
            processExecuted = true;
            runIncrementalSteps();
            interactionObserver.disconnect();
        }
    }, { threshold: 0.15 });

    interactionObserver.observe(targetBounds);
}