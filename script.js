// ===== SMOOTH SCROLL =====
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

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
