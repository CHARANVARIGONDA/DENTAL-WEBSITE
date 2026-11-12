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

// Expose getClinicStatus globally for chatbot and recall systems
window.getClinicStatus = getClinicStatus;

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

// Translation helper for bilingual support (FR-12)
function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  const lang = window.currentLang || (typeof localStorage !== 'undefined' && localStorage.getItem('ivory_lang')) || 'en';
  return obj[lang] || obj.en || '';
}
window.t = t;

/* --------------------------------------------------------------------------
   5. Dynamic Section Rendering from content.js (Doctors, Gallery, Reviews, Offers, Branches, FAQs)
   -------------------------------------------------------------------------- */
function initDynamicSections() {
  const content = window.CONTENT || {};

  // 5A. Doctors (Arch-shaped photos 4:5, MDS credentials)
  const docsContainer = document.getElementById('doctors-container');
  if (docsContainer && content.doctors) {
    docsContainer.innerHTML = content.doctors.map(doc => `
      <article class="doctor-item in-view">
        <div class="doctor-arch-frame">
          <picture>
            <source type="image/webp" srcset="${doc.img640} 480w, ${doc.img1200} 800w" sizes="(max-width: 768px) 100vw, 360px">
            <img src="${doc.img640}" alt="${doc.alt}" width="480" height="600" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="doctor-text-lines">
          <h3 class="doctor-name">${t(doc.name)}</h3>
          <div class="doctor-role">${t(doc.role)}</div>
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
      <div class="gallery-item in-view" tabindex="0" role="button" aria-label="View ${t(item.caption)} in lightbox" data-gallery-index="${idx}">
        <div class="gallery-photo-wrap">
          <picture>
            <source type="image/webp" srcset="${item.img640} 640w, ${item.img1200} 1200w" sizes="(max-width: 768px) 100vw, 420px">
            <img src="${item.img640}" alt="${item.alt}" width="640" height="480" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="gallery-caption">
          <span>${t(item.caption)}</span>
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
      <div class="featured-review in-view">
        <span class="featured-quote-icon" aria-hidden="true">&ldquo;</span>
        <p class="featured-review-text">&ldquo;${t(featured.text)}&rdquo;</p>
        <div class="featured-author-box">
          <div class="avatar-circle" aria-hidden="true">${featured.author.charAt(0)}</div>
          <div>
            <div style="font-weight: 700; color: var(--heading);">${featured.author}</div>
            <div style="font-size: 13.5px; color: var(--bronze); font-weight: 500;">${featured.treatmentTag}</div>
          </div>
        </div>
      </div>

      <!-- 5 Reviews Subgrid Right -->
      <div class="reviews-subgrid in-view">
        ${rest.map(rev => `
          <div class="review-subitem">
            <div class="stars-cluster" role="img" aria-label="${rev.rating} out of 5 stars">
              ${Array.from({ length: 5 }, () => `
                <svg class="star-icon" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              `).join('')}
            </div>
            <p>&ldquo;${t(rev.text)}&rdquo;</p>
            <div style="font-size: 13px; font-weight: 600; color: var(--heading);">
              ${rev.author} <span style="font-weight: 400; color: rgba(38,39,35,0.6);">· ${rev.treatmentTag}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 5D. Offers (Filtered by active offer category if set)
  const offersContainer = document.getElementById('offers-container');
  if (offersContainer && content.offers) {
    const filterCat = window.activeOfferCategory || 'all';
    const filteredOffers = content.offers.filter(off => filterCat === 'all' || off.category === filterCat || off.category === 'all');

    offersContainer.innerHTML = filteredOffers.map(off => `
      <div class="offer-column in-view">
        <div class="offer-card-body">
          <div class="offer-bronze-line" aria-hidden="true"></div>
          <span class="offer-badge">${t(off.badge)}</span>
          <h3 class="offer-title">${t(off.title)}</h3>
          <p class="offer-desc">${t(off.description)}</p>
          <ul class="offer-features">
            ${off.features.map(f => `
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${t(f)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="offer-card-footer">
          <div class="offer-validity">
            <svg class="offer-validity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${t(off.validity)}</span>
          </div>
          <a href="${window.CONFIG ? window.CONFIG.getWhatsAppUrl(off.whatsappMsg) : '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary offer-cta-btn">
            ${(window.currentLang || 'en') === 'te' ? 'వాట్సాప్‌లో బుక్ చేయండి' : 'Claim on WhatsApp'}
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
      <div class="branch-block in-view">
        <h3 class="branch-title">${t(br.name)}</h3>
        <p class="branch-info-text"><strong>${(window.currentLang || 'en') === 'te' ? 'ప్రాంతం:' : 'Area:'}</strong> ${br.area}</p>
        <p class="branch-info-text"><strong>${(window.currentLang || 'en') === 'te' ? 'చిరునామా:' : 'Address:'}</strong> ${t(br.address)}</p>
        <p class="branch-info-text"><strong>${(window.currentLang || 'en') === 'te' ? 'సమయాలు:' : 'Hours:'}</strong> ${t(br.timings)}</p>
        <p class="branch-info-text"><strong>${(window.currentLang || 'en') === 'te' ? 'ఫోన్:' : 'Phone:'}</strong> ${window.CONFIG ? window.CONFIG.CLINIC_PHONE_DISPLAY : '+91 00000 00000'}</p>
        <div class="branch-map-embed" id="map-frame-${idx}">
          <iframe id="map-iframe-${idx}" src="${mapSrc}" title="Map of Ivory Dental Studio ${t(br.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="map-fallback-card" id="map-fallback-${idx}" style="display: none;" aria-live="polite">
            <div class="map-fallback-inner">
              <span class="map-fallback-pin" aria-hidden="true">📍</span>
              <div class="map-fallback-title">${t(br.name)}</div>
              <div class="map-fallback-addr">${t(br.address)}</div>
              <a href="${br.directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-compact" style="margin-top: 10px;">
                ${(window.currentLang || 'en') === 'te' ? 'గూగుల్ మ్యాప్స్ ఓపెన్ చేయండి →' : 'Open in Google Maps &rarr;'}
              </a>
            </div>
          </div>
        </div>
        <div>
          <a href="${br.directionsUrl}" target="_blank" rel="noopener noreferrer" class="text-link">
            ${(window.currentLang || 'en') === 'te' ? 'దిశలు పొందండి &rarr;' : 'Get Directions &rarr;'}
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

  // 5F. FAQs (Dynamic bilingual rendering from content.faqs)
  const faqList = document.getElementById('faq-accordion');
  if (faqList && content.faqs) {
    faqList.innerHTML = content.faqs.map((faq, idx) => `
      <div class="faq-accordion-item">
        <button type="button" class="faq-question-btn" aria-expanded="false" id="faq-btn-${idx}">
          <span>${t(faq.q)}</span>
          <span class="faq-icon-toggle" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer-wrapper">
          <div class="faq-answer-inner">
            <div class="faq-answer-content">
              ${t(faq.a)}
            </div>
          </div>
        </div>
      </div>
    `).join('');
    initFaqAccordion();
  }

  // Ensure scroll observers see any active elements
  if (typeof window.refreshScrollObserver === 'function') {
    window.refreshScrollObserver();
  }
}

window.initDynamicSections = initDynamicSections;

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
let globalScrollObserver = null;

function refreshScrollObserver() {
  const elements = document.querySelectorAll('.fade-up-element:not(.in-view)');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('in-view');
    } else if (globalScrollObserver) {
      globalScrollObserver.observe(el);
    }
  });
}
window.refreshScrollObserver = refreshScrollObserver;

function initScrollAnimations() {
  globalScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        globalScrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  const elements = document.querySelectorAll('.fade-up-element, .section-header');
  elements.forEach(el => globalScrollObserver.observe(el));
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
    const treatItem = treatments.find(item => item.id === treatmentId);
    if (!treatItem) return;

    const isTe = (window.currentLang || 'en') === 'te';
    dynamicContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span style="font-size: 13px; font-weight: 700; color: var(--bronze); text-transform: uppercase;">
          ${isTe ? 'చికిత్స వివరాలు' : 'Treatment Details'}
        </span>
        <h2 id="modal-treatment-title" style="font-size: 1.75rem; margin-top: 6px;">${t(treatItem.name)}</h2>
        <div style="font-size: 15px; font-weight: 600; color: var(--heading); margin-top: 4px;">
          ${t(treatItem.priceRange)}
          <span style="font-size: 13px; font-weight: 400; color: rgba(38,39,35,0.6); display: block;">
            (${t(treatItem.priceNote)})
          </span>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 6px;">${isTe ? 'చికిత్స గురించి' : 'What It Is'}</h3>
        <p style="font-size: 14.5px; color: rgba(38,39,35,0.8); line-height: 1.6;">${t(treatItem.whatItIs)}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 6px;">${isTe ? 'వ్యవధి' : 'Typical Duration'}</h3>
        <p style="font-size: 14.5px; color: rgba(38,39,35,0.8);">${t(treatItem.duration)}</p>
      </div>

      <div style="margin-bottom: 28px;">
        <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px;">${isTe ? 'చికిత్సా విధానం' : 'Clinical Process'}</h3>
        <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: rgba(38,39,35,0.8);">
          ${treatItem.process.map(step => `<li>${t(step)}</li>`).join('')}
        </ol>
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button type="button" class="btn btn-primary" data-action="book-modal-treatment" data-treatment-id="${treatItem.id}" style="flex: 1;">
          ${isTe ? 'ఈ చికిత్సను బుక్ చేయండి' : 'Book this treatment'}
          <span class="btn-arrow-icon" aria-hidden="true">&rarr;</span>
        </button>
        <button type="button" class="btn btn-secondary" id="modal-cancel-btn">
          ${isTe ? 'మూసివేయి' : 'Close'}
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
          window.bookingController.selectTreatment(treatItem.id);
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
