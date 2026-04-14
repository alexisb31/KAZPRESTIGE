/* ============================================================
   KAZ.PRESTIGE — Main JS
   Wishlist, newsletter, quick view, divers utilitaires
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Wishlist (localStorage) ────────────────────────────── */
  let wishlist = JSON.parse(localStorage.getItem('kaz_wishlist') || '[]');

  function toggleWishlist(id, btn) {
    const idx = wishlist.indexOf(id);
    if (idx === -1) {
      wishlist.push(id);
      btn.classList.add('active');
      btn.querySelector('svg')?.setAttribute('fill', 'currentColor');
      showToast('Ajouté aux favoris');
    } else {
      wishlist.splice(idx, 1);
      btn.classList.remove('active');
      btn.querySelector('svg')?.setAttribute('fill', 'none');
      showToast('Retiré des favoris');
    }
    localStorage.setItem('kaz_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
  }

  function updateWishlistCount() {
    document.querySelectorAll('[data-wishlist-count]').forEach(el => {
      el.textContent = wishlist.length;
      el.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
  }

  updateWishlistCount();

  document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
    const id = btn.dataset.wishlistBtn;
    if (wishlist.includes(id)) {
      btn.classList.add('active');
      btn.querySelector('svg')?.setAttribute('fill', 'currentColor');
    }
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(id, btn);
    });
  });

  /* ── Toast notification ─────────────────────────────────── */
  function showToast(message, type = 'info') {
    const existing = document.querySelector('.kaz-toast');
    existing?.remove();

    const toast = document.createElement('div');
    toast.className = 'kaz-toast';
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(20px);
      background: #1a2f4a; color: #f8f9fa;
      padding: 0.875rem 1.5rem; border-radius: 4px;
      font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em;
      border: 1px solid rgba(200,169,110,0.3);
      box-shadow: 0 16px 40px rgba(0,0,0,0.4);
      z-index: 9998; opacity: 0;
      transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
      white-space: nowrap;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  /* ── Newsletter form ────────────────────────────────────── */
  document.querySelectorAll('[data-newsletter]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input?.value) return;

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✓ Inscrit(e)';
      btn.disabled = true;
      input.value = '';

      showToast('Bienvenue dans la communauté KAZ.PRESTIGE !');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    });
  });

  /* ── Smooth anchor scroll ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ── Lazy load images ────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  }

  /* ── Back to top ─────────────────────────────────────────── */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.style.opacity = window.scrollY > 500 ? '1' : '0';
      backTop.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
    }, { passive: true });

    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── WhatsApp CTA flottant ───────────────────────────────── */
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    setTimeout(() => {
      waFloat.style.opacity = '1';
      waFloat.style.transform = 'translateY(0)';
    }, 2500);
  }
});
