const slides = [...document.querySelectorAll("[data-slide]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const nav = document.querySelector(".topbar nav");
const navLinks = [...document.querySelectorAll(".topbar nav a")];
const menuToggle = document.querySelector(".menu-toggle");
const presentationToggle = document.querySelector(".presentation-toggle");
const presentationStatus = document.querySelector(".presentation-status");
const currentSlideLabel = document.querySelector("[data-current-slide]");
const totalSlidesLabel = document.querySelector("[data-total-slides]");
const progressBar = document.querySelector(".reading-progress i");
const backTop = document.querySelector(".back-top");
const modal = document.querySelector("#decision-modal");
const modalPanel = modal?.querySelector(".modal-panel");
const modalOpenButton = document.querySelector(".decision-open");
const modalCloseButtons = [...document.querySelectorAll("[data-modal-close]")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let presentationIndex = 0;
let presentationLocked = false;
let lastFocusedElement = null;
let touchStartY = null;

const formatSlide = (value) => String(value + 1).padStart(2, "0");

slides.forEach((slide, index) => {
  const number = document.createElement("span");
  number.className = "slide-number";
  number.textContent = `${formatSlide(index)} / ${String(slides.length).padStart(2, "0")}`;
  slide.append(number);
});

totalSlidesLabel.textContent = String(slides.length).padStart(2, "0");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
);

revealItems.forEach((item) => revealObserver.observe(item));

const updateScrollProgress = () => {
  if (document.body.classList.contains("presentation-mode")) {
    const progress = ((presentationIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  backTop.classList.toggle("visible", window.scrollY > 700);
};

const setActiveNav = (navId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${navId}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveNav(visible.target.dataset.nav);
  },
  { threshold: [0.25, 0.5, 0.7], rootMargin: "-20% 0px -45% 0px" },
);

slides.forEach((slide) => sectionObserver.observe(slide));

const closeMenu = () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    closeMenu();
    if (!document.body.classList.contains("presentation-mode")) return;

    event.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    const targetIndex = slides.indexOf(target);
    if (targetIndex >= 0) showPresentationSlide(targetIndex);
  });
});

const showPresentationSlide = (nextIndex) => {
  presentationIndex = Math.min(slides.length - 1, Math.max(0, nextIndex));
  slides.forEach((slide, index) => {
    const isActive = index === presentationIndex;
    slide.classList.toggle("presentation-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });
  currentSlideLabel.textContent = formatSlide(presentationIndex);
  setActiveNav(slides[presentationIndex].dataset.nav);
  updateScrollProgress();
  slides[presentationIndex].scrollTop = 0;
};

const nearestSlideIndex = () => {
  const midpoint = window.innerHeight / 2;
  let nearest = 0;
  let distance = Infinity;

  slides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    const currentDistance = Math.abs(rect.top + rect.height / 2 - midpoint);
    if (currentDistance < distance) {
      distance = currentDistance;
      nearest = index;
    }
  });
  return nearest;
};

const enterPresentation = () => {
  presentationIndex = nearestSlideIndex();
  document.body.classList.add("presentation-mode");
  presentationToggle.setAttribute("aria-pressed", "true");
  presentationToggle.setAttribute("aria-label", "Sair do modo apresentação");
  presentationToggle.querySelector("span").textContent = "Sair";
  presentationStatus.style.display = "flex";
  closeMenu();
  showPresentationSlide(presentationIndex);
};

const exitPresentation = () => {
  const activeSlide = slides[presentationIndex];
  document.body.classList.remove("presentation-mode");
  presentationToggle.setAttribute("aria-pressed", "false");
  presentationToggle.setAttribute("aria-label", "Ativar modo apresentação");
  presentationToggle.querySelector("span").textContent = "Apresentar";
  presentationStatus.style.removeProperty("display");
  slides.forEach((slide) => {
    slide.classList.remove("presentation-active");
    slide.removeAttribute("aria-hidden");
  });
  activeSlide.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
  updateScrollProgress();
};

const navigatePresentation = (direction) => {
  if (presentationLocked) return;
  const next = presentationIndex + direction;
  if (next < 0 || next >= slides.length) return;

  presentationLocked = true;
  showPresentationSlide(next);
  window.setTimeout(() => {
    presentationLocked = false;
  }, 480);
};

presentationToggle.addEventListener("click", () => {
  if (document.body.classList.contains("presentation-mode")) exitPresentation();
  else enterPresentation();
});

document.addEventListener("keydown", (event) => {
  if (modal && !modal.hidden) return;
  if (!document.body.classList.contains("presentation-mode")) return;

  const nextKeys = ["ArrowDown", "ArrowRight", "PageDown", " "];
  const previousKeys = ["ArrowUp", "ArrowLeft", "PageUp"];

  if (nextKeys.includes(event.key)) {
    event.preventDefault();
    navigatePresentation(1);
  } else if (previousKeys.includes(event.key)) {
    event.preventDefault();
    navigatePresentation(-1);
  } else if (event.key === "Escape") {
    event.preventDefault();
    exitPresentation();
  }
});

document.addEventListener(
  "wheel",
  (event) => {
    if (!document.body.classList.contains("presentation-mode")) return;
    const activeSlide = slides[presentationIndex];
    const canScrollDown = activeSlide.scrollTop + activeSlide.clientHeight < activeSlide.scrollHeight - 4;
    const canScrollUp = activeSlide.scrollTop > 4;

    if ((event.deltaY > 0 && canScrollDown) || (event.deltaY < 0 && canScrollUp)) return;
    event.preventDefault();
    navigatePresentation(event.deltaY > 0 ? 1 : -1);
  },
  { passive: false },
);

document.addEventListener("touchstart", (event) => {
  if (!document.body.classList.contains("presentation-mode")) return;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (!document.body.classList.contains("presentation-mode") || touchStartY === null) return;
  const delta = touchStartY - event.changedTouches[0].clientY;
  touchStartY = null;
  if (Math.abs(delta) > 60) navigatePresentation(delta > 0 ? 1 : -1);
}, { passive: true });

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const openModal = () => {
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => modalPanel.focus());
};

const closeModal = () => {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
};

modalOpenButton.addEventListener("click", openModal);
modalCloseButtons.forEach((button) => button.addEventListener("click", closeModal));

modal.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key !== "Tab") return;
  const focusable = [...modal.querySelectorAll(focusableSelector)];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
});

const heroSystem = document.querySelector(".hero-system");
const organicShapes = [...document.querySelectorAll(".organic")];

document.querySelector(".hero").addEventListener("pointermove", (event) => {
  if (reduceMotion.matches || window.innerWidth < 900) return;
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  heroSystem.style.transform = `translate3d(${x * 14}px, ${y * 14}px, 0)`;
});

window.addEventListener(
  "scroll",
  () => {
    updateScrollProgress();
    if (!reduceMotion.matches && window.scrollY < window.innerHeight * 1.2) {
      organicShapes.forEach((shape, index) => {
        shape.style.translate = `0 ${window.scrollY * (0.035 + index * 0.02)}px`;
      });
    }
  },
  { passive: true },
);

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) closeMenu();
});

updateScrollProgress();
