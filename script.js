const revealElements = document.querySelectorAll(
  ".section-heading, .service-card, .gallery-card, .package-card, .testimonial-card, .contact-grid > *, .booking-wrapper"
);

revealElements.forEach((element) => element.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => observer.observe(element));

const forms = document.querySelectorAll(".contact-form, .booking-form");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Submitted";
    submitButton.disabled = true;

    const notice = document.createElement("p");
    notice.className = "form-notice";
    notice.textContent =
      form.classList.contains("booking-form")
        ? "Your booking request has been captured. Behind Tha Scene will follow up with a custom plan."
        : "Your inquiry has been captured. We'll reach out soon to discuss your event.";

    const existingNotice = form.querySelector(".form-notice");
    if (existingNotice) {
      existingNotice.remove();
    }

    form.appendChild(notice);
    form.reset();

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2500);
  });
});
