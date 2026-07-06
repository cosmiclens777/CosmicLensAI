// ======================================
// KUNDALI AI LANDING PAGE
// app.js
// ======================================

// Current Year

const year = new Date().getFullYear();

const footer = document.querySelector("footer small");

if (footer) {
    footer.innerHTML = `© ${year} Kundali AI. All Rights Reserved.`;
}


// ======================================
// Navbar Shadow
// ======================================

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        nav.style.background = "rgba(5,8,22,.92)";
        nav.style.boxShadow = "0 10px 40px rgba(0,0,0,.45)";

    } else {

        nav.style.background = "rgba(12,17,33,.55)";
        nav.style.boxShadow = "none";

    }

});


// ======================================
// Scroll Reveal Animation
// ======================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll("section,.feature-card,.price-card,.doc-card,.stat,details")
.forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});


// ======================================
// Counter Animation
// ======================================

const counters = document.querySelectorAll(".stat h2");

counters.forEach(counter => {

    const target = counter.innerText;

    const number = parseFloat(target);

    if (isNaN(number)) return;

    let value = 0;

    const increment = number / 80;

    const suffix = target.replace(/[0-9.]/g, "");

    const timer = setInterval(() => {

        value += increment;

        if (value >= number) {

            value = number;

            clearInterval(timer);

        }

        counter.innerHTML = value.toFixed(
            number % 1 ? 2 : 0
        ) + suffix;

    }, 20);

});


// ======================================
// Mouse Glow
// ======================================

const glow = document.createElement("div");

glow.className = "cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});


// ======================================
// Floating Cards
// ======================================

document.querySelectorAll(".feature-card").forEach((card, i) => {

    card.animate([

        {
            transform: "translateY(0px)"
        },

        {
            transform: "translateY(-10px)"
        },

        {
            transform: "translateY(0px)"
        }

    ], {

        duration: 3000 + i * 250,

        iterations: Infinity

    });

});


// ======================================
// Copy API Example
// ======================================

const pre = document.querySelector("pre");

if (pre) {

    const btn = document.createElement("button");

    btn.innerText = "📋 Copy";

    btn.className = "copy-btn";

    pre.parentElement.prepend(btn);

    btn.onclick = () => {

        navigator.clipboard.writeText(pre.innerText);

        btn.innerText = "✅ Copied";

        setTimeout(() => {

            btn.innerText = "📋 Copy";

        }, 2000);

    }

}


// ======================================
// Smooth Anchor Scroll
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({

            behavior:"smooth"

        });

    });

});


// ======================================
// Console Message 😎
// ======================================

console.log("%c🚀 Kundali AI",
"font-size:30px;color:#8b5cf6;font-weight:bold;");

console.log("%cMade by Er. Sundar Dumre",
"font-size:18px;color:#60a5fa;");



/**
 * Kundali AI - Frontend Core Engine Architecture
 * Created by: Er. Sundar Dumre (2026)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Core Elements Initialization
    initPlaygroundTabs();
    initPlaygroundForm();
    initThemeToggler();
    initBackToTop();
    initLiveStatsCounter();
});

/**
 * 1. Interactive Playground Tab Switcher
 */
function initPlaygroundTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabButtons.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active classes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active classes to current selection
            button.classList.add('active');
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

/**
 * 2. API Playground Form Submission & Mock Simulation
 */
function initPlaygroundForm() {
    const playgroundForm = document.getElementById('api-playground-form');
    if (!playgroundForm) return;

    playgroundForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btnText = document.querySelector('.btn-text');
        const loader = document.querySelector('.loader-spinner');
        
        // Show Loading State
        if (btnText && loader) {
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        }

        // Simulating Real-time Node.js Express API Fetch Request
        setTimeout(() => {
            // Hide Loading State
            if (btnText && loader) {
                btnText.classList.remove('hidden');
                loader.classList.add('hidden');
            }
            
            // Update the JSON Block with customized mock response based on user input
            const dateVal = document.getElementById('play-date')?.value || '1999-07-30';
            const jsonOutputBlock = document.querySelector('#json-res pre code');
            
            if (jsonOutputBlock) {
                jsonOutputBlock.innerHTML = `{
  "status": "success",
  "data": {
    "ascendant": "Libra",
    "moon_sign": "Taurus",
    "sun_sign": "Cancer",
    "nakshatra": "Rohini",
    "input_date_logged": "${dateVal}",
    "current_dasha": "Moon-Rah-Sat",
    "yogas_detected": ["Gajakesari Yoga", "Budhaditya Yoga"],
    "is_manglik": false,
    "engine_latency": "41.2ms"
  }
}`;
            }

            alert('🔮 Cosmic Data Generated successfully! Check the JSON Response tab.');
        }, 1200); // 1.2 Seconds simulation latency
    });
}

/**
 * 3. Premium Dark / Light Mode Theme Transition Toggle
 */
function initThemeToggler() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (!themeToggleBtn) return;

    // Check for saved user preference, otherwise default to dark-theme
    const savedTheme = localStorage.getItem('kundali-theme') || 'dark-theme';
    document.body.className = savedTheme;
    
    // Update icon state upon load
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
        icon.className = savedTheme === 'light-theme' ? 'fas fa-sun' : 'fas fa-moon';
    }

    themeToggleBtn.addEventListener('click', () => {
        let currentTheme = 'dark-theme';
        
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            currentTheme = 'light-theme';
            if (icon) icon.className = 'fas fa-sun';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            currentTheme = 'dark-theme';
            if (icon) icon.className = 'fas fa-moon';
        }
        
        // Save user state permanently in localStorage
        localStorage.setItem('kundali-theme', currentTheme);
    });
}

/**
 * 4. Back To Top Floating Action Trigger Logic
 */
function initBackToTop() {
    const bttButton = document.getElementById('back-to-top');
    if (!bttButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            bttButton.classList.add('visible');
        } else {
            bttButton.classList.remove('visible');
        }
    });

    bttButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * 5. High-Performance Live Stats Counter Animation
 */
function initLiveStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    const statusSection = document.getElementById('status');
    if (!counters.length || !statusSection) return;

    let animated = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText.replace(/[^0-9.]/g, '');
            const increment = target / 40; // Split smooth steps

            if (current < target) {
                if (target % 1 === 0) {
                    counter.innerText = Math.ceil(current + increment) + 
                        (target >= 60 && counter.innerText.includes('+') || target === 60 ? '+' : '');
                } else {
                    counter.innerText = (current + increment).toFixed(2) + '%';
                }
                setTimeout(runCounters, 25);
            } else {
                // Ensure the final formatting is precise
                if (target === 99.99) counter.innerText = '99.99%';
                else if (target === 45) counter.innerText = '45ms';
                else if (target === 60) counter.innerText = '60+';
                else if (target === 10) counter.innerText = '10M+';
            }
        });
    };

    // Modern Intersection Observer API for performance optimizations
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            runCounters();
            observer.disconnect(); // Stop observing once triggered
        }
    }, { threshold: 0.2 });

    observer.observe(statusSection);
}