/* ============================================================
   KAZ.PRESTIGE — Navbar
   Scroll behavior + mobile menu + mega menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const navbar   = document.getElementById('navbar');
  const mobileMenu  = document.getElementById('mobile-menu');
  const menuOpen    = document.getElementById('menu-open');
  const menuClose   = document.getElementById('menu-close');
  const megaTriggers = document.querySelectorAll('[data-mega]');

  /* ── Scroll shrink ──────────────────────────────────────── */
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.remove('at-top');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('at-top');
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ────────────────────────────────────────── */
  menuOpen?.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  menuClose?.addEventListener('click', closeMobile);

  function closeMobile() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Close on outside click
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobile();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobile();
  });

  /* ── Mega menu ──────────────────────────────────────────── */
  megaTriggers.forEach(trigger => {
    const menuId = trigger.dataset.mega;
    const menu   = document.getElementById(menuId);
    if (!menu) return;

    let leaveTimeout;

    trigger.addEventListener('mouseenter', () => {
      clearTimeout(leaveTimeout);
      // Close all others first
      document.querySelectorAll('.mega-menu.open').forEach(m => {
        if (m !== menu) m.classList.remove('open');
      });
      menu.classList.add('open');
    });

    trigger.addEventListener('mouseleave', () => {
      leaveTimeout = setTimeout(() => menu.classList.remove('open'), 150);
    });

    menu.addEventListener('mouseenter', () => clearTimeout(leaveTimeout));
    menu.addEventListener('mouseleave', () => {
      leaveTimeout = setTimeout(() => menu.classList.remove('open'), 150);
    });
  });

  /* ── Mobile accordion nav ───────────────────────────────── */
  document.querySelectorAll('[data-accordion]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.accordion);
      const icon   = btn.querySelector('[data-icon]');
      const isOpen = target.style.maxHeight && target.style.maxHeight !== '0px';

      // Close all
      document.querySelectorAll('[data-accordion-body]').forEach(b => {
        b.style.maxHeight = '0px';
        b.style.overflow  = 'hidden';
      });
      document.querySelectorAll('[data-icon]').forEach(i => {
        i.style.transform = '';
      });

      if (!isOpen) {
        target.style.maxHeight  = target.scrollHeight + 'px';
        target.style.overflow   = 'visible';
        icon && (icon.style.transform = 'rotate(45deg)');
      }
    });
  });
});
