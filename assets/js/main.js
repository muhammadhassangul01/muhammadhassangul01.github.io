/* ==========================================================================
   Muhammad Hassan Gul — Portfolio interactions
   GSAP + ScrollTrigger + Lottie, all progressive-enhanced and safe.
   ========================================================================== */
(function () {
    "use strict";

    var doc = document;
    var root = doc.documentElement;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* ---------- Fallback: if GSAP fails to load, never hide content ---------- */
    function gsapFallback() {
        if (window.gsap) return;
        doc.querySelectorAll(".reveal").forEach(function (el) {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
        doc.querySelectorAll(".word > span").forEach(function (el) {
            el.style.transform = "translateY(0)";
        });
        doc.querySelectorAll(".availability, .hero-role, .hero-desc, .hero-cta, .hero-social, .profile-card, .float-chip, .hero .stat").forEach(function (el) {
            el.style.opacity = "1";
        });
        doc.querySelectorAll(".stat-num").forEach(function (el) {
            if (el.dataset.count) el.textContent = el.dataset.count + (el.dataset.suffix || "");
        });
    }
    setTimeout(gsapFallback, 3000);

    /* ---------- Helpers ---------- */
    function on(selector, type, handler, options) {
        doc.querySelectorAll(selector).forEach(function (el) {
            el.addEventListener(type, handler, options);
        });
    }

    /* ---------- Footer year + local time ---------- */
    doc.getElementById("year").textContent = new Date().getFullYear();
    var timeEl = doc.getElementById("footerTime");
    if (timeEl) {
        timeEl.textContent = "Local time: " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " PKT";
    }

    /* ---------- Theme toggle ---------- */
    doc.getElementById("themeToggle").addEventListener("click", function () {
        var dark = root.getAttribute("data-theme") === "dark";
        root.setAttribute("data-theme", dark ? "light" : "dark");
        localStorage.setItem("hg-theme", dark ? "light" : "dark");
    });

    /* ---------- Navigation scroll state ---------- */
    var nav = doc.getElementById("siteNav");
    var backTop = doc.getElementById("backTop");
    function onScrollUi() {
        var y = window.scrollY;
        nav.classList.toggle("scrolled", y > 12);
        backTop.style.opacity = y > 600 ? "1" : "0";
        backTop.style.pointerEvents = y > 600 ? "auto" : "none";
    }
    window.addEventListener("scroll", onScrollUi, { passive: true });
    onScrollUi();

    /* ---------- Mobile menu ---------- */
    var menuToggle = doc.getElementById("menuToggle");
    var mobileMenu = doc.getElementById("mobileMenu");
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

    /* ---------- Active nav link tracking ---------- */
    var navLinks = doc.querySelectorAll(".nav-link");
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(function (l) {
                    var match = l.getAttribute("href") === "#" + entry.target.id;
                    l.classList.toggle("active", match);
                    if (match) l.setAttribute("aria-current", "true");
                    else l.removeAttribute("aria-current");
                });
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home", "about", "skills", "experience", "projects", "faq", "contact"].forEach(function (id) {
        var el = doc.getElementById(id);
        if (el) observer.observe(el);
    });

    /* ---------- Custom cursor ---------- */
    if (finePointer) {
        var dot = doc.getElementById("cursorDot");
        var ring = doc.getElementById("cursorRing");
        var rx = -100, ry = -100, cx = -100, cy = -100, curVisible = false;
        function moveDot(x, y) {
            rx = x; ry = y;
            if (!curVisible) {
                curVisible = true;
                dot.style.opacity = "1";
                ring.style.opacity = "1";
            }
            dot.style.left = x + "px";
            dot.style.top = y + "px";
        }
        (function loop() {
            cx += (rx - cx) * 0.18;
            cy += (ry - cy) * 0.18;
            ring.style.left = cx + "px";
            ring.style.top = cy + "px";
            requestAnimationFrame(loop);
        })();
        window.addEventListener("mousemove", function (e) { moveDot(e.clientX, e.clientY); }, { passive: true });
        on("a, button, input, textarea, .project-card, .skill-group, .faq-q", "mouseenter", function () {
            ring.classList.add("is-active");
        });
        on("a, button, input, textarea, .project-card, .skill-group, .faq-q", "mouseleave", function () {
            ring.classList.remove("is-active");
        });
        doc.addEventListener("mouseleave", function () {
            curVisible = false;
            dot.style.opacity = "0";
            ring.style.opacity = "0";
        });
    }

    /* ---------- Typewriter ---------- */
    var roles = ["Computer Vision Engineer", "Deep Learning Engineer", "Computer Vision Engineer"];
    var tw = doc.getElementById("typewriter");
    var rIdx = 0, cIdx = 0, deleting = false;
    (function type() {
        var word = roles[rIdx];
        tw.textContent = word.slice(0, cIdx);
        var delay;
        if (!deleting) {
            if (cIdx < word.length) { cIdx++; delay = 70; }
            else { deleting = true; delay = 2200; }
        } else {
            if (cIdx > 0) { cIdx--; delay = 34; }
            else { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 380; }
        }
        setTimeout(type, delay);
    })();

    /* ---------- Progress bar ---------- */
    var bar = doc.getElementById("progressBar");
    function updateBar() {
        var h = doc.documentElement;
        var total = h.scrollHeight - h.clientHeight;
        bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();

    /* ---------- Hero name split into masked words ---------- */
    var heroName = doc.getElementById("heroName");
    var heroLines = heroName.innerHTML.split("<br>").map(function (s) { return s.trim(); });
    heroName.innerHTML = heroLines.map(function (line, li) {
        return line.split(/\s+/).map(function (w, wi) {
            var isLast = li === heroLines.length - 1 && wi === line.split(/\s+/).length - 1;
            return '<span class="word' + (isLast ? " hl" : "") + '"><span>' + w + "</span></span>";
        }).join(" ");
    }).join("<br>");
    heroName.style.display = "block";
    heroName.style.visibility = "visible";

    /* ---------- GSAP engine ---------- */
    if (window.gsap) {
        var hasST = !!window.ScrollTrigger;
        if (hasST) gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ ease: "power3.out", duration: 1 });

        if (!reducedMotion) {
            var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            tl.fromTo(".word > span", { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.07 })
              .fromTo(".availability", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.6")
              .fromTo(".hero-role", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
              .fromTo(".hero-desc", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.45")
              .fromTo(".hero-cta", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
              .fromTo(".hero-social", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
              .fromTo(".profile-card", { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }, "-=0.9")
              .fromTo(".float-chip", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)", stagger: 0.14 }, "-=0.7")
              .fromTo(".hero .stat", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.6");
        } else {
            gsap.set(".word > span", { yPercent: 0 });
            gsap.set([".availability", ".hero-role", ".hero-desc", ".hero-cta", ".hero-social",
                ".profile-card", ".float-chip", ".hero .stat"], { opacity: 1 });
        }

        /* Scroll reveals */
        gsap.utils.toArray(".reveal").forEach(function (el) {
            if (el._bound) return;
            el._bound = true;
            var cfg = { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" };
            if (hasST) cfg.scrollTrigger = { trigger: el, start: "top 88%", toggleActions: "play none none none" };
            gsap.to(el, cfg);
        });

        /* Skill bars */
        gsap.utils.toArray(".skill").forEach(function (skill) {
            var fill = skill.querySelector("i");
            var lvl = parseInt(skill.dataset.level, 10) || 0;
            var cfg = { width: lvl + "%", duration: 1.4, ease: "power3.inOut" };
            if (hasST) cfg.scrollTrigger = { trigger: skill, start: "top 90%" };
            gsap.to(fill, cfg);
        });

        /* Stat counters */
        doc.querySelectorAll(".stat-num").forEach(function (el) {
            var target = parseInt(el.dataset.count, 10) || 0;
            var suffix = el.dataset.suffix || "";
            var obj = { v: 0 };
            var cfg = {
                v: target, duration: 1.8, ease: "power1.out",
                onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; }
            };
            if (hasST) cfg.scrollTrigger = { trigger: el, start: "top 92%" };
            gsap.to(obj, cfg);
        });

        /* Subtle parallax */
        if (hasST) {
            gsap.to(".orb-1", { yPercent: 22, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
            gsap.to(".orb-2", { yPercent: -18, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
            gsap.to(".hero-visual", { y: 60, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
            gsap.to(".hero-content", { y: 30, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        }

        /* Profile tilt */
        if (finePointer && !reducedMotion) {
            var heroVisual = doc.querySelector(".hero-visual");
            heroVisual.addEventListener("mousemove", function (e) {
                var r = heroVisual.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                gsap.to(".profile-card", { rotationY: x * 10, rotationX: -y * 10, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
            });
            heroVisual.addEventListener("mouseleave", function () {
                gsap.to(".profile-card", { rotationX: 0, rotationY: 0, duration: 0.7, ease: "power3.out" });
            });
        }
    }

    /* ---------- Lottie hero orbit ---------- */
    var orbitEl = doc.getElementById("orbitCanvas");
    if (window.lottie && orbitEl) {
        fetch("assets/lottie/orbit.json")
            .then(function (r) { return r.json(); })
            .then(function (data) {
                window.lottie.loadAnimation({
                    container: orbitEl,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    animationData: data,
                    rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
                });
            })
            .catch(function () {});
    }

    /* ---------- FAQ accordion ---------- */
    doc.querySelectorAll(".faq-q").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var item = btn.parentElement;
            var answer = item.querySelector(".faq-a");
            var isOpen = item.classList.contains("open");
            doc.querySelectorAll(".faq-item.open").forEach(function (o) {
                if (o !== item) {
                    o.classList.remove("open");
                    o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
                    o.querySelector(".faq-a").style.maxHeight = null;
                }
            });
            item.classList.toggle("open", !isOpen);
            btn.setAttribute("aria-expanded", String(!isOpen));
            answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
        });
    });

    /* ---------- Contact form -> mailto ---------- */
    var form = doc.getElementById("contactForm");
    var note = doc.getElementById("formNote");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var subject = form.subject.value.trim() || "Project inquiry from your portfolio";
        var message = form.message.value.trim();
        var valid = true;
        form.querySelectorAll("[required]").forEach(function (f) {
            var bad = f.value.trim() === "";
            f.classList.toggle("invalid", bad);
            if (bad) valid = false;
        });
        if (!valid) {
            note.textContent = "Please fill in the required fields.";
            note.className = "form-note err";
            return;
        }
        var href = "mailto:muhammadhassangul01@gmail.com?subject=" +
            encodeURIComponent(subject) + "&body=" +
            encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
        note.textContent = "Opening your email app...";
        note.className = "form-note ok";
        window.location.href = href;
    });
    form.addEventListener("input", function (e) {
        if (e.target.classList.contains("invalid") && e.target.value.trim() !== "") {
            e.target.classList.remove("invalid");
        }
    });
})();
