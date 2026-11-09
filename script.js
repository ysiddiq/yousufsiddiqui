// ===============================
// 1. Dark mode toggle (remembers your choice)
// ===============================
const toggle = document.getElementById("theme-toggle");

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  if (toggle) toggle.textContent = dark ? "☀️" : "🌙";
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {}

setTheme(savedTheme === "dark");

if (toggle) {
  toggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    setTheme(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {}
  });
}

// ===============================
// 2. Nav bar gets a shadow once you scroll
// ===============================
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

// ===============================
// 3. Typing effect in the home page banner
//    Words come from the data-words attribute, separated by |
// ===============================
const typed = document.querySelector(".typed");

if (typed) {
  const words = typed.dataset.words.split("|");
  const textSpan = typed.querySelector(".text");
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = words[wordIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textSpan.textContent = word.substring(0, charIndex);

    let delay = deleting ? 40 : 90;

    if (!deleting && charIndex === word.length) {
      delay = 1800;          // pause on the full word
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

// ===============================
// 4. Fade cards in as they scroll into view
// ===============================
const revealItems = document.querySelectorAll(".card, .highlight, .contact-item, .quote");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);   // only animate once
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item, i) => {
  item.classList.add("reveal");
  item.style.transitionDelay = (i % 3) * 0.1 + "s";  // small stagger for side-by-side boxes
  observer.observe(item);
});

// ===============================
// 5. Footer year updates automatically
// ===============================
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
