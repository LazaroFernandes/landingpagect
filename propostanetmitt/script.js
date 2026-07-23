document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".topbar nav");
  const backTop = document.querySelector(".back-top");
  const recommendation = document.querySelector(".recommendation b");
  const questions = document.querySelector(".questions");

  menuButton?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const updateRecommendation = () => {
    if (!questions || !recommendation) return;
    const checkboxes = [...questions.querySelectorAll('input[type="checkbox"]')];
    const focus = questions.querySelector('input[name="foco"]:checked');
    recommendation.textContent =
      focus?.nextElementSibling?.textContent?.includes("HYROX") ||
      focus?.parentElement?.textContent?.includes("HYROX")
        ? "Inicial HYROX"
        : checkboxes.some((input) => input.checked)
          ? "Full"
          : "Média";
  };

  questions?.addEventListener("change", updateRecommendation);
  updateRecommendation();

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  const updateScrollControls = () => {
    backTop?.classList.toggle("show", window.scrollY > 700);
  };

  window.addEventListener("scroll", updateScrollControls, { passive: true });
  updateScrollControls();

  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
