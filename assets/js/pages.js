/* ==========================================================================
   Muhammad Hassan Gul — SEO content pages interactions
   Lightweight: theme toggle, nav scroll state, mobile menu, footer year.
   Does not depend on GSAP/Lottie so content pages stay fast.
   ========================================================================== */
(function () {
    "use strict";
    var doc = document;
    var root = doc.documentElement;

    /* ---------- Theme toggle ---------- */
    var themeToggle = doc.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var dark = root.getAttribute("data-theme") === "dark";
            root.setAttribute("data-theme", dark ? "light" : "dark");
            localStorage.setItem("hg-theme", dark ? "light" : "dark");
        });
    }

    /* ---------- Footer year ---------- */
    var year = doc.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* ---------- Nav scroll state ---------- */
    var nav = doc.getElementById("siteNav");
    var backTop = doc.getElementById("backTop");
    function onScrollUi() {
        var y = window.scrollY;
        if (nav) nav.classList.toggle("scrolled", y > 12);
        if (backTop) {
            backTop.style.opacity = y > 600 ? "1" : "0";
            backTop.style.pointerEvents = y > 600 ? "auto" : "none";
        }
    }
    window.addEventListener("scroll", onScrollUi, { passive: true });
    onScrollUi();

    /* ---------- Mobile menu ---------- */
    var menuToggle = doc.getElementById("menuToggle");
    var mobileMenu = doc.getElementById("mobileMenu");
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            var open = mobileMenu.classList.toggle("open");
            menuToggle.classList.toggle("open", open);
            menuToggle.setAttribute("aria-expanded", String(open));
            mobileMenu.setAttribute("aria-hidden", String(!open));
        });
        mobileMenu.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () {
                mobileMenu.classList.remove("open");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
})();