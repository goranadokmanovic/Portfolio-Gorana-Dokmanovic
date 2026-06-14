// Mobile hamburger menu (CSS prikazuje dugme samo ispod 768px)
(function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("is-open");
    hamburger.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  function openMenu() {
    navLinks.classList.add("is-open");
    hamburger.classList.add("is-active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  }

  hamburger.addEventListener("click", () => {
    if (navLinks.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      closeMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });
})();

// Smooth scroll for CTA and nav buttons (if desired to reuse)
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = btn.getAttribute("data-scroll-to");
    if (!target) return;
    const el = document.querySelector(target);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.18,
};

const animateOnScroll = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      // Once visible, you can unobserve to avoid toggling
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

document.querySelectorAll(".section-observe").forEach((el) => observer.observe(el));
document.querySelectorAll(".section-observe-left").forEach((el) => observer.observe(el));
document.querySelectorAll(".section-observe-right").forEach((el) => observer.observe(el));
document.querySelectorAll(".float-up").forEach((el) => observer.observe(el));

// Particle background (subtle golden dots)
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width = window.innerWidth;
let height = window.innerHeight;
let lastTime = 0;

const particleConfig = {
  count: 80,
  maxRadius: 2.1,
  minRadius: 0.6,
  maxSpeed: 0.06,
};

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createParticles() {
  particles = [];
  for (let i = 0; i < particleConfig.count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius:
        particleConfig.minRadius +
        Math.random() * (particleConfig.maxRadius - particleConfig.minRadius),
      alpha: 0.25 + Math.random() * 0.65,
      speedX: (Math.random() - 0.5) * particleConfig.maxSpeed,
      speedY: (Math.random() - 0.5) * particleConfig.maxSpeed,
      drift: Math.random() * 0.03,
    });
  }
}

createParticles();

function updateParticles(delta) {
  const timeFactor = delta || 16;
  for (const p of particles) {
    p.x += p.speedX * timeFactor;
    p.y += p.speedY * timeFactor;

    // gentle vertical drift
    p.y -= p.drift * timeFactor;

    // wrap around edges for endless floating feel
    if (p.x < -20) p.x = width + 20;
    if (p.x > width + 20) p.x = -20;
    if (p.y < -20) p.y = height + 20;
    if (p.y > height + 20) p.y = -20;
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  // izbegni crtanje čestica direktno preko slike u "O meni"
  const photoEl = document.querySelector(".photo-frame");
  let excludeRect = null;
  const pad = 30;
  if (photoEl) {
    const r = photoEl.getBoundingClientRect();
    excludeRect = {
      left: r.left - pad,
      right: r.right + pad,
      top: r.top - pad,
      bottom: r.bottom + pad,
    };
  }

  for (const p of particles) {
    if (
      excludeRect &&
      p.x >= excludeRect.left &&
      p.x <= excludeRect.right &&
      p.y >= excludeRect.top &&
      p.y <= excludeRect.bottom
    ) {
      continue;
    }

    const gradient = ctx.createRadialGradient(
      p.x,
      p.y,
      0,
      p.x,
      p.y,
      p.radius * 4
    );
    gradient.addColorStop(0, `rgba(250, 233, 192, ${p.alpha})`);
    gradient.addColorStop(0.5, `rgba(201, 168, 76, ${p.alpha * 0.8})`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animateParticles(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  updateParticles(delta);
  drawParticles();

  requestAnimationFrame(animateParticles);
}

requestAnimationFrame(animateParticles);

// Simple parallax on scroll za hero i about sliku
const parallaxElements = [
  { selector: ".hero-content", factor: 0.07 },
];

function handleParallax() {
  const scrollY = window.scrollY || window.pageYOffset;
  parallaxElements.forEach(({ selector, factor }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const offset = scrollY * factor;
    el.style.transform = `translateY(${offset}px)`;
  });
}

window.addEventListener("scroll", handleParallax);

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// EmailJS contact form
(function () {
  emailjs.init("zdaAUQ4PdPaOYf5Vt");

  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  const msgEl = document.getElementById("form-message");
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  function t(key) {
    const lang = localStorage.getItem("mynestof4-lang") || "sr";
    return (translations[lang] && translations[lang][key]) || key;
  }

  function getAutoReplyParams(name) {
    const lang = localStorage.getItem("mynestof4-lang") || "sr";
    if (lang === "en") {
      return {
        reply_subject: "Thank you for your message — MyNestOf4",
        reply_body: "Hello " + name + ",\n\nThank you for reaching out!\n\nI’ve received your message and will get back to you as soon as possible.\n\nBest regards,",
      };
    }
    return {
      reply_subject: "Hvala na poruci — MyNestOf4",
      reply_body: "Zdravo " + name + ",\n\nHvala što si me kontaktirala/o!\n\nPrimila sam tvoju poruku i javiću ti se u najkraćem mogućem roku.\n\nSrdačan pozdrav,",
    };
  }

  function showMessage(text, isError) {
    msgEl.textContent = text;
    msgEl.className = "form-message " + (isError ? "form-message--error" : "form-message--success");
    msgEl.style.display = "block";
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    msgEl.style.display = "none";

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email) return;

    submitBtn.disabled = true;
    submitBtn.textContent = t("contact.sending");

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    const autoReply = getAutoReplyParams(name);
    const replyParams = Object.assign({}, templateParams, autoReply);

    emailjs
      .send("service_mymngpj", "template_9onp26e", templateParams)
      .then(() => {
        return emailjs.send("service_mymngpj", "template_91rffuw", replyParams);
      })
      .then(() => {
        showMessage(t("contact.success"), false);
        contactForm.reset();
      })
      .catch(() => {
        showMessage(t("contact.error"), true);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = t("contact.submit");
      });
  });
})();

// TODO_OPTIKA_URL — replace when Vercel demo is public
const TODO_OPTIKA_URL = "https://optika-kosovic-landing-3d-m48tjv7mv.vercel.app/";

const EXPECTED_PROJECT_IMAGES = [
  "images/projects/ssmm.png",
  "images/projects/optika.png",
  "images/projects/astro.png",
];

(function initProjects() {
  const optikaLink = document.getElementById("project-optika-link");
  if (optikaLink) optikaLink.href = TODO_OPTIKA_URL;

  function showPlaceholder(img) {
    img.hidden = true;
    const placeholder = img.nextElementSibling;
    if (placeholder?.classList.contains("project-card__placeholder")) {
      placeholder.hidden = false;
    }
  }

  document.querySelectorAll(".project-card__img").forEach((img) => {
    img.addEventListener("error", () => showPlaceholder(img));
    if (img.complete && img.naturalWidth === 0) {
      showPlaceholder(img);
    }
  });

  Promise.all(
    EXPECTED_PROJECT_IMAGES.map(
      (src) =>
        new Promise((resolve) => {
          const probe = new Image();
          probe.onload = () => resolve({ src, ok: true });
          probe.onerror = () => resolve({ src, ok: false });
          probe.src = src;
        })
    )
  ).then((results) => {
    const missing = results.filter((r) => !r.ok).map((r) => r.src);
    if (missing.length) {
      console.info("[Portfolio] Expected project images (missing):", missing);
    }
  });
})();

// Pouzdane putanje za slike sa razmakom u nazivu
const lineImg = document.querySelector(".decor-line-right img");
if (lineImg) lineImg.src = "images/zlatna%20linija.png";

// Logo je fiksiran u gornjem levom uglu (`position: fixed`) – bez JS pomeranja.

