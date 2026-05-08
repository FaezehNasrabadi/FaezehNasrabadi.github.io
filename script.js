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
if (navToggle && sidebar) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = sidebar.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  
  // Close menu when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 660) {
      if (sidebar && sidebar.classList.contains("open")) {
        if (!sidebar.contains(e.target) && !navToggle.contains(e.target)) {
          sidebar.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    }
  });
}

// Close mobile menu when link is clicked
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (sidebar && window.innerWidth <= 660) {
      sidebar.classList.remove("open");
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