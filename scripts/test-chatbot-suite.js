const fs = require('fs');
const path = require('path');

// Load chatbot in simulated environment
const chatbotCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'chatbot.js'), 'utf8');

// Mock window and document
const windowMock = {
  currentLang: 'en',
  getClinicStatus: () => ({ isOpen: true, text: 'Open Mon–Sat 9:30 AM – 8:00 PM' }),
  CONFIG: { WHATSAPP_NUMBER: '910000000000' }
};

// Evaluate chatbot to extract matchIntent
let extractedMatchIntent = null;
const sandbox = {
  window: windowMock,
  document: {
    getElementById: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    readyState: 'complete'
  },
  navigator: {},
  localStorage: { getItem: () => 'en', setItem: () => {} },
  Date: Date,
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};

const vm = require('vm');
// Append helper to expose matchIntent in the closure
const modifiedCode = chatbotCode.replace(
  'function matchIntent(userMessage) {',
  'globalThis.__testMatchIntent = matchIntent;\n  function matchIntent(userMessage) {'
);
const context = vm.createContext(sandbox);
vm.runInContext(modifiedCode, context);

const matchIntent = context.__testMatchIntent;
if (!matchIntent) {
  console.error('Failed to extract matchIntent!');
  process.exit(1);
}

console.log('Successfully loaded matchIntent from js/chatbot.js\n');

const testCases = [
  // Greetings
  { query: 'Hi there', expected: ['Ivory Dental Studio', '24/7 AI Clinical Assistant'], lang: 'en' },
  { query: 'నమస్కారం డాక్టర్', expected: ['నమస్కారం', 'ఐవరీ డెంటల్ స్టూడియో'], lang: 'te' },

  // Implants
  { query: 'Tell me about dental implants', expected: ['Dental Implants', '₹25,000'], lang: 'en' },
  { query: 'కొత్త పన్ను కట్టడానికి ఇంప్లాంట్స్ ఎంత ఖర్చు అవుతుంది?', expected: ['డెంటల్ ఇంప్లాంట్స్', '₹25,000'], lang: 'te' },

  // RCT
  { query: 'How much does root canal cost?', expected: ['Root Canal Treatment', 'Single-Sitting', '₹4,500'], lang: 'en' },
  { query: 'రూట్ కెనాల్ చికిత్స నొప్పిగా ఉంటుందా?', expected: ['రూట్ కెనాల్', 'సింగిల్ సిట్టింగ్', '₹4,500'], lang: 'te' },

  // Braces & Aligners
  { query: 'What is the cost of clear aligners vs braces?', expected: ['Clear Aligners', 'Braces', '₹60,000'], lang: 'en' },
  { query: 'వంకర పళ్ళు చక్కదిద్దడానికి క్లిప్పులు ఎంత అవుతాయి?', expected: ['క్లిప్పులు', 'అలైన్ర్స్', '₹60,000'], lang: 'te' },

  // Cleaning
  { query: 'Does teeth cleaning damage enamel?', expected: ['Teeth Cleaning', 'scratching enamel', '₹1,200'], lang: 'en' },
  { query: 'పంటి పాచి క్లీనింగ్ చేయించుకోవాలి ఎంత?', expected: ['క్లీనింగ్', 'అల్ట్రాసోనిక్', '₹1,200'], lang: 'te' },

  // Whitening
  { query: 'How does teeth whitening work?', expected: ['Teeth Whitening', '6–8 shades', '₹7,000'], lang: 'en' },
  { query: 'టీత్ వైట్నింగ్ చేయించుకుంటే తెల్లబడతాయా?', expected: ['టీత్ వైట్నింగ్', 'షేడ్స్', '₹7,000'], lang: 'te' },

  // Crowns
  { query: 'When do I need a zirconia crown?', expected: ['Crowns & Bridges', 'monolithic zirconia', '₹4,000'], lang: 'en' },
  { query: 'పంటికి క్యాప్ ఎప్పుడు వేయాలి?', expected: ['క్యాప్స్', 'జిర్కోనియా', '₹4,000'], lang: 'te' },

  // Wisdom tooth
  { query: 'I have impacted wisdom tooth pain', expected: ['Wisdom Tooth', 'Painless', '₹3,000'], lang: 'en' },
  { query: 'జ్ఞాన దంతం నొప్పిగా ఉంది పన్ను తీయాలా?', expected: ['విజ్డమ్ టూత్', 'జ్ఞాన దంతం', 'నొప్పి లేని'], lang: 'te' },

  // Pediatric
  { query: 'Do you treat young kids?', expected: ['Pediatric Dentistry', 'anxiety-free', 'fluoride'], lang: 'en' },
  { query: 'పిల్లల దంత చికిత్స చేస్తారా?', expected: ['పిల్లల ప్రత్యేక దంత సంరక్షణ', 'ఆహ్లాదకరమైన'], lang: 'te' },

  // Pain / Emergency
  { query: 'I have severe toothache and swelling', expected: ['Emergency', 'warm salt water', 'Never place an aspirin'], lang: 'en' },
  { query: 'తీవ్రమైన పంటి నొప్పి ఉంది ఏం చేయాలి?', expected: ['అత్యవసర దంత నొప్పి', 'ఉప్పు నీటితో', 'ఆస్పిరిన్ మాత్రను'], lang: 'te' },

  // Sensitivity
  { query: 'My teeth feel sensitive to cold water', expected: ['Sensitivity', 'desensitizing', 'soft-bristle'], lang: 'en' },
  { query: 'చల్లటి నీళ్లు తాగితే పళ్ళు జివ్వున లాగుతున్నాయి', expected: ['సున్నితత్వం', 'జివ్వున లాగడం', 'సెన్సిటివిటీ'], lang: 'te' },

  // Bleeding gums
  { query: 'My gums bleed when brushing', expected: ['Bleeding Gums', 'Gingivitis', 'ultrasonic scaling'], lang: 'en' },
  { query: 'బ్రష్ చేస్తుంటే చిగుళ్ల నుంచి రక్తం వస్తోంది', expected: ['చిగుళ్ల నుంచి రక్తం', 'జింజివైటిస్', 'పాచి'], lang: 'te' },

  // Bad breath
  { query: 'How to cure bad breath?', expected: ['Bad Breath', 'Halitosis', 'tongue'], lang: 'en' },
  { query: 'నోటి దుర్వాసన పోవడానికి పరిష్కారం ఏమిటి?', expected: ['నోటి దుర్వాసన', 'హాలిటోసిస్', 'క్లీనింగ్'], lang: 'te' },

  // Pregnancy / Medical
  { query: 'Can pregnant women get dental fillings?', expected: ['Pregnancy', '2nd trimester', 'safe'], lang: 'en' },
  { query: 'గర్భిణీ స్త్రీలకు దంత చికిత్స సురక్షితమేనా?', expected: ['గర్భధారణ', 'సురక్షితం', 'అనస్థీషియా'], lang: 'te' },

  // Timings
  { query: 'What are your clinic timings on Saturday?', expected: ['Working Hours', 'Banjara Hills', 'Madhapur'], lang: 'en' },
  { query: 'ఆదివారం క్లినిక్ తెరిచి ఉంటుందా?', expected: ['పనివేళలు', 'ఆదివారం', 'సెలవు'], lang: 'te' },

  // Locations
  { query: 'Where is your Banjara Hills branch located?', expected: ['Road No. 12', 'Banjara Hills', 'Valet parking'], lang: 'en' },
  { query: 'మాదాపూర్ క్లినిక్ చిరునామా చెప్పండి', expected: ['మాదాపూర్ బ్రాంచ్', 'హైటెక్ సిటీ'], lang: 'te' },

  // Doctors
  { query: 'Who are your MDS specialist doctors?', expected: ['Dr. Demo Implantologist', 'Dr. Demo Endodontist', 'Dr. Demo Orthodontist'], lang: 'en' },
  { query: 'క్లినిక్‌లో స్పెషలిస్ట్ డాక్టర్లు ఎవరు?', expected: ['డా. డెమో ఇంప్లాంటాలజిస్ట్', 'డా. డెమో ఎండోడాంటిస్ట్'], lang: 'te' },

  // Financing / EMI
  { query: 'Do you offer no cost EMI through Bajaj?', expected: ['No-Cost EMI', 'Bajaj Finserv', 'Credit/Debit'], lang: 'en' },
  { query: 'బజాజ్ ఈఎంఐ సౌకర్యం ఉందా?', expected: ['నో-కాస్ట్ ఈఎంఐ', 'బజాజ్ ఫిన్‌సర్వ్', '0% వడ్డీతో'], lang: 'te' },

  // Offers
  { query: 'What packages and discounts are active?', expected: ['Free Dental Check-up Camp', 'Smile Makeover', 'Family Dental'], lang: 'en' },
  { query: 'ప్రస్తుతం ఏవైనా ఆఫర్లు ఉన్నాయా?', expected: ['ఉచిత దంత పరీక్ష', 'స్మైల్ మేకోవర్', 'కుటుంబ'], lang: 'te' },

  // Booking
  { query: 'How can I book an appointment?', expected: ['Schedule an Appointment', '5-Step Booking Card', 'WhatsApp'], lang: 'en' },
  { query: 'అపాయింట్‌మెంట్ బుక్ చేసుకోవడం ఎలా?', expected: ['అపాయింట్‌మెంట్ బుకింగ్', '5-స్టెప్ బుకింగ్ కార్డ్'], lang: 'te' },

  // Fallback
  { query: 'What is the weather in Hyderabad today?', expected: ['Thank you for reaching out', '24/7 AI Clinical Assistant'], lang: 'en' },
  { query: 'హైదరాబాద్ వాతావరణం ఎలా ఉంది?', expected: ['నమస్కారం! మీ ప్రశ్నకు ధన్యవాదాలు', '24/7 క్లినికల్ అసిస్టెంట్‌గా'], lang: 'te' }
];

let passed = 0;
let failed = 0;

testCases.forEach((tc, idx) => {
  windowMock.currentLang = tc.lang;
  const reply = matchIntent(tc.query);
  const missingKeywords = tc.expected.filter(kw => !reply.includes(kw));

  if (missingKeywords.length === 0) {
    passed++;
    console.log(`✓ Test ${idx + 1} PASSED: "${tc.query.substring(0, 30)}..." [${tc.lang}]`);
  } else {
    failed++;
    console.error(`✗ Test ${idx + 1} FAILED: "${tc.query}" [${tc.lang}]`);
    console.error(`   Missing keywords:`, missingKeywords);
    console.error(`   Got reply:`, reply.substring(0, 150) + '...\n');
  }
});

console.log(`\n========================================`);
console.log(`Chatbot Test Suite Completed!`);
console.log(`Passed: ${passed} / ${testCases.length}`);
console.log(`Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);

