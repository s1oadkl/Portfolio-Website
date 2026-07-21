// ========================================
// Portfolio Website JavaScript
// Japanese / English language switcher
// Formspree contact form
// Smooth scrolling
// Scroll animations
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ----------------------------------------
  // Select important HTML elements
  // ----------------------------------------
  const languageButtons =
    document.querySelectorAll(".language-button");

  const form =
    document.querySelector("#contact-form");

  const formStatus =
    document.querySelector("#form-status");

  const submitButton =
    form?.querySelector('button[type="submit"]');

  // Japanese is the default language.
  // Use the saved language when one exists.
  let currentLanguage =
    localStorage.getItem("portfolioLanguage") || "ja";


  // ----------------------------------------
  // Get translated text safely
  // ----------------------------------------
  function getTranslation(language, key) {
    if (
      typeof translations === "undefined" ||
      !translations[language] ||
      translations[language][key] === undefined
    ) {
      return null;
    }

    return translations[language][key];
  }


  // ----------------------------------------
  // Translate browser tab title
  // ----------------------------------------
  function updatePageTitle(language) {
    const pageName = document.body.dataset.page;

    if (!pageName) {
      return;
    }

    const titleKey = pageName + ".pageTitle";

    const translatedTitle =
      getTranslation(language, titleKey);

    if (translatedTitle) {
      document.title = translatedTitle;
    }
  }


  // ----------------------------------------
  // Translate existing form message
  // ----------------------------------------
  function updateFormStatusLanguage(language) {
    if (!formStatus) {
      return;
    }

    const statusKey =
      formStatus.dataset.statusKey;

    if (!statusKey) {
      return;
    }

    const translatedStatus =
      getTranslation(language, statusKey);

    if (translatedStatus) {
      formStatus.textContent =
        translatedStatus;
    }
  }


  // ----------------------------------------
  // Change website language
  // ----------------------------------------
  function changeLanguage(language) {
    if (
      typeof translations === "undefined" ||
      !translations[language]
    ) {
      console.error(
        'Translation data for "' +
        language +
        '" was not found.'
      );

      return;
    }

    currentLanguage = language;

    // Change the HTML language
    document.documentElement.lang = language;


    // Translate normal website text
    document
      .querySelectorAll("[data-i18n]")
      .forEach(function (element) {
        const translationKey =
          element.dataset.i18n;

        const translatedText =
          getTranslation(
            language,
            translationKey
          );

        if (translatedText !== null) {
          element.textContent =
            translatedText;
        }
      });


    // Translate form placeholders
    document
      .querySelectorAll(
        "[data-i18n-placeholder]"
      )
      .forEach(function (element) {
        const translationKey =
          element.dataset.i18nPlaceholder;

        const translatedText =
          getTranslation(
            language,
            translationKey
          );

        if (translatedText !== null) {
          element.placeholder =
            translatedText;
        }
      });


    // Translate browser tab title
    updatePageTitle(language);


    // Show which language button is active
    languageButtons.forEach(
      function (button) {
        const isSelected =
          button.dataset.lang === language;

        button.classList.toggle(
          "active",
          isSelected
        );

        button.setAttribute(
          "aria-pressed",
          String(isSelected)
        );
      }
    );


    // Translate "Sending..." if the form
    // is currently being submitted
    if (
      submitButton &&
      submitButton.disabled
    ) {
      const sendingText =
        getTranslation(
          language,
          "contact.sending"
        );

      if (sendingText) {
        submitButton.textContent =
          sendingText;
      }
    }


    // Translate success or error message
    updateFormStatusLanguage(language);


    // Save selected language
    localStorage.setItem(
      "portfolioLanguage",
      language
    );
  }


  // ----------------------------------------
  // Language button click events
  // ----------------------------------------
  languageButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          const selectedLanguage =
            button.dataset.lang;

          if (selectedLanguage) {
            changeLanguage(
              selectedLanguage
            );
          }
        }
      );
    }
  );


  // Load saved language or Japanese
  changeLanguage(currentLanguage);


  // ----------------------------------------
  // Smooth scrolling
  // ----------------------------------------
  const samePageLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  samePageLinks.forEach(
    function (link) {
      link.addEventListener(
        "click",
        function (event) {
          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const targetElement =
            document.querySelector(
              targetId
            );

          if (targetElement) {
            event.preventDefault();

            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      );
    }
  );


  // ----------------------------------------
  // Formspree contact form
  // ----------------------------------------
  if (form) {
    form.addEventListener(
      "submit",
      async function (event) {
        event.preventDefault();


        // Prevent multiple submissions
        if (
          submitButton &&
          submitButton.disabled
        ) {
          return;
        }


        // Remove old success or error message
        if (formStatus) {
          formStatus.textContent = "";

          formStatus.classList.remove(
            "success",
            "error"
          );

          delete formStatus.dataset
            .statusKey;
        }


        // Disable the submit button
        if (submitButton) {
          submitButton.disabled = true;

          const sendingText =
            getTranslation(
              currentLanguage,
              "contact.sending"
            );

          submitButton.textContent =
            sendingText || "Sending...";
        }


        try {
          const formData =
            new FormData(form);

          const response =
            await fetch(form.action, {
              method:
                form.method || "POST",

              body: formData,

              headers: {
                Accept:
                  "application/json"
              }
            });


          // Successful submission
          if (response.ok) {
            if (formStatus) {
              formStatus.dataset
                .statusKey =
                "contact.success";

              formStatus.classList.add(
                "success"
              );

              const successText =
                getTranslation(
                  currentLanguage,
                  "contact.success"
                );

              formStatus.textContent =
                successText ||
                "Thank you! Your message has been sent successfully.";
            }


            // Clear all form fields
            form.reset();
          }


          // Formspree returned an error
          else {
            if (formStatus) {
              formStatus.dataset
                .statusKey =
                "contact.error";

              formStatus.classList.add(
                "error"
              );

              const errorText =
                getTranslation(
                  currentLanguage,
                  "contact.error"
                );

              formStatus.textContent =
                errorText ||
                "Sorry, the message could not be sent. Please try again.";
            }
          }
        }


        // Internet connection error
        catch (error) {
          console.error(
            "Contact form error:",
            error
          );

          if (formStatus) {
            formStatus.dataset
              .statusKey =
              "contact.connectionError";

            formStatus.classList.add(
              "error"
            );

            const connectionErrorText =
              getTranslation(
                currentLanguage,
                "contact.connectionError"
              );

            formStatus.textContent =
              connectionErrorText ||
              "A connection error occurred. Please try again.";
          }
        }


        // Re-enable the button
        finally {
          if (submitButton) {
            submitButton.disabled =
              false;

            const sendText =
              getTranslation(
                currentLanguage,
                "contact.send"
              );

            submitButton.textContent =
              sendText ||
              "Send Message";
          }
        }
      }
    );
  }


  // ----------------------------------------
  // Reveal elements while scrolling
  // ----------------------------------------
  const revealElements =
    document.querySelectorAll(
      ".hero-grid, " +
      ".about-grid, " +
      ".skill-list, " +
      ".project-grid, " +
      ".contact-grid"
    );

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  // Do not animate when the visitor
  // prefers reduced motion
  if (prefersReducedMotion.matches) {
    revealElements.forEach(
      function (element) {
        element.classList.add(
          "visible"
        );
      }
    );
  }


  // Use IntersectionObserver
  else if (
    "IntersectionObserver" in window
  ) {
    const observer =
      new IntersectionObserver(
        function (
          entries,
          currentObserver
        ) {
          entries.forEach(
            function (entry) {
              if (
                entry.isIntersecting
              ) {
                entry.target
                  .classList.add(
                    "visible"
                  );

                currentObserver
                  .unobserve(
                    entry.target
                  );
              }
            }
          );
        },
        {
          threshold: 0.18
        }
      );


    revealElements.forEach(
      function (element) {
        observer.observe(element);
      }
    );
  }


  // Fallback for old browsers
  else {
    revealElements.forEach(
      function (element) {
        element.classList.add(
          "visible"
        );
      }
    );
  }
});