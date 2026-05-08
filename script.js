const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const year = document.getElementById("year");
const sidebar = document.querySelector(".sidebar");
const backToTop = document.getElementById("backToTop");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (backToTop && sidebar) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    // Reset sidebar navigation scroll
    sidebar.scrollTop = 0;
    // Reset main content scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Ensure sidebar scroll is updated
    setTimeout(() => {
      sidebar.scrollTop = 0;
    }, 0);
  });
}

// Mobile menu toggle
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  
  // Close menu when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Close mobile menu when link is clicked
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks && window.innerWidth <= 660) {
      navLinks.classList.remove("open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

const setActiveLink = () => {
  let currentSection = sections[0] ? sections[0].getAttribute("id") : "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  if (currentSection === "home") {
    currentSection = "about";
  }

  navLinkItems.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);