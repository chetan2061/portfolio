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

// Terminal command history navigation
document.addEventListener("keydown", (e) => {
  const terminalInput = document.getElementById("terminalInput");
  if (document.activeElement === terminalInput) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value =
          commandHistory[commandHistory.length - 1 - historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value =
          commandHistory[commandHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        terminalInput.value = "";
      }
    }
  }
});

// Contact form
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Basic form validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 2) {
    alert("Name must be at least 2 characters long");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (subject.length < 5) {
    alert("Subject must be at least 5 characters long");
    return;
  }

  if (message.length < 10) {
    alert("Message must be at least 10 characters long");
    return;
  }

  // Simulate form submission
  const btn = contactForm.querySelector("button");
  const originalText = btn.textContent;
  btn.textContent = "Sending...";
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = "Message Sent!";
    btn.style.background = "var(--accent-green)";
    btn.style.color = "var(--primary-dark)";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = "";
      btn.style.color = "";
      contactForm.reset();
    }, 2000);
  }, 1500);
});

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Easter egg - Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode);
  konamiCode = konamiCode.slice(-konami.length);

  if (konamiCode.every((key, index) => key === konami[index])) {
    document.body.style.filter = "hue-rotate(180deg)";
    setTimeout(() => {
      document.body.style.filter = "";
      alert("🎉 Easter egg activated! Hidden developer mode unlocked!");
    }, 1000);
  }
});

// Project card hover effects
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) rotateX(5deg) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) scale(1)";
  });
});

// Interactive cursor effects for different elements
document.querySelectorAll("a, button, .project-card").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
    cursor.style.borderColor = "#00d4ff";
  });

  element.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursor.style.borderColor = "#00ff41";
  });
});

// Social media hover effects
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateY(-5px) scale(1.1)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translateY(0) scale(1)";
  });
});

// Advanced contact form validation
const formInputs = document.querySelectorAll(".form-input");
formInputs.forEach((input) => {
  input.addEventListener("blur", validateField);
  input.addEventListener("input", clearError);
});

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();

  let isValid = true;
  let errorMessage = "";

  switch (field.type) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;
    case "text":
      if (field.id === "name" && value.length < 2) {
        isValid = false;
        errorMessage = "Name must be at least 2 characters";
      }
      if (field.id === "subject" && value.length < 5) {
        isValid = false;
        errorMessage = "Subject must be at least 5 characters";
      }
      break;
  }

  if (field.tagName.toLowerCase() === "textarea" && value.length < 10) {
    isValid = false;
    errorMessage = "Message must be at least 10 characters";
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError(field);
  }

  return isValid;
}

function showFieldError(field, message) {
  clearFieldError(field);
  field.style.borderColor = "#ff0040";

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.style.color = "#ff0040";
  errorDiv.style.fontSize = "0.8rem";
  errorDiv.style.marginTop = "0.25rem";
  errorDiv.textContent = message;

  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  const errorDiv = field.parentNode.querySelector(".field-error");
  if (errorDiv) {
    errorDiv.remove();
  }
  field.style.borderColor = "#00ff41";
}

function clearError(e) {
  clearFieldError(e.target);
}

// Performance optimization - throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const throttledScroll = throttle(() => {
  // Additional scroll-based effects can be added here
}, 16);

window.addEventListener("scroll", throttledScroll);

// Glitch effect on scroll for logo
const glitchElements = document.querySelectorAll(".glitch");
let glitchTimer;

window.addEventListener("scroll", () => {
  clearTimeout(glitchTimer);
  glitchTimer = setTimeout(() => {
    glitchElements.forEach((el) => {
      if (Math.random() < 0.05) {
        // 5% chance
        el.style.animation = "glitch 0.3s";
        setTimeout(() => {
          el.style.animation = "";
        }, 300);
      }
    });
  }, 100);
});

// Security-themed console messages
function displaySecurityMessages() {
  const messages = [
    "Initializing security protocols...",
    "Scanning for vulnerabilities...",
    "Firewall status: ACTIVE",
    "Encryption algorithms loaded",
    "Network topology mapped",
    "Intrusion detection system: RUNNING",
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index < messages.length) {
      console.log(
        `%c[SECURITY] ${messages[index]}`,
        "color: #00ff41; font-weight: bold;"
      );
      index++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

// Initialize security messages after page load
setTimeout(displaySecurityMessages, 2000);

// Dynamic particle intensity based on scroll
let particleIntensity = 80;
window.addEventListener("scroll", () => {
  const scrollPercent =
    window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight);
  const newIntensity = Math.floor(80 + scrollPercent * 20);

  if (Math.abs(newIntensity - particleIntensity) > 5) {
    particleIntensity = newIntensity;
    // Particle intensity could be updated here if particles.js instance was accessible
  }
});

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// Initialize all animations and effects
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, index * 200);
  });

  // Initialize terminal focus
  setTimeout(() => {
    const terminalInput = document.getElementById("terminalInput");
    if (terminalInput) {
      terminalInput.focus();
    }
  }, 1000);
});

// Error handling
window.addEventListener("error", (e) => {
  console.error("Portfolio error:", e.error);
});

// Performance monitoring
if ("PerformanceObserver" in window) {
  const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === "navigation") {
        console.log(
          `%cPage load time: ${Math.round(
            entry.loadEventEnd - entry.loadEventStart
          )}ms`,
          "color: #00d4ff;"
        );
      }
    });
  });

  performanceObserver.observe({ entryTypes: ["navigation"] });
}

// Security check for HTTPS
if (window.location.protocol === "https:") {
  console.log(
    "%c🛡️ Secure connection detected",
    "color: #00ff41; font-weight: bold;"
  );
} else {
  console.warn(
    "%c⚠️ Insecure connection detected!",
    "color: #ff0040; font-weight: bold;"
  );
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "%c██████╗██╗  ██╗███████╗████████╗ █████╗ ███╗   ██╗    ███████╗██╗███╗   ██╗ ██████╗ ██╗  ██╗",
    "color: #00ff41; font-family: monospace; font-size: 10px;"
  );
  console.log(
    "%c██╔════╝██║  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║    ██╔════╝██║████╗  ██║██╔════╝ ██║  ██║",
    "color: #00ff41; font-family: monospace; font-size: 10px;"
  );
  console.log(
    "%c██║     ███████║█████╗     ██║   ███████║██╔██╗ ██║    ███████╗██║██╔██╗ ██║██║  ███╗███████║",
    "color: #00ff41; font-family: monospace; font-size: 10px;"
  );
  console.log(
    "%c██║     ██╔══██║██╔══╝     ██║   ██╔══██║██║╚██╗██║    ╚════██║██║██║╚██╗██║██║   ██║██╔══██║",
    "color: #00ff41; font-family: monospace; font-size: 10px;"
  );
  console.log(
    "%c╚██████╗██║  ██║███████╗   ██║   ██║  ██║██║ ╚████║    ███████║██║██║ ╚████║╚██████╔╝██║  ██║",
    "color: #00ff41; font-family: monospace; font-size: 10px;"
  );
  console.log(
    "%c ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝    ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝",
    "color: #00ff41; font-family: monospace; font-size: 10px;"
  );
  console.log(
    "%cCybersecurity Enthusiast & Collaborative Developer",
    "color: #00d4ff; font-weight: bold; font-size: 14px;"
  );
  console.log(
    '%cPortfolio loaded successfully! Try typing "help" in the terminal.',
    "color: #b0b0b0; font-size: 12px;"
  );
  console.log(
    "%cLooking for internship opportunities in cybersecurity and web development!",
    "color: #00ff41; font-weight: bold; font-size: 12px;"
  );
});

// Additional cybersecurity-themed easter eggs
document.addEventListener("keydown", (e) => {
  // Ctrl+Shift+I (Developer tools shortcut)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    console.log(
      "%c🔍 Developer tools detected! Welcome, fellow developer!",
      "color: #00ff41; font-size: 16px; font-weight: bold;"
    );
    console.log(
      "%c💡 Tip: Try the terminal commands in the Skills section!",
      "color: #00d4ff;"
    );
  }

  // F12 (Another dev tools shortcut)
  if (e.keyCode === 123) {
    console.log(
      "%c🛠️ Inspecting the code? I like your curiosity!",
      "color: #00ff41; font-weight: bold;"
    );
  }
});

// Simulate network activity for cybersecurity theme
function simulateNetworkActivity() {
  const activities = [
    "Port scan completed on 192.168.1.0/24",
    "SSL certificate validated",
    "Vulnerability assessment in progress...",
    "Firewall rules updated",
    "Intrusion attempt blocked",
    "Security logs analyzed",
    "Network traffic monitored",
  ];

  setInterval(() => {
    if (Math.random() < 0.3) {
      // 30% chance every 5 seconds
      const activity =
        activities[Math.floor(Math.random() * activities.length)];
      console.log(
        `%c[NETWORK] ${activity}`,
        "color: #00d4ff; font-size: 11px;"
      );
    }
  }, 5000);
}

// Start network simulation
setTimeout(simulateNetworkActivity, 3000);
