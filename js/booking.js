/**
 * Ivory Dental Studio - Interactive 5-Step Appointment Booking Module
 *
 * Direct WhatsApp appointment request generator.
 * Zero backend, client-side slot generation with Asia/Kolkata timezone support.
 */

// Helper to get current Date object in Asia/Kolkata (UTC+5:30)
function getKolkataNow() {
  const now = new Date();
  const utcOffset = now.getTime() + now.getTimezoneOffset() * 60000;
  const kolkataOffset = 5.5 * 3600000;
  return new Date(utcOffset + kolkataOffset);
}

// Format date into YYYY-MM-DD
function formatDateISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Convert "HH:MM" to 12-hour display string e.g. "11:30 AM"
function formatTime12h(timeStr) {
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

// Convert "HH:MM" to minutes from midnight
function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Reusable WhatsApp URL builder function
function buildWhatsAppLink(data) {
  const config = (typeof window !== 'undefined' && window.CONFIG) ? window.CONFIG : { WHATSAPP_NUMBER: '910000000000' };
  const phone = config.WHATSAPP_NUMBER || '910000000000';
  const noteText = data.note && data.note.trim() ? data.note.trim() : 'None';

  const message = `Hi, I'd like to request an appointment at Ivory Dental Studio.
Name: ${data.name}
Phone: ${data.phone}
Branch: ${data.branchName}
Treatment: ${data.treatmentName}
Preferred date: ${data.dateFormatted}
Preferred time: ${data.timeFormatted}
Note: ${noteText}
(Please confirm the slot.)`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Interactive Booking Form Controller
class BookingController {
  constructor() {
    this.container = document.getElementById('booking-card');
    if (!this.container) return;

    this.config = window.CONFIG || {};
    this.selectedBranch = 'banjara';
    this.selectedTreatment = 'implants';
    this.selectedDate = null;
    this.selectedTime = null;

    this.branchLabels = {
      banjara: { en: 'Banjara Hills', te: 'బంజారా హిల్స్' },
      madhapur: { en: 'Madhapur', te: 'మాదాపూర్' }
    };

    this.treatmentLabels = {
      implants: { en: 'Dental Implants', te: 'డెంటల్ ఇంప్లాంట్స్' },
      rct: { en: 'Root Canal (RCT)', te: 'రూట్ కెనాల్ (RCT)' },
      braces: { en: 'Braces & Clear Aligners', te: 'బ్రేసెస్ & క్లియర్ అలైలర్లు' },
      crowns: { en: 'Crowns & Bridges', te: 'క్రౌన్స్ & బ్రిడ్జెస్' },
      cleaning: { en: 'Cleaning & Scaling', te: 'టీత్ క్లీనింగ్ & స్కేలింగ్' },
      whitening: { en: 'Teeth Whitening', te: 'టీత్ వైట్నింగ్' },
      kids: { en: 'Pediatric Dentistry', te: 'పిల్లల దంత చికిత్స' },
      dentures: { en: 'Dentures', te: 'డెంచర్స్ (కృత్రిమ పళ్ళు)' },
      extraction: { en: 'Tooth Extraction', te: 'పన్ను తొలగింపు' },
      checkup: { en: 'Check-up & X-Rays', te: 'దంత పరీక్ష & ఎక్స్-రే' },
      consultation: { en: 'General Consultation', te: 'సాధారణ సంప్రదింపులు' }
    };

    this.init();
  }

  getLang() {
    return window.currentLang || (typeof localStorage !== 'undefined' && localStorage.getItem('ivory_lang')) || 'en';
  }

  getBranchName(id) {
    const isTe = this.getLang() === 'te';
    const b = this.branchLabels[id];
    return b ? (b[isTe ? 'te' : 'en'] || b.en) : 'Banjara Hills';
  }

  getTreatmentName(id) {
    const isTe = this.getLang() === 'te';
    const t = this.treatmentLabels[id];
    return t ? (t[isTe ? 'te' : 'en'] || t.en) : (isTe ? 'సాధారణ సంప్రదింపులు' : 'General Consultation');
  }

  init() {
    this.renderDates();
    this.renderSlots();
    this.bindEvents();
    this.updateSummary();
  }

  setLanguage(lang) {
    this.renderDates();
    this.renderSlots();
    this.updateSummary();
  }

  // Render 14 days starting from today in Kolkata time
  renderDates() {
    const strip = document.getElementById('booking-date-strip');
    if (!strip) return;

    strip.innerHTML = '';
    const kolkataNow = getKolkataNow();
    const daysAhead = this.config.BOOKING_DAYS_AHEAD || 14;
    const closedDates = this.config.CLOSED_DATES || [];

    const isTe = this.getLang() === 'te';
    const weekdays = isTe 
      ? ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = isTe
      ? ['జన', 'ఫిబ్ర', 'మార్చి', 'ఏప్రి', 'మే', 'జూన్', 'జూలై', 'ఆగ', 'సెప్టెం', 'అక్టో', 'నవం', 'డిసెం']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const todayText = isTe ? 'ఈరోజు' : 'Today';
    const closedText = isTe ? 'సెలవు' : 'Closed';

    let firstAvailableDate = null;

    for (let i = 0; i < daysAhead; i++) {
      const d = new Date(kolkataNow.getTime() + i * 86400000);
      const iso = formatDateISO(d);
      const dayOfWeek = d.getDay();
      const isSunday = (dayOfWeek === 0);
      const isClosed = isSunday || closedDates.includes(iso);

      const label = document.createElement('label');
      label.className = `date-tile ${isClosed ? 'is-closed' : ''}`;

      const isToday = (i === 0);
      const weekdayStr = weekdays[dayOfWeek];
      const monthStr = months[d.getMonth()];
      const dayNum = d.getDate();

      // Check if open and not yet picked first
      let checkedAttr = '';
      if (!isClosed && !firstAvailableDate) {
        firstAvailableDate = iso;
        checkedAttr = 'checked';
        this.selectedDate = iso;
      }

      label.innerHTML = `
        <input type="radio" name="booking-date" value="${iso}" ${checkedAttr} ${isClosed ? 'disabled' : ''}>
        <span class="date-tile-content">
          ${isToday ? `<span class="date-badge-today">${todayText}</span>` : `<span class="date-weekday">${weekdayStr}</span>`}
          <span class="date-number">${dayNum}</span>
          <span class="date-month">${monthStr}</span>
          ${isClosed ? `<span class="date-status-closed">${closedText}</span>` : ''}
        </span>
      `;

      strip.appendChild(label);
    }

    if (!firstAvailableDate && daysAhead > 0) {
      // Fallback
      this.selectedDate = formatDateISO(kolkataNow);
    }
  }

  // Generate slots for currently selected branch and date
  renderSlots() {
    const slotsContainer = document.getElementById('booking-time-groups');
    if (!slotsContainer) return;

    slotsContainer.innerHTML = '';

    const branch = (this.config.BRANCHES && this.config.BRANCHES[this.selectedBranch]) || {
      open: '09:30',
      close: '20:00'
    };

    const slotMinutes = this.config.SLOT_MINUTES || 30;
    const lunch = this.config.LUNCH_BREAK || { start: '13:30', end: '14:30' };
    const lunchStart = timeToMinutes(lunch.start);
    const lunchEnd = timeToMinutes(lunch.end);

    const openMin = timeToMinutes(branch.open);
    const closeMin = timeToMinutes(branch.close);
    const lastSlotStart = closeMin - slotMinutes;

    const kolkataNow = getKolkataNow();
    const todayIso = formatDateISO(kolkataNow);
    const isToday = (this.selectedDate === todayIso);
    const currentMinToday = kolkataNow.getHours() * 60 + kolkataNow.getMinutes();
    const minLead = this.config.MIN_LEAD_MINUTES || 60;

    const blockedSlots = this.config.BLOCKED_SLOTS || [];

    const morningSlots = [];
    const afternoonSlots = [];
    const eveningSlots = [];

    let availableCount = 0;
    this.selectedTime = null;

    for (let m = openMin; m <= lastSlotStart; m += slotMinutes) {
      // Skip lunch break
      if (m >= lunchStart && m < lunchEnd) continue;

      const h = Math.floor(m / 60);
      const min = m % 60;
      const timeStr = `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      const timeDisplay = formatTime12h(timeStr);

      // Check if slot is in the past or within lead time today
      let isPastOrLead = false;
      if (isToday) {
        if (m < currentMinToday + minLead) {
          isPastOrLead = true;
        }
      }

      // Check if explicitly blocked
      const isBlocked = blockedSlots.some(s => s.date === this.selectedDate && s.branch === this.selectedBranch && s.time === timeStr);
      const isDisabled = isPastOrLead || isBlocked;

      const slotObj = {
        time: timeStr,
        display: timeDisplay,
        disabled: isDisabled,
        isBlocked: isBlocked,
        isPast: isPastOrLead
      };

      if (!isDisabled) {
        availableCount++;
        if (!this.selectedTime) {
          this.selectedTime = timeStr;
          slotObj.selected = true;
        }
      }

      if (m < 720) {
        morningSlots.push(slotObj); // before 12:00
      } else if (m < 990) {
        afternoonSlots.push(slotObj); // 12:00 to 16:30
      } else {
        eveningSlots.push(slotObj); // 16:30 onwards
      }
    }

    const isTe = this.getLang() === 'te';

    if (availableCount === 0 && isToday) {
      slotsContainer.innerHTML = `
        <div class="slots-empty-notice">
          <p>${isTe ? 'ఈరోజుకు స్లాట్‌లు ముగిశాయి. దయచేసి పైనుండి మరొక తేదీని ఎంచుకోండి.' : 'No more slots available today. Please pick another day above.'}</p>
        </div>
      `;
      // Automatically advance to the next open day if today has no slots
      this.advanceToNextOpenDay();
      return;
    }

    const renderGroup = (title, slots) => {
      if (!slots || slots.length === 0) return '';
      const chips = slots.map(s => {
        const titleAttr = s.isBlocked ? (isTe ? 'title="అందుబాటులో లేదు"' : 'title="Unavailable"') : (s.isPast ? (isTe ? 'title="సమయం ముగిసింది"' : 'title="Time passed"') : '');
        return `
          <label class="slot-chip ${s.disabled ? 'is-disabled' : ''} ${s.isBlocked ? 'is-blocked' : ''}" ${titleAttr}>
            <input type="radio" name="booking-time" value="${s.time}" ${s.selected ? 'checked' : ''} ${s.disabled ? 'disabled' : ''}>
            <span class="slot-text">${s.display}</span>
          </label>
        `;
      }).join('');

      return `
        <div class="slot-group">
          <span class="slot-group-title">${title}</span>
          <div class="slot-group-chips">${chips}</div>
        </div>
      `;
    };

    slotsContainer.innerHTML = `
      ${renderGroup(isTe ? 'ఉదయం' : 'Morning', morningSlots)}
      ${renderGroup(isTe ? 'మధ్యాహ్నం' : 'Afternoon', afternoonSlots)}
      ${renderGroup(isTe ? 'సాయంత్రం' : 'Evening', eveningSlots)}
    `;
  }

  advanceToNextOpenDay() {
    const dateRadios = Array.from(document.querySelectorAll('input[name="booking-date"]:not(:disabled)'));
    const currentIndex = dateRadios.findIndex(r => r.value === this.selectedDate);
    if (currentIndex >= 0 && currentIndex + 1 < dateRadios.length) {
      dateRadios[currentIndex + 1].checked = true;
      this.selectedDate = dateRadios[currentIndex + 1].value;
      this.renderSlots();
      this.updateSummary();
    }
  }

  bindEvents() {
    const form = document.getElementById('appointment-booking-form');
    if (!form) return;

    // Branch selection change
    form.addEventListener('change', (e) => {
      if (e.target.name === 'booking-branch') {
        this.selectedBranch = e.target.value;
        this.renderSlots();
        this.updateSummary();
      } else if (e.target.name === 'booking-treatment') {
        this.selectedTreatment = e.target.value;
        this.updateSummary();
      } else if (e.target.name === 'booking-date') {
        this.selectedDate = e.target.value;
        this.renderSlots();
        this.updateSummary();
      } else if (e.target.name === 'booking-time') {
        this.selectedTime = e.target.value;
        this.updateSummary();
      }
    });

    // Date strip scroll buttons
    const btnPrev = document.getElementById('date-strip-prev');
    const btnNext = document.getElementById('date-strip-next');
    const strip = document.getElementById('booking-date-strip');
    if (btnPrev && strip) {
      btnPrev.addEventListener('click', () => {
        strip.scrollBy({ left: -200, behavior: 'smooth' });
      });
    }
    if (btnNext && strip) {
      btnNext.addEventListener('click', () => {
        strip.scrollBy({ left: 200, behavior: 'smooth' });
      });
    }

    // Form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  updateSummary() {
    const summaryElem = document.getElementById('booking-live-summary');
    if (!summaryElem) return;

    const isTe = this.getLang() === 'te';
    const branchName = this.getBranchName(this.selectedBranch);
    const treatmentName = this.getTreatmentName(this.selectedTreatment);

    let dateFormatted = isTe ? 'తేదీని ఎంచుకోండి' : 'Pick a date';
    if (this.selectedDate) {
      const parts = this.selectedDate.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const weekdays = isTe 
        ? ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = isTe
        ? ['జన', 'ఫిబ్ర', 'మార్చి', 'ఏప్రి', 'మే', 'జూన్', 'జూలై', 'ఆగ', 'సెప్టెం', 'అక్టో', 'నవం', 'డిసెం']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      dateFormatted = isTe 
        ? `${d.getDate()} ${months[d.getMonth()]}, ${weekdays[d.getDay()]}`
        : `${weekdays[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
    }

    let timeFormatted = isTe ? 'సమయాన్ని ఎంచుకోండి' : 'Pick a time';
    if (this.selectedTime) {
      timeFormatted = formatTime12h(this.selectedTime);
    }

    summaryElem.textContent = `${treatmentName} · ${branchName} · ${dateFormatted} · ${timeFormatted}`;
  }

  selectTreatment(treatmentId) {
    const radio = document.querySelector(`input[name="booking-treatment"][value="${treatmentId}"]`);
    if (radio) {
      radio.checked = true;
      this.selectedTreatment = treatmentId;
      this.updateSummary();
    }
  }

  handleSubmit() {
    const nameInput = document.getElementById('booking-name');
    const phoneInput = document.getElementById('booking-phone');
    const noteInput = document.getElementById('booking-note');
    const errContainer = document.getElementById('booking-error-msg');
    const successContainer = document.getElementById('booking-success-msg');
    const isTe = this.getLang() === 'te';

    if (errContainer) errContainer.hidden = true;
    if (successContainer) successContainer.hidden = true;

    // Validate Branch
    if (!this.selectedBranch) {
      this.showError(isTe ? 'దయచేసి ఒక క్లినిక్ బ్రాంచ్‌ను ఎంచుకోండి.' : 'Please select a clinic branch.', 'booking-step-branch');
      return;
    }

    // Validate Treatment
    if (!this.selectedTreatment) {
      this.showError(isTe ? 'దయచేసి ఒక దంత చికిత్సను ఎంచుకోండి.' : 'Please select a dental treatment.', 'booking-step-treatment');
      return;
    }

    // Validate Date
    if (!this.selectedDate) {
      this.showError(isTe ? 'దయచేసి అనుకూలమైన తేదీని ఎంచుకోండి.' : 'Please select a preferred appointment date.', 'booking-step-date');
      return;
    }

    // Validate Time
    const timeRadio = document.querySelector('input[name="booking-time"]:checked');
    if (!timeRadio || !timeRadio.value) {
      this.showError(isTe ? 'దయచేసి అందుబాటులో ఉన్న సమయాన్ని (స్లాట్) ఎంచుకోండి.' : 'Please select an available appointment time slot.', 'booking-step-time');
      return;
    }
    this.selectedTime = timeRadio.value;

    // Validate Name (min 2 chars)
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      this.showError(isTe ? 'దయచేసి మీ పూర్తి పేరు నమోదు చేయండి (కనీసం 2 అక్షరాలు).' : 'Please enter your full name (minimum 2 characters).', 'booking-name');
      return;
    }

    // Validate Phone (10-digit Indian mobile starting with 6-9)
    const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\s+/g, '') : '';
    const phoneClean = phoneVal.replace(/^\+91/, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneClean)) {
      this.showError(isTe ? 'దయచేసి సరైన 10-అంకెల భారతీయ మొబైల్ నంబర్ నమోదు చేయండి.' : 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).', 'booking-phone');
      return;
    }

    const noteVal = noteInput ? noteInput.value.trim() : '';

    // Format human readable date for WhatsApp
    const parts = this.selectedDate.split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const fullWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const humanDate = `${fullWeekdays[d.getDay()]}, ${d.getDate()} ${fullMonths[d.getMonth()]} ${d.getFullYear()}`;

    const data = {
      name: nameVal,
      phone: `+91 ${phoneClean}`,
      branchName: this.getBranchName(this.selectedBranch),
      treatmentName: this.getTreatmentName(this.selectedTreatment),
      dateFormatted: humanDate,
      timeFormatted: formatTime12h(this.selectedTime),
      note: noteVal
    };

    const waUrl = buildWhatsAppLink(data);

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Show honest confirmation message
    if (successContainer) {
      successContainer.textContent = isTe 
        ? 'మీ అభ్యర్థన సిద్ధంగా ఉంది. వాట్సాప్‌లో పంపండి, క్లినిక్ నిర్ధారిస్తుంది.'
        : 'Your request is ready. Send it on WhatsApp and the clinic will confirm your slot.';
      successContainer.hidden = false;
      successContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset details inputs
    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (noteInput) noteInput.value = '';
  }

  showError(msg, focusId) {
    const errContainer = document.getElementById('booking-error-msg');
    if (errContainer) {
      errContainer.textContent = msg;
      errContainer.hidden = false;
    }
    const elem = document.getElementById(focusId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (typeof elem.focus === 'function') elem.focus();
    }
  }
}

// Global initialization
if (typeof window !== 'undefined') {
  window.buildWhatsAppLink = buildWhatsAppLink;
  window.BookingController = BookingController;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getKolkataNow,
    formatDateISO,
    formatTime12h,
    timeToMinutes,
    buildWhatsAppLink,
    BookingController
  };
}
