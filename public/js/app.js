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
