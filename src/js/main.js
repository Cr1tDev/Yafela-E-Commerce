import "./carousel.js";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navigation-links");
const contactBtn = document.querySelector(".contact-container");
const allsectoins = document.querySelectorAll(".section");
const maskedText = document.querySelectorAll(".mask-reveal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const contactEle = document.getElementById("contact-section");

// Btn mooth scrolling
btnScrollTo.addEventListener("click", () => {
  const conCoords = contactEle.getBoundingClientRect();
  console.log(conCoords);
  contactEle.scrollIntoView({ behavior: "smooth" });
});

// Animate Hamburger into X
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  contactBtn.classList.toggle("active");

  hamburger.classList.toggle("open");
});

// Pagenation Btn Scrolling
navLinks.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  if (!a.getAttribute("href").startsWith("#")) return;

  e.preventDefault();

  const section = a.getAttribute("href");
  document.querySelector(section).scrollIntoView({
    behavior: "smooth",
  });
});

// Revela section on scroll effect
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allsectoins.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Text Mask Reveal Animation
maskedText.forEach((el) => {
  const content = el.textContent;
  el.innerHTML = `<span>${content}</span>`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

maskedText.forEach((el) => observer.observe(el));
