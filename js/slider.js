/* ============================================================
   KAZ.PRESTIGE — Sliders (Swiper.js)
   Hero, products, lookbook
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hero Slider ────────────────────────────────────────── */
  if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: {
        el: '.hero-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.hero-next',
        prevEl: '.hero-prev',
      },
    });
  }

  /* ── New Arrivals horizontal scroll (mobile) ────────────── */
  if (document.querySelector('.arrivals-swiper')) {
    new Swiper('.arrivals-swiper', {
      slidesPerView: 1.15,
      spaceBetween: 16,
      grabCursor: true,
      breakpoints: {
        480:  { slidesPerView: 2.1 },
        768:  { slidesPerView: 3.1 },
        1024: { slidesPerView: 4,   spaceBetween: 24 },
      },
      pagination: {
        el: '.arrivals-pagination',
        clickable: true,
      },
    });
  }

  /* ── Lookbook Slider ────────────────────────────────────── */
  if (document.querySelector('.lookbook-swiper')) {
    new Swiper('.lookbook-swiper', {
      loop: true,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      grabCursor: true,
      breakpoints: {
        768: { slidesPerView: 1.4, spaceBetween: 24 },
        1024: { slidesPerView: 1.6, spaceBetween: 32 },
      },
      pagination: {
        el: '.lookbook-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.lookbook-next',
        prevEl: '.lookbook-prev',
      },
    });
  }

  /* ── Instagram mini-slider (mobile) ─────────────────────── */
  if (document.querySelector('.insta-swiper')) {
    new Swiper('.insta-swiper', {
      slidesPerView: 2.2,
      spaceBetween: 8,
      grabCursor: true,
      breakpoints: {
        480:  { slidesPerView: 3.2 },
        768:  { slidesPerView: 4.2 },
        1024: { slidesPerView: 6,   spaceBetween: 12 },
      },
    });
  }
});
