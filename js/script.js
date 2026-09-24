// ==========================================================================
// MAIN WEBSITE SCRIPT
// Author: Kumar Shrestha
// Description: Controls Matrix Canvas rain animation, multi-language system,
//              smooth anchor scrolling, Formspree AJAX, and back-to-top button.
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {

  // --------------------------------------------------
  // 1. Matrix Rain Canvas Engine
  // --------------------------------------------------
  const canvas = document.getElementById('matrix-canvas');
  
  if (!canvas) {
    console.error("Matrix Canvas Error: <canvas id='matrix-canvas'></canvas> element not found in HTML!");
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("Matrix Canvas Error: Could not get 2D context.");
    return;
  }

  // Force canvas dimensions to fill window viewport
  function resizeCanvas() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || 800;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || 600;
  }
  
  resizeCanvas();

  // Characters for Matrix streams (Katakana + English Alphanumeric)
  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const alphabet = katakana + latin;

  const fontSize = 16;
  let columns = Math.max(1, Math.floor(canvas.width / fontSize));
  let rainDrops = Array(columns).fill(1);

  // Recalculate columns on window resize
  window.addEventListener('resize', function () {
    resizeCanvas();
    columns = Math.max(1, Math.floor(canvas.width / fontSize));
    rainDrops = Array(columns).fill(1);
  });

  function drawMatrix() {
    // Semi-transparent fade overlay
    ctx.fillStyle = 'rgba(5, 8, 5, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  }

  // Start animation loop
  setInterval(drawMatrix, 33);
  console.log("Matrix Canvas Engine successfully initialized and running!");

  // --------------------------------------------------
  // 2. Language Switcher Engine
  // --------------------------------------------------
  const languageButtons = document.querySelectorAll(".language-button");
  const form = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const submitButton = form?.querySelector('button[type="submit"]');

  let currentLanguage = localStorage.getItem("portfolioLanguage") || "ja";

  function getTranslation(language, key) {
    if (typeof translations === "undefined" || !translations[language] || translations[language][key] === undefined) {
      return null;
    }
    return translations[language][key];
  }

  function updatePageTitle(language) {
    const pageName = document.body.dataset.page;
    if (!pageName) return;

    const titleKey = pageName + ".pageTitle";
    const translatedTitle = getTranslation(language, titleKey);

    if (translatedTitle) {
      document.title = translatedTitle;
    }
  }

  function updateFormStatusLanguage(language) {
    if (!formStatus || !formStatus.dataset.statusKey) return;
    const translatedStatus = getTranslation(language, formStatus.dataset.statusKey);
    if (translatedStatus) formStatus.textContent = translatedStatus;
  }

  function changeLanguage(language) {
    if (typeof translations === "undefined" || !translations[language]) return;

    currentLanguage = language;
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const translatedText = getTranslation(language, element.dataset.i18n);
      if (translatedText !== null) element.textContent = translatedText;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      const translatedText = getTranslation(language, element.dataset.i18nPlaceholder);
      if (translatedText !== null) element.placeholder = translatedText;
    });

    updatePageTitle(language);

    languageButtons.forEach(function (button) {
      const isSelected = button.dataset.lang === language;
      button.classList.toggle("active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });

    if (submitButton && submitButton.disabled) {
      const sendingText = getTranslation(language, "contact.sending");
      if (sendingText) submitButton.textContent = sendingText;
    }

    updateFormStatusLanguage(language);
    localStorage.setItem("portfolioLanguage", language);
  }

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.dataset.lang) changeLanguage(button.dataset.lang);
    });
  });

  changeLanguage(currentLanguage);

  // --------------------------------------------------
  // 3. Smooth Anchor Link Scrolling
  // --------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --------------------------------------------------
  // 4. Formspree Contact Form AJAX Handler
  // --------------------------------------------------
  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (submitButton && submitButton.disabled) return;

      if (formStatus) {
        formStatus.textContent = "";
        formStatus.classList.remove("success", "error");
        delete formStatus.dataset.statusKey;
      }

      if (submitButton) {
        submitButton.disabled = true;
        const sendingText = getTranslation(currentLanguage, "contact.sending");
        submitButton.textContent = sendingText || "Sending...";
      }

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method || "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.dataset.statusKey = "contact.success";
            formStatus.classList.add("success");
            formStatus.textContent = getTranslation(currentLanguage, "contact.success") || "Thank you! Your message has been sent successfully.";
          }
          form.reset();
        } else {
          if (formStatus) {
            formStatus.dataset.statusKey = "contact.error";
            formStatus.classList.add("error");
            formStatus.textContent = getTranslation(currentLanguage, "contact.error") || "Sorry, the message could not be sent. Please try again.";
          }
        }
      } catch (error) {
        if (formStatus) {
          formStatus.dataset.statusKey = "contact.connectionError";
          formStatus.classList.add("error");
          formStatus.textContent = getTranslation(currentLanguage, "contact.connectionError") || "A connection error occurred. Please try again.";
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = getTranslation(currentLanguage, "contact.send") || "Send Message";
        }
      }
    });
  }

  // --------------------------------------------------
  // 5. Back-To-Top Button Visibility
  // --------------------------------------------------
  const backToTopButton = document.querySelector("#back-to-top");
  if (backToTopButton) {
    function updateBackToTopButton() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    }

    window.addEventListener("scroll", updateBackToTopButton);
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    updateBackToTopButton();
  }

});