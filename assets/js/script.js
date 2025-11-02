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

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinksContainer.classList.toggle("active");
});

// Close mobile menu when clicking on a link (but not dropdown parent links)
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Don't close if it's a dropdown parent in mobile
    if (link.parentElement.classList.contains('dropdown') && window.innerWidth <= 768) {
      return;
    }
    navLinksContainer.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
    navLinksContainer.classList.remove("active");
    // Close all dropdowns
    dropdowns.forEach(dd => dd.classList.remove("active"));
  }
});

// Dropdown toggle for mobile
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const dropdownLink = dropdown.querySelector("a");
  
  dropdownLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation(); // Prevent the event from bubbling up
      
      // Close other dropdowns
      dropdowns.forEach(dd => {
        if (dd !== dropdown) dd.classList.remove("active");
      });
      
      // Toggle current dropdown
      dropdown.classList.toggle("active");
    }
  });
});

// Close navbar when clicking dropdown menu items
document.querySelectorAll(".dropdown-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    dropdowns.forEach(dd => dd.classList.remove("active"));
  });
});

// GSAP Tween stack Animation
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  // Animate home section elements
  tl.to(".home_section h1, .home_section p, .home_sec_btn", {
    duration: 1.4,
    autoAlpha: 1,
    y: 0,
    ease: "expo.inOut",
    stagger: 0.2,
  });
});

// --------------------About section------------------
// Make sure GSAP + SplitText + ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger, SplitText);

window.addEventListener("load", () => {
  // wait for full render
  document.querySelectorAll(".splitText").forEach((el) => {
    // Get the container width
    const container = el.closest(".container");
    const containerWidth = container.getBoundingClientRect().width;

    // Set paragraph width to container width
    el.style.width = containerWidth + "px";

    // Split text by lines
    const outerSplit = new SplitText(el, {
      type: "lines",
      linesClass: "split-line",
    });
    const innerSplit = new SplitText(outerSplit.lines, { type: "lines" });

    const tl = gsap
      .timeline({ paused: true })
      .set(outerSplit.lines, { overflow: "hidden" })
      .from(innerSplit.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.12,
        ease: "expo.out",
      });

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 20%",
      animation: tl,
      toggleActions: "play reverse play reverse",
    });

    // Optional: recalc on window resize
    window.addEventListener("resize", () => {
      const newWidth = container.getBoundingClientRect().width;
      el.style.width = newWidth + "px";
      outerSplit.revert();
      innerSplit.revert();
      // reinitialize
      const outerSplitNew = new SplitText(el, {
        type: "lines",
        linesClass: "split-line",
      });
      const innerSplitNew = new SplitText(outerSplitNew.lines, {
        type: "lines",
      });
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
    (char, i) => `<span style="transform:rotate(${i * 8.2}deg)">${char}</span>`
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

// ----------contact section-------------
document.getElementById("whatsappBtn").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value.trim();
  const whatsappNumber = "917656808372"; // your WhatsApp number without '+'
  // Simple email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  // Message to send
  const message = `Hello, this is ${email}. I would like to get in touch!`;
  // WhatsApp URL (works on mobile & desktop)
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  // Open WhatsApp chat
  window.open(whatsappURL, "_blank");
  // ✅ Clear input field after success
  emailInput.value = "";
});


// ------book a call --> Go to whatsapp-----
document.querySelectorAll(".book-call").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const whatsappNumber = "917656808372";
    const message = `Hello, I’d like to book a call to discuss my business requirements with your team. Please let me know a suitable time to connect.`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  });
});
 