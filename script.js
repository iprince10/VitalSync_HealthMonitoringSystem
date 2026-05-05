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
  const temp = (97 + Math.random() * 2).toFixed(1);
  document.getElementById("temp-val").innerText = temp;
}, 3000);

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