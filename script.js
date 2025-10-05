const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-bars');
      menuToggle.querySelector('i').classList.toggle('fa-times');
    });

// BannerSlider
const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    let index = 0;

    function showSlide(i) {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === i);
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

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto transition every 4 seconds
    setInterval(nextSlide, 4000);

 // Smooth hover animation for buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.transform = "scale(1)";
  });
});


// const slider = document.getElementById('slider');
//   const prevBtn = document.getElementById('prev');
//   const nextBtn = document.getElementById('next');
//   const pagination = document.getElementById('pagination');
//   const cards = document.querySelectorAll('.service-card');
//   const container = document.querySelector('.slider-container');

//   let index = 0;
//   let autoScroll;

//   function calc() {
//     const style = getComputedStyle(cards[0]);
//     const cardWidth = cards[0].getBoundingClientRect().width;
//     const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
//     const step = cardWidth + margin;
//     const visible = Math.max(1, Math.floor(container.clientWidth / step));
//     const maxIndex = Math.max(0, cards.length - visible);
//     return { step, visible, maxIndex };
//   }

//   function update() {
//     const { step, maxIndex } = calc();
//     if (index > maxIndex) index = 0;
//     slider.style.transform = `translateX(${-index * step}px)`;
//     updatePagination(maxIndex);
//   }

//   function updatePagination(maxIndex) {
//     pagination.innerHTML = '';
//     const dots = maxIndex + 1;
//     for (let i = 0; i < dots; i++) {
//       const d = document.createElement('div');
//       d.className = 'dot' + (i === index ? ' active' : '');
//       d.addEventListener('click', () => { index = i; update(); resetAutoScroll(); });
//       pagination.appendChild(d);
//     }
//   }

//   nextBtn.addEventListener('click', () => {
//     const { maxIndex } = calc();
//     index = (index < maxIndex) ? index + 1 : 0;
//     update();
//     resetAutoScroll();
//   });

//   prevBtn.addEventListener('click', () => {
//     const { maxIndex } = calc();
//     index = (index > 0) ? index - 1 : maxIndex;
//     update();
//     resetAutoScroll();
//   });

//   function startAutoScroll() {
//     stopAutoScroll();
//     autoScroll = setInterval(() => {
//       const { maxIndex } = calc();
//       index = (index < maxIndex) ? index + 1 : 0;
//       update();
//     }, 3000);
//   }

//   function stopAutoScroll() {
//     if (autoScroll) clearInterval(autoScroll);
//   }

//   function resetAutoScroll() {
//     stopAutoScroll();
//     startAutoScroll();
//   }

//   window.addEventListener('resize', update);
//   update();
//   startAutoScroll();

