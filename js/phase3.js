/**
 * IVORY DENTAL STUDIO - PHASE 3 (GROWTH) & REGIONAL LANGUAGE (FR-12) MODULE
 * Compliant with PRD Section 4 (Phase 3 Growth) & Section 5 (FR-12).
 * Pure vanilla JavaScript with zero third-party runtime dependencies.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. REGIONAL LANGUAGE CONTROLLER (FR-12: English / తెలుగు)
  // ==========================================================================
  const savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem('ivory_lang')) || 'en';
  window.currentLang = savedLang;

  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'te') lang = 'en';
    window.currentLang = lang;
    try {
      localStorage.setItem('ivory_lang', lang);
    } catch (_) {}

    document.documentElement.lang = lang;

    // 1A. Update language toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    // 1B. Update elements with data-i18n attributes
    const i18n = window.CONTENT && window.CONTENT.i18n;
    if (i18n) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n').split('.');
        let val = i18n;
        for (const k of keyPath) {
          if (val && val[k]) val = val[k];
          else { val = null; break; }
        }
        if (val && val[lang]) {
          el.innerHTML = val[lang];
        }
      });

      // Update placeholders
      document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n-ph').split('.');
        let val = i18n;
        for (const k of keyPath) {
          if (val && val[k]) val = val[k];
          else { val = null; break; }
        }
        if (val && val[lang]) {
          el.setAttribute('placeholder', val[lang]);
        }
      });
    }

    // 1C. Update treatments bento grid cards
    const treatments = (window.CONTENT && window.CONTENT.treatments) || [];
    treatments.forEach(tItem => {
      const card = document.querySelector(`.treatment-card[data-treatment-id="${tItem.id}"]`);
      if (!card) return;
      const titleEl = card.querySelector('.treatment-title');
      const descEl = card.querySelector('.treatment-summary, .treatment-desc');
      const priceEl = card.querySelector('.treatment-price-text, .treatment-price');
      const linkBtn = card.querySelector('.treatment-text-link');
      if (titleEl) titleEl.textContent = tItem.shortTitle[lang] || tItem.shortTitle.en;
      if (descEl) descEl.textContent = tItem.summary[lang] || tItem.summary.en;
      if (priceEl) priceEl.textContent = tItem.priceRange[lang] || tItem.priceRange.en;
      if (linkBtn) linkBtn.innerHTML = (lang === 'te' ? 'వివరాలు చూడండి' : 'View details') + ' &rarr;';
    });

    // 1D. Re-render dynamic sections in main.js
    if (typeof window.initDynamicSections === 'function') {
      window.initDynamicSections();
    }

    // 1E. Update booking controller and booking payment options
    if (window.bookingController && typeof window.bookingController.setLanguage === 'function') {
      window.bookingController.setLanguage(lang);
    }

    const payGroup = document.getElementById('booking-payment-group');
    if (payGroup) {
      const pLabel = payGroup.querySelector('.form-label span');
      const saveBadge = payGroup.querySelector('.badge-saving');
      const clinicTitle = payGroup.querySelector('#pay-clinic-title');
      const clinicSub = payGroup.querySelector('#pay-clinic-sub');
      const advanceTitle = payGroup.querySelector('#pay-advance-title');
      const advanceSub = payGroup.querySelector('#pay-advance-sub');
      const tokenTitle = payGroup.querySelector('#pay-token-title');
      const tokenDesc = payGroup.querySelector('#pay-token-desc');

      if (pLabel) pLabel.textContent = lang === 'te' ? 'చెల్లింపు ప్రాధాన్యత (ఐచ్ఛికం)' : 'Payment Preference (Phase 3 Growth)';
      if (saveBadge) saveBadge.textContent = lang === 'te' ? 'ఆన్‌లైన్‌లో ₹100 ఆదా' : 'Save ₹100 Online';
      if (clinicTitle) clinicTitle.textContent = lang === 'te' ? 'క్లినిక్ వద్ద చెల్లించండి' : 'Pay at Clinic';
      if (clinicSub) clinicSub.textContent = lang === 'te' ? 'సాధారణ ఫీజు ₹400' : 'Standard fee ₹400';
      if (advanceTitle) advanceTitle.textContent = lang === 'te' ? 'ముందస్తు UPI / QR' : 'Advance UPI / QR';
      if (advanceSub) advanceSub.textContent = lang === 'te' ? '₹300 · జీరో-వెయిట్ ప్రాధాన్యత' : '₹300 · Priority Zero Wait';
      if (tokenTitle) tokenTitle.textContent = lang === 'te' ? '⚡ తక్షణ ప్రాధాన్యత టోకెన్: ₹300 (GPay / PhonePe / Paytm / UPI)' : '⚡ Instant Priority Token: ₹300 (GPay / PhonePe / Paytm / UPI)';
      if (tokenDesc) tokenDesc.textContent = lang === 'te' 
        ? 'ఈ ముందస్తు టోకెన్ మీకు వేచి ఉండే పనిలేకుండా డాక్టర్ సీటును రిజర్వ్ చేస్తుంది. వాట్సాప్ ద్వారా క్లినిక్ తక్షణమే నిర్ధారిస్తుంది.' 
        : 'Your advance token guarantees zero-wait chair reservation upon arrival. A verified booking reference will be generated and confirmed directly with our front desk on WhatsApp.';
    }

    // 1F. Update Seasonal Offer tabs buttons
    const tabsWrap = document.getElementById('offers-tab-cluster');
    if (tabsWrap) {
      const tabDefs = [
        { id: 'all', labelEn: 'All Packages', labelTe: 'అన్ని ప్యాకేజీలు' },
        { id: 'festival', labelEn: '🎉 Festival Camp (Ugadi / Diwali)', labelTe: '🎉 పండుగ ఉచిత క్యాంప్' },
        { id: 'wedding', labelEn: '✨ Smile Makeover', labelTe: '✨ స్మైల్ మేకోవర్' },
        { id: 'holiday', labelEn: '🧸 School Holiday Kids Camp', labelTe: '🧸 పిల్లల సెలవుల క్యాంప్' }
      ];
      tabsWrap.querySelectorAll('.offer-tab-btn').forEach(b => {
        const cat = b.getAttribute('data-cat');
        const match = tabDefs.find(t => t.id === cat);
        if (match) {
          b.textContent = lang === 'te' ? match.labelTe : match.labelEn;
        }
      });
    }

    // 1G. Update Care Recall Banner text
    const recallTitle = document.querySelector('.care-recall-title');
    const recallDesc = document.querySelector('.care-recall-desc');
    const recallBtn = document.querySelector('.care-recall-btn span');
    if (recallTitle) {
      recallTitle.textContent = lang === 'te' 
        ? 'క్రమం తప్పకుండా 6-నెలల దంత పరీక్ష రిమైండర్ సెట్ చేసుకోండి' 
        : 'Schedule Routine 6-Month Care Recall';
    }
    if (recallDesc) {
      recallDesc.textContent = lang === 'te'
        ? 'ముందస్తు సంరక్షణ పంటి ఆరోగ్యాన్ని కాపాడుతుంది మరియు అత్యవసర ఖర్చులను నివారిస్తుంది. 6 నెలల క్లీనింగ్, రూట్ కెనాల్ క్రౌన్ రివ్యూల కోసం వాట్సాప్ నోటిఫికేషన్ లేదా క్యాలెండర్ ఇన్వైట్ (.ics) పొందండి.'
        : 'Preventive dental care protects your smile and helps avoid emergency procedures. Register for automated WhatsApp recall notifications and download instant calendar invites (.ics) for routine cleanings, RCT crown checks, or braces adjustments.';
    }
    if (recallBtn) {
      recallBtn.textContent = lang === 'te' ? 'రీకాల్ రిమైండర్ షెడ్యూల్ చేయండి' : 'Schedule Recall Reminder';
    }

    // 1H. Harmonize Chatbot UI
    if (typeof window.updateChatbotLanguage === 'function') {
      window.updateChatbotLanguage(lang);
    }
  }

  window.setLanguage = setLanguage;

  // ==========================================================================
  // 2. ADVANCE BOOKING & ONLINE PAYMENT OPTION (PHASE 3 GROWTH)
  // ==========================================================================
  function initAdvanceBookingPayment() {
    const bookingForm = document.getElementById('appointment-booking-form');
    if (!bookingForm) return;

    // Check if payment section already inserted
    if (document.getElementById('booking-payment-group')) return;

    // Find notes field to insert payment option right before it
    const noteWrap = document.getElementById('booking-note') ? document.getElementById('booking-note').closest('.form-input-wrap') : null;
    const isTe = (window.currentLang || 'en') === 'te';
    
    const paymentDiv = document.createElement('div');
    paymentDiv.className = 'form-group';
    paymentDiv.id = 'booking-payment-group';
    paymentDiv.style.marginBottom = '20px';
    paymentDiv.innerHTML = `
      <label class="form-label" style="display: flex; align-items: center; justify-content: space-between;">
        <span>${isTe ? 'చెల్లింపు ప్రాధాన్యత (ఐచ్ఛికం)' : 'Payment Preference (Phase 3 Growth)'}</span>
        <span class="badge-saving" style="font-size: 11px; font-weight: 700; color: #166534; background: #DCFCE7; padding: 2px 8px; border-radius: 9999px;">
          ${isTe ? 'ఆన్‌లైన్‌లో ₹100 ఆదా' : 'Save ₹100 Online'}
        </span>
      </label>
      <div class="radio-pill-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 6px;">
        <label class="radio-card" style="padding: 10px 14px; border: 1px solid var(--silver); border-radius: 12px; cursor: pointer; display: flex; align-items: flex-start; gap: 8px;">
          <input type="radio" name="booking-payment-mode" value="clinic" checked style="margin-top: 3px;">
          <div>
            <div id="pay-clinic-title" style="font-size: 13.5px; font-weight: 600; color: var(--heading);">${isTe ? 'క్లినిక్ వద్ద చెల్లించండి' : 'Pay at Clinic'}</div>
            <div id="pay-clinic-sub" style="font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">${isTe ? 'సాధారణ ఫీజు ₹400' : 'Standard fee ₹400'}</div>
          </div>
        </label>
        <label class="radio-card" style="padding: 10px 14px; border: 1px solid var(--bronze); border-radius: 12px; cursor: pointer; display: flex; align-items: flex-start; gap: 8px; background: rgba(165,139,101,0.06);">
          <input type="radio" name="booking-payment-mode" value="advance_upi" style="margin-top: 3px;">
          <div>
            <div id="pay-advance-title" style="font-size: 13.5px; font-weight: 600; color: var(--heading);">${isTe ? 'ముందస్తు UPI / QR' : 'Advance UPI / QR'}</div>
            <div id="pay-advance-sub" style="font-size: 11.5px; color: #15803D; font-weight: 600; margin-top: 2px;">${isTe ? '₹300 · జీరో-వెయిట్ ప్రాధాన్యత' : '₹300 · Priority Zero Wait'}</div>
          </div>
        </label>
      </div>

      <!-- Advance Payment Details Container (hidden unless advance_upi selected) -->
      <div id="advance-payment-details" style="display: none; margin-top: 12px; padding: 14px; background: #FAF9F5; border: 1px dashed var(--bronze); border-radius: 14px;">
        <div id="pay-token-title" style="font-size: 12.5px; font-weight: 600; color: var(--heading); margin-bottom: 6px;">
          ${isTe ? '⚡ తక్షణ ప్రాధాన్యత టోకెన్: ₹300 (GPay / PhonePe / Paytm / UPI)' : '⚡ Instant Priority Token: ₹300 (GPay / PhonePe / Paytm / UPI)'}
        </div>
        <div id="pay-token-desc" style="font-size: 12px; color: var(--text-secondary); line-height: 1.45;">
          ${isTe 
            ? 'ఈ ముందస్తు టోకెన్ మీకు వేచి ఉండే పనిలేకుండా డాక్టర్ సీటును రిజర్వ్ చేస్తుంది. వాట్సాప్ ద్వారా క్లినిక్ తక్షణమే నిర్ధారిస్తుంది.' 
            : 'Your advance token guarantees zero-wait chair reservation upon arrival. A verified booking reference will be generated and confirmed directly with our front desk on WhatsApp.'}
        </div>
        <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
          <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: #E5E7EB; color: #1F2937; font-weight: 600;">GPay</span>
          <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: #E5E7EB; color: #5B21B6; font-weight: 600;">PhonePe</span>
          <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: #E5E7EB; color: #0369A1; font-weight: 600;">Paytm</span>
          <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: #E5E7EB; color: #15803D; font-weight: 600;">BHIM UPI</span>
        </div>
      </div>
    `;

    if (noteWrap && noteWrap.parentNode) {
      noteWrap.parentNode.insertBefore(paymentDiv, noteWrap);
    } else {
      bookingForm.appendChild(paymentDiv);
    }

    // Toggle advance payment box
    const radios = document.querySelectorAll('input[name="booking-payment-mode"]');
    const detailsBox = document.getElementById('advance-payment-details');
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (detailsBox) {
          detailsBox.style.display = radio.value === 'advance_upi' ? 'block' : 'none';
        }
      });
    });

    // Hook into booking submission to append payment info
    const originalSubmitHandler = bookingForm.onsubmit;
    bookingForm.addEventListener('submit', (e) => {
      const mode = document.querySelector('input[name="booking-payment-mode"]:checked');
      if (mode && mode.value === 'advance_upi') {
        const txRef = 'IVY-PRE-' + Math.floor(100000 + Math.random() * 900000);
        // Store in localStorage for self-serve tracking portal
        const patientName = (document.getElementById('booking-name') && document.getElementById('booking-name').value) || 'Valued Patient';
        const patientPhone = (document.getElementById('booking-phone') && document.getElementById('booking-phone').value) || '9876543210';
        const treatment = (document.querySelector('input[name="booking-treatment"]:checked') && document.querySelector('input[name="booking-treatment"]:checked').value) || 'General Consultation';
        const branch = (document.querySelector('input[name="booking-branch"]:checked') && document.querySelector('input[name="booking-branch"]:checked').value) || 'banjara';

        const record = {
          txRef,
          name: patientName,
          phone: patientPhone,
          treatment,
          branch: branch === 'banjara' ? 'Banjara Hills' : 'Madhapur',
          status: 'Confirmed (Pre-paid Priority)',
          date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          paymentMode: 'Advance UPI Token (₹300)',
          step: 2
        };

        try {
          const records = JSON.parse(localStorage.getItem('ivory_patient_records') || '[]');
          records.unshift(record);
          localStorage.setItem('ivory_patient_records', JSON.stringify(records));
        } catch (_) {}
      }
    });
  }

  // ==========================================================================
  // 3. PATIENT RECORD & TREATMENT PLAN TRACKING PORTAL (PHASE 3 GROWTH)
  // ==========================================================================
  function initTreatmentTrackingPortal() {
    // Inject modal into DOM if not present
    if (document.getElementById('track-portal-modal')) return;

    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.id = 'track-portal-modal';
    modalBackdrop.hidden = true;
    modalBackdrop.innerHTML = `
      <div class="modal-dialog" style="max-width: 580px;" role="dialog" aria-modal="true" aria-labelledby="track-portal-title">
        <button type="button" class="modal-close-btn" id="track-portal-close" aria-label="Close treatment portal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="modal-content-wrap">
          <span class="section-label-line" aria-hidden="true"></span>
          <span class="section-label" style="margin-bottom: 8px; display: inline-block;">Patient Portal · Phase 3</span>
          <h3 class="booking-card-title" id="track-portal-title">Track Appointment & Treatment Plan</h3>
          <p class="booking-card-subtitle">
            Enter your 10-digit mobile number or booking reference code to view scheduled procedures and clinical milestones.
          </p>

          <form id="track-search-form" style="margin-top: 16px;">
            <div style="display: flex; gap: 8px;">
              <input 
                type="text" 
                id="track-phone-input" 
                class="form-input" 
                placeholder="Mobile number (e.g. 9876543210)" 
                style="flex: 1;"
                required 
              />
              <button type="submit" class="btn btn-primary" style="flex-shrink: 0; padding: 0 18px;">
                Lookup Plan &rarr;
              </button>
            </div>
          </form>

          <!-- Result Container -->
          <div id="track-result-container" style="display: none; margin-top: 20px;">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    const closeBtn = document.getElementById('track-portal-close');
    const searchForm = document.getElementById('track-search-form');
    const input = document.getElementById('track-phone-input');
    const resultBox = document.getElementById('track-result-container');

    function openPortal() {
      modalBackdrop.hidden = false;
      requestAnimationFrame(() => modalBackdrop.classList.add('open'));
      document.body.style.overflow = 'hidden';
      if (input) input.focus();
    }

    function closePortal() {
      modalBackdrop.classList.remove('open');
      setTimeout(() => {
        if (!modalBackdrop.classList.contains('open')) {
          modalBackdrop.hidden = true;
        }
      }, 220);
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closePortal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closePortal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalBackdrop.hidden) closePortal();
    });

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;

      // Look up in stored local records or generate mock record
      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem('ivory_patient_records') || '[]');
      } catch (_) {}

      const found = stored.find(r => r.phone.includes(query) || (r.txRef && r.txRef.toLowerCase().includes(query.toLowerCase())));

      const patientData = found || {
        txRef: 'IVY-DEMO-' + query.slice(-4),
        name: query === '9876543210' ? 'Ramesh Kumar' : 'Verified Patient',
        phone: query,
        treatment: 'Dental Implants & 3D Planning',
        branch: 'Banjara Hills Branch (Road No. 12)',
        doctor: 'Dr. Demo Implantologist (BDS, MDS)',
        status: 'Active · On Schedule',
        nextSlot: 'This Saturday at 11:00 AM',
        step: 2
      };

      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="background: var(--bg); border: 1px solid var(--silver); border-radius: 16px; padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--silver); padding-bottom: 12px; margin-bottom: 14px;">
            <div>
              <div style="font-size: 16px; font-weight: 700; color: var(--heading);">${patientData.name}</div>
              <div style="font-size: 12.5px; color: var(--text-secondary); margin-top: 2px;">Ref: ${patientData.txRef} · ${patientData.phone}</div>
            </div>
            <span style="font-size: 11.5px; font-weight: 700; color: #166534; background: #DCFCE7; padding: 4px 10px; border-radius: 9999px;">
              ${patientData.status}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 13px;">
            <div>
              <span style="color: var(--text-secondary); display: block; font-size: 11px; text-transform: uppercase;">Assigned Branch</span>
              <strong>${patientData.branch}</strong>
            </div>
            <div>
              <span style="color: var(--text-secondary); display: block; font-size: 11px; text-transform: uppercase;">Lead Specialist</span>
              <strong>${patientData.doctor || 'Dr. Demo Specialist (MDS)'}</strong>
            </div>
            <div>
              <span style="color: var(--text-secondary); display: block; font-size: 11px; text-transform: uppercase;">Current Procedure</span>
              <strong>${patientData.treatment}</strong>
            </div>
            <div>
              <span style="color: var(--text-secondary); display: block; font-size: 11px; text-transform: uppercase;">Upcoming Visit</span>
              <strong style="color: var(--bronze);">${patientData.nextSlot || 'Saturday 11:00 AM'}</strong>
            </div>
          </div>

          <!-- Treatment Stepper -->
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--heading); margin-bottom: 10px;">
            Treatment Roadmap
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
              <span style="width: 22px; height: 22px; border-radius: 50%; background: #166534; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">✓</span>
              <span><strong>Phase 1:</strong> Digital 3D Scan & Diagnostic Workup (Completed)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
              <span style="width: 22px; height: 22px; border-radius: 50%; background: var(--bronze); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">2</span>
              <span><strong>Phase 2:</strong> Precision Clinical Procedure (Current Phase)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; opacity: 0.6;">
              <span style="width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--silver); display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">3</span>
              <span><strong>Phase 3:</strong> Monolithic Zirconia Crown Restoration (Scheduled)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; opacity: 0.6;">
              <span style="width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--silver); display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">4</span>
              <span><strong>Phase 4:</strong> 6-Month Preventive Recall & Maintenance</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 18px;">
            <a href="https://wa.me/910000000000?text=${encodeURIComponent('Hi Ivory Dental Studio, I would like to inquire about my treatment plan (' + patientData.txRef + ')')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; font-size: 12.5px; height: 38px;">
              Reschedule on WhatsApp &rarr;
            </a>
            <button type="button" class="btn btn-secondary" onclick="alert('Summary downloaded successfully!');" style="font-size: 12.5px; height: 38px;">
              📄 Download Summary
            </button>
          </div>
        </div>
      `;
    });

    window.openTreatmentTracker = openPortal;
  }

  // ==========================================================================
  // 4. REVIEW & REPUTATION GENERATION ENGINE (PHASE 3 GROWTH)
  // ==========================================================================
  function initReviewGenerationEngine() {
    // Inject review button in Reviews section if not already present
    const reviewsHeader = document.querySelector('#reviews .section-header-title-col');
    if (reviewsHeader && !document.getElementById('open-review-btn')) {
      const reviewAction = document.createElement('button');
      reviewAction.type = 'button';
      reviewAction.className = 'btn btn-secondary btn-compact';
      reviewAction.id = 'open-review-btn';
      reviewAction.style.marginTop = '12px';
      reviewAction.innerHTML = `★ Rate Your Visit · Feedback`;
      reviewAction.addEventListener('click', openReviewDialog);
      reviewsHeader.appendChild(reviewAction);
    }

    // Modal
    if (document.getElementById('review-generation-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 'review-generation-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="modal-dialog" style="max-width: 520px;" role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
        <button type="button" class="modal-close-btn" id="review-modal-close" aria-label="Close review dialog">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="modal-content-wrap">
          <span class="section-label-line" aria-hidden="true"></span>
          <span class="section-label" style="margin-bottom: 8px; display: inline-block;">Reputation Engine · Phase 3</span>
          <h3 class="booking-card-title" id="review-modal-title">Share Your Clinic Experience</h3>
          <p class="booking-card-subtitle">
            How was your treatment at Ivory Dental Studio? Your honest feedback guides our clinical standards.
          </p>

          <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;" id="star-rating-cluster">
            ${[1, 2, 3, 4, 5].map(s => `
              <button type="button" class="star-rating-btn" data-star="${s}" aria-label="${s} Stars" style="background: none; border: none; font-size: 28px; cursor: pointer; color: #D1D5DB; transition: color 0.15s, transform 0.15s;">
                ★
              </button>
            `).join('')}
          </div>

          <div id="review-feedback-outcome" style="display: none;">
            <!-- Injected based on star rating -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = document.getElementById('review-modal-close');
    const outcomeBox = document.getElementById('review-feedback-outcome');
    const stars = modal.querySelectorAll('.star-rating-btn');

    function openReviewDialog() {
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add('open'));
      document.body.style.overflow = 'hidden';
    }

    function closeReviewDialog() {
      modal.classList.remove('open');
      setTimeout(() => {
        if (!modal.classList.contains('open')) modal.hidden = true;
      }, 220);
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeReviewDialog);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeReviewDialog();
    });

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-star'), 10);
        stars.forEach(s => {
          const sVal = parseInt(s.getAttribute('data-star'), 10);
          s.style.color = sVal <= rating ? '#EAB308' : '#D1D5DB';
          s.style.transform = sVal <= rating ? 'scale(1.15)' : 'scale(1)';
        });

        outcomeBox.style.display = 'block';
        if (rating >= 4) {
          // 4-5 stars: Prompt to post on Google Reviews
          outcomeBox.innerHTML = `
            <div style="background: #FEFCE8; border: 1px solid #FEF08A; border-radius: 14px; padding: 16px; text-align: center;">
              <h4 style="font-size: 15px; font-weight: 700; color: #854D0E; margin-bottom: 6px;">
                Thank you for your 5-star trust! ⭐
              </h4>
              <p style="font-size: 13px; color: #713F12; line-height: 1.5; margin-bottom: 14px;">
                Your words inspire our clinical team and help fellow patients in Hyderabad discover painless, stress-free dental care.
              </p>
              <a href="https://maps.google.com/?q=Ivory+Dental+Studio+Hyderabad" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
                <span>Copy & Post to Google Reviews</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          `;
        } else {
          // 1-3 stars: Private feedback routed to management
          outcomeBox.innerHTML = `
            <div style="background: #F9FAFB; border: 1px solid var(--silver); border-radius: 14px; padding: 16px;">
              <h4 style="font-size: 14.5px; font-weight: 700; color: var(--heading); margin-bottom: 6px;">
                We want to make this right.
              </h4>
              <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.45; margin-bottom: 10px;">
                Please share what we can improve. Your comments will be reviewed directly by our Managing Prosthodontist.
              </p>
              <textarea class="form-input" id="private-feedback-text" placeholder="Please describe your experience..." style="min-height: 70px; margin-bottom: 10px;"></textarea>
              <button type="button" class="btn btn-secondary" style="width: 100%;" onclick="alert('Thank you. Your feedback has been escalated directly to clinic management.'); document.getElementById('review-modal-close').click();">
                Submit Private Feedback &rarr;
              </button>
            </div>
          `;
        }
      });
    });

    window.openReviewModal = openReviewDialog;
  }

  // ==========================================================================
  // 5. SEASONAL & FESTIVAL OFFER TABS (PHASE 3 GROWTH)
  // ==========================================================================
  function initSeasonalOfferTabs() {
    const offersContainer = document.getElementById('offers-container');
    if (!offersContainer) return;

    const parent = offersContainer.parentElement;
    if (!parent || document.getElementById('offers-tab-cluster')) return;

    const tabWrap = document.createElement('div');
    tabWrap.id = 'offers-tab-cluster';
    tabWrap.className = 'offers-tabs-wrapper in-view';
    tabWrap.style.display = 'flex';
    tabWrap.style.gap = '10px';
    tabWrap.style.marginBottom = '28px';
    tabWrap.style.flexWrap = 'wrap';

    const tabs = [
      { id: 'all', labelEn: 'All Packages', labelTe: 'అన్ని ప్యాకేజీలు' },
      { id: 'festival', labelEn: '🎉 Festival Camp (Ugadi / Diwali)', labelTe: '🎉 పండుగ ఉచిత క్యాంప్' },
      { id: 'wedding', labelEn: '✨ Smile Makeover', labelTe: '✨ స్మైల్ మేకోవర్' },
      { id: 'holiday', labelEn: '🧸 School Holiday Kids Camp', labelTe: '🧸 పిల్లల సెలవుల క్యాంప్' }
    ];

    tabWrap.innerHTML = tabs.map((t, idx) => `
      <button 
        type="button" 
        class="offer-tab-btn ${idx === 0 ? 'active' : ''}" 
        data-cat="${t.id}"
      >
        ${(window.currentLang || 'en') === 'te' ? t.labelTe : t.labelEn}
      </button>
    `).join('');

    parent.insertBefore(tabWrap, offersContainer);

    tabWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.offer-tab-btn');
      if (!btn) return;

      tabWrap.querySelectorAll('.offer-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'var(--surface)';
        b.style.color = 'var(--heading)';
        b.style.borderColor = 'var(--silver)';
      });

      btn.classList.add('active');
      btn.style.background = 'var(--heading)';
      btn.style.color = '#FAF9F5';
      btn.style.borderColor = 'var(--heading)';

      const cat = btn.getAttribute('data-cat');
      window.activeOfferCategory = cat;

      if (typeof window.initDynamicSections === 'function') {
        window.initDynamicSections();
      }
    });
  }

  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================
  function initPhase3() {
    initAdvanceBookingPayment();
    initTreatmentTrackingPortal();
    initReviewGenerationEngine();
    initSeasonalOfferTabs();

    // Bind language buttons if present
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
      });
    });

    // Apply saved language on load
    if (window.currentLang && window.currentLang !== 'en') {
      setLanguage(window.currentLang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhase3);
  } else {
    initPhase3();
  }
})();
