/* ============================================================
   THAI MASSAGE – main.js
   Inhalt:
   1. Navbar Scroll-State
   2. Burger Menu / Mobile Menu
   3. Language Toggle (DE / EN)
   4. Scroll Reveal Animationen
   5. Aktiven Nav-Link setzen
   6. Galerie Lightbox
   7. Preisliste Tab-Filter
   8. Kontaktformular Handler
   9. Smooth Scroll
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------
       1. NAVBAR – Scroll State
    -------------------------------------------------------- */
  const navbar = document.getElementById("navbar");

  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial check
  }

  /* --------------------------------------------------------
       2. BURGER MENU / MOBILE MENU
    -------------------------------------------------------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");

  const openMenu = () => {
    burger.classList.add("open");
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
    burger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    burger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
    burger.setAttribute("aria-expanded", "false");
  };

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    // Links schließen das Menu
    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // ESC schließt das Menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* --------------------------------------------------------
       3. LANGUAGE TOGGLE (DE / EN)
    -------------------------------------------------------- */
  const langBtns = document.querySelectorAll("[data-lang]");
  let currentLang = localStorage.getItem("tm-lang") || "de";

  const applyLang = (lang) => {
    currentLang = lang;
    localStorage.setItem("tm-lang", lang);

    // Alle Textelemente umschalten
    document.querySelectorAll("[data-de]").forEach((el) => {
      el.textContent =
        lang === "de" ? el.getAttribute("data-de") : el.getAttribute("data-en");
    });

    // Placeholder umschalten
    document.querySelectorAll("[data-de-placeholder]").forEach((el) => {
      el.placeholder =
        lang === "de"
          ? el.getAttribute("data-de-placeholder")
          : el.getAttribute("data-en-placeholder");
    });

    // Aktiven Button markieren
    langBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // HTML lang-Attribut setzen
    document.documentElement.lang = lang === "de" ? "de" : "en";
  };

  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  // Beim Laden die gespeicherte Sprache anwenden
  applyLang(currentLang);

  /* --------------------------------------------------------
       4. SCROLL REVEAL ANIMATIONEN
    -------------------------------------------------------- */
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal--left, .reveal--right"
  );

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target); // Nur einmal triggern
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* --------------------------------------------------------
       5. AKTIVEN NAV-LINK SETZEN
    -------------------------------------------------------- */
  const navLinks = document.querySelectorAll(".navbar__link");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
      link.style.color = "var(--color-violet)";
    }
  });

  /* --------------------------------------------------------
       6. GALERIE LIGHTBOX
    -------------------------------------------------------- */
  const galleryItems = document.querySelectorAll(".gallery__item");

  if (galleryItems.length > 0) {
    // Lightbox-Overlay erstellen
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
        <div class="lightbox__backdrop"></div>
        <button class="lightbox__close" aria-label="Schließen">✕</button>
        <button class="lightbox__prev" aria-label="Vorheriges Bild">‹</button>
        <button class="lightbox__next" aria-label="Nächstes Bild">›</button>
        <div class="lightbox__content">
          <img class="lightbox__img" src="" alt="" />
          <p class="lightbox__caption"></p>
        </div>
      `;
    document.body.appendChild(lightbox);

    // Lightbox Styles inline (kein extra CSS-File nötig)
    const lbStyle = document.createElement("style");
    lbStyle.textContent = `
        #lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        #lightbox.open {
          opacity: 1;
          pointer-events: all;
        }
        .lightbox__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(13, 13, 13, 0.92);
          backdrop-filter: blur(8px);
        }
        .lightbox__content {
          position: relative;
          z-index: 1;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .lightbox__img {
          max-width: 90vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        .lightbox__caption {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .lightbox__close,
        .lightbox__prev,
        .lightbox__next {
          position: absolute;
          z-index: 2;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox__close { top: 24px; right: 24px; }
        .lightbox__prev  { left: 16px; top: 50%; transform: translateY(-50%); font-size: 1.8rem; }
        .lightbox__next  { right: 16px; top: 50%; transform: translateY(-50%); font-size: 1.8rem; }
        .lightbox__close:hover,
        .lightbox__prev:hover,
        .lightbox__next:hover {
          background: rgba(192, 132, 212, 0.25);
          border-color: rgba(192, 132, 212, 0.5);
        }
      `;
    document.head.appendChild(lbStyle);

    const lbImg = lightbox.querySelector(".lightbox__img");
    const lbCaption = lightbox.querySelector(".lightbox__caption");
    const lbClose = lightbox.querySelector(".lightbox__close");
    const lbPrev = lightbox.querySelector(".lightbox__prev");
    const lbNext = lightbox.querySelector(".lightbox__next");
    const lbBackdrop = lightbox.querySelector(".lightbox__backdrop");

    let currentIndex = 0;
    const images = [...galleryItems].map((item) => ({
      src: item.querySelector("img").src,
      alt: item.querySelector("img").alt,
      caption: item.querySelector(".gallery__item-label")?.textContent || "",
    }));

    const showImage = (index) => {
      currentIndex = (index + images.length) % images.length;
      lbImg.src = images[currentIndex].src;
      lbImg.alt = images[currentIndex].alt;
      lbCaption.textContent = images[currentIndex].caption;
    };

    const openLightbox = (index) => {
      showImage(index);
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };

    galleryItems.forEach((item, i) => {
      item.addEventListener("click", () => openLightbox(i));
    });

    lbClose.addEventListener("click", closeLightbox);
    lbBackdrop.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", () => showImage(currentIndex - 1));
    lbNext.addEventListener("click", () => showImage(currentIndex + 1));

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }

  /* --------------------------------------------------------
       7. PREISLISTE TAB-FILTER
    -------------------------------------------------------- */
  const priceTabs = document.querySelectorAll(".prices__tab");
  const priceRows = document.querySelectorAll("[data-category]");

  if (priceTabs.length > 0) {
    priceTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-filter");

        // Aktiven Tab setzen
        priceTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // Zeilen filtern
        priceRows.forEach((row) => {
          const cat = row.getAttribute("data-category");
          if (filter === "all" || cat === filter) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      });
    });
  }

  /* --------------------------------------------------------
       8. KONTAKTFORMULAR
    -------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const formMessage = contactForm.querySelector(".form-message");
    const submitBtn = contactForm.querySelector(".form-submit");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Button deaktivieren
      submitBtn.disabled = true;
      submitBtn.textContent =
        currentLang === "de" ? "Wird gesendet …" : "Sending …";

      // Formular-Daten sammeln
      const data = Object.fromEntries(new FormData(contactForm));

      /* 
          HINWEIS: Hier Backend-Endpunkt eintragen.
          Beispiel mit Formspree:
          const res = await fetch('https://formspree.io/f/DEIN_ID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
          });
        */

      // Demo: Simuliert erfolgreichen Versand nach 1.2s
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const success = true; // In Produktion: res.ok

      if (formMessage) {
        formMessage.classList.remove("success", "error");
        if (success) {
          formMessage.textContent =
            currentLang === "de"
              ? "✓ Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen."
              : "✓ Your message has been sent successfully. We will get back to you soon.";
          formMessage.classList.add("success");
          contactForm.reset();
        } else {
          formMessage.textContent =
            currentLang === "de"
              ? "Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
              : "Something went wrong. Please try again.";
          formMessage.classList.add("error");
        }
      }

      // Button wieder aktivieren
      submitBtn.disabled = false;
      submitBtn.textContent =
        currentLang === "de" ? "Nachricht senden" : "Send Message";
    });
  }

  /* --------------------------------------------------------
       09. TESTIMONIALS SLIDER (Loop)
    -------------------------------------------------------- */
  const slider = document.querySelector(".testimonials__slider");
  if (slider) {
    const track = slider.querySelector(".testimonials__track");
    const viewport = slider.querySelector(".testimonials__viewport");
    const btnPrev = slider.querySelector(".testimonials__arrow--prev");
    const btnNext = slider.querySelector(".testimonials__arrow--next");

    if (track && viewport && btnPrev && btnNext) {
      let slides = Array.from(track.children);
      if (slides.length > 1) {
        // Clones für Loop
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        firstClone.setAttribute("data-clone", "first");
        lastClone.setAttribute("data-clone", "last");

        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        slides = Array.from(track.children);

        let index = 1; // Start: echtes erstes Slide (weil [0] ist lastClone)
        let isAnimating = false;

        const getSlideWidth = () => viewport.getBoundingClientRect().width;

        const setPosition = (i, animate = true) => {
          const w = getSlideWidth();
          track.style.transition = animate ? "transform 0.55s ease" : "none";
          track.style.transform = `translateX(-${i * w}px)`;
        };

        // initial position
        setPosition(index, false);

        const goTo = (dir) => {
          if (isAnimating) return;
          isAnimating = true;

          index += dir;
          setPosition(index, true);
        };

        btnPrev.addEventListener("click", () => goTo(-1));
        btnNext.addEventListener("click", () => goTo(1));

        // Nach Transition ggf. auf echtes Slide "springen" (Loop-Effekt)
        track.addEventListener("transitionend", () => {
          const current = slides[index];

          if (current?.getAttribute("data-clone") === "first") {
            // wir sind auf firstClone gelandet -> springe auf echtes erstes
            index = 1;
            setPosition(index, false);
          }

          if (current?.getAttribute("data-clone") === "last") {
            // wir sind auf lastClone gelandet -> springe auf echtes letztes
            index = slides.length - 2;
            setPosition(index, false);
          }

          isAnimating = false;
        });

        // Keyboard Support
        document.addEventListener("keydown", (e) => {
          // nur wenn Slider im Viewport ist (grob)
          const rect = slider.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (!inView) return;

          if (e.key === "ArrowLeft") goTo(-1);
          if (e.key === "ArrowRight") goTo(1);
        });

        // Bei Resize neu ausrichten (sonst Offsets falsch)
        window.addEventListener(
          "resize",
          () => {
            setPosition(index, false);
          },
          { passive: true }
        );
      }
    }
  }

  /* --------------------------------------------------------
       10. SMOOTH SCROLL – für Anker-Links
    -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();

      const offset = navbar ? navbar.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});
