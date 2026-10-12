// ===== SMOOTH SCROLL =====
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== RESPONSIVE HAMBURGER MENU =====
const menuHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");
let menuTimer;

function setMenuOpen(open) {
  if (!menuHeader || !menuToggle) return;
  menuHeader.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
}

function scheduleMenu(open, delay) {
  window.clearTimeout(menuTimer);
  menuTimer = window.setTimeout(() => setMenuOpen(open), delay);
}

if (menuHeader && menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", () => {
    window.clearTimeout(menuTimer);
    setMenuOpen(!menuHeader.classList.contains("menu-open"));
  });

  // Brief hover delays keep the menu responsive without flickering.
  menuToggle.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse") scheduleMenu(true, 120);
  });
  menuToggle.addEventListener("pointerleave", event => {
    if (event.pointerType === "mouse" && !mainNavigation.matches(":hover")) scheduleMenu(false, 180);
  });
  mainNavigation.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse") window.clearTimeout(menuTimer);
  });
  mainNavigation.addEventListener("pointerleave", event => {
    if (event.pointerType === "mouse") scheduleMenu(false, 180);
  });

  // Touching the trigger opens it; any subsequent outside tap closes it.
  document.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch" && menuHeader.classList.contains("menu-open") &&
        !mainNavigation.contains(event.target) && !menuToggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });
  mainNavigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setMenuOpen(false);
  });
}

// ===== FAKE LIVE VITALS ANIMATION =====
function animateValue(id, min, max, speed) {
  const el = document.getElementById(id);
  if (!el) return;

  setInterval(() => {
    const value = (Math.random() * (max - min) + min).toFixed(0);
    el.innerText = value;
  }, speed);
}

animateValue("bpm-val", 65, 85, 2000);
animateValue("spo2-val", 95, 100, 2500);

setInterval(() => {
  const tempValue = document.getElementById("temp-val");
  if (!tempValue) return;
  const temp = (97 + Math.random() * 2).toFixed(1);
  tempValue.innerText = temp;
}, 3000);

// Keep the compact header out of the way while scrolling down.
const siteHeader = document.querySelector(".site-header");
let previousScrollY = window.scrollY;
let scrollUpdatePending = false;

window.addEventListener("scroll", () => {
  if (!siteHeader || scrollUpdatePending) return;

  scrollUpdatePending = true;
  window.requestAnimationFrame(() => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - previousScrollY;

    if (currentScrollY < 80 || scrollDelta < -6) {
      siteHeader.classList.remove("header-hidden");
    } else if (scrollDelta > 6 && currentScrollY > 120) {
      siteHeader.classList.add("header-hidden");
    }

    previousScrollY = currentScrollY;
    scrollUpdatePending = false;
  });
}, { passive: true });

// ===== SCROLL FADE-IN =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll("section").forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(20px)";
  section.style.transition = "0.6s ease";
  observer.observe(section);
});
