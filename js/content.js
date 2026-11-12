/**
 * Ivory Dental Studio - Content Data Store
 * All clinical and promotional copy is maintained here for easy staff editing.
 * Formatted with translation-ready multi-language structures ({ en: "...", te: "..." }).
 */

const CONTENT = {
  treatments: [
    {
      id: "implants",
      name: {
        en: "Dental Implants in Hyderabad",
        te: "హైదరాబాద్‌లో డెంటల్ ఇంప్లాంట్స్"
      },
      shortTitle: {
        en: "Dental Implants",
        te: "డెంటల్ ఇంప్లాంట్స్"
      },
      summary: {
        en: "Permanent, natural-looking tooth replacements anchored with titanium or zirconia posts.",
        te: "సహజమైన దంతాల వలె శాశ్వతంగా పనిచేసే టైటానియం మరియు జిర్కోనియా ఇంప్లాంట్ చికిత్స."
      },
      priceRange: {
        en: "₹25,000–₹60,000 per implant",
        te: "₹25,000–₹60,000 ఒక్కో ఇంప్లాంట్‌కు"
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: "పరీక్ష తర్వాత తుది ధర నిర్ణయించబడుతుంది"
      },
      duration: {
        en: "2–3 visits over 3–4 months (healing dependent)",
        te: "2–3 విజిట్లు (3–4 నెలల స్వస్థత వ్యవధి)"
      },
      whatItIs: {
        en: "A permanent surgical fixture placed into the jawbone that fuses with natural bone over time, supporting a customized ceramic crown that matches your natural teeth in strength and aesthetics.",
        te: "దవడ ఎముకలో అమర్చే శాశ్వతమైన టైటానియం పోస్ట్, ఇది సహజ ఎముకతో కలిసిపోయి మీ సహజ పంటి బలాన్ని మరియు రూపాన్ని పునరుద్ధరిస్తుంది."
      },
      process: [
        { en: "Comprehensive 3D CBCT imaging and bone density evaluation", te: "సమగ్ర 3D CBCT స్కానింగ్ మరియు ఎముక సాంద్రత పరీక్ష" },
        { en: "Gentle, computer-guided placement of surgical-grade titanium post under local anesthesia", te: "కంప్యూటర్-గైడెడ్ పద్ధతిలో నొప్పిలేని టైటానియం ఇంప్లాంట్ అమరిక" },
        { en: "Osseointegration healing phase (biological bonding with jawbone)", te: "ఎముకతో ఇంప్లాంట్ అనుసంధానమయ్యే స్వస్థత దశ" },
        { en: "Digital 3D scanning and abutment fixation", te: "డిజిటల్ 3D స్కానింగ్ మరియు అబట్‌మెంట్ బిగింపు" },
        { en: "Placement of custom-matched, durable zirconia crown", te: "సహజ పంటి రంగుకు సరిపోయే బలమైన జిర్కోనియా క్రౌన్ అమరిక" }
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
        te: "హైదరాబాద్‌లో రూట్ కెనాల్ చికిత్స (RCT)"
      },
      shortTitle: {
        en: "Root Canal Treatment (RCT)",
        te: "రూట్ కెనాల్ (RCT)"
      },
      summary: {
        en: "Painless single-sitting or two-visit therapy to relieve toothache and save infected teeth.",
        te: "ఒక్క సిట్టింగ్‌లోనే తీవ్రమైన పంటి నొప్పి నుండి ఉపశమనం కలిగించే సురక్షితమైన రూట్ కెనాల్ చికిత్స."
      },
      priceRange: {
        en: "₹3,000–₹8,000 per tooth",
        te: "₹3,000–₹8,000 ఒక్కో పంటికి"
      },
      priceNote: {
        en: "Indicative, final cost after examination",
        te: "ఇన్‌ఫెక్షన్ తీవ్రతను బట్టి ఖర్చు ఉంటుంది"
      },
      duration: {
        en: "1–2 visits (45–60 mins per session)",
        te: "1–2 విజిట్లు (45–60 నిమిషాలు)"
      },
      whatItIs: {
        en: "A precise conservative procedure to remove infected or inflamed pulp tissue from inside the tooth, sterilise the internal canals, and seal them securely to prevent reinfection.",
        te: "పంటి లోపలి ఇన్‌ఫెక్షన్ సోకిన గుజ్జును తొలగించి, నరాల కాలువలను శుభ్రపరిచి పంటిని కాపాడే సూక్ష్మ చికిత్స."
      },
      process: [
        { en: "Digital radiographic diagnosis and localized painless anesthesia", te: "డిజిటల్ ఎక్స్-రే నిర్ధారణ మరియు నొప్పి తెలియకుండా అనస్థీషియా" },
        { en: "Microscopic isolation using a sterile rubber dam", te: "స్టెరైల్ రబ్బర్ డ్యామ్ ఉపయోగించి పంటికి రక్షణ కవచం" },
        { en: "Rotary cleaning, shaping, and disinfection of root canals", te: "రోటరీ పరికరాలతో కెనాల్స్‌ను శుభ్రపరచడం" },
        { en: "Hermetic sealing with biocompatible gutta-percha", te: "బయోకాంపాటిబుల్ గుట్టా-పర్చాతో సురక్షిత సీలింగ్" },
        { en: "Core restoration and preparation for protective dental crown", te: "పంటి పునరుద్ధరణ మరియు ప్రొటెక్టివ్ క్రౌన్ అమరిక" }
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
        te: "క్లియర్ అలైన్ర్స్ & దంతాల క్లిప్పులు"
      },
      shortTitle: {
        en: "Braces & Clear Aligners",
        te: "అలైన్ర్స్ & క్లిప్పులు"
      },
      summary: {
        en: "Straighten teeth discreetly with invisible clear aligners or low-profile ceramic brackets.",
        te: "వంకర దంతాలను చక్కదిద్దే కనిపించని పారదర్శక అలైన్ర్స్ లేదా సిరామిక్ బ్రేసెస్."
      },
      priceRange: {
        en: "Braces: ₹35k–₹70k; Aligners: ₹60k–₹2.2L",
        te: "బ్రేసెస్: ₹35k–₹70k | అలైన్ర్స్: ₹60k–₹2.2L"
      },
      priceNote: {
        en: "Comprehensive plan with 3D smile simulation",
        te: "3D స్మైల్ సిమ్యులేషన్‌తో సమగ్ర ప్రణాళిక"
      },
      duration: {
        en: "6–18 months (case dependent)",
        te: "6–18 నెలలు (దంతాల స్థానాన్ని బట్టి)"
      },
      whatItIs: {
        en: "Orthodontic treatment using custom transparent medical-grade polyurethane trays or low-profile ceramic brackets to align crowded or spaced teeth gently into healthy occlusion.",
        te: "అధునాతన పారదర్శక ట్రేల ద్వారా దంతాలను సహజంగా, నొప్పిలేకుండా సరైన వరుసలోకి తెచ్చే చికిత్స."
      },
      process: [
        { en: "Intraoral digital 3D bite scan and facial profile assessment", te: "ఇంట్రారల్ డిజిటల్ 3D బైట్ స్కానింగ్" },
        { en: "Computerized smile simulation showing stage-by-stage tooth movement", te: "కంప్యూటరైజ్డ్ స్మైల్ సిమ్యులేషన్ ప్రదర్శన" },
        { en: "Custom fabrication of custom medical-grade aligner trays", te: "మెడికల్-గ్రేడ్ అలైనర్ ట్రేల తయారీ" },
        { en: "Bi-weekly tray transitions with periodic orthodontic reviews", te: "ప్రతి రెండు వారాలకు కొత్త ట్రేల మార్పిడి" },
        { en: "Post-treatment retention trays to preserve alignment permanently", te: "ఫలితాన్ని స్థిరంగా ఉంచేందుకు నైట్ రిటైనర్స్" }
      ],
      img640: "assets/img/treat-braces-640.webp",
      img1200: "assets/img/treat-braces-1200.webp",
      alt: "Clear aligners and orthodontic brackets in Hyderabad",
      isPending: false
    },
    {
      id: "crowns",
      name: {
        en: "Dental Crowns & Bridges in Hyderabad",
        te: "దంతాల క్యాప్స్ & బ్రిడ్జెస్ (క్రౌన్స్)"
      },
      shortTitle: {
        en: "Crowns & Bridges",
        te: "క్యాప్స్ & బ్రిడ్జెస్"
      },
      summary: {
        en: "Custom-shaded monolithic zirconia and ceramic restorations for maximum chewing strength.",
        te: "నమలడానికి గరిష్ట బలాన్ని మరియు సహజ రూపాన్ని ఇచ్చే ప్రీమియం జిర్కోనియా క్యాప్‌లు."
      },
      priceRange: {
        en: "₹4,000–₹16,000 per unit",
        te: "₹4,000–₹16,000 ఒక్కో యూనిట్‌కు"
      },
      priceNote: {
        en: "Tiered by material (Metal-Free Zirconia, E-Max)",
        te: "మెటల్-ఫ్రీ జిర్కోనియా మరియు E-Max రకాలు"
      },
      duration: {
        en: "2 visits over 3–5 working days",
        te: "2 విజిట్లు (3–5 పని దినాలు)"
      },
      whatItIs: {
        en: "A precision-milled protective cap placed over a damaged, fractured, or root-canal-treated tooth to restore full masticatory function, structural longevity, and aesthetic contour.",
        te: "బలహీనమైన లేదా రూట్ కెనాల్ చేసిన పంటిని రక్షించి, పూర్తి నమిలే బలాన్ని అందించే రక్షణ కవచం."
      },
      process: [
        { en: "Conservative tooth preparation and occlusal clearance", te: "పంటిని క్యాప్‌కు అనుగుణంగా సున్నితంగా తీర్చిదిద్దడం" },
        { en: "3D intraoral digital optical impression (no messy paste)", te: "3D డిజిటల్ స్కానింగ్ (పేస్ట్ అవసరం లేదు)" },
        { en: "Placement of aesthetic temporary crown during lab milling", te: "టెంపరరీ క్యాప్ అమరిక" },
        { en: "CAD/CAM 5-axis robotic milling from high-strength zirconia", te: "CAD/CAM రోబోటిక్ మిల్లింగ్ ద్వారా జిర్కోనియా తయారీ" },
        { en: "Precise bonding and occlusal bite micro-adjustment", te: "పటిష్టమైన సిమెంటింగ్‌తో తుది అమరిక" }
      ],
      img640: "assets/img/treat-crowns-640.webp",
      img1200: "assets/img/treat-crowns-1200.webp",
      alt: "Dental ceramic crown and bridge restoration in Hyderabad",
      isPending: false
    },
    {
      id: "cleaning",
      name: {
        en: "Teeth Cleaning & Polishing in Hyderabad",
        te: "టీత్ క్లీనింగ్ & అల్ట్రాసోనిక్ పాలిషింగ్"
      },
      shortTitle: {
        en: "Cleaning & Polishing",
        te: "క్లీనింగ్ & పాలిషింగ్"
      },
      summary: {
        en: "Ultrasonic scaling to remove hardened calculus, plaque, and stains without touching enamel.",
        te: "ఎనామిల్ దెబ్బతినకుండా గార, పాచి మరియు మొండి మరకలను తొలగించే సున్నితమైన క్లీనింగ్."
      },
      priceRange: {
        en: "₹1,200–₹2,500",
        te: "₹1,200–₹2,500"
      },
      priceNote: {
        en: "Includes ultrasonic scaling and fluoride polishing",
        te: "అల్ట్రాసోనిక్ క్లీనింగ్ మరియు పాలిషింగ్ కలిపి"
      },
      duration: {
        en: "1 visit (30–45 mins)",
        te: "1 విజిట్ (30–45 నిమిషాలు)"
      },
      whatItIs: {
        en: "A routine preventive procedure utilizing microscopic ultrasonic vibrations to dislodge calcified tartar deposits and bacterial biofilm above and below the gumline.",
        te: "చిగుళ్ళ వాపు, రక్తస్రావం రాకుండా దంతాల మధ్య దాగి ఉన్న బ్యాక్టీరియాను తొలగించే రక్షణ చికిత్స."
      },
      process: [
        { en: "Comprehensive periodontal pocket and gingival screening", te: "చిగుళ్ళ ఆరోగ్యం మరియు పాకెట్ పరీక్ష" },
        { en: "Gentle piezoelectric ultrasonic scaling with warm saline mist", te: "సున్నితమైన అల్ట్రాసోనిక్ పరికరంతో క్లీనింగ్" },
        { en: "Interdental flossing and stubborn stain lift", te: "దంతాల మధ్య మరకల తొలగింపు" },
        { en: "Enamel micro-polishing using fine prophylactic paste", te: "ఫైన్ ప్రొఫిలాక్టిక్ పేస్ట్‌తో ఎనామిల్ పాలిషింగ్" },
        { en: "Protective fluoride application and personalized brushing guidance", te: "ఫ్లోరైడ్ రక్షణ మరియు బ్రషింగ్ సలహాలు" }
      ],
      img640: "assets/img/treat-cleaning-640.webp",
      img1200: "assets/img/treat-cleaning-1200.webp",
      alt: "Ultrasonic dental cleaning and polishing in Hyderabad",
      isPending: false
    },
    {
      id: "whitening",
      name: {
        en: "Professional Teeth Whitening in Hyderabad",
        te: "ప్రొఫెషనల్ టీత్ వైట్నింగ్"
      },
      shortTitle: {
        en: "Teeth Whitening",
        te: "టీత్ వైట్నింగ్"
      },
      summary: {
        en: "Brighten your smile safely by up to 6–8 shades with enamel-safe LED light activation.",
        te: "ఎనామిల్‌కు నష్టం కలగకుండా పంటి రంగును 6–8 షేడ్స్ తెల్లబరిచే సురక్షితమైన చికిత్స."
      },
      priceRange: {
        en: "₹7,000–₹14,000",
        te: "₹7,000–₹14,000"
      },
      priceNote: {
        en: "In-office single session or take-home kit options",
        te: "ఒక్క గంటలో పూర్తి లేదా హోమ్ కిట్ ఆప్షన్"
      },
      duration: {
        en: "1 visit (60 mins)",
        te: "1 విజిట్ (60 నిమిషాలు)"
      },
      whatItIs: {
        en: "A clinically proven cosmetic procedure using pH-neutral whitening gel accelerated by cool LED light to dissolve deep intrinsic coffee, tea, and aging stains safely.",
        te: "టీ, కాఫీ మరియు వయస్సు వల్ల మారిన పంటి రంగును సహజమైన ప్రకాశవంతమైన తెలుపు రంగులోకి మార్చే చికిత్స."
      },
      process: [
        { en: "Shade baseline recording with digital spectrophotometer", te: "ప్రస్తుత పంటి రంగు నమోదు" },
        { en: "Protective gingival barrier resin application to shield gums", te: "చిగుళ్ళ రక్షణకు బారియర్ జెల్ అమరిక" },
        { en: "Application of professional-grade whitening formulation", te: "ప్రొఫెషనల్ వైట్నింగ్ జెల్ అప్లికేషన్" },
        { en: "Cool LED light activation in three 15-minute intervals", te: "కూల్ LED లైట్ ద్వారా యాక్టివేషన్" },
        { en: "Post-treatment remineralization serum to prevent sensitivity", te: "సున్నితత్వం రాకుండా రీమినరలైజేషన్ సీరమ్" }
      ],
      img640: "assets/img/treat-whitening-640.webp",
      img1200: "assets/img/treat-whitening-1200.webp",
      alt: "In-office dental teeth whitening session in Hyderabad",
      isPending: false
    },
    {
      id: "kids",
      name: {
        en: "Pediatric Dentistry in Hyderabad",
        te: "పిల్లల దంత చికిత్స (పీడియాట్రిక్)"
      },
      shortTitle: {
        en: "Pediatric Dentistry",
        te: "పిల్లల డెంటిస్ట్రీ"
      },
      summary: {
        en: "Warm, anxiety-free dental visits for infants and kids, covering preventive sealants and fluoride.",
        te: "పిల్లలకు ఎలాంటి భయం లేని సున్నితమైన మరియు ఉల్లాసభరితమైన దంత సంరక్షణ."
      },
      priceRange: {
        en: "₹800–₹3,500",
        te: "₹800–₹3,500"
      },
      priceNote: {
        en: "Preventive consultations and gentle restorations",
        te: "సున్నితమైన పునరుద్ధరణ మరియు రక్షణ చికిత్సలు"
      },
      duration: {
        en: "30–45 mins per visit",
        te: "30–45 నిమిషాలు"
      },
      whatItIs: {
        en: "Specialized gentle oral healthcare tailored to children from first tooth through adolescence, emphasizing habit correction, preventive fluoride, and fear-free dental attitudes.",
        te: "చిన్నపిల్లల పాల పళ్ళు మరియు శాశ్వత దంతాల ఆరోగ్యాన్ని కాపాడేందుకు ప్రత్యేక శిక్షణ పొందిన వైద్యుల సంరక్షణ."
      },
      process: [
        { en: "Playful 'get acquainted' acclimatization visit with no sharp tools", te: "పిల్లల్లో భయం పోగొట్టే ఫ్రెండ్లీ పరిచయ విజిట్" },
        { en: "Gentle inspection of primary teeth, bite growth, and jaw alignment", te: "పాల పళ్ళు మరియు దవడ ఎదుగుదల సమగ్ర పరీక్ష" },
        { en: "Fluoride protective varnish application to strengthen developing enamel", te: "దంతాలను బలపరిచే ఫ్లోరైడ్ వార్నిష్ రక్షణ" },
        { en: "Painless pit-and-fissure sealant coating on molars", te: "పుప్పి పళ్ళు రాకుండా రక్షించే సీలెంట్ కోటింగ్" },
        { en: "Parental advice on pediatric diet, bottle habits, and brushing", te: "తల్లిదండ్రులకు ఆహారం మరియు బ్రషింగ్ సలహాలు" }
      ],
      img640: "assets/img/treat-kids-640.webp",
      img1200: "assets/img/treat-kids-1200.webp",
      alt: "Pediatric dental care for children in Hyderabad",
      isPending: false
    },
    {
      id: "dentures",
      name: {
        en: "Custom Dentures in Hyderabad",
        te: "కస్టమ్ డెంచర్స్ (కృత్రిమ పళ్ళు)"
      },
      shortTitle: {
        en: "Dentures",
        te: "డెంచర్స్"
      },
      summary: {
        en: "Comfortable complete or partial prosthetics customized for natural smile aesthetics and chewing.",
        te: "సహజంగా సరిపోయే మరియు సౌకర్యవంతంగా నమలడానికి వీలు కల్పించే ఆధునిక డెంచర్స్."
      },
      priceRange: {
        en: "₹10,000–₹40,000 per arch",
        te: "₹10,000–₹40,000 ఒక్కో ఆర్చ్‌కు"
      },
      priceNote: {
        en: "Flexible, BPS, and implant-supported variations",
        te: "ఫ్లెక్సిబుల్, BPS మరియు ఇంప్లాంట్ సపోర్టెడ్ రకాలు"
      },
      duration: {
        en: "3–4 visits over 2 weeks",
        te: "3–4 విజిట్లు (2 వారాలు)"
      },
      whatItIs: {
        en: "Removable or implant-retained custom dental appliances crafted from biocompatible acrylic resins and anatomical ceramic teeth to replace multiple missing teeth seamlessly.",
        te: "కోల్పోయిన దంతాలను సహజంగా పునరుద్ధరించే కస్టమ్ మేడ్ సౌకర్యవంతమైన కృత్రిమ పళ్ళ సెట్."
      },
      process: [
        { en: "Primary anatomical impression of ridge and mucosal tissues", te: "దవడ మరియు చిగుళ్ళ కొలతల సేకరణ" },
        { en: "Custom tray secondary functional impression for tight seal", te: "కచ్చితమైన గ్రిప్ కొరకు సెకండరీ ఇంప్రెషన్" },
        { en: "Jaw relationship wax try-in to verify bite height and lip support", te: "నమలడం మరియు పెదవుల సరిపోలికను పరీక్షించే వ్యాక్స్ ట్రయల్" },
        { en: "Aesthetic tooth selection matched to facial harmony and age", te: "ముఖానికి సరిపోయే సహజ దంతాల ఎంపిక" },
        { en: "Final processing, delivery, and post-insertion pressure adjustments", te: "డెంచర్ డెలివరీ మరియు ఒత్తిడి సరిచేసే సర్దుబాట్లు" }
      ],
      img640: "assets/img/treat-dentures-640.webp",
      img1200: "assets/img/treat-dentures-1200.webp",
      alt: "Custom complete and partial dentures in Hyderabad",
      isPending: false
    },
    {
      id: "extraction",
      name: {
        en: "Tooth Extractions & Wisdom Teeth in Hyderabad",
        te: "పంటి తొలగింపు & విజ్డమ్ టూత్ సర్జరీ"
      },
      shortTitle: {
        en: "Extractions & Wisdom Teeth",
        te: "విజ్డమ్ టూత్ సర్జరీ"
      },
      summary: {
        en: "Gentle removal of unsavable or impacted wisdom teeth under comfortable local anesthesia.",
        te: "ఇరుక్కుపోయిన జ్ఞాన దంతాలను (విజ్డమ్ టూత్) నొప్పిలేకుండా తొలగించే సురక్షితమైన సర్జరీ."
      },
      priceRange: {
        en: "Simple: ₹800–₹2,000; Surgical: ₹3,500–₹8,000",
        te: "సాధారణ: ₹800–₹2,000 | సర్జికల్: ₹3,500–₹8,000"
      },
      priceNote: {
        en: "Depends on angulation and nerve proximity",
        te: "పంటి లోతు మరియు స్థానాన్ని బట్టి ధర ఉంటుంది"
      },
      duration: {
        en: "1 visit (30–60 mins)",
        te: "1 విజిట్ (30–60 నిమిషాలు)"
      },
      whatItIs: {
        en: "A routine minor surgical or atraumatic extraction of severely damaged teeth or third molars that are impinging on adjacent nerve roots or causing recurrent infections.",
        te: "పక్క పళ్ళకు హాని కలిగించే లేదా నొప్పి కలిగించే పంటిని సురక్షితంగా తొలగించే మైనర్ సర్జికల్ చికిత్స."
      },
      process: [
        { en: "High-resolution digital panoramic OPG or CBCT scan", te: "డిజిటల్ పనోరమిక్ OPG లేదా CBCT స్కాన్" },
        { en: "Profound localized anesthesia with computer-controlled delivery", te: "నొప్పి లేకుండా కంప్యూటర్-నియంత్రిత అనస్థీషియా" },
        { en: "Atraumatic tooth mobilization preserving surrounding alveolar bone", te: "ఎముకకు దెబ్బతగలకుండా సున్నితంగా పంటిని కదిలించడం" },
        { en: "Thorough socket debridement, platelet therapy, and suture placement", te: "సాకెట్ క్లీనింగ్ మరియు సున్నితమైన కుట్లు వేయడం" },
        { en: "Post-op medication kit and same-day recovery instructions", te: "మందుల కిట్ మరియు రికవరీ జాగ్రత్తలు" }
      ],
      img640: "assets/img/treat-extraction-640.webp",
      img1200: "assets/img/treat-extraction-1200.webp",
      alt: "Gentle tooth extraction and wisdom tooth surgery in Hyderabad",
      isPending: false
    },
    {
      id: "checkup",
      name: {
        en: "General Check-ups & Digital X-Rays in Hyderabad",
        te: "సమగ్ర దంత పరీక్ష & డిజిటల్ ఎక్స్-రే"
      },
      shortTitle: {
        en: "Check-ups & X-Rays",
        te: "దంత పరీక్ష & ఎక్స్-రే"
      },
      summary: {
        en: "Comprehensive oral health assessment, intraoral digital camera screening, and honest treatment plan.",
        te: "డిజిటల్ ఇంట్రారల్ కెమెరాతో సమగ్ర పరీక్ష మరియు స్పష్టమైన చికిత్సా ప్రణాళిక."
      },
      priceRange: {
        en: "₹300–₹600",
        te: "₹300–₹600"
      },
      priceNote: {
        en: "Includes visual exam, consultation & intraoral digital scan",
        te: "క్లినికల్ పరీక్ష మరియు డిజిటల్ స్కాన్ కలిపి"
      },
      duration: {
        en: "1 visit (20–30 mins)",
        te: "1 విజిట్ (20–30 నిమిషాలు)"
      },
      whatItIs: {
        en: "A baseline diagnostic examination inspecting every tooth, restoration, gum tissue, and jaw joint to identify microscopic decay before symptoms arise.",
        te: "దంత క్షయం, చిగుళ్ళ వ్యాధులను ప్రారంభ దశలోనే గుర్తించి పరిష్కరించే సాధారణ పరీక్ష."
      },
      process: [
        { en: "Detailed review of dental history, lifestyle, and medical conditions", te: "గత దంత ఆరోగ్య వివరాల పరిశీలన" },
        { en: "High-definition intraoral camera walkthrough of every quadrant", te: "HD ఇంట్రారల్ కెమెరా ద్వారా స్క్రీన్‌పై ప్రత్యక్ష పరిశీలన" },
        { en: "Low-radiation digital sensor bitewing or periapical radiographs", te: "అతి తక్కువ రేడియేషన్ ఉండే డిజిటల్ ఎక్స్-రే" },
        { en: "Oral cancer mucosal screening and joint palpation", te: "ఓరల్ మ్యూకోసా మరియు దవడ జాయింట్ పరీక్ష" },
        { en: "Itemized written roadmap with transparent costs and no pressure", te: "ఖర్చుల వివరాలతో కూడిన రాతపూర్వక ప్రణాళిక" }
      ],
      img640: "assets/img/treat-checkup-640.webp",
      img1200: "assets/img/treat-checkup-1200.webp",
      alt: "Comprehensive dental check-up and digital X-ray examination in Hyderabad",
      isPending: false
    }
  ],

  doctors: [
    {
      id: "implantologist",
      name: {
        en: "Dr. Demo Implantologist",
        te: "డా. డెమో ఇంప్లాంటాలజిస్ట్"
      },
      role: {
        en: "Chief Implantologist & Prosthodontist",
        te: "చీఫ్ ఇంప్లాంటాలజిస్ట్ & ప్రొస్తోడాంటిస్ట్"
      },
      qualifications: "BDS, MDS (Prosthodontics & Implantology)",
      experience: "14+ Years Clinical Experience",
      specialisations: {
        en: "Full-mouth rehabilitation, immediate-load implants, bone grafting, digital surgical guides.",
        te: "ఫుల్-మౌత్ ఇంప్లాంట్స్, కంప్యూటర్-గైడెడ్ సర్జరీ, ఎముక అంటుకట్టడం."
      },
      bio: {
        en: "Specialist in computer-guided implant surgeries and restorative prosthetics, dedicated to restoring permanent smiles with minimal discomfort.",
        te: "కంప్యూటర్-గైడెడ్ పద్ధతుల్లో అధునాతన ఇంప్లాంట్ సర్జరీలు మరియు శాశ్వత స్మైల్ పునరుద్ధరణ నిపుణులు."
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
        te: "డా. డెమో ఎండోడాంటిస్ట్"
      },
      role: {
        en: "Senior Endodontist & Conservative Dentistry",
        te: "సీనియర్ ఎండోడాంటిస్ట్ & కన్జర్వేటివ్ డెంటిస్ట్రీ"
      },
      qualifications: "BDS, MDS (Conservative Dentistry & Endodontics)",
      experience: "11+ Years Clinical Experience",
      specialisations: {
        en: "Microscopic single-visit root canals, surgical endodontics, aesthetic ceramic restorations.",
        te: "ఒక్క సిట్టింగ్‌లో మైక్రోస్కోపిక్ రూట్ కెనాల్స్, సౌందర్య సిరామిక్ క్యాప్స్."
      },
      bio: {
        en: "Dedicated to saving infected teeth with microscopic precision and gentle technique, ensuring completely pain-free procedures.",
        te: "సూక్ష్మ స్థాయి ఖచ్చితత్వంతో సహజ పళ్ళను కాపాడే నిపుణులు, నొప్పిలేని చికిత్సకు ప్రాధాన్యత."
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
        te: "డా. డెమో ఆర్తోడాంటిస్ట్ & పీడోడాంటిస్ట్"
      },
      role: {
        en: "Specialist Orthodontist & Pediatric Dentist",
        te: "స్పెషలిస్ట్ ఆర్తోడాంటిస్ట్ & పీడియాట్రిక్ డెంటిస్ట్"
      },
      qualifications: "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
      experience: "9+ Years Clinical Experience",
      specialisations: {
        en: "Clear aligner therapy, aesthetic ceramic braces, interceptive kids orthodontics, pediatric dentistry.",
        te: "క్లియర్ అలైన్ర్స్, సిరామిక్ బ్రేసెస్, పిల్లల దంత సంరక్షణ మరియు వంకర పళ్ళ నివారణ."
      },
      bio: {
        en: "Passionate about creating confident, beautifully aligned smiles for teenagers and adults, alongside calm, gentle dental visits for young children.",
        te: "అందమైన పళ్ళ వరుస కోసం అలైన్ర్స్ చికిత్స మరియు పిల్లలకు స్నేహపూర్వక, భయంలేని దంత సంరక్షణ అందిస్తారు."
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
      title: { en: "Smile Result", te: "స్మైల్ ఫలితం" },
      caption: { en: "Smile result", te: "స్మైల్ రూపాంతరం" },
      img640: "assets/img/gallery-smile-640.webp",
      img1200: "assets/img/gallery-smile-1200.webp",
      alt: "Patient smile transformation result at dental clinic in Hyderabad",
      isPending: false
    },
    {
      id: "before-after",
      title: { en: "Smile Makeover Before & After", te: "స్మైల్ మేకోవర్ ముందు & తర్వాత" },
      caption: { en: "Before & after smile transformation", te: "ముందు & తర్వాత ఫలితాల పోలిక" },
      img640: "assets/img/gallery-before-after-640.webp",
      img1200: "assets/img/gallery-before-after-1200.webp",
      alt: "Before and after comparison of dental smile makeover at Ivory Dental Studio Hyderabad",
      isPending: false
    },
    {
      id: "instruments",
      title: { en: "Sterile Instruments & Equipment", te: "స్టెరైల్ పరికరాలు" },
      caption: { en: "Sterile instruments and equipment", te: "హాస్పిటల్-గ్రేడ్ శుభ్రపరచిన పరికరాలు" },
      img640: "assets/img/treat-extraction-640.webp",
      img1200: "assets/img/treat-extraction-1200.webp",
      alt: "Sterile surgical dental instruments and materials",
      isPending: false
    },
    {
      id: "reception",
      title: { en: "Welcoming Reception", te: "రిసెప్షన్ లాంజ్" },
      caption: { en: "Welcoming clinic reception", te: "ప్రశాంతమైన రిసెప్షన్ మరియు వెయిటింగ్ ఏరియా" },
      img640: "assets/img/gallery-reception-640.webp",
      img1200: "assets/img/gallery-reception-1200.webp",
      alt: "Welcoming reception and waiting lounge at Ivory Dental Studio Hyderabad",
      isPending: false
    },
    {
      id: "checkup-action",
      title: { en: "Clinical Check-up in Progress", te: "దంత పరీక్ష ప్రక్రియ" },
      caption: { en: "Check-up in progress", te: "డిజిటల్ ఇమేజింగ్‌తో పరీక్ష" },
      img640: "assets/img/treat-checkup-640.webp",
      img1200: "assets/img/treat-checkup-1200.webp",
      alt: "Dental examination under sterile conditions in Hyderabad",
      isPending: false
    },
    {
      id: "sterilisation",
      title: { en: "Sterilisation Setup", te: "స్టెరిలైజేషన్ సెటప్" },
      caption: { en: "Sterilisation & autoclave setup", te: "క్లాస్-బి ఆటోక్లేవ్ స్టెరిలైజేషన్ వ్యవస్థ" },
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
          te: "పంటి పగులు తర్వాత ఇంప్లాంట్ వేయించుకోవడానికి భయపడ్డాను. కానీ 3D స్కాన్స్‌తో ప్రతి దశను వివరించారు, సర్జరీ పూర్తిగా నొప్పిలేకుండా జరిగింది. ఇప్పుడు నా సహజ పంటిలాగే ఉంది."
        }
      },
      {
        id: "rev-2",
        author: "Priya",
        rating: 5,
        treatmentTag: "Root Canal Treatment",
        text: {
          en: "Had acute toothache on a weekday evening. They scheduled an emergency appointment quickly. The root canal was finished in a single sitting without any discomfort. Highly recommend their gentle approach.",
          te: "తీవ్రమైన పంటి నొప్పితో సాయంత్రం వెళ్లాను. అత్యవసర అపాయింట్‌మెంట్ ఇచ్చి, ఒక్క సిట్టింగ్‌లోనే ఎలాంటి నొప్పిలేకుండా రూట్ కెనాల్ పూర్తి చేశారు."
        }
      },
      {
        id: "rev-3",
        author: "Ananya",
        rating: 5,
        treatmentTag: "Clear Aligners",
        text: {
          en: "Completed my aligner treatment here in under 10 months. The 3D scan at the beginning showed me exactly how my teeth would move, and the end result matches the simulation perfectly.",
          te: "10 నెలల్లో నా అలైన్ర్స్ చికిత్స పూర్తయింది. ప్రారంభంలో చూపించిన 3D సిమ్యులేషన్ ప్రకారమే నా దంతాలు చక్కగా అమరినాయి."
        }
      },
      {
        id: "rev-4",
        author: "Vikram",
        rating: 4.5,
        treatmentTag: "Cleaning & Polishing",
        text: {
          en: "Very hygienic clinic environment. The ultrasonic cleaning was gentle on sensitive gums, and the doctor gave practical flossing tips without pushing unnecessary procedures.",
          te: "చాలా పరిశుభ్రమైన వాతావరణం. చిగుళ్ళకు నొప్పి కలగకుండా క్లీనింగ్ చేశారు. అనవసరమైన చికిత్సలు సిఫార్సు చేయకుండా నిజాయితీగా సలహా ఇచ్చారు."
        }
      },
      {
        id: "rev-5",
        author: "Sneha",
        rating: 5,
        treatmentTag: "Kids Dentistry",
        text: {
          en: "Took my 6-year-old daughter for her first filling. The pediatric dentist was calm, playful, and patient. She came out smiling and proud of her bravery sticker. Outstanding pediatric care.",
          te: "నా 6 ఏళ్ల కూతురిని ఫిల్లింగ్ కోసం తీసుకెళ్లాను. డాక్టర్ చాలా సరదాగా, ఓపిగ్గా చికిత్స చేశారు. పాప నవ్వుతూ బయటకు వచ్చింది."
        }
      },
      {
        id: "rev-6",
        author: "Karthik",
        rating: 5,
        treatmentTag: "Teeth Whitening",
        text: {
          en: "Did the in-office whitening session before an important family celebration. Saw a noticeable difference of several shades within one hour, and had zero post-procedure sensitivity.",
          te: "ముఖ్యమైన కుటుంబ వేడుకకి ముందు టీత్ వైట్నింగ్ చేయించుకున్నాను. గంటలోనే స్పష్టమైన మార్పు కనిపించింది, ఎటువంటి సున్నితత్వం రాలేదు."
        }
      }
    ]
  },

  offers: [
    {
      id: "camp",
      category: "festival",
      title: {
        en: "Free Dental Check-up Camp",
        te: "ఉచిత దంత పరీక్ష శిబిరం"
      },
      badge: {
        en: "Festival & Community",
        te: "పండుగ ప్రత్యేక శిబిరం"
      },
      description: {
        en: "Comprehensive visual oral exam, digital intraoral photography, and personalized dental health consultation at zero cost.",
        te: "అనుభవజ్ఞులైన వైద్యులచే పూర్తి 32 దంతాల క్లినికల్ పరీక్ష, డిజిటల్ ఫోటోగ్రఫీ మరియు వ్యక్తిగత సంప్రదింపులు ఉచితం."
      },
      features: [
        { en: "Full 32-tooth clinical evaluation", te: "పూర్తి 32 దంతాల సమగ్ర పరీక్ష" },
        { en: "Digital cavity & gum assessment", te: "చిగుళ్ల ఆరోగ్యం & పుప్పి పళ్ల డిజిటల్ పరిశీలన" },
        { en: "Personalized written care plan", te: "వ్యక్తిగత చికిత్సా ప్రణాళిక మరియు సలహాలు" }
      ],
      validity: {
        en: "Valid through this month • Prior registration required",
        te: "ఈ నెలాఖరు వరకు మాత్రమే • ముందస్తు నమోదు అవసరం"
      },
      whatsappMsg: "Hi, I would like to book an appointment for the Free Dental Check-up Camp offer."
    },
    {
      id: "makeover",
      category: "wedding",
      title: {
        en: "Smile Makeover Package",
        te: "స్మైల్ మేకోవర్ ప్యాకేజీ"
      },
      badge: {
        en: "Special Smile Makeover",
        te: "ప్రత్యేక స్మైల్ మేకోవర్"
      },
      description: {
        en: "Professional in-office LED teeth whitening, ultrasonic scaling, and protective enamel polish for an instantly radiant, confident smile.",
        te: "కాంతివంతమైన చిరునవ్వు కోసం ఇన్-ఆఫీస్ LED టీత్ వైట్నింగ్, అల్ట్రాసోనిక్ క్లీనింగ్ మరియు పాలిషింగ్ సమగ్ర చికిత్స."
      },
      features: [
        { en: "In-office LED teeth whitening session", te: "క్లినిక్‌లో ఆధునిక LED టీత్ వైట్నింగ్" },
        { en: "Complete ultrasonic scaling & stain removal", te: "అల్ట్రాసోనిక్ స్కేలింగ్ ద్వారా మరకల తొలగింపు" },
        { en: "Protective fluoride desensitizing polish", te: "దంతాల రక్షణకు ఫ్లోరైడ్ డీసెన్సిటైజింగ్ పాలిష్" }
      ],
      validity: {
        en: "Special package rate • Prior registration required",
        te: "ప్రత్యేక రాయితీ ధర • ముందస్తు నమోదు అవసరం"
      },
      whatsappMsg: "Hi, I am interested in the Smile Makeover Package offer. Please share availability."
    },
    {
      id: "family",
      category: "all",
      title: {
        en: "Family Cleaning Pack",
        te: "కుటుంబ దంత సంరక్షణ ప్యాకేజీ"
      },
      badge: {
        en: "Family Value",
        te: "కుటుంబ సభ్యులందరికీ రక్షణ"
      },
      description: {
        en: "Comprehensive preventive dental care package covering ultrasonic scaling and polishing for up to 3 family members.",
        te: "కుటుంబంలోని ముగ్గురు సభ్యులకు సంపూర్ణ అల్ట్రాసోనిక్ క్లీనింగ్ మరియు పాలిషింగ్ సంరక్షణ."
      },
      features: [
        { en: "Full cleaning & polishing for 3 family members", te: "ముగ్గురు కుటుంబ సభ్యులకు పూర్తి క్లీనింగ్ & పాలిషింగ్" },
        { en: "Complimentary check-up for children under 12", te: "12 ఏళ్ల లోపు పిల్లలకు ఉచిత దంత పరీక్ష" },
        { en: "Convenient same-day weekend scheduling", te: "వారాంతాల్లో ఒకే రోజు అపాయింట్‌మెంట్ సదుపాయం" }
      ],
      validity: {
        en: "Ongoing family offer • Applicable on all weekdays & Saturdays",
        te: "సోమవారం నుండి శనివారం వరకు • ముందస్తు నమోదు అవసరం"
      },
      whatsappMsg: "Hi, I want to enquire about booking the Family Cleaning Pack for my family."
    },
    {
      id: "holiday",
      category: "holiday",
      title: {
        en: "Kids Cavity-Free Holiday Camp",
        te: "పిల్లల దంత రక్షణ & కేవిటీ-ఫ్రీ క్యాంప్"
      },
      badge: {
        en: "School Holiday Special",
        te: "సెలవుల ప్రత్యేక కార్యక్రమం"
      },
      description: {
        en: "School vacation pediatric dental package with fluoride application, pit & fissure sealants, and cavity screening.",
        te: "స్కూల్ సెలవుల సందర్భంగా పిల్లలకు ఆహ్లాదకరమైన వాతావరణంలో దంత పరీక్ష మరియు ఫ్లోరైడ్ రక్షణ."
      },
      features: [
        { en: "Fun anxiety-free pediatric dental exam", te: "పిల్లలకు ఆహ్లాదకరమైన వాతావరణంలో దంత పరీక్ష" },
        { en: "Full-mouth fluoride protective therapy", te: "పుప్పి రాకుండా పళ్లను బలోపేతం చేసే ఫ్లోరైడ్ రక్షణ" },
        { en: "Complimentary kids dental care gift kit", te: "ప్రతి చిన్నారికి ఉచిత డెంటల్ కిట్ బహుమతి" }
      ],
      validity: {
        en: "Vacation special • Prior registration required",
        te: "సెలవుల ప్రత్యేక ఆఫర్ • ముందస్తు నమోదు అవసరం"
      },
      whatsappMsg: "Hi, I want to book the Kids Cavity-Free Holiday Camp for my child."
    }
  ],

  branches: [
    {
      id: "banjara",
      name: {
        en: "Banjara Hills Branch",
        te: "బంజారా హిల్స్ బ్రాంచ్"
      },
      area: "Banjara Hills, Hyderabad",
      address: {
        en: "Plot 42, Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
        te: "ప్లాట్ 42, రోడ్ నం. 12, బంజారా హిల్స్, హైదరాబాద్, తెలంగాణ 500034"
      },
      timings: {
        en: "Mon–Sat 9:30 AM – 8:00 PM | Sunday: Closed",
        te: "సోమ–శని ఉదయం 9:30 – రాత్రి 8:00 | ఆదివారం: సెలవు"
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
        te: "మాదాపూర్ బ్రాంచ్"
      },
      area: "Madhapur, Hyderabad",
      address: {
        en: "First Floor, Madhapur Main Road, Hyderabad, Telangana 500081",
        te: "మొదటి అంతస్తు, మాదాపూర్ మెయిన్ రోడ్, హైదరాబాద్, తెలంగాణ 500081"
      },
      timings: {
        en: "Mon–Sat 10:00 AM – 8:30 PM | Sunday: Closed",
        te: "సోమ–శని ఉదయం 10:00 – రాత్రి 8:30 | ఆదివారం: సెలవు"
      },
      mapQuery: "Madhapur,+Hyderabad",
      mapUrl: "https://www.google.com/maps?q=Madhapur%2C%20Hyderabad&hl=en&z=14&output=embed",
      mapEmbedUrl: "https://www.google.com/maps?q=Madhapur%2C%20Hyderabad&hl=en&z=14&output=embed",
      directionsUrl: "https://maps.google.com/?q=Madhapur,+Hyderabad"
    }
  ],

  // 8 Frequently Asked Questions (PRD Section 4 - Fully Bilingual EN & TE)
  faqs: [
    {
      id: "pain",
      q: {
        en: "Are root canals and dental implant surgeries painful?",
        te: "రూట్ కెనాల్ మరియు డెంటల్ ఇంప్లాంట్ సర్జరీలు నొప్పి కలిగిస్తాయా?"
      },
      a: {
        en: "No. We utilize topical numbing gels prior to micro-metered local anesthesia. The target nerve is fully desensitized before any procedure begins. Most patients report feeling only gentle vibration, without pain.",
        te: "లేదు. మైక్రో-మీటర్డ్ లోకల్ అనస్థీషియాకు ముందు మేము నంబింగ్ జెల్స్ ఉపయోగిస్తాము. చికిత్స ప్రారంభించే ముందే నరం పూర్తిగా తిమ్మిరి చెందుతుంది. చాలామంది రోగులు కేవలం స్వల్ప వైబ్రేషన్ మాత్రమే అనుభవిస్తారు, ఎటువంటి నొప్పి ఉండదు."
      }
    },
    {
      id: "cost",
      q: {
        en: "How much do dental implants cost in Hyderabad?",
        te: "హైదరాబాద్‌లో డెంటల్ ఇంప్లాంట్స్ ఖర్చు ఎంత?"
      },
      a: {
        en: "Implant costs generally range from ₹25,000 to ₹60,000 per tooth depending on whether a titanium or zirconia post is selected, and whether bone grafting is needed. Every quote includes the surgical fixture and abutment with zero hidden fees.",
        te: "టైటానియం లేదా జిర్కోనియా ఎంపిక మరియు ఎముక గ్రాఫ్టింగ్ అవసరాన్ని బట్టి ఇంప్లాంట్ ధర సాధారణంగా పంటికి ₹25,000 నుండి ₹60,000 వరకు ఉంటుంది. ప్రతి కొటేషన్‌లో సర్జికల్ ఫిక్చర్ మరియు అబట్‌మెంట్ ఉంటాయి, ఎటువంటి దాచిన రుసుములు ఉండవు."
      }
    },
    {
      id: "single-visit",
      q: {
        en: "Can a root canal be completed in a single sitting?",
        te: "రూట్ కెనాల్ చికిత్స ఒకే సిట్టింగ్‌లో పూర్తవుతుందా?"
      },
      a: {
        en: "Yes. Over 85% of uncomplicated root canals are completed in one 60-minute sitting using rotary endodontic equipment and digital apex locators. Severe infections may require a second medication dressing sitting.",
        te: "అవును. రోటరీ ఎండోడాంటిక్ పరికరాలు మరియు డిజిటల్ అపెక్స్ లొకేటర్ల ద్వారా 85% కంటే ఎక్కువ సాధారణ రూట్ కెనాల్స్ 60 నిమిషాల ఒకే సిట్టింగ్‌లో పూర్తవుతాయి. తీవ్రమైన ఇన్ఫెక్షన్ ఉన్నప్పుడు మాత్రమే రెండవ సిట్టింగ్ అవసరమవుతుంది."
      }
    },
    {
      id: "aligners",
      q: {
        en: "Are clear aligners as effective as traditional braces?",
        te: "క్లియర్ అలైలర్లు సాంప్రదాయ క్లిప్పుల వలె ప్రభావవంతంగా పనిచేస్తాయా?"
      },
      a: {
        en: "Yes, for mild to moderately severe crowding, gaps, and bite misalignments. Clear aligners use sequential digital movement that is predictable, removable for meals, and virtually invisible.",
        te: "అవును. స్వల్ప మరియు మధ్యస్థ దంతాల వంపులు, సందులకు ఇవి చాలా ప్రభావవంతంగా పనిచేస్తాయి. క్లియర్ అలైలర్లు డిజిటల్ ప్రణాళికతో పళ్ళను సరిచేస్తాయి, భోజనం సమయంలో సులభంగా తీసివేయవచ్చు మరియు ఇతరులకు కనిపించవు."
      }
    },
    {
      id: "sterilisation",
      q: {
        en: "What sterilisation protocol is practiced between patients?",
        te: "రోగుల మధ్య ఎలాంటి స్టెరిలైజేషన్ పద్ధతులు పాటిస్తారు?"
      },
      a: {
        en: "All non-disposable instruments undergo ultrasonic enzymatic cleaning followed by Class-B fractionated vacuum autoclaving at 134°C. Pouch color indicators confirm sterile integrity before opening in front of you.",
        te: "అన్ని పునర్వినియోగ పరికరాలు అల్ట్రాసోనిక్ ఎంజైమాటిక్ క్లీనింగ్ తర్వాత 134°C వద్ద క్లాస్-బి వాక్యూమ్ ఆటోక్లేవ్‌లో స్టెరిలైజ్ చేయబడతాయి. మీ ముందే పౌచ్ తెరవడానికి ముందు స్టెరైల్ ఇండికేటర్ రంగు ద్వారా భద్రతను నిర్ధారిస్తారు."
      }
    },
    {
      id: "emi",
      q: {
        en: "Do you offer EMI or flexible payment options?",
        te: "మీరు EMI లేదా సులభ చెల్లింపు వాయిదాలు అందిస్తారా?"
      },
      a: {
        en: "EMI and payment options are available, ask our team. We support major credit cards, UPI, and zero-cost installment options on comprehensive treatment plans.",
        te: "అవును, EMI మరియు సులభ వాయిదాల సదుపాయం కలదు. మేము ప్రధాన క్రెడిట్ కార్డులు, UPI మరియు సమగ్ర చికిత్సలపై జీరో-కాస్ట్ EMI ఎంపికలను అందిస్తున్నాము."
      }
    },
    {
      id: "recall-freq",
      q: {
        en: "How often should I get a dental check-up and cleaning?",
        te: "ఎంత తరచుగా దంత పరీక్ష మరియు క్లీనింగ్ చేయించుకోవాలి?"
      },
      a: {
        en: "We recommend a routine preventive check-up and ultrasonic cleaning every six months. This catches micro-cavities and gum inflammation before they require invasive treatment.",
        te: "ప్రతి ఆరు నెలలకు ఒకసారి సాధారణ దంత పరీక్ష మరియు అల్ట్రాసోనిక్ క్లీనింగ్ చేయించుకోవాలని మేము సిఫార్సు చేస్తున్నాము. ఇది పుప్పి పళ్ళు మరియు చిగుళ్ళ సమస్యలను ప్రారంభంలోనే నివారిస్తుంది."
      }
    },
    {
      id: "emergency",
      q: {
        en: "What should I do during a dental emergency outside clinic hours?",
        te: "క్లినిక్ పనివేళలు ముగిసిన తర్వాత అత్యవసర పరిస్థితి వస్తే ఏం చేయాలి?"
      },
      a: {
        en: "Send a WhatsApp message with photos of the issue; our triage team reviews incoming messages early in the morning. For severe acute trauma, uncontrollable bleeding, or facial swelling, proceed to the nearest hospital casualty immediately.",
        te: "సమస్య ఫోటోలతో మాకు వాట్సాప్ సందేశం పంపండి; మా బృందం ఉదయాన్నే పరిశీలిస్తుంది. తీవ్రమైన పంటి గాయం, ఆగని రక్తస్రావం లేదా తీవ్రమైన ముఖ వాపు ఉంటే, వెంటనే సమీపంలోని ఆసుపత్రి ఎమర్జెన్సీ విభాగాన్ని సంప్రదించండి."
      }
    }
  ],

  // Site-wide internationalization mapping dictionary
  i18n: {
    nav: {
      treatments: { en: "Treatments", te: "చికిత్సలు" },
      doctors: { en: "Doctors", te: "వైద్యులు" },
      gallery: { en: "Gallery", te: "గ్యాలరీ" },
      reviews: { en: "Reviews", te: "సమీక్షలు" },
      contact: { en: "Contact", te: "సంప్రదించండి" },
      emergency: { en: "Emergency", te: "అత్యవసరం" },
      offers: { en: "Special Offers", te: "ప్రత్యేక ఆఫర్లు" },
      faq: { en: "FAQ", te: "ప్రశ్నోత్తరాలు" },
      track: { en: "Track Plan", te: "ట్రాక్ ప్లాన్" },
      recall: { en: "Care Recall", te: "కేర్ రీకాల్" }
    },
    hero: {
      tag: { en: "MODERN PRIVATE DENTAL STUDIO · HYDERABAD", te: "ఆధునిక ప్రైవేట్ డెంటల్ స్టూడియో · హైదరాబాద్" },
      title: { 
        en: "Painless, trusted dental care in Hyderabad", 
        te: "హైదరాబాద్‌లో అత్యుత్తమ, నొప్పిలేని దంత చికిత్స" 
      },
      desc: { 
        en: "Experienced prosthodontists, endodontists, and pediatric specialists delivering calm, hospital-grade dental treatments with transparent, honest pricing.", 
        te: "అనుభవజ్ఞులైన MDS నిపుణుల ఆధ్వర్యంలో ప్రశాంతమైన, ఆసుపత్రి స్థాయి చికిత్సలు మరియు ముందస్తుగా తెలిపే పారదర్శక ధరలు." 
      },
      bookBtn: { en: "Request Appointment →", te: "అపాయింట్‌మెంట్ బుక్ చేయండి →" },
      waBtn: { en: "WhatsApp Inquiry", te: "వాట్సాప్ విచారణ" }
    },
    about: {
      label: { en: "02 — Clinical Standard", te: "02 — క్లినికల్ ప్రమాణాలు" },
      statement: {
        en: "We founded Ivory Dental Studio on a single conviction: visiting the dentist should be calm, reassuring, and completely free of dread.",
        te: "దంత వైద్యశాలను సందర్శించడం ప్రశాంతంగా, భరోసాతో మరియు ఎటువంటి భయం లేకుండా ఉండాలనే బలమైన సంకల్పంతో మేము ఐవరీ డెంటల్ స్టూడియోను స్థాపించాము."
      },
      substatement: {
        en: "Every operatory is built to hospital-grade standards. We never rush diagnostic consultations, we explain every clinical option with digital imaging, and we guarantee zero hidden charges before treatment begins.",
        te: "ప్రతి చికిత్సా విభాగం ఆసుపత్రి స్థాయి ప్రమాణాలతో నిర్మించబడింది. మేము డయాగ్నోస్టిక్ సంప్రదింపులను తొందరపాటు లేకుండా, డిజిటల్ ఇమేజింగ్‌తో ప్రతి ఎంపికను వివరిస్తాము మరియు చికిత్స ప్రారంభించే ముందు దాచిన ఛార్జీలు లేకుండా పారదర్శకతను నిర్ధారిస్తాము."
      },
      point1Title: { en: "Hospital-Grade Autoclave Sterilisation", te: "ఆసుపత్రి స్థాయి ఆటోక్లేవ్ స్టెరిలైజేషన్" },
      point1Desc: { 
        en: "Multi-stage Class-B vacuum autoclave cycles and vacuum-sealed single-use kits guarantee zero cross-contamination.",
        te: "మల్టీ-స్టేజ్ క్లాస్-బి వాక్యూమ్ ఆటోక్లేవ్ సైకిల్స్ మరియు సీల్డ్ సింగిల్-యూజ్ కిట్లు సంక్రమణను పూర్తిగా నివారిస్తాయి." 
      },
      point2Title: { en: "Low-Radiation Digital Diagnostic Imaging", te: "తక్కువ రేడియేషన్ డిజిటల్ ఎక్స్-రే ఇమేజింగ్" },
      point2Desc: { 
        en: "High-precision digital sensors emit 80% less radiation than conventional dental film while revealing instant detail.",
        te: "సాంప్రదాయ డెంటల్ ఫిల్మ్ కంటే 80% తక్కువ రేడియేషన్‌తో తక్షణ మరియు స్పష్టమైన డిజిటల్ ఇమేజింగ్." 
      },
      point3Title: { en: "Computerized Painless Anesthesia", te: "కంప్యూటరైజ్డ్ నొప్పిలేని లోకల్ అనస్థీషియా" },
      point3Desc: { 
        en: "Topical pre-numbing gels and micro-metered delivery systems ensure comfortable, stress-free procedures.",
        te: "చికిత్సకు ముందు నంబింగ్ జెల్స్ మరియు మైక్రో-మీటర్డ్ డెలివరీ సిస్టమ్స్ ద్వారా ఒత్తిడి లేని, సౌకర్యవంతమైన చికిత్స." 
      }
    },
    trust: {
      stat1: { en: "Years Experience", te: "సంవత్సరాల అనుభవం" },
      stat2: { en: "Happy Patients", te: "సంతృప్తి చెందిన రోగులు" },
      stat3: { en: "Google Rating", te: "గూగుల్ రేటింగ్" },
      stat4: { en: "BDS, MDS Specialists", te: "అర్హత కలిగిన MDS నిపుణులు" }
    },
    sections: {
      treatmentsTitle: { en: "Comprehensive Dental Care", te: "సమగ్ర దంత చికిత్సలు" },
      treatmentsSubtitle: { 
        en: "From preventive cleanings to precision implantology, every procedure is carried out with painless computerized numbing and upfront indicative costs.", 
        te: "క్లీనింగ్ నుండి ఇంప్లాంట్స్ వరకు, ప్రతి చికిత్స నొప్పిలేని అధునాతన పద్ధతులతో మరియు ముందస్తు ధరలతో చేయబడుతుంది." 
      },
      doctorsTitle: { en: "Led by MDS Specialists", te: "MDS నిపుణుల ఆధ్వర్యంలో" },
      doctorsSubtitle: { 
        en: "Each treatment plan is designed and supervised by full-time MDS specialists dedicated to gentle, ethical patient outcomes.", 
        te: "ప్రతి చికిత్సా ప్రణాళికను సున్నితమైన, నైతిక సేవలందించే పూర్తి-సమయ పోస్ట్-గ్రాడ్యుయేట్ MDS నిపుణులు రూపొందిస్తారు." 
      },
      galleryLabel: { en: "04 — Visual Proof", te: "04 — క్లినిక్ చిత్రాలు" },
      galleryTitle: { en: "Clinical Environment & Results", te: "ఆధునిక క్లినిక్ వాతావరణం & ఫలితాలు" },
      gallerySubtitle: { 
        en: "Take a closer look at our sterilized operatory suites, diagnostic setups, and genuine patient smile outcomes.", 
        te: "మా స్టెరిలైజ్డ్ ఆపరేటరీ గదులు, అధునాతన పరికరాలు మరియు రోగుల నిజమైన చిరునవ్వుల ఫలితాలను పరిశీలించండి." 
      },
      galleryConsent: { en: "Shared with patient consent.", te: "రోగుల పూర్వ సమ్మతితో ప్రదర్శించబడింది." },
      reviewsLabel: { en: "05 — Patient Stories", te: "05 — రోగుల అనుభవాలు" },
      reviewsTitle: { en: "Verified Patient Experiences", te: "రోగుల నిజమైన సమీక్షలు" },
      reviewsSubtitle: { 
        en: "Read how our gentle approach and transparent communications have helped patients overcome dental anxiety across Hyderabad.", 
        te: "హైదరాబాద్‌లో మా సున్నితమైన చికిత్స ద్వారా రోగులు తమ దంత భయాన్ని ఎలా అధిగమించారో చదవండి." 
      },
      reviewsFeedbackBtn: { en: "★ Rate Your Visit · Feedback", te: "★ మీ అనుభవాన్ని రేట్ చేయండి" },
      offersLabel: { en: "06 — Packages", te: "06 — ప్రత్యేక ప్యాకేజీలు" },
      offersTitle: { en: "Transparent Clinic Offers", te: "పారదర్శక క్లినిక్ ఆఫర్లు" },
      offersSubtitle: { 
        en: "Value-driven preventive packages with no hidden consultation add-ons. Available at both Banjara Hills and Madhapur branches.", 
        te: "ఎటువంటి దాచిన రుసుములు లేని విలువైన నివారణ ప్యాకేజీలు. బంజారా హిల్స్ మరియు మాదాపూర్ బ్రాంచ్‌లలో లభ్యం." 
      },
      faqLabel: { en: "07 — Frequently Asked Questions", te: "07 — తరచుగా అడిగే ప్రశ్నలు" },
      faqTitle: { en: "Common Questions About Dental Visits", te: "దంత చికిత్సల గురించి సందేహాలు & సమాధానాలు" },
      faqSubtitle: { 
        en: "Everything you need to know about pricing, pain management, and appointment scheduling.", 
        te: "ధరలు, నొప్పి నివారణ పద్ధతులు మరియు అపాయింట్‌మెంట్ బుకింగ్ గురించి మీకు కావాల్సిన పూర్తి సమాచారం." 
      },
      faqWhatsappBtn: { en: "Still have questions? WhatsApp us →", te: "ఇంకా ఏవైనా ప్రశ్నలు ఉన్నాయా? వాట్సాప్ చేయండి →" },
      contactLabel: { en: "08 — Visit & Schedule", te: "08 — క్లినిక్ చిరునామా & సమయాలు" },
      contactTitle: { en: "Two Convenient Hyderabad Branches", te: "హైదరాబాద్‌లో రెండు అనుకూలమైన బ్రాంచ్‌లు" },
      contactSubtitle: { 
        en: "Select your preferred branch, pick an available slot, and submit your request directly to our clinical front-desk via WhatsApp.", 
        te: "మీకు నచ్చిన బ్రాంచ్‌ను ఎంచుకుని, అనుకూలమైన స్లాట్‌ను ఎంచుకోండి. మా సిబ్బంది వాట్సాప్‌లో నిర్ధారిస్తారు." 
      },
      emergencyBadge: { en: "Dental Emergency Guidance", te: "అత్యవసర దంత చికిత్స మార్గదర్శకాలు" },
      emergencyText: { 
        en: "WhatsApp messages are answered promptly during clinic operating hours (Mon–Sat 9:30 AM – 8:00 PM). For severe dental trauma, uncontrolled bleeding, or acute facial swelling occurring outside operating hours, please visit your nearest hospital emergency department immediately.", 
        te: "క్లినిక్ పనివేళల్లో (సోమ–శని ఉదయం 9:30 – రాత్రి 8:00) వాట్సాప్ సందేశాలకు వెంటనే స్పందిస్తాము. పనివేళలు ముగిసిన తర్వాత తీవ్రమైన పంటి గాయం, ఆగని రక్తస్రావం లేదా తీవ్రమైన ముఖ వాపు ఉంటే, దయచేసి వెంటనే సమీపంలోని ఆసుపత్రి ఎమర్జెన్సీ విభాగాన్ని సంప్రదించండి." 
      }
    },
    booking: {
      title: { en: "Request an Appointment", te: "అపాయింట్‌మెంట్ అభ్యర్థించండి" },
      subtitle: { 
        en: "Pick your preferred slot. Our team verifies real-time chair availability on WhatsApp and confirms your appointment.", 
        te: "మీకు అనుకూలమైన సమయాన్ని ఎంచుకోండి. మా సిబ్బంది వాట్సాప్‌లో సమయాన్ని తనిఖీ చేసి నిర్ధారిస్తారు." 
      },
      step1: { en: "1. Choose Branch", te: "1. బ్రాంచ్‌ను ఎంచుకోండి" },
      step2: { en: "2. Treatment or Service", te: "2. చికిత్స లేదా సేవ" },
      step3: { en: "3. Preferred Date", te: "3. అనుకూలమైన తేదీ" },
      step4: { en: "4. Preferred Time Slot", te: "4. అనుకూలమైన సమయం (స్లాట్)" },
      step5: { en: "5. Your Contact Information", te: "5. మీ వివరాలు" },
      nameLabel: { en: "Full Name *", te: "పూర్తి పేరు *" },
      namePlaceholder: { en: "e.g. Ramesh Kumar", te: "ఉదా: రమేష్ కుమార్" },
      phoneLabel: { en: "Mobile Number * (10-digit Indian mobile)", te: "మొబైల్ నంబర్ * (10-అంకెల మొబైల్)" },
      noteLabel: { en: "Special Notes / Medical Concerns (Optional)", te: "ప్రత్యేక గమనికలు / సమస్యలు (ఐచ్ఛికం)" },
      notePlaceholder: { 
        en: "Describe any dental pain, dental phobia, or past treatments...", 
        te: "మీ దంత సమస్య లేదా గత చికిత్సల వివరాలు తెలియజేయండి..." 
      },
      submitBtn: { en: "Request on WhatsApp", te: "వాట్సాప్‌లో అభ్యర్థించండి" },
      paymentTitle: { en: "Payment Preference (Phase 3 Growth)", te: "చెల్లింపు ప్రాధాన్యత (ఐచ్ఛికం)" },
      saveBadge: { en: "Save ₹100 Online", te: "ఆన్‌లైన్‌లో ₹100 ఆదా" },
      payClinic: { en: "Pay at Clinic", te: "క్లినిక్ వద్ద చెల్లించండి" },
      payClinicSub: { en: "Standard fee ₹400", te: "సాధారణ ఫీజు ₹400" },
      payAdvance: { en: "Advance UPI / QR", te: "ముందస్తు UPI / QR" },
      payAdvanceSub: { en: "₹300 · Priority Zero Wait", te: "₹300 · జీరో-వెయిట్ ప్రాధాన్యత" },
      advanceTokenTitle: { en: "⚡ Instant Priority Token: ₹300 (GPay / PhonePe / Paytm / UPI)", te: "⚡ తక్షణ ప్రాధాన్యత టోకెన్: ₹300 (GPay / PhonePe / Paytm / UPI)" },
      advanceTokenDesc: { 
        en: "Your advance token guarantees zero-wait chair reservation upon arrival. A verified booking reference will be generated and confirmed directly with our front desk on WhatsApp.",
        te: "ఈ ముందస్తు టోకెన్ మీకు వేచి ఉండే పనిలేకుండా డాక్టర్ సీటును రిజర్వ్ చేస్తుంది. వాట్సాప్ ద్వారా క్లినిక్ తక్షణమే నిర్ధారిస్తుంది."
      },
      branches: {
        banjara: { en: "Banjara Hills", te: "బంజారా హిల్స్" },
        madhapur: { en: "Madhapur", te: "మాదాపూర్" }
      },
      treatments: {
        implants: { en: "Dental Implants", te: "డెంటల్ ఇంప్లాంట్స్" },
        rct: { en: "Root Canal (RCT)", te: "రూట్ కెనాల్ (RCT)" },
        braces: { en: "Braces & Aligners", te: "బ్రేసెస్ & క్లియర్ అలైలర్లు" },
        crowns: { en: "Crowns & Bridges", te: "క్రౌన్స్ & బ్రిడ్జెస్" },
        cleaning: { en: "Cleaning & Scaling", te: "టీత్ క్లీనింగ్ & స్కేలింగ్" },
        whitening: { en: "Teeth Whitening", te: "టీత్ వైట్నింగ్" },
        kids: { en: "Pediatric Dentistry", te: "పిల్లల దంత చికిత్స" },
        dentures: { en: "Dentures", te: "డెంచర్స్ (కృత్రిమ పళ్ళు)" },
        extraction: { en: "Tooth Extraction", te: "పన్ను తొలగింపు" },
        checkup: { en: "Check-up & X-Rays", te: "దంత పరీక్ష & ఎక్స్-రే" },
        consultation: { en: "General Consultation", te: "సాధారణ సంప్రదింపులు" }
      },
      timeGroups: {
        morning: { en: "Morning", te: "ఉదయం" },
        afternoon: { en: "Afternoon", te: "మధ్యాహ్నం" },
        evening: { en: "Evening", te: "సాయంత్రం" }
      },
      dateToday: { en: "Today", te: "ఈరోజు" },
      dateClosed: { en: "Closed", te: "సెలవు" },
      pickDate: { en: "Pick a date", te: "తేదీని ఎంచుకోండి" },
      pickTime: { en: "Pick a time", te: "సమయాన్ని ఎంచుకోండి" },
      slotsEmpty: { 
        en: "No more slots available today. Please pick another day above.", 
        te: "ఈరోజుకు స్లాట్‌లు ముగిశాయి. దయచేసి పైనుండి మరొక తేదీని ఎంచుకోండి." 
      },
      successReady: { 
        en: "Your request is ready. Send it on WhatsApp and the clinic will confirm your slot.", 
        te: "మీ అభ్యర్థన సిద్ధంగా ఉంది. వాట్సాప్‌లో పంపండి, క్లినిక్ నిర్ధారిస్తుంది." 
      }
    }
  }
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
