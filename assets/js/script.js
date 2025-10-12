// --------------------Navbar------------------

// Active navigation state management
const navLinks = document.querySelectorAll(".nav_links a");
const sections = document.querySelectorAll(".section");

// Function to update active nav link
function updateActiveNav() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Listen for scroll events
window.addEventListener("scroll", updateActiveNav);

// Mobile menu toggle functionality
const menuToggle = document.getElementById("menuToggle");
const navLinksContainer = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
    navLinksContainer.classList.remove("active");
  }
});

// Dropdown toggle for mobile
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle("active");
    }
  });
});

function updateNavbar() {
  const navbar = document.querySelector(".navbar_sec");
  const firstSectionHeight =
    document.querySelector(".home_section").offsetHeight;

  if (window.scrollY >= firstSectionHeight - 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}
// Run on scroll
window.addEventListener("scroll", updateNavbar);
// Run once when page loads
window.addEventListener("load", updateNavbar);

// --------------------Home section------------------
TweenMax.staggerFrom(
  ".home_section h1,.home_section p,.home_sec_btn",
  1.5,
  {
    opacity: 0,
    y: 30,
    ease: Expo.easeInOut,
    delay: 0,
  },
  0.2
);

// --------------------About section------------------
// Make sure GSAP + SplitText + ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger, SplitText);

window.addEventListener("load", () => { // wait for full render
  document.querySelectorAll(".splitText").forEach((el) => {
    // Get the container width
    const container = el.closest(".container");
    const containerWidth = container.getBoundingClientRect().width;

    // Set paragraph width to container width
    el.style.width = containerWidth + "px";

    // Split text by lines
    const outerSplit = new SplitText(el, { type: "lines", linesClass: "split-line" });
    const innerSplit = new SplitText(outerSplit.lines, { type: "lines" });

    const tl = gsap.timeline({ paused: true })
      .set(outerSplit.lines, { overflow: "hidden" })
      .from(innerSplit.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.12,
        ease: "expo.out"
      });

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 20%",
      animation: tl,
      toggleActions: "play reverse play reverse"
    });

    // Optional: recalc on window resize
    window.addEventListener("resize", () => {
      const newWidth = container.getBoundingClientRect().width;
      el.style.width = newWidth + "px";
      outerSplit.revert();
      innerSplit.revert();
      // reinitialize
      const outerSplitNew = new SplitText(el, { type: "lines", linesClass: "split-line" });
      const innerSplitNew = new SplitText(outerSplitNew.lines, { type: "lines" });
    });
  });
});


// for text circle spinning----
const text1 = document.querySelector(".about_section .text");
text1.innerHTML = text1.innerText
  .split("")
  .map(
    (char, i) => `<span style="transform:rotate(${i * 8.2}deg)">${char}</span>`
  )
  .join("");



// ------------------Philosphy Section------------------
// for text circle spinning----
const text2 = document.querySelector(".philosophy_section .text");
text2.innerHTML = text2.innerText
  .split("")
  .map(
    (char, i) => `<span style="transform:rotate(${i * 7.2}deg)">${char}</span>`
  )
  .join("");



// ------------------Accordian Section------------------

let elements = document.querySelectorAll(".fLink");
elements.forEach((element) => {
  let innerText = element.innerText;
  element.innerHTML = "";

  let textContainer = document.createElement("div");
  textContainer.classList.add("blocks");

  for (let letter of innerText) {
    let span = document.createElement("span");
    span.innerText = letter.trim() === "" ? "\xa0" : letter;
    span.classList.add("letter");
    textContainer.appendChild(span);
  }
  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true));
});
elements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.classList.remove("play");
  });
});