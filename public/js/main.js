document.querySelectorAll("img").forEach((img) => {
  img.loading = "lazy";
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".custom-navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// The Letter
// Animation when section enters viewport
const scrollImage = document.getElementById("scroll");
const readBtn = document.getElementById("readBtn");
const oldPaper = document.getElementById("oldPaper");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        scrollImage.classList.add("fall");

        setTimeout(() => {
          readBtn.classList.add("show");
        }, 1200);
      }
    });
  },
  { threshold: 0.5 },
);

observer.observe(document.querySelector(".the_letter_section"));

// CLICK ACTION
readBtn.addEventListener("click", () => {
  // Hide scroll completely
  scrollImage.style.display = "none";

  // Expand old paper
  oldPaper.classList.add("active");

  // Hide button after click
  readBtn.style.display = "none";
});

// Service Section Zoom Script
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".js-zoom-card");

    cards.forEach((card) => {
      const btn = card.querySelector(".js-explore-btn");
      if (!btn) return;

      const redirectUrl = card.dataset.href || "example.html";

      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (card.classList.contains("zoom-active")) return;

        btn.disabled = true;
        btn.style.pointerEvents = "none";

        card.classList.add("zoom-active");

        setTimeout(function () {
          window.location.href = redirectUrl;
        }, 520);
      });
    });
    let zoomInProgress = false;

    const originalHandler = function (e) {};

    cards.forEach((card) => {
      const btn = card.querySelector(".js-explore-btn");
      if (!btn) return;

      btn.removeEventListener("click", btn.clickHandler);

      const clickHandler = function (event) {
        event.stopPropagation();
        event.preventDefault();

        if (zoomInProgress) return;
        if (card.classList.contains("zoom-active")) return;

        zoomInProgress = true;

        btn.disabled = true;
        btn.style.pointerEvents = "none";

        document.querySelectorAll(".js-explore-btn").forEach((otherBtn) => {
          if (otherBtn !== btn) {
            otherBtn.disabled = true;
            otherBtn.style.pointerEvents = "none";
          }
        });

        card.classList.add("zoom-active");

        const targetUrl = card.dataset.href || "example.html";

        setTimeout(function () {
          window.location.href = targetUrl;
        }, 520);
        setTimeout(function () {
          zoomInProgress = false;
        }, 1500);
      };

      btn.clickHandler = clickHandler;
      btn.addEventListener("click", clickHandler);
    });
  });
})();
