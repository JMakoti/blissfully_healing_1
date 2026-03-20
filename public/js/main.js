//preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
  }, 2000); 
});

//image lazy loading
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
const theLetterSection = document.querySelector(".the_letter_section");
const enterSanctuary = document.getElementById("enterSanctuary");

// let lastScrollY = window.scrollY;
let hasFallen = false;
let isInSection = false;

if (enterSanctuary) {
  enterSanctuary.addEventListener("click", function (event) {
    if (enterSanctuary.tagName.toLowerCase() === "button") {
      event.preventDefault();
      const target =
        enterSanctuary.dataset.href || enterSanctuary.getAttribute("href");
      if (target) {
        window.location.href = target;
      }
    }
  });
}

// Check scroll direction
window.addEventListener("scroll", () => {
  if (!theLetterSection || !scrollImage || !readBtn) return;

  const sectionRect = theLetterSection.getBoundingClientRect();
  const isSectionVisible =
    sectionRect.top < window.innerHeight && sectionRect.bottom > 0;

  if (isSectionVisible && !hasFallen) {
    hasFallen = true;
    // Only trigger fall animation if not already fallen
    scrollImage.classList.add("fall");

    setTimeout(() => {
      readBtn.classList.add("show");
    }, 1200);
  }
  // } else if (currentScrollY < lastScrollY) {
  //   // Scrolling UP
  //   scrollImage.classList.add("fall");
  //   // oldPaper.classList.remove("active");
  //   readBtn.classList.add("show");
  //   hasFallen = true;
  // }

  // lastScrollY = currentScrollY;
});

// CLICK ACTION
if (readBtn) {
  readBtn.addEventListener("click", () => {
    if (scrollImage) {
      scrollImage.style.display = "none";
      scrollImage.classList.remove("fall");
    }

    if (oldPaper) {
      oldPaper.classList.add("active");
    }

    // Hide button after click
    readBtn.style.display = "none";

    // Mark as fallen to prevent re-animation
    hasFallen = true;
  });
}

// Optional: Click on scroll image to trigger the letter
if (scrollImage) {
  scrollImage.addEventListener("click", () => {
    if (!hasFallen) {
      scrollImage.classList.add("fall");

      setTimeout(() => {
        scrollImage.style.display = "none";
        if (oldPaper) oldPaper.classList.add("active");
        if (readBtn) readBtn.style.display = "none";
        hasFallen = true;
      }, 1500);

      setTimeout(() => {
        if (readBtn) readBtn.classList.add("show");
      }, 1200);
    }
  });
}

// Initial check for section visibility
const checkInitialVisibility = () => {
  if (!theLetterSection) return;

  const sectionRect = theLetterSection.getBoundingClientRect();
  if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
    isInSection = true;
  }
};

checkInitialVisibility();

// Service Section Zoom Script
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".js-zoom-card");

    cards.forEach((card) => {
      const btn = card.querySelector(".js-explore-btn");
      if (!btn) return;
      console.log("sactuary enter")

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

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".journal-card");
  const prevButtons = document.querySelectorAll(".prev-btn");
  const nextButtons = document.querySelectorAll(".next-btn");
  let currentIndex = 0;

  // Function to show card at specific index
  function showCard(index) {
    if (!cards || cards.length === 0) return;
    if (index < 0 || index >= cards.length) return;

    // Remove active class from all cards
    cards.forEach((card) => {
      card.classList.remove("active");
    });

    // Add active class to current card
    cards[index].classList.add("active");

    // Update button states
    updateButtons(index);
  }

  // Function to update button disabled states
  function updateButtons(index) {
    // Disable/enable prev buttons
    prevButtons.forEach((btn) => {
      btn.disabled = index === 0;
    });

    // Disable/enable next buttons
    nextButtons.forEach((btn) => {
      btn.disabled = index === cards.length - 1;
    });
  }

  // Function to go to next card (loops to start)
  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  }

  // Function to go to previous card (loops to end)
  function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  }

  // Auto-advance timer
  let autoAdvanceTimer = null;
  function startAutoAdvance() {
    // Advance every 60 seconds
    autoAdvanceTimer = setInterval(nextCard, 60000);
  }

  function resetAutoAdvance() {
    if (autoAdvanceTimer) {
      clearInterval(autoAdvanceTimer);
    }
    startAutoAdvance();
  }

  // Add click event listeners to all next buttons
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      nextCard();
      resetAutoAdvance();
    });
  });

  // Add click event listeners to all prev buttons
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      prevCard();
      resetAutoAdvance();
    });
  });

  // Initialize - show first card and start auto-advance
  showCard(0);
  startAutoAdvance();
});


// button element by its ID
// document.getElementById("blogReadMoreBtn").onclick = function () {
//   //redirect to blogs.html
//   window.location.href = "../../www/blogs.html";
  
// }

document.querySelectorAll(".blogReadMoreBtn").forEach(function(btn) {
  btn.addEventListener("click", function () {
    const url = this.getAttribute("data-href");
    window.location.href = url;
  });
});


// enter sanctuary btn
const enterSanctuaryBtn = document.getElementById("enterSanctuary");
if (enterSanctuaryBtn) {
  enterSanctuaryBtn.addEventListener("click", function () {
    const mainContent = document.querySelector("main");
    if (!mainContent) return;

    // Add zoom animation
    mainContent.classList.add("zoom-out");

    // Wait for animation to finish, then redirect
    const targetUrl = this.dataset.href || this.getAttribute("href");
    if (!targetUrl) return;

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1000); // matches CSS animation duration
  });
}