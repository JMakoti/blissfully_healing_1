//preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
  }, 2000); 
});

// the letter
document.addEventListener("DOMContentLoaded", () => {
  const scrollImage = document.getElementById("scroll");
  const oldPaper = document.getElementById("oldPaper");
  const readBtn = document.getElementById("readBtn");
  const enterSanctuary = document.getElementById("enterSanctuary");

  // -------------------------------
  // NAVIGATION FIX
  // -------------------------------
  if (enterSanctuary) {
    enterSanctuary.addEventListener("click", (e) => {
      const target = enterSanctuary.getAttribute("href");

      if (target && !target.startsWith("http")) {
        e.preventDefault();
        window.location.href = target;
      }
    });
  }

  // -------------------------------
  // OPEN LETTER FUNCTION
  // -------------------------------
  const openLetter = () => {
    scrollImage?.classList.add("hidden");
    oldPaper?.classList.add("active");
    

    if (readBtn) {
      readBtn.classList.remove("show");
      readBtn.classList.add("hidden");
    }
  };

  // -------------------------------
  // AUTO FALL ON LOAD
  // -------------------------------
  if (scrollImage) {
    setTimeout(() => {
      scrollImage.classList.add("fall");

      // Open letter after animation
      setTimeout(openLetter, 1200);
    }, 500); // small delay for dramatic effect
  }

  // -------------------------------
  // OPTIONAL CLICK (fallback)
  // -------------------------------
  scrollImage?.addEventListener("click", () => {
    openLetter();
  });
});
// document.addEventListener("DOMContentLoaded", () => {
//   const scrollImage = document.getElementById("scroll");
//   const readBtn = document.getElementById("readBtn");
//   const oldPaper = document.getElementById("oldPaper");
//   const section = document.querySelector(".the_letter_section");
//   const enterSanctuary = document.getElementById("enterSanctuary");

//   let hasTriggered = false;
//   let lastScrollY = window.scrollY;

//   // -------------------------------
//   // NAVIGATION FIX
//   // -------------------------------
//   if (enterSanctuary) {
//     enterSanctuary.addEventListener("click", (e) => {
//       // FIX: your href is wrong (missing protocol)
//       const target = enterSanctuary.getAttribute("href");
//       if (target && !target.startsWith("http")) {
//         e.preventDefault();
//         window.location.href = target;
//       }
//     });
//   }

//   // -------------------------------
//   // OPEN LETTER FUNCTION
//   // -------------------------------
//   const openLetter = () => {
//     scrollImage?.classList.add("hidden");
//     scrollImage?.classList.remove("fall");

//     oldPaper?.classList.add("active");

//     readBtn?.classList.remove("show");
//     readBtn?.classList.add("hidden");
//   };

//   // -------------------------------
//   // OBSERVER (BEST PRACTICE)
//   // -------------------------------
//   if (section && scrollImage) {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const currentScrollY = window.scrollY;
//           const isScrollingDown = currentScrollY > lastScrollY;

//           if (
//             entry.isIntersecting &&
//             !hasTriggered &&
//             isScrollingDown
//           ) {
//             hasTriggered = true;

//             scrollImage.classList.add("fall");

//             setTimeout(openLetter, 1200);
//           }

//           lastScrollY = currentScrollY;
//         });
//       },
//       { threshold: 0.35 }
//     );

//     observer.observe(section);
//   }

//   // -------------------------------
//   // OPTIONAL CLICK FALLBACK
//   // -------------------------------
//   scrollImage?.addEventListener("click", () => {
//     if (!hasTriggered) {
//       hasTriggered = true;

//       scrollImage.classList.add("fall");
//       setTimeout(openLetter, 1200);
//     }
//   });
// });