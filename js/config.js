/**
 * Ivory Dental Studio - Global Clinic Configuration
 * Fictional clinic demo configuration.
 *
 * All clinic parameters, operational hours, branches, booking constraints,
 * and contact numbers live in this single source of truth.
 *
 * HOW CLINIC STAFF CAN EDIT:
 * - Update BRANCHES to change branch open/close hours.
 * - Add dates to CLOSED_DATES (YYYY-MM-DD) for clinic holidays.
 * - Add entries to BLOCKED_SLOTS to reserve or block specific appointments.
 */

const CONFIG = {
  CLINIC_NAME: "Ivory Dental Studio",
  TAGLINE: "Painless • Modern • Trusted",
  CITY: "Hyderabad",
  STATE: "Telangana",
  COUNTRY: "India",

  // Demo placeholders - replace with actual clinic numbers for production
  CLINIC_PHONE: "+910000000000",
  CLINIC_PHONE_DISPLAY: "+91 00000 00000",
  WHATSAPP_NUMBER: "910000000000",

  TIMINGS_SHORT: "Mon–Sat 9:30 AM – 8:00 PM",
  TIMINGS_FULL: "Monday to Saturday: 9:30 AM – 8:00 PM | Sunday: Closed",
  EMERGENCY_NOTE: "WhatsApp inquiries are answered during clinic hours. For acute trauma, severe bleeding, or swelling outside operating hours, please visit your nearest hospital emergency department immediately.",

  // Operational Branches & Hours
  BRANCHES: {
    banjara: {
      id: "banjara",
      name: "Banjara Hills",
      cityArea: "Banjara Hills, Hyderabad",
      address: "Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
      open: "09:30",
      close: "20:00",
      days: "Mon–Sat",
      sunday: "Closed",
      mapEmbedUrl: "https://www.google.com/maps?q=Banjara%20Hills%2C%20Hyderabad&hl=en&z=14&output=embed",
      mapUrl: "https://www.google.com/maps?q=Banjara%20Hills%2C%20Hyderabad&hl=en&z=14&output=embed",
      directionsUrl: "https://maps.google.com/?q=Banjara+Hills,+Hyderabad"
    },
    madhapur: {
      id: "madhapur",
      name: "Madhapur",
      cityArea: "Madhapur, Hyderabad",
      address: "Hitec City Main Road, Madhapur, Hyderabad, Telangana 500081",
      open: "10:00",
      close: "20:30",
      days: "Mon–Sat",
      sunday: "Closed",
      mapEmbedUrl: "https://www.google.com/maps?q=Madhapur%2C%20Hyderabad&hl=en&z=14&output=embed",
      mapUrl: "https://www.google.com/maps?q=Madhapur%2C%20Hyderabad&hl=en&z=14&output=embed",
      directionsUrl: "https://maps.google.com/?q=Madhapur,+Hyderabad"
    }
  },

  // Appointment scheduling parameters
  SLOT_MINUTES: 30,
  LUNCH_BREAK: { start: "13:30", end: "14:30" },
  BOOKING_DAYS_AHEAD: 14,
  MIN_LEAD_MINUTES: 60, // Minimum lead time from now for today's slots

  // Dates when the clinic is completely closed (holidays/maintenance)
  // Format: 'YYYY-MM-DD'
  // Example: CLOSED_DATES: ['2026-12-25', '2027-01-01']
  CLOSED_DATES: [],

  // Individual slots that are booked, reserved, or blocked by the staff
  // Format: { date: 'YYYY-MM-DD', branch: 'banjara' | 'madhapur', time: 'HH:MM' }
  // Example: BLOCKED_SLOTS: [{ date: '2026-11-12', branch: 'banjara', time: '11:30' }]
  BLOCKED_SLOTS: [
    // Pre-configured demo blocked slot to test unavailable state
    { date: "2026-11-12", branch: "banjara", time: "11:30" }
  ],

  // Helper generator for WhatsApp enquiry links
  getWhatsAppUrl(customMessage) {
    const defaultMsg = "Hi Ivory Dental Studio, I would like to enquire about an appointment.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    return `https://wa.me/${this.WHATSAPP_NUMBER}?text=${text}`;
  },

  // Helper generator for telephone links
  getPhoneUrl() {
    return `tel:${this.CLINIC_PHONE}`;
  }
};

// Expose on global window object and node environment
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
