/**
 * Ivory Dental Studio - Content Data Store
 * All clinical and promotional copy is maintained here for easy staff editing.
 * Formatted with translation-ready multi-language structures ({ en: "...", te: "" }).
 */

const CONTENT = {
  treatments: [
    {
      id: "implants",
      name: {
        en: "Dental Implants in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Dental Implants",
        te: ""
      },
      summary: {
        en: "Permanent, natural-looking tooth replacements anchored with titanium or zirconia posts.",
        te: ""
      },
      priceRange: {
        en: "₹25,000–₹60,000 per implant",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "2–3 visits over 3–4 months (healing dependent)",
        te: ""
      },
      whatItIs: {
        en: "A permanent surgical fixture placed into the jawbone that fuses with natural bone over time, supporting a customized ceramic crown that matches your natural teeth in strength and aesthetics.",
        te: ""
      },
      process: [
        { en: "Comprehensive 3D CBCT imaging and bone density evaluation", te: "" },
        { en: "Gentle, computer-guided placement of surgical-grade titanium post under local anesthesia", te: "" },
        { en: "Osseointegration healing phase (biological bonding with jawbone)", te: "" },
        { en: "Digital 3D scanning and abutment fixation", te: "" },
        { en: "Placement of custom-matched, durable zirconia crown", te: "" }
      ],
      img640: "assets/img/treat-implants-640.webp",
      img1200: "assets/img/treat-implants-1200.webp",
      alt: "Dental implant treatment in Hyderabad",
      isPending: false
    },
    {
      id: "rct",
      name: {
        en: "Root Canal Treatment (RCT) in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Root Canal Treatment (RCT)",
        te: ""
      },
      summary: {
        en: "Painless single-sitting or two-visit therapy to relieve toothache and save infected teeth.",
        te: ""
      },
      priceRange: {
        en: "₹3,000–₹8,000 per tooth",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "1–2 visits (45–60 mins per session)",
        te: ""
      },
      whatItIs: {
        en: "A precise conservative procedure to remove infected or inflamed pulp tissue from inside the tooth, sterilise the internal canals, and seal them securely to prevent reinfection.",
        te: ""
      },
      process: [
        { en: "Digital radiographic diagnosis and localized painless anesthesia", te: "" },
        { en: "Microscopic isolation using a sterile rubber dam", te: "" },
        { en: "Rotary cleaning, shaping, and disinfection of root canals", te: "" },
        { en: "Hermetic sealing with biocompatible gutta-percha", te: "" },
        { en: "Core restoration and preparation for protective dental crown", te: "" }
      ],
      img640: "assets/img/treat-rct-640.webp",
      img1200: "assets/img/treat-rct-1200.webp",
      alt: "Root canal treatment and therapy in Hyderabad",
      isPending: false
    },
    {
      id: "braces",
      name: {
        en: "Braces & Clear Aligners in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Braces & Clear Aligners",
        te: ""
      },
      summary: {
        en: "Straighten crooked teeth with discreet clear aligners or traditional ceramic brackets.",
        te: ""
      },
      priceRange: {
        en: "Braces ₹25,000–₹70,000; Clear aligners ₹80,000–₹2,50,000",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "6–18 months (monitored monthly or bi-monthly)",
        te: ""
      },
      whatItIs: {
        en: "Orthodontic treatment using customized transparent aligners or aesthetic brackets to gently shift misaligned teeth into their ideal functional and aesthetic alignment.",
        te: ""
      },
      process: [
        { en: "Digital 3D intraoral smile scan and cephalometric analysis", te: "" },
        { en: "3D virtual simulation showing your projected smile transformation", te: "" },
        { en: "Custom fabrication of medical-grade thermoplastic aligner series", te: "" },
        { en: "Progressive tray wear with regular check-ups every 4–8 weeks", te: "" },
        { en: "Post-treatment retention aligner to keep teeth perfectly stabilized", te: "" }
      ],
      img640: "assets/img/treat-braces-640.webp",
      img1200: "assets/img/treat-braces-1200.webp",
      alt: "Braces and clear aligners orthodontic care in Hyderabad",
      isPending: false
    },
    {
      id: "crowns",
      name: {
        en: "Crowns & Bridges in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Crowns & Bridges",
        te: ""
      },
      summary: {
        en: "Custom-crafted ceramic and zirconia caps to restore broken, weakened, or missing teeth.",
        te: ""
      },
      priceRange: {
        en: "₹3,000–₹15,000 per tooth",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "2 visits over 3–5 working days",
        te: ""
      },
      whatItIs: {
        en: "Custom-made tooth coverings (crowns) or spans of artificial teeth (bridges) engineered to match natural tooth color, restore chewing ability, and protect teeth weakened by decay or fractures.",
        te: ""
      },
      process: [
        { en: "Gentle conservative tooth preparation under local anesthesia", te: "" },
        { en: "Optical intraoral scanning for high-precision digital fit", te: "" },
        { en: "Placement of comfortable temporary crown", te: "" },
        { en: "Precision CAD/CAM milling of monolithic zirconia or porcelain", te: "" },
        { en: "Permanent bonding with dual-cure dental cement and bite calibration", te: "" }
      ],
      img640: "assets/img/treat-crowns-640.webp",
      img1200: "assets/img/treat-crowns-1200.webp",
      alt: "Dental crowns and bridges restoration in Hyderabad",
      isPending: false
    },
    {
      id: "cleaning",
      name: {
        en: "Teeth Cleaning & Polishing in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Teeth Cleaning & Polishing",
        te: ""
      },
      summary: {
        en: "Gentle ultrasonic plaque removal and enamel polishing for fresh breath and healthy gums.",
        te: ""
      },
      priceRange: {
        en: "₹800–₹2,000",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "Single visit (30–45 mins)",
        te: ""
      },
      whatItIs: {
        en: "A preventive dental cleaning using fine ultrasonic vibrations and irrigation to dislodge hardened tartar (calculus) and surface stains that regular brushing cannot eliminate.",
        te: ""
      },
      process: [
        { en: "Periodontal gum pocket depth assessment", te: "" },
        { en: "Gentle ultrasonic scaling to clear sub-gingival calculus deposits", te: "" },
        { en: "Interdental flossing and antibacterial irrigation", te: "" },
        { en: "Fine micro-abrasive polishing paste application for enamel smoothness", te: "" },
        { en: "Preventive fluoridated topical paste and oral hygiene guidance", te: "" }
      ],
      img640: "assets/img/treat-cleaning-640.webp",
      img1200: "assets/img/treat-cleaning-1200.webp",
      alt: "Teeth cleaning and ultrasonic scaling in Hyderabad",
      isPending: false
    },
    {
      id: "whitening",
      name: {
        en: "Teeth Whitening in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Teeth Whitening",
        te: ""
      },
      summary: {
        en: "Safe in-clinic laser or light-activated bleaching that brightens teeth up to 6–8 shades.",
        te: ""
      },
      priceRange: {
        en: "₹4,000–₹12,000",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "Single visit (60 mins)",
        te: ""
      },
      whatItIs: {
        en: "A safe, monitored cosmetic procedure using dental-grade peroxide gels activated by specialized LED light to dissolve deep-seated coffee, tea, and age-related enamel stains.",
        te: ""
      },
      process: [
        { en: "Pre-treatment shade matching with digital color index", te: "" },
        { en: "Protective gum barrier resin application to protect soft tissue", te: "" },
        { en: "Application of specialized hydrogen/carbamide whitening gel", te: "" },
        { en: "Three 15-minute LED light activation intervals", te: "" },
        { en: "Post-bleach fluoride desensitizing polish and diet guidance", te: "" }
      ],
      img640: "assets/img/treat-whitening-640.webp",
      img1200: "assets/img/treat-whitening-1200.webp",
      alt: "Teeth whitening and cosmetic smile brightening in Hyderabad",
      isPending: false
    },
    {
      id: "kids",
      name: {
        en: "Kids Dentistry (Pedodontics) in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Kids Dentistry",
        te: ""
      },
      summary: {
        en: "Gentle, stress-free dental care tailored specifically for infants, children, and teens.",
        te: ""
      },
      priceRange: {
        en: "₹500–₹3,000 per visit",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "30–45 mins per appointment",
        te: ""
      },
      whatItIs: {
        en: "Child-friendly dental care focusing on preventive check-ups, cavity protection, painless fillings, and habit counseling delivered in an empathetic, comforting atmosphere.",
        te: ""
      },
      process: [
        { en: "Friendly, non-clinical meet & greet to build child trust", te: "" },
        { en: "Gentle inspection of primary and developing permanent dentition", te: "" },
        { en: "Protective fissure sealants and topical fluoride varnish", te: "" },
        { en: "Painless restorative treatments when required", te: "" },
        { en: "Engaging brushing technique demonstration for parents and child", te: "" }
      ],
      img640: "assets/img/treat-kids-640.webp",
      img1200: "assets/img/treat-kids-1200.webp",
      alt: "Pediatric kids dental care in Hyderabad",
      isPending: false
    },
    {
      id: "dentures",
      name: {
        en: "Dentures & Full Mouth Rehabilitation in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Dentures",
        te: ""
      },
      summary: {
        en: "Comfortable complete or partial dentures designed for natural smile aesthetics and chewing.",
        te: ""
      },
      priceRange: {
        en: "₹6,000–₹30,000",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "3–4 visits over 2–3 weeks",
        te: ""
      },
      whatItIs: {
        en: "Custom removable prosthetics (acrylic, flexible, or BPS cast-partial) meticulously molded to fit your oral contours comfortably, restoring proper chewing and facial structure.",
        te: ""
      },
      process: [
        { en: "Initial oral tissue examination and anatomic impressions", te: "" },
        { en: "Secondary border molding and jaw relation registration", te: "" },
        { en: "Aesthetic wax trial for shade, tooth position, and bite confirmation", te: "" },
        { en: "Final denture curing and high-precision tissue adjustment", te: "" },
        { en: "Follow-up check-in to ensure irritation-free daily comfort", te: "" }
      ],
      img640: "assets/img/treat-dentures-640.webp",
      img1200: "assets/img/treat-dentures-1200.webp",
      alt: "Custom dentures and dental prosthetics in Hyderabad",
      isPending: false
    },
    {
      id: "extraction",
      name: {
        en: "Tooth Extractions & Wisdom Tooth Surgery in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "Tooth Extractions",
        te: ""
      },
      summary: {
        en: "Gentle, painless removal of unsavable teeth or impacted wisdom teeth under anesthesia.",
        te: ""
      },
      priceRange: {
        en: "₹500–₹3,000 (surgical wisdom tooth ₹3,000–₹10,000)",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "Single visit (30–60 mins)",
        te: ""
      },
      whatItIs: {
        en: "A routine minor surgical or simple procedure to carefully extract severely decayed, fractured, or impacted wisdom teeth with zero discomfort, followed by guided healing protocols.",
        te: ""
      },
      process: [
        { en: "Digital X-ray evaluation of root curvature and nerve proximity", te: "" },
        { en: "Deep local anesthesia administration for total numbness", te: "" },
        { en: "Minimally invasive atraumatic tooth luxation and removal", te: "" },
        { en: "Sterile socket disinfection and placement of dissolvable sutures if needed", te: "" },
        { en: "Detailed post-care cold pack kit and medication prescription", te: "" }
      ],
      img640: "assets/img/treat-extraction-640.webp",
      img1200: "assets/img/treat-extraction-1200.webp",
      alt: "Painless tooth extraction and wisdom tooth care in Hyderabad",
      isPending: false
    },
    {
      id: "checkup",
      name: {
        en: "General Dental Check-ups & Consultations in Hyderabad",
        te: ""
      },
      shortTitle: {
        en: "General Check-ups",
        te: ""
      },
      summary: {
        en: "Comprehensive oral health examination, digital imaging, and transparent treatment plan.",
        te: ""
      },
      priceRange: {
        en: "₹300–₹800",
        te: ""
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: ""
      },
      duration: {
        en: "Single visit (20–30 mins)",
        te: ""
      },
      whatItIs: {
        en: "A comprehensive baseline diagnostic session covering each tooth, gum health, bite dynamics, and soft tissues to spot early problems before they cause pain.",
        te: ""
      },
      process: [
        { en: "Detailed discussion of your dental concerns and medical history", te: "" },
        { en: "Tooth-by-tooth intraoral camera inspection", te: "" },
        { en: "Digital low-dose X-rays for hidden interdental cavities", te: "" },
        { en: "Gum health and oral screening evaluation", te: "" },
        { en: "Transparent consultation with personalized treatment estimate", te: "" }
      ],
      img640: "assets/img/treat-checkup-640.webp",
      img1200: "assets/img/treat-checkup-1200.webp",
      alt: "General dental check-up and consultation in Hyderabad",
      isPending: false
    }
  ],

  doctors: [
    {
      id: "implantologist",
      name: {
        en: "Dr. Demo Implantologist",
        te: ""
      },
      role: {
        en: "Chief Implantologist & Prosthodontist",
        te: ""
      },
      qualifications: "BDS, MDS (Prosthodontics & Implantology)",
      experience: "14+ Years Clinical Experience",
      specialisations: {
        en: "Full-mouth rehabilitation, immediate-load implants, bone grafting, digital surgical guides.",
        te: ""
      },
      bio: {
        en: "Specialist in computer-guided implant surgeries and restorative prosthetics, dedicated to restoring permanent smiles with minimal discomfort.",
        te: ""
      },
      img640: "assets/img/doc-implantologist-640.webp",
      img1200: "assets/img/doc-implantologist-1200.webp",
      alt: "Dr. Demo Implantologist at Ivory Dental Studio Hyderabad",
      isPending: false
    },
    {
      id: "endodontist",
      name: {
        en: "Dr. Demo Endodontist",
        te: ""
      },
      role: {
        en: "Senior Endodontist (Root Canal Specialist)",
        te: ""
      },
      qualifications: "BDS, MDS (Conservative Dentistry & Endodontics)",
      experience: "11+ Years Clinical Experience",
      specialisations: {
        en: "Microscopic endodontics, painless single-visit RCT, complex retreatment, ceramic inlays.",
        te: ""
      },
      bio: {
        en: "Expert in rotary microscopic root canals and conservative dentistry, focused on preserving natural dentition painlessly.",
        te: ""
      },
      img640: "assets/img/doc-endodontist-640.webp",
      img1200: "assets/img/doc-endodontist-1200.webp",
      alt: "Dr. Demo Endodontist at Ivory Dental Studio Hyderabad",
      isPending: false
    },
    {
      id: "ortho-pedo",
      name: {
        en: "Dr. Demo Orthodontist & Pedodontist",
        te: ""
      },
      role: {
        en: "Orthodontist & Pediatric Dentistry Specialist",
        te: ""
      },
      qualifications: "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
      experience: "9+ Years Clinical Experience",
      specialisations: {
        en: "Clear aligner therapy, interceptive orthodontics, gentle pediatric care, space maintainers.",
        te: ""
      },
      bio: {
        en: "Passionate about creating harmonious smiles for teens and adults while delivering positive, stress-free dental visits for young children.",
        te: ""
      },
      img640: "assets/img/doc-orthodontist-640.webp",
      img1200: "assets/img/doc-orthodontist-1200.webp",
      alt: "Dr. Demo Orthodontist and Pedodontist at Ivory Dental Studio Hyderabad",
      isPending: false
    }
  ],

  gallery: [
    {
      id: "smile",
      title: { en: "Smile Result", te: "" },
      caption: { en: "Smile result", te: "" },
      img640: "assets/img/gallery-smile-640.webp",
      img1200: "assets/img/gallery-smile-1200.webp",
      alt: "Patient smile transformation result at dental clinic in Hyderabad",
      isPending: false
    },
    {
      id: "before-after",
      title: { en: "Smile Makeover Before & After", te: "" },
      caption: { en: "Before & after smile transformation", te: "" },
      img640: "assets/img/gallery-before-after-640.webp",
      img1200: "assets/img/gallery-before-after-1200.webp",
      alt: "Before and after comparison of dental smile makeover at Ivory Dental Studio Hyderabad",
      isPending: false
    },
    {
      id: "instruments",
      title: { en: "Sterile Instruments & Equipment", te: "" },
      caption: { en: "Sterile instruments and equipment", te: "" },
      img640: "assets/img/treat-extraction-640.webp",
      img1200: "assets/img/treat-extraction-1200.webp",
      alt: "Sterile surgical dental instruments and materials",
      isPending: false
    },
    {
      id: "reception",
      title: { en: "Welcoming Reception", te: "" },
      caption: { en: "Welcoming clinic reception", te: "" },
      img640: "assets/img/gallery-reception-640.webp",
      img1200: "assets/img/gallery-reception-1200.webp",
      alt: "Welcoming reception and waiting lounge at Ivory Dental Studio Hyderabad",
      isPending: false
    },
    {
      id: "checkup-action",
      title: { en: "Clinical Check-up in Progress", te: "" },
      caption: { en: "Check-up in progress", te: "" },
      img640: "assets/img/treat-checkup-640.webp",
      img1200: "assets/img/treat-checkup-1200.webp",
      alt: "Dental examination under sterile conditions in Hyderabad",
      isPending: false
    },
    {
      id: "sterilisation",
      title: { en: "Sterilisation Setup", te: "" },
      caption: { en: "Sterilisation & autoclave setup", te: "" },
      img640: "assets/img/gallery-sterilisation-640.webp",
      img1200: "assets/img/gallery-sterilisation-1200.webp",
      alt: "Hospital-grade sterilisation and autoclave equipment in Hyderabad",
      isPending: false
    }
  ],

  reviews: {
    overallRating: 4.8,
    totalReviews: 350,
    items: [
      {
        id: "rev-1",
        author: "Ramesh",
        rating: 5,
        treatmentTag: "Dental Implants",
        text: {
          en: "I was extremely anxious about getting an implant after a tooth fracture. The team explained every step with 3D scans and the surgery was completely painless. It has now been six months and the crown feels just like my natural tooth.",
          te: ""
        }
      },
      {
        id: "rev-2",
        author: "Priya",
        rating: 5,
        treatmentTag: "Root Canal Treatment",
        text: {
          en: "Had acute toothache on a weekday evening. They scheduled an emergency appointment quickly. The root canal was finished in a single sitting without any discomfort. Highly recommend their gentle approach.",
          te: ""
        }
      },
      {
        id: "rev-3",
        author: "Ananya",
        rating: 5,
        treatmentTag: "Clear Aligners",
        text: {
          en: "Completed my aligner treatment here in under 10 months. The 3D scan at the beginning showed me exactly how my teeth would move, and the end result matches the simulation perfectly.",
          te: ""
        }
      },
      {
        id: "rev-4",
        author: "Vikram",
        rating: 4.5,
        treatmentTag: "Cleaning & Polishing",
        text: {
          en: "Very hygienic clinic environment. The ultrasonic cleaning was gentle on sensitive gums, and the doctor gave practical flossing tips without pushing unnecessary procedures.",
          te: ""
        }
      },
      {
        id: "rev-5",
        author: "Sneha",
        rating: 5,
        treatmentTag: "Kids Dentistry",
        text: {
          en: "Took my 6-year-old daughter for her first filling. The pediatric dentist was calm, playful, and patient. She came out smiling and proud of her bravery sticker. Outstanding pediatric care.",
          te: ""
        }
      },
      {
        id: "rev-6",
        author: "Karthik",
        rating: 5,
        treatmentTag: "Teeth Whitening",
        text: {
          en: "Did the in-office whitening session before my sister's wedding. Saw a noticeable difference of several shades within one hour, and had zero post-procedure sensitivity.",
          te: ""
        }
      }
    ]
  },

  offers: [
    {
      id: "camp",
      title: {
        en: "Free Dental Check-up Camp",
        te: ""
      },
      badge: {
        en: "Community Initiative",
        te: ""
      },
      description: {
        en: "Comprehensive visual oral exam, digital intraoral photography, and personalized dental health consultation at zero cost.",
        te: ""
      },
      features: [
        { en: "Full 32-tooth clinical evaluation", te: "" },
        { en: "Digital cavity & gum assessment", te: "" },
        { en: "Personalized written care plan", te: "" }
      ],
      validity: {
        en: "Valid through this month • Prior booking required",
        te: ""
      },
      whatsappMsg: "Hi, I would like to book an appointment for the Free Dental Check-up Camp offer."
    },
    {
      id: "makeover",
      title: {
        en: "Smile Makeover Package",
        te: ""
      },
      badge: {
        en: "Aesthetic Special",
        te: ""
      },
      description: {
        en: "Combines professional in-chair teeth whitening, ultrasonic scaling, and enamel polishing for an instantly refreshed smile.",
        te: ""
      },
      features: [
        { en: "In-office LED teeth whitening session", te: "" },
        { en: "Complete ultrasonic scaling & stain removal", te: "" },
        { en: "Protective fluoride desensitizing polish", te: "" }
      ],
      validity: {
        en: "Special package rate • Limited slots per week",
        te: ""
      },
      whatsappMsg: "Hi, I am interested in the Smile Makeover Package offer. Please share availability."
    },
    {
      id: "family",
      title: {
        en: "Family Cleaning Pack",
        te: ""
      },
      badge: {
        en: "Family Value",
        te: ""
      },
      description: {
        en: "Comprehensive preventive dental care package covering ultrasonic scaling and polishing for up to 3 family members.",
        te: ""
      },
      features: [
        { en: "Full cleaning & polishing for 3 family members", te: "" },
        { en: "Complimentary check-up for children under 12", te: "" },
        { en: "Convenient same-day weekend scheduling", te: "" }
      ],
      validity: {
        en: "Ongoing family offer • Applicable on all weekdays & Saturdays",
        te: ""
      },
      whatsappMsg: "Hi, I want to enquire about booking the Family Cleaning Pack for my family."
    }
  ],

  branches: [
    {
      id: "banjara",
      name: {
        en: "Banjara Hills Branch",
        te: ""
      },
      area: "Banjara Hills, Hyderabad",
      address: {
        en: "Plot 42, Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
        te: ""
      },
      timings: {
        en: "Mon–Sat 9:30 AM – 8:00 PM | Sunday: Closed",
        te: ""
      },
      mapQuery: "Banjara+Hills,+Hyderabad",
      mapUrl: "https://www.google.com/maps?q=Banjara%20Hills%2C%20Hyderabad&hl=en&z=14&output=embed",
      mapEmbedUrl: "https://www.google.com/maps?q=Banjara%20Hills%2C%20Hyderabad&hl=en&z=14&output=embed",
      directionsUrl: "https://maps.google.com/?q=Banjara+Hills,+Hyderabad"
    },
    {
      id: "madhapur",
      name: {
        en: "Madhapur Branch",
        te: ""
      },
      area: "Madhapur, Hyderabad",
      address: {
        en: "First Floor, Madhapur Main Road, Hyderabad, Telangana 500081",
        te: ""
      },
      timings: {
        en: "Mon–Sat 10:00 AM – 8:30 PM | Sunday: Closed",
        te: ""
      },
      mapQuery: "Madhapur,+Hyderabad",
      mapUrl: "https://www.google.com/maps?q=Madhapur%2C%20Hyderabad&hl=en&z=14&output=embed",
      mapEmbedUrl: "https://www.google.com/maps?q=Madhapur%2C%20Hyderabad&hl=en&z=14&output=embed",
      directionsUrl: "https://maps.google.com/?q=Madhapur,+Hyderabad"
    }
  ]
};

// Freeze content to ensure data safety
Object.freeze(CONTENT);

// Expose on global window object and node environment
if (typeof window !== 'undefined') {
  window.CONTENT = CONTENT;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONTENT;
}

