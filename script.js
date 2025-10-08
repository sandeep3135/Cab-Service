document.addEventListener("DOMContentLoaded", () => {

  /* ---------- NAVBAR TOGGLE ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });
  }

  /* ---------- BANNER SLIDER ---------- */
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  let index = 0;

  if (slides.length > 0 && nextBtn && prevBtn) {
    function showSlide(i) {
      slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === i);
      });
    }

    function nextSlide() {
      index = (index + 1) % slides.length;
      showSlide(index);
    }

    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Auto transition every 4 seconds
    setInterval(nextSlide, 4000);
  }

  /* ---------- BUTTON HOVER ANIMATION ---------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.transform = "scale(1)";
    });
  });

  /* ---------- SERVICE SLIDER ---------- */
  const slider = document.getElementById("slider");
  const previousBtn = document.getElementById("previous");
  const nextoneBtn = document.getElementById("nextone");
  const pagination = document.getElementById("pagination");
  const cards = document.querySelectorAll(".service-card");
  const container = document.querySelector(".slider-container");

  if (slider && container && cards.length > 0 && pagination && previousBtn && nextoneBtn) {
    let index1 = 0;
    let autoScroll;

    function calc() {
      const style = getComputedStyle(cards[0]);
      const cardWidth = cards[0].getBoundingClientRect().width;
      const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      const step = cardWidth + margin;
      const visible = Math.max(1, Math.floor(container.clientWidth / step));
      const maxIndex = Math.max(0, cards.length - visible);
      return { step, visible, maxIndex };
    }

    function update() {
      const { step, maxIndex } = calc();
      if (index1 > maxIndex) index1 = 0;
      slider.style.transform = `translateX(${-index1 * step}px)`;
      updatePagination(maxIndex);
    }

    function updatePagination(maxIndex) {
      pagination.innerHTML = "";
      const dots = maxIndex + 1;
      for (let i = 0; i < dots; i++) {
        const d = document.createElement("div");
        d.className = "dot" + (i === index1 ? " active" : "");
        d.addEventListener("click", () => {
          index1 = i;
          update();
          resetAutoScroll();
        });
        pagination.appendChild(d);
      }
    }

    nextoneBtn.addEventListener("click", () => {
      const { maxIndex } = calc();
      index1 = (index1 < maxIndex) ? index1 + 1 : 0;
      update();
      resetAutoScroll();
    });

    previousBtn.addEventListener("click", () => {
      const { maxIndex } = calc();
      index1 = (index1 > 0) ? index1 - 1 : maxIndex;
      update();
      resetAutoScroll();
    });

    function startAutoScroll() {
      stopAutoScroll();
      autoScroll = setInterval(() => {
        const { maxIndex } = calc();
        index1 = (index1 < maxIndex) ? index1 + 1 : 0;
        update();
      }, 3000);
    }

    function stopAutoScroll() {
      if (autoScroll) clearInterval(autoScroll);
    }

    function resetAutoScroll() {
      stopAutoScroll();
      startAutoScroll();
    }

    window.addEventListener("resize", update);
    update();
    startAutoScroll();
  }

  /* ---------- HEADER & FOOTER INCLUDE ---------- */
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerDiv = document.getElementById("header");
      if (headerDiv) headerDiv.innerHTML = data;
    })
    .catch((error) => console.error("Header load error:", error));

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerDiv = document.getElementById("footer");
      if (footerDiv) footerDiv.innerHTML = data;
    })
    .catch((error) => console.error("Footer load error:", error));

});



// Handle passenger and luggage increment/decrement
document.querySelectorAll(".increment, .decrement").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    let value = parseInt(input.value);

    if (btn.classList.contains("increment")) {
      value++;
    } else {
      value = Math.max(0, value - 1);
    }

    input.value = value;
  });
});

// Form validation
document.getElementById("taxiEnquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pickup = document.getElementById("pickup").value.trim();
  const dropoff = document.getElementById("dropoff").value.trim();
  const datetime = document.getElementById("datetime").value;
  const distance = document.getElementById("distance").value;
  const contact = document.getElementById("contact").value.trim();

  if (!pickup || !dropoff || !datetime || !distance || !contact) {
    alert("Please fill out all fields before booking.");
    return;
  }

  // Simple phone number validation (10 digits)
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(contact)) {
    alert("Please enter a valid 10-digit contact number.");
    return;
  }

  alert("Booking successful! Thank you for choosing Comfort Cabs 🚕");
  this.reset();
});
