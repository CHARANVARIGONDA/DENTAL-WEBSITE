/**
 * IVORY DENTAL STUDIO - 24/7 AI CLINICAL ASSISTANT & PATIENT RECALL SYSTEM (PHASE 2)
 * Compliant with PRD Sections 4 (FR-10, FR-11), Sections 7.1 & 7.3.
 * Pure vanilla JavaScript with zero third-party runtime dependencies.
 */

(function () {
  'use strict';

  // 1. COMPREHENSIVE CLINICAL KNOWLEDGE BASE & BILINGUAL INTENT ENGINE (FR-10)
  function isTeluguQuery(text = '') {
    return (window.currentLang === 'te') ||
           /[\u0C00-\u0C7F]/.test(text) ||
           /\b(namaskaram|namaste|bagunnara|noppi|pallu|dantla|kharachu|dhara|samayam|cheppandi|evaru|ekkada|kavali|entha)\b/i.test(text);
  }

  const KNOWLEDGE_BASE = {
    greetings: {
      match: /\b(hi|hello|hey|start|help)\b|good\s*morning|good\s*evening|good\s*afternoon|namaste|namaskaram|నమస్తే|నమస్కారం|హలో|బాగున్నారా/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `నమస్కారం! **ఐవరీ డెంటల్ స్టూడియో హైదరాబాద్**కు స్వాగతం. నేను మీ 24/7 AI క్లినికల్ అసిస్టెంట్‌ని.

నేను మీకు క్రింది వివరాలను అందించగలను:
• **దంత చికిత్సల వివరాలు & ధరలు** (ఇంప్లాంట్స్, రూట్ కెనాల్, క్లిప్పులు & అలైన్ర్స్, క్లీనింగ్, టీత్ వైట్నింగ్, క్యాప్స్)
• **క్లినిక్ పనివేళలు & లైవ్ స్టేటస్** (బంజారా హిల్స్ & మాదాపూర్)
• **క్లినిక్ చిరునామా & గూగుల్ మ్యాప్స్ మార్గాలు**
• **MDS నిపుణులైన వైద్యుల వివరాలు**
• **తీవ్రమైన పంటి నొప్పి & అత్యవసర వైద్య సలహాలు**
• **వాట్సాప్ ద్వారా సులభమైన అపాయింట్‌మెంట్ బుకింగ్**
• **6-నెలల ఉచిత డెంటల్ కేర్ రిమైండర్ (FR-11)**

ఈరోజు మీకు ఏ సమాచారం కావాలి?`;
        }
        return `Hello! Welcome to **Ivory Dental Studio Hyderabad**. I am your 24/7 AI Clinical Assistant.

I can immediately guide you through:
• **Indicative Treatment Pricing & Procedures** (Implants, RCT, Aligners, Braces, Whitening, Crowns)
• **Live Clinic Working Hours & Timings** (Banjara Hills & Madhapur)
• **Branch Locations & Google Maps Directions**
• **Specialist Doctor Credentials (MDS)**
• **Dental Pain & Emergency First-Aid Guidance**
• **Instant WhatsApp Appointment Handoff**
• **6-Month Routine Care Recall Reminders (FR-11)**

How may I assist you with your smile today?`;
      }
    },

    implants: {
      match: /(implant|implants|missing\s*tooth|replace\s*tooth|permanent\s*tooth|titanium\s*post|zirconia\s*implant|bone\s*graft|denture\s*alternative|ఇంప్లాంట్స్|ఇంప్లాంట్|కొత్త\s*పన్ను|కృత్రిమ\s*పన్ను|శాశ్వత\s*పన్ను|పన్ను\s*పోయింది)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🦷 **డెంటల్ ఇంప్లాంట్స్ చికిత్స (శాశ్వత దంత అమరిక):**

• **విధానం:** ఊడిపోయిన పంటి స్థానంలో దవడ ఎముకలో బయోకాంపాటిబుల్ టైటానియం లేదా జిర్కోనియా పోస్ట్ అమర్చి, సహజ పంటి వలె పనిచేసే జిర్కోనియా క్రౌన్ బిగించే ఆధునిక చికిత్స.
• **మన్నిక:** సరైన జాగ్రత్తలతో 25+ సంవత్సరాలు లేదా జీవితాంతం సహజ పంటిలాగే బలంగా ఉంటుంది.
• **నొప్పి నివారణ:** కంప్యూటరైజ్డ్ లోకల్ అనస్థీషియా ద్వారా చికిత్స సమయంలో నొప్పి ఏమాత్రం తెలియదు.
• **ధరలు:** ఒక్కో ఇంప్లాంట్‌కు ₹25,000 – ₹60,000 (3D CBCT స్కానింగ్ మరియు సర్జికల్ ప్లానింగ్ కలిపి).
• **ఈఎంఐ:** బజాజ్ ఫిన్‌సర్వ్ ద్వారా 0% వడ్డీతో నెలవారీ సులభ వాయిదాలు (నెలకు ₹3,500 నుండి).`;
        }
        return `🦷 **Dental Implants at Ivory Dental Studio:**

• **What It Is:** Permanent, biocompatible titanium or zirconia posts surgically integrated with your jawbone, supporting custom-matched zirconia ceramic crowns.
• **Longevity:** Designed to function just like natural teeth and last 25+ years or a lifetime with regular 6-month check-ups.
• **Painless Protocol:** Guided by 3D CBCT digital scans and placed under profound computerized local anesthesia for a zero-dread experience.
• **Indicative Pricing:** ₹25,000 – ₹60,000 per implant.
• **Financing:** No-cost EMI available via Bajaj Finserv and major credit cards starting from ₹3,500/month.`;
      }
    },

    rct: {
      match: /(rct|root\s*canal|tooth\s*nerve|pulpectomy|single\s*sitting|rotary\s*endodontics|రూట్\s*కెనాల్|ఆర్\s*సి\s*టి|నరాల\s*చికిత్స|పంటి\s*నరం|పుప్పి\s*పన్ను|పిప్పి\s*పన్ను)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🔬 **రూట్ కెనాల్ చికిత్స (RCT):**

• **విధానం:** పంటి లోపలి ఇన్‌ఫెక్షన్ సోకిన గుజ్జును (పల్ప్) రోటరీ పరికరాలతో తొలగించి, నరాల కాలువలను క్రిమిరహితం చేసి బయోకాంపాటిబుల్ గుట్టా-పర్చాతో సీల్ చేసే సురక్షిత చికిత్స.
• **సింగిల్ సిట్టింగ్:** 80% సాధారణ కేసులలో కేవలం 45 నిమిషాల్లో ఒక్క సిట్టింగ్‌లోనే ఎలాంటి నొప్పి లేకుండా పూర్తి చేయవచ్చు.
• **ధరలు:** ఒక్కో పంటికి ₹4,500 – ₹9,000 (ఇన్‌ఫెక్షన్ తీవ్రతను బట్టి). రక్షణ జిర్కోనియా క్రౌన్/క్యాప్: ₹4,000 – ₹18,000.
• **నొప్పి నివారణ:** చికిత్సకు ముందు మైక్రో-మీటర్డ్ నంబింగ్ జెల్స్ ఉపయోగించడం వల్ల సూది గుచ్చిన భావన కూడా ఉండదు.`;
        }
        return `🔬 **Root Canal Treatment (RCT) at Ivory Dental Studio:**

• **Clinical Goal:** Painless conservative therapy to remove inflamed/infected pulp tissue, sterilize root canals, and save your natural tooth from extraction.
• **Single-Sitting Available:** 80% of uncomplicated cases are completed in a single comfortable 45-minute visit using rotary endodontics and apex locators.
• **Zero Pain Assurance:** Performed with computerized pre-numbing gels and tested profound local anesthesia so you feel zero sharp pain.
• **Indicative Pricing:** ₹4,500 – ₹9,000 per tooth. Protective ceramic/zirconia crown: ₹4,000 – ₹18,000.`;
      }
    },

    braces_aligners: {
      match: /(brace|braces|aligner|aligners|invisalign|clear\s*aligner|straighten|crooked|teeth\s*gap|gap\s*in\s*teeth|ceramic\s*braces|metal\s*braces|orthodont|క్లిప్పులు|అలైన్ర్స్|వంకర\s*పళ్ళు|సందులు|పంటి\s*సందు|దంతాల\s*అమరిక)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `✨ **క్లిప్పులు & క్లియర్ అలైన్ర్స్ (ఆర్థోడాంటిక్స్):**

• **క్లియర్ అలైన్ర్స్ (కనిపించనివి):** పారదర్శక ప్లాస్టిక్ ట్రేలు. తినేటప్పుడు సులభంగా తీసివేయవచ్చు. ఆహార పరిమితులు ఉండవు. చికిత్స వ్యవధి: 6–14 నెలలు. ధర: ₹60,000 – ₹2,20,000.
• **సెరామిక్ & మెటల్ క్లిప్పులు:** క్లిష్టమైన వంకర పళ్లను చక్కదిద్దే సమర్థవంతమైన విధానం. ధర: ₹25,000 – ₹70,000.
• **3D డిజిటల్ ప్రివ్యూ:** చికిత్స ప్రారంభించే ముందే మీ చిరునవ్వు ఎలా మారబోతోందో కంప్యూటర్ 3D సిమ్యులేషన్‌లో ప్రత్యక్షంగా చూడవచ్చు.
• **ఈఎంఐ:** నెలవారీ వాయిదాల సౌకర్యం కలదు.`;
        }
        return `✨ **Orthodontic Alignment (Braces & Clear Aligners):**

• **Clear Aligners (Invisible):** Custom-fabricated medical-grade transparent trays. Removable for meals and brushing, with no metal wires. Duration: 6–14 months. Indicative Cost: ₹60,000 – ₹2,20,000.
• **Ceramic & Traditional Braces:** Highly effective for complex bite realignments and severe crowding. Indicative Cost: ₹25,000 – ₹70,000.
• **3D Bite Simulation:** We scan your teeth with high-precision digital intraoral scanners to show you a 3D simulation of your aligned smile before you decide.`;
      }
    },

    cleaning: {
      match: /(clean|cleaning|scaling|polish|polishing|tartar|plaque|calculus|stain|stains|yellow\s*teeth|pyorrhea|క్లీనింగ్|పాలిషింగ్|స్కేలింగ్|గార|పాచి|మరకలు|పళ్ళు\s*తోముకోవడం|పంటి\s*శుభ్రత)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🧼 **దంతాల క్లీనింగ్ & అల్ట్రాసోనిక్ స్కేలింగ్:**

• **ఎనామిల్ దెబ్బతింటుందా?** లేదు! మా అధునాతన అల్ట్రాసోనిక్ స్కేలర్లు కేవలం నీటి తుంపర మరియు సూక్ష్మ వైబ్రేషన్లతో గార, పాచిని తొలగిస్తాయి. ఎనామిల్ ఏమాత్రం అరిగిపోదు లేదా పళ్ళు లూజ్ అవ్వవు.
• **ఎందుకు అవసరం?** దంతాల మధ్య చేరిన గార చిగుళ్ల వ్యాధులకు, రక్తస్రావానికి మరియు నోటి దుర్వాసనకు దారితీస్తుంది. ప్రతి 6 నెలలకు ఒకసారి క్లీనింగ్ చేయించుకోవడం ఉత్తమం.
• **ధర:** ₹1,200 – ₹2,500 (పూర్తి స్కేలింగ్, స్టెయిన్ రిమూవల్ మరియు ఫ్లోరైడ్ పాలిషింగ్ కలిపి).`;
        }
        return `🧼 **Teeth Cleaning & Ultrasonic Scaling:**

• **Does it damage enamel?** No! Ultrasonic scalers use water cavitation and microscopic vibrations to lift hardened tartar (calculus) and bacterial plaque without scratching enamel or loosening teeth.
• **Why it matters:** Prevents gum bleeding, chronic bad breath, and long-term bone loss (periodontitis). Recommended every 6 months.
• **Indicative Cost:** ₹1,200 – ₹2,500 (covers full ultrasonic scaling, stubborn stain removal, and polishing).`;
      }
    },

    whitening: {
      match: /(whiten|whitening|bleach|bleaching|brighten|yellowish|discolor|stained\s*smile|white\s*teeth|టీత్\s*వైట్నింగ్|బ్లీచింగ్|పసుపు\s*పళ్ళు|తెల్లబడటం|పంటి\s*రంగు)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🌟 **ప్రొఫెషనల్ టీత్ వైట్నింగ్:**

• **ఫలితాలు:** క్లినిక్‌లో ఆధునిక LED లైట్ యాక్టివేషన్ ద్వారా కేవలం 60 నిమిషాల సెషన్‌లో పంటి సహజ రంగు 6 నుండి 8 షేడ్స్ వరకు తెల్లబడుతుంది.
• **సురక్షితమైన రక్షణ:** చిగుళ్లకు ప్రత్యేక ప్రొటెక్టివ్ లేయర్ వేసి MDS నిపుణుల సమక్షంలో చేస్తారు. చికిత్స తర్వాత సెన్సిటివిటీ రాకుండా చూసుకుంటాము.
• **ధర:** ₹7,000 – ₹15,000 (సురక్షితమైన ప్రీమియం జెల్ మరియు హోమ్-కేర్ సలహాలు కలిపి).`;
        }
        return `🌟 **Professional In-Office Teeth Whitening:**

• **Noticeable Results:** Brightens natural tooth shade safely by up to 6–8 shades in a single 60-minute in-chair session.
• **Enamel Safety:** Uses clinically approved LED light activation with liquid dam gum barriers to eliminate tissue irritation and minimize sensitivity.
• **Indicative Pricing:** ₹7,000 – ₹15,000.`;
      }
    },

    crowns_bridges: {
      match: /(crown|crowns|bridge|bridges|cap|caps|zirconia|ceramic\s*crown|broken\s*tooth\s*cover|క్యాప్స్|క్రౌన్స్|బ్రిడ్జ్|జిర్కోనియా\s*క్యాప్|క్యాప్|పంటి\s*క్యాప్)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `👑 **దంతాల క్యాప్స్ & బ్రిడ్జెస్ (క్రౌన్స్):**

• **జిర్కోనియా ప్రత్యేకత:** అత్యున్నత దృఢత్వం కలిగిన మోనోలిథిక్ జిర్కోనియా క్రౌన్స్ సహజ పంటి రంగులో ఉంటూ నమలడానికి పూర్తి బలాన్నిస్తాయి.
• **ఎప్పుడు వేయాలి:** రూట్ కెనాల్ చేసిన తర్వాత పన్ను విరిగిపోకుండా క్యాప్ తప్పనిసరి. అలాగే పన్ను ఊడిపోయిన ఖాళీని నింపడానికి బ్రిడ్జ్ ఉపయోగిస్తాము.
• **ధర:** ఒక్కో యూనిట్‌కు ₹4,000 – ₹18,000 (డిజిటల్ 3D స్కానింగ్ మరియు వారంటీతో).`;
        }
        return `👑 **Crowns & Bridges Restorations:**

• **Materials:** We specialize in high-strength monolithic zirconia and aesthetic lithium disilicate (E.max) ceramics that mirror natural tooth translucency and resist chipping.
• **When Recommended:** Crucial after Root Canal Treatment (RCT) to protect brittle tooth structure from biting fractures, or to bridge gaps left by extractions.
• **Indicative Pricing:** ₹4,000 – ₹18,000 per unit (backed by multi-year warranty).`;
      }
    },

    wisdom_tooth: {
      match: /(wisdom|third\s*molar|impacted|extract|extraction|remove\s*tooth|pull\s*tooth|surgical\s*removal|విజ్డమ్\s*టూత్|జ్ఞాన\s*దంతం|పన్ను\s*తీయడం|దంతం\s*తొలగింపు)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🦷 **విజ్డమ్ టూత్ (జ్ఞాన దంతం) & సర్జరీ:**

• **ఎప్పుడు తొలగించాలి:** దవడ చివర జ్ఞాన దంతం అడ్డంగా మొలవడం, తీవ్రమైన దవడ నొప్పి, చిగుళ్ల వాపు లేదా పక్క పంటికి హాని కలిగించే సందర్భాల్లో తొలగించడం తప్పనిసరి.
• **నొప్పి లేని సర్జరీ:** లోకల్ అనస్థీషియా ద్వారా చికిత్స సమయంలో నొప్పి ఏమాత్రం తెలియదు.
• **ధరలు:** సాధారణ పన్ను తొలగింపు: ₹500 – ₹2,000 | సర్జికల్ విజ్డమ్ టూత్: ₹3,000 – ₹10,000.`;
        }
        return `🦷 **Wisdom Tooth Care & Extractions:**

• **When Removal is Necessary:** Impacted or horizontally tilted wisdom teeth that cause recurring back jaw pain, cheek bites, pericoronitis, or crowding of adjacent teeth.
• **Painless Surgery:** Conducted with micro-surgical instruments under local anesthesia. You feel slight pressure, but zero sharp pain.
• **Indicative Pricing:** Simple extraction: ₹500 – ₹2,000 | Surgical / Impacted wisdom extraction: ₹3,000 – ₹10,000.`;
      }
    },

    dentures: {
      match: /(denture|dentures|false\s*teeth|full\s*denture|partial\s*denture|artificial\s*teeth|removable\s*teeth|డెంచర్స్|సెట్\s*పళ్ళు|కృత్రిమ\s*దంతాలు|బోసి\s*నోరు)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🦿 **ఆధునిక డెంచర్స్ (సెట్ పళ్ళు):**

• **రకాలు:** పూర్తి దంతాల సెట్ లేదా కొన్ని పళ్ళు మాత్రమే లేని వారికి ఫ్లెక్సిబుల్ అక్రిలిక్ పార్షియల్ డెంచర్స్. నమలడానికి సౌకర్యంగా మరియు సహజంగా సరిపోతాయి.
• **ధర:** ఒక్కో ఆర్చ్‌కు ₹12,000 – ₹45,000. శాశ్వత పరిష్కారం కోరుకునే వారికి ఇంప్లాంట్-సపోర్టెడ్ డెంచర్స్ కూడా అందుబాటులో ఉన్నాయి.`;
        }
        return `🦿 **Modern Aesthetic Dentures:**

• **Custom Fit:** Precision-molded BPS acrylic complete dentures and flexible biocompatible partials designed for chewing comfort and natural facial profile restoration.
• **Indicative Pricing:** ₹12,000 – ₹45,000 per arch. Permanent implant-supported overdentures are also available.`;
      }
    },

    pediatric: {
      match: /(kid|kids|child|children|pediatric|pedodontist|baby\s*teeth|milk\s*teeth|fluoride\s*varnish|sealant|పిల్లల\s*దంత\s*చికిత్స|పిల్లల\s*డాక్టర్|పీడోడాంటిస్ట్|పాల\s*పళ్ళు|పిల్లలు)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🧸 **పిల్లల ప్రత్యేక దంత సంరక్షణ (పీడియాట్రిక్):**

• **భయం లేని వాతావరణం:** పిల్లలకు దంత పరీక్షలపై భయం పోగొట్టే స్నేహపూర్వక, ఆహ్లాదకరమైన వాతావరణంలో చికిత్స అందిస్తాము.
• **ముఖ్యమైన చికిత్సలు:** పుప్పి రాకుండా ఫ్లోరైడ్ రక్షణ కోటింగ్, పిట్ & ఫిషర్ సీలెంట్స్, పిల్లల సున్నితమైన ఫిల్లింగ్స్ మరియు పాల పళ్ల రక్షణ.
• **ధర:** ₹800 – ₹3,500.`;
        }
        return `🧸 **Pediatric Dentistry (Kids Dental Care):**

• **Warm, Fear-Free Care:** Gentle, anxiety-free operatories specifically tailored for children to build healthy dental habits.
• **Preventive Treatments:** Enamel-strengthening fluoride varnishes, cavity-blocking pit & fissure sealants, gentle milk tooth restorations, and space maintainers.
• **Indicative Pricing:** ₹800 – ₹3,500.`;
      }
    },

    toothache_emergency: {
      match: /(pain|toothache|emergency|bleeding|swelling|broken\s*tooth|trauma|knocked\s*out|pus|severe\s*pain|hurt|hurting|noppi|dantla\s*noppi|నొప్పి|పంటి\s*నొప్పి|తీవ్రమైన\s*నొప్పి|వాపు|చీము|రక్తం\s*కారుతోంది|అత్యవసరం|పన్ను\s*విరిగింది)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🚨 **అత్యవసర దంత నొప్పి & ప్రథమ చికిత్స మార్గదర్శకాలు:**

1. **తక్షణ ప్రథమ చికిత్స:**
   • గోరువెచ్చని ఉప్పు నీటితో నోటిని సున్నితంగా పుక్కిలించండి.
   • **ఆస్పిరిన్ మాత్రను చిగుళ్లపై ఎప్పుడూ ఉంచవద్దు** (ఇది చిగుళ్లను కాలుస్తుంది).
   • ముఖం లేదా దవడ వాపు ఉంటే, బుగ్గ బయట ఐస్ ప్యాక్‌ను 10 నిమిషాల పాటు ఉంచండి.
   • పన్ను ఊడి కిందపడితే, కిరీటాన్ని మాత్రమే పట్టుకుని చల్లటి పాలలో లేదా లాలాజలంలో ఉంచి 60 నిమిషాల్లో క్లినిక్‌కు తీసుకురండి.
2. **క్లినిక్ వేళల్లో (సోమ–శని ఉదయం 9:30 – రాత్రి 8:00):**
   • అత్యవసర సీటు కేటాయింపు కోసం క్రింద ఉన్న వాట్సాప్ బటన్ ద్వారా వెంటనే మా ఫ్రంట్ డెస్క్‌ను సంప్రదించండి.
3. **రాత్రి సమయాల్లో తీవ్రమైన సమస్యలు:**
   • శ్వాస తీసుకోవడం కష్టంగా ఉండే విపరీతమైన వాపు లేదా ఆగని రక్తస్రావం ఉంటే, వెంటనే సమీప ఆసుపత్రి ఎమర్జెన్సీ విభాగాన్ని సంప్రదించండి.`;
        }
        return `🚨 **Dental Emergency & Pain Triage Guidance:**

1. **Immediate First-Aid Steps:**
   • Rinse mouth gently with warm salt water to clear debris.
   • **Never place an aspirin tablet directly on the gums** (it causes severe chemical tissue burns).
   • Apply a cold ice compress to the outside of the cheek for 10-minute intervals to reduce acute swelling.
   • If a permanent tooth has been knocked out, handle it by the crown only, store it in cold milk or saliva, and reach a dentist within 60 minutes.
2. **Clinic Hours Support (Mon–Sat 9:30 AM – 8:00 PM):**
   • Tap below to message our front-desk on WhatsApp for instant same-day emergency chair triage.
3. **Severe After-Hours Trauma:**
   • For uncontrolled bleeding or swelling that impairs breathing, visit your nearest hospital emergency department immediately.`;
      }
    },

    sensitivity: {
      match: /(sensitiv|cold\s*water|hot\s*water|tingling|chilled|ice\s*cream|పులుపు|సెన్సిటివిటీ|చల్లటి\s*నీళ్లు|వేడి\s*కాఫీ|జివ్వున\s*లాగడం|పంటి\s*పులుపు)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `❄️ **దంతాల సున్నితత్వం (జివ్వున లాగడం / సెన్సిటివిటీ):**

• **కారణాలు:** ఎనామిల్ అరిగిపోవడం, గట్టిగా బ్రష్ చేయడం వల్ల చిగుళ్ళు కిందకు జారడం, లేదా పంటిలో సూక్ష్మ రంధ్రాలు/పగుళ్లు ఉండటం వల్ల నరాలకు చల్లదనం తాకి జివ్వున లాగుతుంది.
• **క్లినికల్ పరిష్కారం:** క్లినిక్‌లో డీసెన్సిటైజింగ్ ఫ్లోరైడ్ కోటింగ్ వేస్తాము లేదా అరిగిన ఎనామిల్‌ను సీల్ చేస్తాము.
• **ఇంటి చిట్కా:** సాఫ్ట్ టూత్‌బ్రష్ మరియు పొటాషియం నైట్రేట్ ఉన్న సెన్సిటివిటీ పేస్ట్‌ను ఉపయోగించండి.`;
        }
        return `❄️ **Tooth Sensitivity (Hot & Cold):**

• **Common Triggers:** Enamel wear from acidic foods, hard brushing, receding gums exposing tooth roots, or small micro-cracks in aging fillings.
• **Treatment:** We apply high-fluoride desensitizing varnishes, evaluate your bite, or place micro-thin composite bonding over exposed root surfaces.
• **Home Advice:** Switch to a soft-bristle toothbrush and use a clinically proven potassium nitrate toothpaste.`;
      }
    },

    bleeding_gums: {
      match: /(bleed|bleeding\s*gum|bleeding\s*gums|blood\s*brushing|swollen\s*gum|gingivitis|periodontitis|చిగుళ్ల\s*నుంచి\s*రక్తం|చిగుళ్ల\s*వాపు|చిగుళ్లు|చిగురు)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🩸 **చిగుళ్ల నుంచి రక్తం కారడం (జింజివైటిస్):**

• **కారణం:** బ్రష్ చేసేటప్పుడు చిగుళ్ల నుంచి రక్తం రావడం అనేది చిగుళ్ల లోపల చేరిన పాచి మరియు గార (టార్టార్) వల్ల కలిగే ఇన్‌ఫెక్షన్ ప్రారంభ సంకేతం.
• **పరిష్కారం:** అల్ట్రాసోనిక్ క్లీనింగ్ ద్వారా ఈ క్రిములను తొలగిస్తే 7–10 రోజుల్లో చిగుళ్ళు తిరిగి ఆరోగ్యంగా తయారవుతాయి.
• **ధర:** ₹1,200 – ₹2,500. దీన్ని నిర్లక్ష్యం చేస్తే పళ్ళు కదిలే ప్రమాదం ఉంది, కాబట్టి వెంటనే క్లీనింగ్ చేయించుకోవాలి.`;
        }
        return `🩸 **Bleeding Gums & Gingivitis Care:**

• **Root Cause:** Bleeding while brushing or flossing is an early symptom of gingival inflammation caused by trapped plaque and hardened calculus below the gumline.
• **Resolution:** A gentle ultrasonic scaling session thoroughly eliminates these bacterial deposits, allowing gum tissues to re-tighten within 7–10 days.
• **Indicative Cost:** ₹1,200 – ₹2,500. Untreated gingivitis can progress to permanent bone loss (pyorrhea).`;
      }
    },

    bad_breath: {
      match: /(bad\s*breath|mouth\s*odor|halitosis|smell\s*from\s*mouth|stinky\s*breath|నోటి\s*దుర్వాసన|నోటి\s*వాసన|దుర్వాసన)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🍃 **నోటి దుర్వాసన (హాలిటోసిస్) నివారణ:**

• **కారణం:** నాలుక వెనుక భాగంలో చేరే బ్యాక్టీరియా, చిగుళ్ల పాకెట్స్ మరియు పుప్పి పళ్ళలో ఆహారం ఇరుక్కోవడం వల్ల 90% దుర్వాసన వస్తుంది.
• **చికిత్స:** ప్రొఫెషనల్ క్లీనింగ్, నాలుక శుభ్రపరిచే మార్గదర్శకాలు మరియు పుప్పి పళ్లను పూడ్చడం ద్వారా దుర్వాసన శాశ్వతంగా తొలగిపోతుంది.
• కేవలం ₹300తో సమగ్ర దంత పరీక్ష మరియు చికిత్సా ప్రణాళిక పొందవచ్చు.`;
        }
        return `🍃 **Bad Breath (Halitosis) Resolution:**

• **Source:** Over 85% of chronic oral odor stems from trapped anaerobic bacteria on the posterior tongue, deep gum pockets, or hidden decay cavities.
• **Treatment:** Professional ultrasonic scaling, targeted tongue debridement protocols, and restoring broken/decayed teeth will permanently eliminate odor.
• Book a comprehensive ₹300 oral screening for a complete clinical breath check.`;
      }
    },

    pregnancy_medical: {
      match: /(pregnant|pregnancy|trimester|diabetes|diabetic|high\s*bp|blood\s*pressure|sugar|heart\s*patient|hypertension|గర్భధారణ|గర్భిణీ|డయాబెటిస్|షుగర్|బీపీ)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🩺 **గర్భధారణ & వైద్య సమస్యలతో దంత చికిత్సల భద్రత:**

• **గర్భధారణ సమయం:** క్లీనింగ్ మరియు సాధారణ ఫిల్లింగ్స్ గర్భిణీ స్త్రీలకు పూర్తిగా సురక్షితం (ముఖ్యంగా 2వ త్రైమాసికంలో). గర్భధారణకు అనుకూలమైన ప్రత్యేక మందులను మాత్రమే ఉపయోగిస్తాము.
• **డయాబెటిస్ & బీపీ:** చిగుళ్ల సమస్యలు రక్తంలో చక్కెర స్థాయిలను ప్రభావితం చేస్తాయి. బీపీ ఉన్నవారికి అడ్రినలిన్-రహిత సురక్షిత అనస్థీషియాను ఉపయోగిస్తాము.`;
        }
        return `🩺 **Dental Safety with Medical Conditions & Pregnancy:**

• **Pregnancy:** Routine cleanings and dental fillings are completely safe (especially during the 2nd trimester). We use lead-apron digital shielding and pregnancy-safe anesthetics.
• **Diabetes & High Blood Pressure:** Chronic gum infections make blood glucose harder to regulate. We monitor vitals chairside and utilize adrenaline-free local anesthetics for hypertensive patients.`;
      }
    },

    painless: {
      match: /(painless|pain\s*free|scared|fear|phobia|numb|numbing|anesthesia|injection|నొప్పి\s*లేకుండా|భయం|సున్నితమైన\s*చికిత్స|నొప్పి\s*ఉంటుందా)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🕊️ **నొప్పిలేని దంత వైద్య విధానం:**

• **ముందస్తు జెల్:** ఇంజెక్షన్ ఇచ్చే ముందు ప్రత్యేక నంబింగ్ జెల్ రాయడం వల్ల సూది గుచ్చిన భావన కూడా తెలియదు.
• **కంప్యూటరైజ్డ్ అనస్థీషియా:** నెమ్మదిగా, సున్నితంగా స్థానిక ప్రాంతాన్ని మాత్రమే తిమ్మిరి చేస్తాము.
• **ప్రశాంత వాతావరణం:** చికిత్స సమయంలో ప్రతి దశను ముందుగానే వివరిస్తాము. మీకు కాస్త విశ్రాంతి కావాలంటే చేతితో సూచించవచ్చు, వెంటనే ఆపుతాము.`;
        }
        return `🕊️ **Our Painless Dental Philosophy:**

• **Topical Pre-Numbing:** We apply strawberry or mint numbing gel before any injection, so you don't even feel the pinch.
• **Computer-Assisted Delivery:** Local anesthetic is delivered at body temperature and micro-controlled rates to eliminate the sting.
• **Pause-on-Demand:** You are always in full control—simply raise your hand at any moment to pause the procedure.`;
      }
    },

    emi_insurance: {
      match: /(emi|bajaj|no\s*cost|installment|installments|insurance|mediclaim|reimbursement|payment\s*method|payment\s*options|gpay|phonepe|card|ఈఎంఐ|బజాజ్|ఇన్సూరెన్స్|నెలవారీ\s*వాయిదాలు|చెల్లింపు)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `💳 **చెల్లింపు విధానాలు & ఈఎంఐ సౌకర్యం:**

• **నో-కాస్ట్ ఈఎంఐ:** ₹15,000 పైబడిన చికిత్సలకు (ఇంప్లాంట్స్, క్లిప్పులు, అలైన్ర్స్) బజాజ్ ఫిన్‌సర్వ్ మరియు ప్రముఖ క్రెడిట్ కార్డుల ద్వారా 0% వడ్డీతో ఈఎంఐ లభిస్తుంది.
• **ఇన్సూరెన్స్ రీయింబర్స్‌మెంట్:** పాలసీదారుల క్లెయిమ్స్ కోసం పూర్తి రశీదులు మరియు వైద్య ధృవీకరణ పత్రాలను అందిస్తాము.
• **చెల్లింపు పద్ధతులు:** UPI (GPay, PhonePe, Paytm), క్రెడిట్/డెబిట్ కార్డులు మరియు నగదు.`;
        }
        return `💳 **Payment Options, No-Cost EMI & Insurance:**

• **No-Cost EMI:** 0% interest EMI options available through Bajaj Finserv and major credit cards for treatments exceeding ₹15,000 (Implants, Aligners, Braces).
• **Insurance Claims:** We provide detailed clinical diagnosis sheets, itemized tax invoices, and doctor certifications for cashless/reimbursement insurance claims.
• **Accepted Methods:** All UPI apps (GPay, PhonePe, Paytm), Credit/Debit cards, Net Banking, and Cash.`;
      }
    },

    pricing: {
      match: /(cost|pricing|charges|fee|fees|rates|how\s*much|expensive|budget|amount|ధరలు|ఖర్చు|ఫీజు|ఎంత\s*అవుతుంది|రేట్లు|\bprice\b)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `💰 **ఐవరీ డెంటల్ స్టూడియో - పారదర్శక ధరల పట్టిక:**

• **దంత పరీక్ష & డిజిటల్ ఎక్స్-రే:** ₹300 – ₹600
• **టీత్ క్లీనింగ్ & పాలిషింగ్:** ₹1,200 – ₹2,500
• **రూట్ కెనాల్ చికిత్స (RCT):** ₹4,500 – ₹9,000
• **డెంటల్ ఇంప్లాంట్స్:** ₹25,000 – ₹60,000
• **జిర్కోనియా ప్రీమియం క్యాప్స్:** ₹4,000 – ₹18,000
• **క్లిప్పులు:** ₹25,000 – ₹70,000 | **క్లియర్ అలైన్ర్స్:** ₹60,000 – ₹2,20,000
• **ప్రొఫెషనల్ టీత్ వైట్నింగ్:** ₹7,000 – ₹15,000
• **విజ్డమ్ టూత్ సర్జరీ:** ₹3,000 – ₹10,000

దాచిన ఛార్జీలు ఏవీ ఉండవు. చికిత్స ప్రారంభించే ముందే పూర్తి అంచనా రాతపూర్వకంగా అందిస్తాము.`;
        }
        return `💰 **Indicative Pricing at Ivory Dental Studio:**

• **Oral Consultation & Digital X-Ray:** ₹300 – ₹800
• **Teeth Cleaning & Scaling:** ₹1,200 – ₹2,500
• **Root Canal Treatment (RCT):** ₹4,500 – ₹9,000
• **Dental Implants:** ₹25,000 – ₹60,000
• **Zirconia / Ceramic Crowns:** ₹4,000 – ₹18,000
• **Braces:** ₹25,000 – ₹70,000 | **Clear Aligners:** ₹60,000 – ₹2.2L
• **In-Office Teeth Whitening:** ₹7,000 – ₹15,000
• **Wisdom Tooth Surgery:** ₹3,000 – ₹10,000

We guarantee 100% upfront pricing transparency with zero surprise consultation add-ons.`;
      }
    },

    timings: {
      match: /(timing|timings|hours|hour|open|close|closed|sunday|saturday|when\s*open|morning|evening|samayam|సమయం|వేళలు|టైమింగ్స్|ఆదివారం|ఎప్పుడు\s*ఓపెన్|ఓపెన్\s*ఉందా)/i,
      respond: (text) => {
        const isOpen = typeof window.getClinicStatus === 'function' ? window.getClinicStatus().isOpen : false;
        const statusText = typeof window.getClinicStatus === 'function' ? window.getClinicStatus().text : 'Open Mon–Sat';

        if (isTeluguQuery(text)) {
          return `🕒 **క్లినిక్ పనివేళలు:**

• **బంజారా హిల్స్ బ్రాంచ్:** సోమ–శని ఉదయం 9:30 – రాత్రి 8:00
• **మాదాపూర్ బ్రాంచ్:** సోమ–శని ఉదయం 10:00 – రాత్రి 8:30
• **ఆదివారం:** రెండు బ్రాంచ్‌లకు సెలవు.

**ప్రస్తుత లైవ్ స్టేటస్:** ${statusText}
${!isOpen ? '\n*(గమనిక: క్లినిక్ ప్రస్తుతం ముగిసింది. అయినప్పటికీ మీరు వాట్సాప్‌లో మీ అపాయింట్‌మెంట్ పంపవచ్చు, రేపు ఉదయం 9:30కి నిర్ధారిస్తాము!)*' : ''}`;
        }
        return `🕒 **Clinic Working Hours:**

• **Banjara Hills Branch:** Mon–Sat 9:30 AM – 8:00 PM
• **Madhapur Branch:** Mon–Sat 10:00 AM – 8:30 PM
• **Sunday: Closed** across both branches.

**Live Status:** ${statusText}
${!isOpen ? '\n*(Note: Clinic is currently closed. You can submit your slot request on WhatsApp now, and our team will confirm it at 9:30 AM tomorrow!)*' : ''}`;
      }
    },

    branches: {
      match: /(branch|branches|location|locations|address|where|banjara|madhapur|hitec|directions|reach|parking|map|maps|landmark|చిరునామా|లొకేషన్|బంజారా\s*హిల్స్|మాదాపూర్|ఎక్కడ\s*ఉంది|పార్కింగ్)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `📍 **మా హైదరాబాద్ బ్రాంచ్‌లు & చిరునామా:**

1. **బంజారా హిల్స్ బ్రాంచ్:**
   • రోడ్ నం. 12, బంజారా హిల్స్, హైదరాబాద్ - 500034
   • వేళలు: సోమ–శని ఉదయం 9:30 – రాత్రి 8:00 | ఆదివారం సెలవు
   • కార్ వాలెట్ పార్కింగ్ & వీల్‌చైర్ సౌకర్యం కలదు.

2. **మాదాపూర్ బ్రాంచ్:**
   • మొదటి అంతస్తు, మాదాపూర్ మెయిన్ రోడ్, హైదరాబాద్ - 500081 (హైటెక్ సిటీ మెట్రో సమీపంలో)
   • వేళలు: సోమ–శని ఉదయం 10:00 – రాత్రి 8:30 | ఆదివారం సెలవు
   • రోగులకు ప్రత్యేక పార్కింగ్ సదుపాయం కలదు.`;
        }
        return `📍 **Our Hyderabad Branch Locations:**

1. **Banjara Hills Branch:**
   • Road No. 12, Banjara Hills, Hyderabad, Telangana 500034
   • Hours: Mon–Sat 9:30 AM – 8:00 PM | Sunday: Closed
   • Valet parking and wheelchair accessible.

2. **Madhapur Branch:**
   • First Floor, Madhapur Main Road, Hyderabad, Telangana 500081 (near Hitec City metro corridor)
   • Hours: Mon–Sat 10:00 AM – 8:30 PM | Sunday: Closed
   • Dedicated patient parking available.`;
      }
    },

    doctors: {
      match: /(doctor|doctors|dentist|dentists|specialist|specialists|implantologist|endodontist|orthodontist|qualifications|credentials|experience|team|who\s*is|డాక్టర్లు|వైద్యులు|ఎండిఎస్|అనుభవం|ఎవరు)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `👨‍⚕️ **మా పోస్ట్-గ్రాడ్యుయేట్ స్పెషలిస్ట్ వైద్యులు (MDS):**

1. **డా. డెమో ఇంప్లాంటాలజిస్ట్ (BDS, MDS)**
   • చీఫ్ ఇంప్లాంటాలజిస్ట్ & ప్రొస్తోడాంటిస్ట్ · 14+ సంవత్సరాల అనుభవం
   • నైపుణ్యం: కంప్యూటర్-గైడెడ్ ఇంప్లాంట్స్, ఫుల్ మౌత్ రీహాబిలిటేషన్.

2. **డా. డెమో ఎండోడాంటిస్ట్ (BDS, MDS)**
   • సీనియర్ ఎండోడాంటిస్ట్ & కన్జర్వేటివ్ డెంటిస్ట్రీ · 11+ సంవత్సరాల అనుభవం
   • నైపుణ్యం: మైక్రోస్కోపిక్ సింగిల్-సిట్టింగ్ రూట్ కెనాల్ చికిత్సలు.

3. **డా. డెమో ఆర్తోడాంటిస్ట్ & పీడోడాంటిస్ట్ (BDS, MDS)**
   • ఆర్థోడాంటిక్స్ & పీడియాట్రిక్ డెంటిస్ట్రీ నిపుణులు · 9+ సంవత్సరాల అనుభవం
   • నైపుణ్యం: ఇన్విజిబుల్ క్లియర్ అలైన్ర్స్ & పిల్లల భయంలేని దంత చికిత్సలు.`;
        }
        return `👨‍⚕️ **Our Specialist Doctors (Full-time MDS):**

1. **Dr. Demo Implantologist (BDS, MDS)**
   • Chief Implantologist & Prosthodontist · 14+ Years Clinical Experience
   • Expertise: Guided dental implants, osseointegration, full-mouth reconstructions.

2. **Dr. Demo Endodontist (BDS, MDS)**
   • Senior Endodontist & Conservative Dentistry · 11+ Years Clinical Experience
   • Expertise: Microscopic single-sitting root canals and tooth conservation.

3. **Dr. Demo Orthodontist & Pedodontist (BDS, MDS)**
   • Orthodontics & Pediatric Dentistry Specialist · 9+ Years Clinical Experience
   • Expertise: Clear aligners, aesthetic ceramic braces, and gentle kids dentistry.`;
      }
    },

    offers: {
      match: /(offer|offers|discount|discounts|camp|package|packages|deal|deals|ఆఫర్లు|ప్యాకేజీలు|డిస్కౌంట్|ఉచిత\s*క్యాంప్)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🎁 **ప్రస్తుత క్లినిక్ ప్రత్యేక ప్యాకేజీలు:**

1. **ఉచిత దంత పరీక్ష & అవగాహన శిబిరం:** 32 దంతాల క్లినికల్ పరీక్ష, డిజిటల్ ఫోటోగ్రఫీ మరియు కన్సల్టేషన్ ₹0కే.
2. **స్మైల్ మేకోవర్ ప్యాకేజీ:** ఇన్-ఆఫీస్ LED టీత్ వైట్నింగ్ + అల్ట్రాసోనిక్ క్లీనింగ్ మరియు పాలిషింగ్ కాంబో.
3. **కుటుంబ దంత సంరక్షణ ప్యాకేజీ:** కుటుంబంలోని ముగ్గురు సభ్యులకు క్లీనింగ్ + పిల్లలకు ఉచిత పరీక్ష.
4. **పిల్లల సెలవుల క్యాంప్:** పుప్పి రాకుండా ఫ్లోరైడ్ రక్షణ మరియు ఉచిత డెంటల్ కిట్.`;
        }
        return `🎁 **Active Clinic Packages & Value Offers:**

1. **Free Dental Check-up Camp:** Comprehensive 32-tooth oral exam, digital intraoral photography, and personalized care plan at ₹0.
2. **Smile Makeover Package:** In-office LED whitening + ultrasonic scaling and protective polish.
3. **Family Dental Cleaning Pack:** Complete scaling & polishing for up to 3 family members.
4. **Kids Holiday Camp:** Fluoride cavity-prevention therapy + complimentary dental kit.`;
      }
    },

    booking: {
      match: /(book|booking|appointment|schedule|reserve|slot|visit|consultation|అపాయింట్‌మెంట్|బుకింగ్|స్లాట్\s*రిజర్వ్|సమయం\s*బుక్)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `📅 **అపాయింట్‌మెంట్ బుకింగ్:**

మీరు సులభంగా అపాయింట్‌మెంట్ బుక్ చేసుకోవచ్చు:
1. క్రింది బటన్ నొక్కి **5-స్టెప్ బుకింగ్ కార్డ్** ద్వారా మీ బ్రాంచ్, తేదీ, సమయం ఎంచుకోవచ్చు.
2. లేదా నేరుగా మా వాట్సాప్ నంబర్‌కు మెసేజ్ పంపితే మా సిబ్బంది వెంటనే సీటును కన్ఫర్మ్ చేస్తారు.`;
        }
        return `📅 **Schedule an Appointment:**

Booking is quick and seamless:
1. Tap below to navigate directly to our interactive **5-Step Booking Card** on this page.
2. Or tap the **WhatsApp Support** button below to chat with our front-desk for real-time chair confirmation.`;
      }
    },

    reminders: {
      match: /(reminder|reminders|recall|6\s*month|annual|follow\s*up|notification|ics|రిమైండర్|6\s*నెలల\s*రీకాల్|క్యాలెండర్)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `🔔 **6-నెలల కేర్ రీకాల్ & రిమైండర్ సిస్టమ్ (FR-11):**

దంతాల ఆరోగ్యాన్ని కాపాడుకోవడానికి క్రమం తప్పకుండా చెక్-అప్ అవసరం:
• **రొటీన్ క్లీనింగ్ & పాలిష్:** ప్రతి 6 నెలలకు ఒకసారి.
• **రూట్ కెనాల్ క్రౌన్ రివ్యూ:** 3 నుండి 6 నెలల తర్వాత.
• **అలైన్ర్స్ / క్లిప్పుల చెకప్:** ప్రతి నెలా ఒకసారి.

క్రింది బటన్ నొక్కి క్యాలెండర్ ఇన్వైట్ (.ics) డౌన్‌లోడ్ చేసుకోండి లేదా వాట్సాప్ నోటిఫికేషన్ సెట్ చేసుకోండి.`;
        }
        return `🔔 **Patient Recall & Care Reminder System (FR-11):**

Preventive care preserves your smile and helps avoid costly emergency interventions:
• **Routine Cleaning & Polish:** Recommended every 6 months.
• **RCT Follow-Up:** Crown and bone review after 3 to 6 months.
• **Aligner / Braces Review:** Monthly adjustment.

Tap below to download an instant calendar invite (.ics) or register for automated WhatsApp recall notifications.`;
      }
    },

    contact_whatsapp: {
      match: /(whatsapp|phone|mobile|contact|call|reach|number|నంబర్|ఫోన్\s*నంబర్|వాట్సాప్\s*నంబర్|కాల్)/i,
      respond: (text) => {
        if (isTeluguQuery(text)) {
          return `📞 **ఐవరీ డెంటల్ స్టూడియో సంప్రదింపు వివరాలు:**

• **ఫోన్ & వాట్సాప్:** +91 00000 00000
• **పనివేళలు:** సోమవారం నుండి శనివారం వరకు (ఉదయం 9:30 – రాత్రి 8:00)
• తక్షణ సహాయం కోసం క్రింద ఉన్న వాట్సాప్ బటన్‌ను నొక్కండి!`;
        }
        return `📞 **Ivory Dental Studio Contact Details:**

• **Phone & WhatsApp:** +91 00000 00000
• **Operating Hours:** Mon–Sat 9:30 AM – 8:00 PM
• For real-time chair allocation and queries, click the WhatsApp button below!`;
      }
    }
  };

  // 2. MATCH INTENT HELPER WITH ROBUST CLINICAL FALLBACK
  function matchIntent(userMessage) {
    const text = (userMessage || '').trim();
    if (!text) return '';

    // Check all knowledge base handlers
    for (const [key, handler] of Object.entries(KNOWLEDGE_BASE)) {
      if (handler.match.test(text)) {
        return handler.respond(text);
      }
    }

    // Default Fallback
    if (isTeluguQuery(text)) {
      return `నమస్కారం! మీ ప్రశ్నకు ధన్యవాదాలు. ఐవరీ డెంటల్ స్టూడియో 24/7 క్లినికల్ అసిస్టెంట్‌గా నేను క్రింది వివరాలను తక్షణమే అందించగలను:

• **దంత చికిత్సల వివరాలు & ఖర్చులు** (రూట్ కెనాల్, ఇంప్లాంట్స్, క్లిప్పులు & అలైన్ర్స్, క్లీనింగ్, టీత్ వైట్నింగ్, క్యాప్స్)
• **క్లినిక్ వేళలు & చిరునామా** (బంజారా హిల్స్ మరియు మాదాపూర్)
• **MDS నిపుణులైన డాక్టర్ల వివరాలు**
• **పంటి నొప్పి & అత్యవసర సలహాలు**
• **అపాయింట్‌మెంట్ బుకింగ్ లేదా 6-నెలల రీకాల్ రిమైండర్**

దయచేసి మీకు ఏ అంశంపై సమాచారం కావాలో క్రింద టైప్ చేయండి లేదా ఒక బటన్‌ను ఎంచుకోండి.`;
    }

    return `Thank you for reaching out. As your 24/7 AI Clinical Assistant at Ivory Dental Studio, I can provide immediate details on:

• **Treatment Procedures & Indicative Pricing** (Implants, Root Canals, Clear Aligners, Braces, Whitening, Crowns)
• **Live Clinic Hours & Branch Addresses** (Banjara Hills & Madhapur)
• **Specialist Qualifications (MDS)**
• **Dental Pain & Emergency First-Aid Triage**
• **Book an Appointment or Set a 6-Month Care Recall**

Please ask your question or choose one of the options below, and I will be delighted to guide you!`;
  }

  // 3. UI RENDERING & EVENT ATTACHMENT
  function initChatbot() {
    const root = document.getElementById('chat-root');
    if (!root) return;

    root.removeAttribute('aria-hidden');
    root.innerHTML = `
      <!-- Launcher Button (Floats above mobile sticky bar) -->
      <button type="button" class="chat-launcher-btn" id="chat-launcher-btn" aria-label="Open Ivory 24/7 AI Clinical Assistant" aria-expanded="false" aria-haspopup="dialog" aria-controls="chat-window">
        <span class="chat-launcher-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </span>
        <span class="chat-launcher-text">24/7 AI Assistant</span>
        <span class="chat-pulse-dot" aria-hidden="true"></span>
      </button>

      <!-- Chat Window Dialog -->
      <div class="chat-window" id="chat-window" role="dialog" aria-modal="false" aria-label="Ivory AI Clinical Assistant" hidden>
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4">
                <path d="M20 18 C20 13, 26 13, 32 15 C38 13, 44 13, 44 18 C45 25, 47 34, 43 45 C41 50, 36 51, 35 43 C34 38, 33 32, 32 32 C31 32, 30 38, 29 43 C28 51, 23 50, 21 45 C17 34, 19 25, 20 18 Z" stroke="#8A6B3D"/>
              </svg>
            </div>
            <div>
              <div class="chat-title">Ivory AI Assistant</div>
              <div class="chat-status">
                <span class="chat-status-dot" aria-hidden="true"></span>
                <span>Active 24/7 · Clinical Guide</span>
              </div>
            </div>
          </div>
          <div class="chat-header-actions">
            <button type="button" class="chat-action-btn" id="chat-restart-btn" title="Restart Conversation" aria-label="Restart conversation">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 4v6h-6"></path>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
            </button>
            <button type="button" class="chat-action-btn" id="chat-close-btn" title="Close chat window" aria-label="Close chat window">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages Container -->
        <div class="chat-body" id="chat-messages" tabindex="0" aria-live="polite">
          <!-- Initial Welcome Message -->
          <div class="chat-msg chat-msg-bot">
            <div class="chat-bubble">
              Hello! Welcome to <strong>Ivory Dental Studio</strong>. I am your 24/7 AI Clinical Assistant. 
              <br><br>
              How can I assist you with your dental care today?
            </div>
            <span class="chat-timestamp">${getCurrentTime()}</span>
          </div>

          <!-- Quick Prompts Container -->
          <div class="chat-quick-chips" id="chat-quick-chips">
            <button type="button" class="chat-chip" data-intent="pricing">💰 Treatment Costs</button>
            <button type="button" class="chat-chip" data-intent="booking">📅 Book Appointment</button>
            <button type="button" class="chat-chip" data-intent="timings">🕒 Timings & Open Hours</button>
            <button type="button" class="chat-chip" data-intent="branches">📍 Branch Locations</button>
            <button type="button" class="chat-chip" data-intent="emergency">🚨 Toothache / Emergency</button>
            <button type="button" class="chat-chip" data-intent="reminders">🔔 6-Month Reminder</button>
            <button type="button" class="chat-chip" data-intent="doctors">👨‍⚕️ Our Specialists</button>
          </div>
        </div>

        <!-- Input Footer -->
        <div class="chat-footer">
          <form id="chat-input-form" class="chat-form">
            <input 
              type="text" 
              id="chat-input" 
              class="chat-input-field" 
              placeholder="Ask about treatments, pricing, timings..." 
              autocomplete="off"
              aria-label="Ask the dental assistant a question"
            />
            <button type="submit" class="chat-send-btn" id="chat-send-btn" aria-label="Send message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          <div class="chat-footer-note">
            Answers are clinical guidance. Emergencies outside hours: visit nearest hospital emergency.
          </div>
        </div>
      </div>

      <!-- Recall Reminder Modal (FR-11) -->
      <div class="modal-backdrop" id="reminder-modal-backdrop" hidden>
        <div class="modal-dialog reminder-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="reminder-modal-title">
          <button type="button" class="modal-close-btn" id="reminder-modal-close" aria-label="Close care reminder dialog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="reminder-modal-content">
            <span class="section-label-line" aria-hidden="true"></span>
            <span class="section-label" style="margin-bottom: 8px; display: inline-block;">Patient Recall System · FR-11</span>
            <h3 class="booking-card-title" id="reminder-modal-title">Schedule Patient Recall Reminder</h3>
            <p class="booking-card-subtitle">
              Preventive care prevents tooth decay and gum disease. Register a reminder for your upcoming routine dental care.
            </p>
            <form id="care-reminder-form" class="reminder-form">
              <div class="form-input-wrap">
                <label for="reminder-service" class="form-label">Recall Service Type *</label>
                <select id="reminder-service" class="form-input" required>
                  <option value="6-Month Dental Cleaning & Polish">6-Month Routine Cleaning &amp; Polishing</option>
                  <option value="RCT Crown Placement Follow-Up">Root Canal Treatment (RCT) Crown Review</option>
                  <option value="Clear Aligner / Braces Check-Up">Orthodontic Aligner / Braces Adjustment</option>
                  <option value="Annual Comprehensive Dental Check-Up">Annual Comprehensive Oral Exam &amp; X-Rays</option>
                </select>
              </div>

              <div class="form-input-wrap">
                <label for="reminder-branch" class="form-label">Preferred Branch *</label>
                <select id="reminder-branch" class="form-input" required>
                  <option value="Banjara Hills">Banjara Hills Branch</option>
                  <option value="Madhapur">Madhapur Branch</option>
                </select>
              </div>

              <div class="form-input-wrap">
                <label for="reminder-date" class="form-label">Target Recall Date *</label>
                <input type="date" id="reminder-date" class="form-input" required />
              </div>

              <div class="form-input-wrap">
                <label for="reminder-name" class="form-label">Patient Name *</label>
                <input type="text" id="reminder-name" class="form-input" placeholder="e.g. Ramesh Kumar" required autocomplete="name" />
              </div>

              <div class="form-input-wrap">
                <label for="reminder-phone" class="form-label">Mobile Number *</label>
                <input type="tel" id="reminder-phone" class="form-input" placeholder="10-digit mobile number" pattern="[6-9][0-9]{9}" required autocomplete="tel" />
              </div>

              <div class="reminder-actions">
                <button type="button" id="reminder-ics-btn" class="btn btn-secondary">
                  📅 Save to Calendar (.ics)
                </button>
                <button type="submit" id="reminder-wa-btn" class="btn btn-primary">
                  Register via WhatsApp &rarr;
                </button>
              </div>
              <div id="reminder-status-msg" class="reminder-status" style="display:none;" aria-live="polite"></div>
            </form>
          </div>
        </div>
      </div>
    `;

    // Elements
    const launcher = document.getElementById('chat-launcher-btn');
    const windowEl = document.getElementById('chat-window');
    const closeBtn = document.getElementById('chat-close-btn');
    const restartBtn = document.getElementById('chat-restart-btn');
    const form = document.getElementById('chat-input-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const chipsContainer = document.getElementById('chat-quick-chips');

    // Reminder Elements
    const reminderModal = document.getElementById('reminder-modal-backdrop');
    const reminderClose = document.getElementById('reminder-modal-close');
    const reminderForm = document.getElementById('care-reminder-form');
    const reminderIcsBtn = document.getElementById('reminder-ics-btn');

    // Set default target reminder date to 6 months from today
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    const dateInput = document.getElementById('reminder-date');
    if (dateInput) {
      dateInput.value = sixMonthsLater.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    // Toggle Chat Window
    function toggleChat(open) {
      const isCurrentlyOpen = !windowEl.hidden && windowEl.classList.contains('chat-window-open');
      const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;

      if (shouldOpen) {
        windowEl.hidden = false;
        launcher.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => {
          windowEl.classList.add('chat-window-open');
        });
        input.focus();
      } else {
        windowEl.classList.remove('chat-window-open');
        launcher.setAttribute('aria-expanded', 'false');
        setTimeout(() => {
          if (!windowEl.classList.contains('chat-window-open')) {
            windowEl.hidden = true;
          }
        }, 220);
        launcher.focus();
      }
    }

    launcher.addEventListener('click', () => toggleChat());
    closeBtn.addEventListener('click', () => toggleChat(false));

    // Close on Escape or click outside
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (reminderModal && !reminderModal.hidden) {
          closeReminderModal();
        } else if (!windowEl.hidden) {
          toggleChat(false);
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!windowEl.hidden && 
          !windowEl.contains(e.target) && 
          !launcher.contains(e.target) && 
          !e.target.closest('[data-action="chat-trigger"]')) {
        toggleChat(false);
      }
    });

    // Restart chat
    restartBtn.addEventListener('click', () => {
      messages.innerHTML = `
        <div class="chat-msg chat-msg-bot">
          <div class="chat-bubble">
            Conversation reset. Welcome back to <strong>Ivory Dental Studio</strong>. How can I assist you today?
          </div>
          <span class="chat-timestamp">${getCurrentTime()}</span>
        </div>
      `;
      messages.appendChild(chipsContainer);
      input.value = '';
      input.focus();
    });

    // Handle Quick Chips
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-chip');
      if (!chip) return;
      const intentKey = chip.getAttribute('data-intent');

      if (intentKey === 'reminders') {
        openReminderModal();
        return;
      }

      const userText = chip.textContent.trim();
      addUserMessage(userText);

      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        let reply = '';
        if (KNOWLEDGE_BASE[intentKey]) {
          reply = typeof KNOWLEDGE_BASE[intentKey].respond === 'function' 
            ? KNOWLEDGE_BASE[intentKey].respond(userText) 
            : KNOWLEDGE_BASE[intentKey].response(userText);
        } else {
          reply = matchIntent(userText);
        }
        addBotMessage(reply);
      }, 400);
    });

    // Handle Input Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addUserMessage(text);
      input.value = '';

      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        const reply = matchIntent(text);
        addBotMessage(reply);
      }, 450);
    });

    // Add User Message
    function addUserMessage(text) {
      const msgEl = document.createElement('div');
      msgEl.className = 'chat-msg chat-msg-user';
      msgEl.innerHTML = `
        <div class="chat-bubble chat-bubble-user">${escapeHtml(text)}</div>
        <span class="chat-timestamp">${getCurrentTime()}</span>
      `;
      messages.appendChild(msgEl);
      scrollToBottom();
    }

    // Add Bot Message
    function addBotMessage(text) {
      const msgEl = document.createElement('div');
      msgEl.className = 'chat-msg chat-msg-bot';

      const formattedHtml = formatMarkdown(text);

      let actionButtons = '';
      if (text.includes('WhatsApp') || text.includes('Booking') || text.includes('Pricing') || text.includes('Indicative Pricing')) {
        actionButtons = `
          <div class="chat-msg-actions">
            <a href="#booking-card" class="btn btn-secondary chat-inline-btn" data-action="book-scroll">
              Open Booking Card &rarr;
            </a>
            <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" class="btn btn-primary chat-inline-btn" data-action="whatsapp">
              WhatsApp Support &rarr;
            </a>
          </div>
        `;
      } else if (text.includes('Recall') || text.includes('Cleaning Reminder')) {
        actionButtons = `
          <div class="chat-msg-actions">
            <button type="button" class="btn btn-primary chat-inline-btn" id="trigger-reminder-btn">
              🔔 Schedule 6-Month Reminder
            </button>
          </div>
        `;
      }

      msgEl.innerHTML = `
        <div class="chat-bubble">${formattedHtml}${actionButtons}</div>
        <span class="chat-timestamp">${getCurrentTime()}</span>
      `;
      messages.appendChild(msgEl);

      const triggerBtn = msgEl.querySelector('#trigger-reminder-btn');
      if (triggerBtn) {
        triggerBtn.addEventListener('click', openReminderModal);
      }

      const bookScrollBtn = msgEl.querySelector('[data-action="book-scroll"]');
      if (bookScrollBtn) {
        bookScrollBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          toggleChat(false);
          const target = document.getElementById('booking-card');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }

      scrollToBottom();
    }

    // Typing Indicator
    function showTypingIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'chat-msg chat-msg-bot chat-typing';
      indicator.id = 'chat-typing-indicator';
      indicator.innerHTML = `
        <div class="chat-bubble chat-bubble-typing">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      `;
      messages.appendChild(indicator);
      scrollToBottom();
    }

    function removeTypingIndicator() {
      const el = document.getElementById('chat-typing-indicator');
      if (el) el.remove();
    }

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    // Helpers
    function getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function escapeHtml(string) {
      const div = document.createElement('div');
      div.textContent = string;
      return div.innerHTML;
    }

    function formatMarkdown(str) {
      return str
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^• (.*$)/gim, '• $1')
        .replace(/\n/g, '<br>');
    }

    // ========================================================================
    // RECALL REMINDER SYSTEM (FR-11)
    // ========================================================================
    function openReminderModal() {
      reminderModal.hidden = false;
      requestAnimationFrame(() => {
        reminderModal.classList.add('open');
      });
      document.body.style.overflow = 'hidden';
      const nameInput = document.getElementById('reminder-name');
      if (nameInput) nameInput.focus();
    }

    function closeReminderModal() {
      reminderModal.classList.remove('open');
      setTimeout(() => {
        if (!reminderModal.classList.contains('open')) {
          reminderModal.hidden = true;
        }
      }, 220);
      document.body.style.overflow = '';
    }

    reminderClose.addEventListener('click', closeReminderModal);
    reminderModal.addEventListener('click', (e) => {
      if (e.target === reminderModal) closeReminderModal();
    });

    // Save .ICS Calendar file
    reminderIcsBtn.addEventListener('click', () => {
      const service = document.getElementById('reminder-service').value;
      const branch = document.getElementById('reminder-branch').value;
      const dateVal = document.getElementById('reminder-date').value;
      const name = document.getElementById('reminder-name').value || 'Patient';

      if (!dateVal) {
        alert('Please select a target recall date.');
        return;
      }

      const startDate = new Date(dateVal + 'T10:00:00');
      const endDate = new Date(dateVal + 'T11:00:00');

      function formatIcsDate(d) {
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      }

      const branchAddress = branch === 'Banjara Hills' 
        ? 'Road No. 12, Banjara Hills, Hyderabad, Telangana 500034' 
        : 'First Floor, Madhapur Main Road, Hyderabad, Telangana 500081';

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Ivory Dental Studio//Patient Recall System//EN',
        'BEGIN:VEVENT',
        `SUMMARY:Ivory Dental Studio - ${service}`,
        `DESCRIPTION:Preventive dental recall appointment for ${name} at Ivory Dental Studio (${branch} branch). Call clinic at +91 00000 00000 or WhatsApp to reconfirm time.`,
        `LOCATION:Ivory Dental Studio, ${branchAddress}`,
        `DTSTART:${formatIcsDate(startDate)}`,
        `DTEND:${formatIcsDate(endDate)}`,
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder: Dental Check-up at Ivory Dental Studio tomorrow`,
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `IvoryDental-${service.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const statusEl = document.getElementById('reminder-status-msg');
      statusEl.style.display = 'block';
      statusEl.textContent = '✓ Calendar invite downloaded! Check your downloads folder.';
    });

    // WhatsApp Registration
    reminderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('reminder-service').value;
      const branch = document.getElementById('reminder-branch').value;
      const dateVal = document.getElementById('reminder-date').value;
      const name = document.getElementById('reminder-name').value;
      const phone = document.getElementById('reminder-phone').value;

      const waPhone = window.CONFIG ? window.CONFIG.WHATSAPP_NUMBER : '910000000000';
      const text = `Hi Ivory Dental Studio,\n\nPlease register a care recall reminder for me:\n• Service: ${service}\n• Preferred Branch: ${branch}\n• Target Recall Date: ${dateVal}\n• Patient Name: ${name}\n• Phone: ${phone}\n\nPlease save my details and reach out when my check-up is due. Thank you!`;

      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      closeReminderModal();
    });

    // Regional Language Harmonization for Chatbot (FR-12)
    function updateChatbotLanguage(lang) {
      const isTe = lang === 'te';
      const launcherText = launcher ? launcher.querySelector('.chat-launcher-text') : null;
      if (launcherText) launcherText.textContent = isTe ? '24/7 AI అసిస్టెంట్' : '24/7 AI Assistant';

      const statusSpan = windowEl ? windowEl.querySelector('.chat-status span:last-child') : null;
      if (statusSpan) statusSpan.textContent = isTe ? '24/7 అందుబాటులో · క్లినికల్ గైడ్' : 'Active 24/7 · Clinical Guide';

      if (input) {
        input.placeholder = isTe ? 'చికిత్సలు, ధరలు, సమయాల గురించి అడగండి...' : 'Ask about treatments, pricing, timings...';
      }

      const note = windowEl ? windowEl.querySelector('.chat-footer-note') : null;
      if (note) {
        note.textContent = isTe 
          ? 'సమాధానాలు క్లినికల్ మార్గదర్శకాలు మాత్రమే. అత్యవసర సమస్యలకు ఆసుపత్రి ఎమర్జెన్సీ విభాగాన్ని సంప్రదించండి.'
          : 'Answers are clinical guidance. Emergencies outside hours: visit nearest hospital emergency.';
      }

      // Update quick chips
      if (chipsContainer) {
        const chipTexts = {
          pricing: isTe ? '💰 చికిత్సల ధరలు' : '💰 Treatment Costs',
          booking: isTe ? '📅 అపాయింట్‌మెంట్' : '📅 Book Appointment',
          timings: isTe ? '🕒 పనివేళలు' : '🕒 Timings & Open Hours',
          branches: isTe ? '📍 బ్రాంచ్‌ల చిరునామా' : '📍 Branch Locations',
          emergency: isTe ? '🚨 పంటి నొప్పి / అత్యవసరం' : '🚨 Toothache / Emergency',
          reminders: isTe ? '🔔 6-నెలల రిమైండర్' : '🔔 6-Month Reminder',
          doctors: isTe ? '👨‍⚕️ స్పెషలిస్ట్ డాక్టర్లు' : '👨‍⚕️ Our Specialists'
        };
        chipsContainer.querySelectorAll('.chat-chip').forEach(c => {
          const intent = c.getAttribute('data-intent');
          if (chipTexts[intent]) c.textContent = chipTexts[intent];
        });
      }
    }
    window.updateChatbotLanguage = updateChatbotLanguage;

    if (window.currentLang === 'te') {
      updateChatbotLanguage('te');
    }

    // Export global triggers for external buttons/links
    window.openIvoryChat = function (query) {
      toggleChat(true);
      if (query) {
        input.value = query;
        form.dispatchEvent(new Event('submit'));
      }
    };

    window.openCareReminder = function () {
      openReminderModal();
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
