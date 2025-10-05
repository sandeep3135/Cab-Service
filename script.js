// let menubar = document.querySelector("#menu-bars")
// let mynav = document.querySelector(".navbar");

// menubar.onclick = () =>{
//     menubar.classList.toggle('fa-items');
//     mynav.classList.toggle('active');
// }

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


