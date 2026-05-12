/* ACT MEDIA — main.js — v2 with lightbox + real images */

// ── Nav scroll state ─────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile menu ──────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── Smooth scroll ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Lightbox ─────────────────────────────────────────
const lightbox   = document.getElementById('lightbox');
const lbOverlay  = document.getElementById('lb-overlay');
const lbClose    = document.getElementById('lb-close');
const lbMedia    = document.getElementById('lb-media');
const lbTags     = document.getElementById('lb-tags');
const lbTitle    = document.getElementById('lb-title');
const lbDesc     = document.getElementById('lb-desc');
const lbGallery  = document.getElementById('lb-gallery');

function openLightbox(card) {
  const title  = card.dataset.title  || '';
  const tags   = card.dataset.tags   || '';
  const desc   = card.dataset.desc   || '';
  const yt     = card.dataset.yt     || '';
  const imgs   = JSON.parse(card.dataset.imgs  || '[]');

  lbTags.textContent  = tags;
  lbTitle.textContent = title;
  lbDesc.textContent  = desc;

  // Media area: prefer YouTube embed; else first image
  lbMedia.innerHTML = '';
  if (yt && !yt.includes('xxxxxx')) {
    const iframe = document.createElement('iframe');
    iframe.src = yt + '?autoplay=1&rel=0';
    iframe.allow = 'autoplay; encrypted-media; fullscreen';
    iframe.loading = 'lazy';
    lbMedia.appendChild(iframe);
  } else if (imgs.length > 0) {
    const img = document.createElement('img');
    img.src = imgs[0];
    img.alt = title;
    img.loading = 'lazy';
    lbMedia.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'lb-img-placeholder';
    ph.textContent = 'MEDIA COMING SOON';
    lbMedia.appendChild(ph);
  }

  // Gallery (additional images)
  lbGallery.innerHTML = '';
  if (imgs.length > 1) {
    imgs.slice(1).forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      img.loading = 'lazy';
      img.addEventListener('click', () => {
        lbMedia.innerHTML = '';
        const bigImg = document.createElement('img');
        bigImg.src = src;
        bigImg.alt = title;
        lbMedia.appendChild(bigImg);
        lbMedia.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      lbGallery.appendChild(img);
    });
  }

  // YouTube upload note (always shown)
  const note = document.createElement('div');
  note.className = 'lightbox__yt-note';
  note.innerHTML = `📺 <strong>影片即將上線：</strong>建議將此案例的影片上傳至 
    <a href="https://youtube.com" target="_blank">ACT MEDIA YouTube 頻道</a>，
    嵌入此處可節省流量並提升 SEO。`;
  lbGallery.after(note);

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  // Stop any YouTube autoplay
  const iframe = lbMedia.querySelector('iframe');
  if (iframe) {
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src.replace('?autoplay=1', '');
  }
}

// Open on card click
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(card));
});

lbOverlay.addEventListener('click', closeLightbox);
lbClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ── Work filter ──────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    workCards.forEach(card => {
      const cats = card.dataset.cat || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Scroll Reveal ────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.why__card, .svc-card, .work-card, .team-card, .process__step, .office').forEach((el, i) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Staggered delays
[
  { selector: '.why__card',    delay: 120 },
  { selector: '.svc-card',     delay: 80  },
  { selector: '.work-card',    delay: 60  },
  { selector: '.team-card',    delay: 100 },
  { selector: '.process__step',delay: 120 },
].forEach(({ selector, delay }) => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${i * delay}ms`;
  });
});

// Section headers
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section-title, .section-label').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  sectionObserver.observe(el);
});

// ── Marquee ──────────────────────────────────────────
const track = document.querySelector('.clients__track');
if (track) {
  track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
  track.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
}

// ── Enquiry form ─────────────────────────────────────
const form = document.getElementById('enquiry-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '送出中...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 1200);
  });
}
