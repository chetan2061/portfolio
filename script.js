// Loading Screen
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const progressFill = document.getElementById("progressFill");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      progressFill.style.width = "100%";
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 500);
      clearInterval(interval);
    } else {
      progressFill.style.width = progress + "%";
    }
  }, 100);
});
// day2
// Custom Cursor
const cursor = document.querySelector(".cursor");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();
// Matrix Background Effect
function createMatrix() {
  const matrix = document.getElementById("matrix");
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?";

  function createChar() {
    const char = document.createElement("div");
    char.className = "matrix-char";
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = Math.random() * window.innerWidth + "px";
    char.style.animationDuration = Math.random() * 3 + 2 + "s";
    matrix.appendChild(char);

    setTimeout(() => {
      if (char.parentNode) {
        char.parentNode.removeChild(char);
      }
    }, 5000);
  }

  setInterval(createChar, 100);
}
createMatrix();

// Particles.js Configuration
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#00ff41" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00ff41",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
  },
  retina_detect: true,
});

// Typed.js Configuration
const typed = new Typed("#typed-text", {
  strings: [
    "Cybersecurity Enthusiast",
    "Collaborative Developer",
    "Python Programmer",
    "Web Developer",
    "Unity Game Developer",
    "Seeking Internship",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
});

// Navigation
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Scroll navbar effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Smooth scrolling
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Close mobile menu
    navMenu.classList.remove("active");

    // Update active link
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Scroll spy
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section, .hero");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      const id = section.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Counter animations
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

// Skill progress animations
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width + "%";
    }, 500);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "about") {
        animateCounters();
      }
      if (entry.target.id === "skills") {
        animateSkills();
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// Terminal functionality
const terminalInput = document.getElementById("terminalInput");
const terminalContent = document.getElementById("terminalContent");

const commands = {
  help: "Available commands: whoami, skills, projects, contact, education, nmap, python, clear, github",
  whoami:
    "Chetan Singh - Cybersecurity Enthusiast & Collaborative Developer from Nepal",
  skills:
    "Python, JavaScript, PHP, C#, HTML/CSS, Kali Linux, Nmap, Wireshark, Unity Game Development",
  projects:
    "Weather App (PHP), Tic Tac Toe (Python), Ninja Parkour (Unity), Calculator (Team Project)",
  contact:
    "Email: chetansingh206111@gmail.com | Phone: +977-9706511171 | GitHub: chetan2061",
  education:
    "Currently pursuing Bachelor's in Computing at Herald College Kathmandu",
  nmap: "Network mapping tool - one of my favorite cybersecurity utilities!",
  python:
    "My go-to programming language for automation, games, and security tools",
  clear: "clear",
  github: "Check out my GitHub: github.com/chetan2061",
  ls: "cybersecurity-tools/  web-projects/  python-games/  unity-games/  resume.pdf",
  pwd: "/home/chetan/portfolio",
  internship:
    "Currently seeking internship opportunities in cybersecurity and web development!",
};

// Terminal command history
let commandHistory = [];
let historyIndex = -1;

terminalInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const command = e.target.value.trim().toLowerCase();
    const newLine = document.createElement("div");
    newLine.className = "terminal-line";

    // Save to history
    if (command && !commandHistory.includes(command)) {
      commandHistory.push(command);
      if (commandHistory.length > 50) {
        commandHistory.shift();
      }
    }
    historyIndex = -1;

    if (command === "clear") {
      terminalContent.innerHTML = `
                <div class="terminal-line">
                    <span class="terminal-prompt">chetan@kali:~$</span> <input type="text" class="terminal-input" id="terminalInput" placeholder="Try: help, nmap, python, projects">
                </div>
            `;
      document.getElementById("terminalInput").focus();
      return;
    }

    newLine.innerHTML = `<span class="terminal-prompt">chetan@kali:~$</span> ${command}`;
    terminalContent.insertBefore(newLine, terminalContent.lastChild);

    const response = document.createElement("div");
    response.className = "terminal-line";
    response.textContent =
      commands[command] ||
      `Command '${command}' not found. Type 'help' for available commands.`;
    terminalContent.insertBefore(response, terminalContent.lastChild);

    e.target.value = "";
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }
});
