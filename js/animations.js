/* ============================================================
   KAZ.PRESTIGE — Animations (GSAP + ScrollTrigger)
   Reveal au scroll, effets hover produits
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── GSAP check ─────────────────────────────────────────── */
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Defaults ────────────────────────────────────────────── */
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });

  /* ── Page loader out ─────────────────────────────────────── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hide');
        // Hero entrance
        gsap.from('.hero-content', {
          opacity: 0,
          y: 40,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
        });
      }, 1500);
    });
  }

  /* ── Generic reveal ─────────────────────────────────────── */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  /* ── Stagger reveal for grids ────────────────────────────── */
  gsap.utils.toArray('.stagger-group').forEach(group => {
    const children = group.querySelectorAll('.stagger-item');
    gsap.from(children, {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.8,
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* ── Parallax hero text ──────────────────────────────────── */
  gsap.to('.hero-parallax', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  /* ── Counter animation (stats section) ──────────────────── */
  gsap.utils.toArray('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val).toLocaleString('fr-FR');
          },
        });
      },
    });
  });

  /* ── Horizontal line draw ────────────────────────────────── */
  gsap.utils.toArray('.line-draw').forEach(el => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1,
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    });
  });

});
