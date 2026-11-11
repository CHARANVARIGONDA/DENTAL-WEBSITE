/**
 * Ivory Dental Studio - Main Application Script
 *
 * Vanilla JavaScript implementation for accessible interactions,
 * floating navbar, live clinic status, motion reveal, modal & lightbox,
 * and seamless integration with the booking module.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveStatus();
  initNavbarScroll();
  initMobileNav();
  initStickyMobileBar();
  initDynamicSections();
  initTrustCounters();
  initScrollAnimations();
  initTreatmentModal();
  initGalleryLightbox();
  initFaqAccordion();
  initGlobalContactLinks();

  // Initialize interactive booking controller from js/booking.js
  if (typeof BookingController !== 'undefined') {
    window.bookingController = new BookingController();
  }
});

/* --------------------------------------------------------------------------
   1. Live Status Chip (Asia/Kolkata Timezone)
   -------------------------------------------------------------------------- */
function getClinicStatus(customDate = null) {
  const now = customDate || (window.__MOCK_DATE__ ? new Date(window.__MOCK_DATE__) : getKolkataNow());
  const day = now.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = 9 * 60 + 30; // 09:30 AM = 570
  const closeMinutes = 20 * 60;    // 08:00 PM = 1200

  // Sunday: Closed all day
  if (day === 0) {
    return {
      isOpen: false,
      text: "Closed today · opens Mon 9:30 AM",
      heroText: "Closed today · opens Monday at 9:30 AM"
    };
  }

  // Mon–Sat before 9:30 AM
  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      text: "Opens today at 9:30 AM",
      heroText: "Opens today at 9:30 AM · Banjara Hills & Madhapur"
    };
  }

  // Mon–Sat between 9:30 AM and 8:00 PM
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return {
      isOpen: true,
      text: "Open now · until 8:00 PM",
      heroText: "Open now · until 8:00 PM · Banjara Hills & Madhapur"
    };
  }

  // Mon–Sat after 8:00 PM
  if (day === 6) {
    // Saturday night
    return {
      isOpen: false,
      text: "Closed now · opens Mon 9:30 AM",
      heroText: "Closed now · opens Monday at 9:30 AM"
    };
  } else {
    return {
      isOpen: false,
      text: "Closed now · opens tomorrow 9:30 AM",
      heroText: "Closed now · opens tomorrow at 9:30 AM"
    };
  }
}

function updateStatusDisplay() {
  const status = getClinicStatus();
  const navText = document.getElementById('nav-status-text');
  const navDot = document.getElementById('nav-status-dot');
  const heroText = document.getElementById('hero-status-text');
  const heroDot = document.getElementById('hero-status-dot');
  const chipText = document.getElementById('hero-chip-status-text');
  const chipDot = document.getElementById('hero-chip-status-dot');

  if (navText) navText.textContent = status.text;
  if (navDot) {
    navDot.classList.toggle('is-closed', !status.isOpen);
  }

  if (heroText) heroText.textContent = status.heroText;
  if (heroDot) {
    heroDot.classList.toggle('is-closed', !status.isOpen);
  }

  if (chipText) chipText.textContent = status.text;
  if (chipDot) {
    chipDot.classList.toggle('is-closed', !status.isOpen);
  }
}

function initLiveStatus() {
  updateStatusDisplay();
  // Update status once every 60 seconds
  setInterval(updateStatusDisplay, 60000);
}

/* --------------------------------------------------------------------------
   2. Floating Pill Navbar Scroll Shadow
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 8) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   3. Accessible Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('hamburger-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.removeAttribute('hidden');
    drawer.style.display = 'flex';
    requestAnimationFrame(() => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!drawer.classList.contains('open')) {
        drawer.style.display = 'none';
        drawer.setAttribute('hidden', '');
      }
    }, 350);
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Sticky Mobile Bar
   -------------------------------------------------------------------------- */
function initStickyMobileBar() {
  const bar = document.querySelector('.mobile-sticky-bar');
  if (!bar) return;

  function updateBarHeight() {
    if (window.innerWidth < 768) {
      const height = bar.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--mobile-bar-h', `${height}px`);
      document.body.style.paddingBottom = `${height}px`;
    } else {
      document.documentElement.style.setProperty('--mobile-bar-h', `0px`);
      document.body.style.paddingBottom = '0px';
    }
  }

  updateBarHeight();
  window.addEventListener('resize', updateBarHeight, { passive: true });
  window.addEventListener('orientationchange', updateBarHeight);

  // Smooth scroll to booking card
  document.querySelectorAll('[data-action="book-scroll"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('booking-card');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('booking-name');
        if (nameInput) {
          setTimeout(() => nameInput.focus({ preventScroll: true }), 400);
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Dynamic Section Rendering from content.js (Doctors, Gallery, Reviews, Offers, Branches)
   -------------------------------------------------------------------------- */
function initDynamicSections() {
  const content = window.CONTENT || {};

  // 5A. Doctors (Arch-shaped photos 4:5, MDS credentials)
  const docsContainer = document.getElementById('doctors-container');
  if (docsContainer && content.doctors) {
    docsContainer.innerHTML = content.doctors.map(doc => `
      <article class="doctor-item fade-up-element">
        <div class="doctor-arch-frame">
          <picture>
            <source type="image/webp" srcset="${doc.img640} 480w, ${doc.img1200} 800w" sizes="(max-width: 768px) 100vw, 360px">
            <img src="${doc.img640}" alt="${doc.alt}" width="480" height="600" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="doctor-text-lines">
          <h3 class="doctor-name">${doc.name.en}</h3>
          <div class="doctor-role">${doc.role.en}</div>
          <div class="doctor-qual">${doc.qualifications}</div>
          <div class="doctor-exp">${doc.experience}</div>
        </div>
      </article>
    `).join('');
  }

  // 5B. Gallery (3 columns desktop / 2 mobile, 4:3 images, plain captions)
  const galleryContainer = document.getElementById('gallery-container');
  if (galleryContainer && content.gallery) {
    galleryContainer.innerHTML = content.gallery.map((item, idx) => `
      <div class="gallery-item fade-up-element" tabindex="0" role="button" aria-label="View ${item.caption.en} in lightbox" data-gallery-index="${idx}">
        <div class="gallery-photo-wrap">
          <picture>
            <source type="image/webp" srcset="${item.img640} 640w, ${item.img1200} 1200w" sizes="(max-width: 768px) 100vw, 420px">
            <img src="${item.img640}" alt="${item.alt}" width="640" height="480" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="gallery-caption">
          <span>${item.caption.en}</span>
        </div>
      </div>
    `).join('');
  }

  // 5C. Reviews (1 featured left, 5 in subgrid right)
  const reviewsContainer = document.getElementById('reviews-layout-container');
  if (reviewsContainer && content.reviews && content.reviews.items) {
    const featured = content.reviews.items[0];
    const rest = content.reviews.items.slice(1);

    reviewsContainer.innerHTML = `
      <!-- Featured Review Left -->
      <div class="featured-review fade-up-element">
        <span class="featured-quote-icon" aria-hidden="true">&ldquo;</span>
        <p class="featured-review-text">&ldquo;${featured.text.en}&rdquo;</p>
        <div class="featured-author-box">
          <div class="avatar-circle" aria-hidden="true">${featured.author.charAt(0)}</div>
          <div>
            <div style="font-weight: 700; color: var(--heading);">${featured.author}</div>
            <div style="font-size: 13.5px; color: var(--bronze); font-weight: 500;">${featured.treatmentTag}</div>
          </div>
        </div>
      </div>

      <!-- 5 Reviews Subgrid Right -->
      <div class="reviews-subgrid fade-up-element">
        ${rest.map(rev => `
          <div class="review-subitem">
            <div class="stars-cluster" role="img" aria-label="${rev.rating} out of 5 stars">
              ${Array.from({ length: 5 }, () => `
                <svg class="star-icon" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              `).join('')}
            </div>
            <p>&ldquo;${rev.text.en}&rdquo;</p>
            <div style="font-size: 13px; font-weight: 600; color: var(--heading);">
              ${rev.author} <span style="font-weight: 400; color: rgba(38,39,35,0.6);">· ${rev.treatmentTag}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 5D. Offers (3 columns in ONE rounded panel with thin dividers)
  const offersContainer = document.getElementById('offers-container');
  if (offersContainer && content.offers) {
    offersContainer.innerHTML = content.offers.map(off => `
      <div class="offer-column">
        <div>
          <div class="offer-bronze-line" aria-hidden="true"></div>
          <span class="offer-badge">${off.badge.en}</span>
          <h3 class="offer-title">${off.title.en}</h3>
          <p class="offer-desc" style="margin-top: 8px;">${off.description.en}</p>
          <ul class="offer-features">
            ${off.features.map(f => `
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f.en}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        <div>
          <div class="offer-validity">${off.validity.en}</div>
          <a href="${window.CONFIG ? window.CONFIG.getWhatsAppUrl(off.whatsappMsg) : '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%;">
            Claim on WhatsApp
          </a>
        </div>
      </div>
    `).join('');
  }

  // 5E. Branches (Unboxed, thin divider, 16:10 maps with hl=en and 6-sec fallback)
  const branchesContainer = document.getElementById('branches-container');
  if (branchesContainer && content.branches) {
    branchesContainer.innerHTML = content.branches.map((br, idx) => {
      const mapSrc = br.mapUrl || br.mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(br.area + ', Hyderabad')}&hl=en&z=14&output=embed`;
      return `
      <div class="branch-block">
        <h3 class="branch-title">${br.name.en}</h3>
        <p class="branch-info-text"><strong>Area:</strong> ${br.area}</p>
        <p class="branch-info-text"><strong>Address:</strong> ${br.address.en}</p>
        <p class="branch-info-text"><strong>Hours:</strong> ${br.timings.en}</p>
        <p class="branch-info-text"><strong>Phone:</strong> ${window.CONFIG ? window.CONFIG.CLINIC_PHONE_DISPLAY : '+91 00000 00000'}</p>
        <div class="branch-map-embed" id="map-frame-${idx}">
          <iframe id="map-iframe-${idx}" src="${mapSrc}" title="Map of Ivory Dental Studio ${br.name.en}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="map-fallback-card" id="map-fallback-${idx}" style="display: none;" aria-live="polite">
            <div class="map-fallback-inner">
              <span class="map-fallback-pin" aria-hidden="true">📍</span>
              <div class="map-fallback-title">${br.name.en}</div>
              <div class="map-fallback-addr">${br.address.en}</div>
              <a href="${br.directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-compact" style="margin-top: 10px;">
                Open in Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>
        <div>
          <a href="${br.directionsUrl}" target="_blank" rel="noopener noreferrer" class="text-link">
            Get Directions &rarr;
          </a>
        </div>
      </div>
    `;
    }).join('');

    // Setup 6-second timeout fallback for map frames
    content.branches.forEach((br, idx) => {
      const iframe = document.getElementById(`map-iframe-${idx}`);
      const fallback = document.getElementById(`map-fallback-${idx}`);
      if (!iframe || !fallback) return;

      let mapLoaded = false;
      iframe.addEventListener('load', () => {
        mapLoaded = true;
      });

      setTimeout(() => {
        if (!mapLoaded) {
          iframe.style.display = 'none';
          fallback.style.display = 'flex';
        }
      }, 6000);
    });
  }
}

/* --------------------------------------------------------------------------
   6. Trust Counters Count-Up
   -------------------------------------------------------------------------- */
function initTrustCounters() {
  const strip = document.querySelector('.trust-panel');
  if (!strip) return;

  const counters = [
    { el: document.getElementById('stat-experience'), target: 15, suffix: '+', decimals: 0 },
    { el: document.getElementById('stat-patients'), target: 12000, suffix: '+', decimals: 0, formatComma: true },
    { el: document.getElementById('stat-rating'), target: 4.8, suffix: ' ★', decimals: 1 }
  ];

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // Numbers are already displayed in static HTML

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(item => {
          if (!item.el) return;
          animateCountUp(item.el, item.target, 1400, item.suffix, item.decimals, item.formatComma);
        });
        observer.unobserve(strip);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(strip);
}

function animateCountUp(elem, endVal, duration, suffix = '', decimals = 0, formatComma = false) {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const val = endVal * ease;

    let displayStr = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
    if (formatComma) {
      displayStr = Math.floor(val).toLocaleString('en-IN');
    }
    elem.textContent = `${displayStr}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      let finalStr = decimals > 0 ? endVal.toFixed(decimals) : endVal.toString();
      if (formatComma) finalStr = endVal.toLocaleString('en-IN');
      elem.textContent = `${finalStr}${suffix}`;
    }
  }
  requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   7. Single IntersectionObserver for Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up-element, .section-header');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. Accessible Treatment Modal
   -------------------------------------------------------------------------- */
let lastFocusedTreatmentBtn = null;

function initTreatmentModal() {
  const backdrop = document.getElementById('treatment-modal-backdrop');
  const modal = document.getElementById('treatment-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const dynamicContent = document.getElementById('modal-dynamic-content');

  if (!backdrop || !modal) return;

  function openModal(treatmentId) {
    const treatments = (window.CONTENT && window.CONTENT.treatments) || [];
    const t = treatments.find(item => item.id === treatmentId);
    if (!t) return;

    dynamicContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span style="font-size: 13px; font-weight: 700; color: var(--bronze); text-transform: uppercase;">
          Treatment Details
        </span>
        <h2 id="modal-treatment-title" style="font-size: 1.75rem; margin-top: 6px;">${t.name.en}</h2>
        <div style="font-size: 15px; font-weight: 600; color: var(--heading); margin-top: 4px;">
          ${t.priceRange.en}
          <span style="font-size: 13px; font-weight: 400; color: rgba(38,39,35,0.6); display: block;">
            (${t.priceNote.en})
          </span>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 6px;">What It Is</h3>
        <p style="font-size: 14.5px; color: rgba(38,39,35,0.8); line-height: 1.6;">${t.whatItIs.en}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 6px;">Typical Duration</h3>
        <p style="font-size: 14.5px; color: rgba(38,39,35,0.8);">${t.duration.en}</p>
      </div>

      <div style="margin-bottom: 28px;">
        <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px;">Clinical Process</h3>
        <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: rgba(38,39,35,0.8);">
          ${t.process.map(step => `<li>${step.en}</li>`).join('')}
        </ol>
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button type="button" class="btn btn-primary" data-action="book-modal-treatment" data-treatment-id="${t.id}" style="flex: 1;">
          Book this treatment
          <span class="btn-arrow-icon" aria-hidden="true">&rarr;</span>
        </button>
        <button type="button" class="btn btn-secondary" id="modal-cancel-btn">
          Close
        </button>
      </div>
    `;

    backdrop.removeAttribute('hidden');
    requestAnimationFrame(() => {
      backdrop.classList.add('open');
    });
    document.body.style.overflow = 'hidden';

    // Hook the "Book this treatment" button inside modal
    const bookModalBtn = dynamicContent.querySelector('[data-action="book-modal-treatment"]');
    if (bookModalBtn) {
      bookModalBtn.addEventListener('click', () => {
        closeModal();
        if (window.bookingController) {
          window.bookingController.selectTreatment(t.id);
        }
        const bookingCard = document.getElementById('booking-card');
        if (bookingCard) {
          bookingCard.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    const cancelBtn = document.getElementById('modal-cancel-btn');
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    closeBtn.focus();
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!backdrop.classList.contains('open')) {
        backdrop.setAttribute('hidden', '');
      }
    }, 250);
    if (lastFocusedTreatmentBtn) {
      lastFocusedTreatmentBtn.focus();
    }
  }

  // Delegate click for treatment view buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action="view-treatment"]');
    if (trigger) {
      e.preventDefault();
      lastFocusedTreatmentBtn = trigger;
      const tid = trigger.getAttribute('data-treatment-id');
      openModal(tid);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   9. Gallery Lightbox
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const backdrop = document.getElementById('gallery-lightbox-backdrop');
  const imgElem = document.getElementById('lightbox-active-img');
  const captionElem = document.getElementById('lightbox-active-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!backdrop || !imgElem) return;

  let currentIndex = 0;
  let lastTrigger = null;

  function showImage(idx) {
    const items = (window.CONTENT && window.CONTENT.gallery) || [];
    if (!items.length) return;

    currentIndex = (idx + items.length) % items.length;
    const item = items[currentIndex];

    imgElem.src = item.img1200 || item.img640;
    imgElem.alt = item.alt;
    if (captionElem) captionElem.textContent = item.caption.en;
  }

  function openLightbox(idx, triggerEl) {
    lastTrigger = triggerEl;
    showImage(idx);
    backdrop.removeAttribute('hidden');
    requestAnimationFrame(() => {
      backdrop.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!backdrop.classList.contains('open')) {
        backdrop.setAttribute('hidden', '');
      }
    }, 250);
    if (lastTrigger) lastTrigger.focus();
  }

  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const idx = parseInt(item.getAttribute('data-gallery-index'), 10);
      if (!isNaN(idx)) {
        openLightbox(idx, item);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      const idx = parseInt(item.getAttribute('data-gallery-index'), 10);
      if (!isNaN(idx)) {
        openLightbox(idx, item);
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/* --------------------------------------------------------------------------
   10. FAQ Accordion (Smooth Grid Animation)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-accordion-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   11. Global Contact Links
   -------------------------------------------------------------------------- */
function initGlobalContactLinks() {
  const config = window.CONFIG || {};

  document.querySelectorAll('[data-action="call"]').forEach(el => {
    if (config.getPhoneUrl) el.setAttribute('href', config.getPhoneUrl());
  });

  document.querySelectorAll('[data-action="whatsapp"]').forEach(el => {
    const customMsg = el.getAttribute('data-whatsapp-msg');
    if (config.getWhatsAppUrl) {
      el.setAttribute('href', config.getWhatsAppUrl(customMsg));
    }
  });
}
