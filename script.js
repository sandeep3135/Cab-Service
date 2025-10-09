document.addEventListener("DOMContentLoaded", () => {
  
  /* ---------- NAVBAR TOGGLE ---------- */
  document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("header-menu-toggle");
  const navbar = document.getElementById("header-navbar");
  const icon = menuToggle.querySelector("i");

  if (menuToggle && navbar && icon) {
    // Toggle open/close
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.toggle("active");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

    // Close when clicking a nav link
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        navbar.classList.remove("active");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  }
});

  /* ---------- BANNER SLIDER ---------- */
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  let index = 0;

  if (slides.length && nextBtn && prevBtn) {
    const showSlide = (i) => {
      slides.forEach((slide, idx) => slide.classList.toggle("active", idx === i));
    };
    const nextSlide = () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    };
    const prevSlide = () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    };
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    setInterval(nextSlide, 4000);
  }

  /* ---------- BUTTON HOVER ---------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseover", () => (btn.style.transform = "scale(1.05)"));
    btn.addEventListener("mouseout", () => (btn.style.transform = "scale(1)"));
  });

  /* ---------- SERVICE SLIDER ---------- */
  const slider = document.getElementById("slider");
  const previousBtn = document.getElementById("previous");
  const nextoneBtn = document.getElementById("nextone");
  const pagination = document.getElementById("pagination");
  const cards = document.querySelectorAll(".service-card");
  const container = document.querySelector(".slider-container");

  if (slider && container && cards.length && pagination && previousBtn && nextoneBtn) {
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
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement("div");
        dot.className = "dot" + (i === index1 ? " active" : "");
        dot.addEventListener("click", () => {
          index1 = i;
          update();
          resetAutoScroll();
        });
        pagination.appendChild(dot);
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
  const headerDiv = document.getElementById("header");
  if (headerDiv) {
    fetch("header.html")
      .then((r) => r.text())
      .then((data) => (headerDiv.innerHTML = data))
      .catch((e) => console.error("Header load error:", e));
  }

  const footerDiv = document.getElementById("footer");
  if (footerDiv) {
    fetch("footer.html")
      .then((r) => r.text())
      .then((data) => (footerDiv.innerHTML = data))
      .catch((e) => console.error("Footer load error:", e));
  }

  /* ---------- TAXI ENQUIRY FORM ---------- */
  const form = document.getElementById("taxiEnquiryForm");
  if (form) {
    form.addEventListener("submit", (e) => {
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

      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(contact)) {
        alert("Please enter a valid 10-digit contact number.");
        return;
      }

      alert("Booking successful! Thank you for choosing Our Cabs 🚕");
      form.reset();
    });

    document.querySelectorAll(".increment, .decrement").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        let value = parseInt(input.value);
        if (btn.classList.contains("increment")) value++;
        else value = Math.max(0, value - 1);
        input.value = value;
      });
    });
  }
});
