const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const languageButtons = document.querySelectorAll('.language-toggle');
const catalogGrid = document.querySelector('.catalog-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const detailDialog = document.querySelector('.fabric-detail-dialog');

const fabrics = [
  {code:'HB-101',en:'Pearl Dust',am:'የዕንቁ ጭጋግ',cat:'neutral',collection:'Aster Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'Softly mottled ivory with a discreet champagne glimmer.',descAm:'ለስላሳ የዝሆን ጥርስ ቀለም ከቀላል የሻምፓኝ ነጸብራቅ ጋር።',use:'Living rooms · Bedrooms',useAm:'ሳሎን · መኝታ ቤት'},
  {code:'HB-102',en:'Heritage Sand',am:'ቅርስ አሸዋ',cat:'pattern',collection:'Heritage Patterns',collectionAm:'ስርዓተ ጥለቶች',desc:'A warm geometric velvet pattern with a handcrafted character.',descAm:'ሞቅ ያለ ጂኦሜትሪያዊ ጥለትና የቬልቬት ሸካራነት ያለው ልዩ ምርጫ።',use:'Feature rooms · Hotels',useAm:'ልዩ ሳሎን · ሆቴል'},
  {code:'HB-103',en:'Cloud Ivory',am:'የደመና ነጭ',cat:'neutral',collection:'Aster Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A clean, calm ivory with a velvety surface and easy drape.',descAm:'ንጹህና ረጋ ያለ የዝሆን ጥርስ ቀለም፤ ለስላሳ ገጽታና ውብ አወዳደቅ አለው።',use:'Bedrooms · Apartments',useAm:'መኝታ ቤት · አፓርታማ'},
  {code:'HB-104',en:'Ivory Relief',am:'ነጭ ሸካራነት',cat:'neutral',collection:'Aster Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A luminous ivory with a subtle architectural texture.',descAm:'ብርሃን የሚያንጸባርቅ ነጭ ቀለም ከረቀቀ ሸካራነት ጋር።',use:'Formal rooms · Hotels',useAm:'መቀበያ ክፍል · ሆቴል'},
  {code:'HB-105',en:'Silver Canvas',am:'የብር ሸራ',cat:'grey',collection:'Lalibela Textures',collectionAm:'ግራጫ ቀለሞች',desc:'An abstract silver-grey weave that brings quiet depth.',descAm:'ክፍሉን ሳያጨናንቅ ጥልቀት የሚጨምር የብር ግራጫ ሸካራነት።',use:'Offices · Contemporary homes',useAm:'ቢሮ · ዘመናዊ ቤት'},
  {code:'HB-106',en:'Warm Maize',am:'ሞቅ ያለ ቢጫ',cat:'neutral',collection:'Aster Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A gentle maize tone that adds warmth while keeping a room light.',descAm:'ክፍሉን ብሩህ አድርጎ ሙቀት የሚጨምር ለስላሳ ቢጫ ቀለም።',use:'Family rooms · Dining rooms',useAm:'የቤተሰብ ክፍል · መመገቢያ'},
  {code:'HB-107',en:'Sage Bloom',am:'ሴጅ አበባ',cat:'pattern',collection:'Heritage Patterns',collectionAm:'ስርዓተ ጥለቶች',desc:'A tonal sage floral with a soft sheen.',descAm:'ረጋ ያለ የሴጅ ቀለም ከአበባ ጥለትና ለስላሳ ነጸብራቅ ጋር።',use:'Bedrooms · Lounges',useAm:'መኝታ ቤት · ሳሎን'},
  {code:'HB-108',en:'Blue Nile Velvet',am:'ዓባይ ሰማያዊ',cat:'blue',collection:'Blue Nile',collectionAm:'ሰማያዊ ቀለሞች',desc:'A saturated royal blue velvet for dramatic, grounded rooms.',descAm:'ደማቅና ጥልቅ ሰማያዊ ቬልቬት፤ ለተለየ የክፍል ገጽታ።',use:'Feature rooms · Hospitality',useAm:'ልዩ ክፍል · ሆቴል'},
  {code:'HB-109',en:'Moon Garden',am:'የጨረቃ አትክልት',cat:'pattern',collection:'Heritage Patterns',collectionAm:'ስርዓተ ጥለቶች',desc:'Sculptural circular motifs in soft silver.',descAm:'ለየት ያለ የውስጥ ዲዛይን የሚፈጥር የብር ክብ ጥለት።',use:'Living rooms · Suites',useAm:'ሳሎን · ስዊት'},
  {code:'HB-110',en:'Indigo Impression',am:'ኢንዲጎ ጥለት',cat:'blue pattern',collection:'Blue Nile',collectionAm:'ሰማያዊ ቀለሞች',desc:'An artistic indigo pattern with brush-like movement.',descAm:'እንደ ብሩሽ ስዕል እንቅስቃሴ ያለው ጥልቅ ሰማያዊ ጥለት።',use:'Creative rooms · Lounges',useAm:'የፈጠራ ክፍል · ሳሎን'},
  {code:'HB-111',en:'Silver Bouclé',am:'የብር ቡክሌ',cat:'grey',collection:'Lalibela Textures',collectionAm:'ግራጫ ቀለሞች',desc:'A tactile pale grey with a contemporary finish.',descAm:'ለስላሳና ዘመናዊ ሸካራነት ያለው ፈዛዛ ግራጫ።',use:'Bedrooms · Offices',useAm:'መኝታ ቤት · ቢሮ'},
  {code:'HB-112',en:'Dove Silk',am:'የርግብ ግራጫ',cat:'grey',collection:'Lalibela Textures',collectionAm:'ግራጫ ቀለሞች',desc:'A smooth dove-grey finish with an elegant lustre.',descAm:'ረጋ ያለ ነጸብራቅና ውብ አወዳደቅ ያለው የርግብ ግራጫ።',use:'Formal rooms · Apartments',useAm:'መቀበያ ክፍል · አፓርታማ'},
  {code:'HB-113',en:'Platinum Veil',am:'ፕላቲነም መጋረጃ',cat:'grey',collection:'Lalibela Textures',collectionAm:'ግራጫ ቀለሞች',desc:'A pale platinum drape with a fine crosswoven surface.',descAm:'ረቂቅ የተጠላለፈ ሸካራነት ያለው ፈዛዛ ፕላቲነም ቀለም።',use:'Offices · Living rooms',useAm:'ቢሮ · ሳሎን'},
  {code:'HB-114',en:'Graphite Etching',am:'ግራፋይት ጥለት',cat:'grey',collection:'Lalibela Textures',collectionAm:'ግራጫ ቀለሞች',desc:'A deep graphite fabric with a subtle etched texture.',descAm:'ጥልቅ ግራጫ ቀለም ከረቀቀ የተቀረጸ ሸካራነት ጋር።',use:'Media rooms · Hotels',useAm:'የመዝናኛ ክፍል · ሆቴል'},
  {code:'HB-115',en:'Stone Relief',am:'የድንጋይ ሸካራነት',cat:'grey',collection:'Lalibela Textures',collectionAm:'ግራጫ ቀለሞች',desc:'A dimensional stone-grey textile with refined relief.',descAm:'የተራቀቀ ከፍና ዝቅ ጥለት ያለው የድንጋይ ግራጫ ጨርቅ።',use:'Living rooms · Lobbies',useAm:'ሳሎን · ሎቢ'},
  {code:'HB-116',en:'Soft Chalk',am:'ለስላሳ ነጭ',cat:'neutral',collection:'Aster Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A quiet, plush and versatile chalk-white velvet.',descAm:'ረጋ ያለ፣ ለስላሳና ከብዙ ቀለሞች ጋር የሚስማማ ነጭ ቬልቬት።',use:'Bedrooms · Nurseries',useAm:'መኝታ ቤት · የሕፃናት ክፍል'},
  {code:'HB-117',en:'Charcoal Velvet',am:'ከሰል ግራጫ',cat:'grey',collection:'Lalibela Textures',collectionAm:'ግራጫ ቀለሞች',desc:'A rich charcoal velvet with a light-catching pile.',descAm:'ብርሃንን በውበት የሚያንጸባርቅ ጥልቅ የከሰል ግራጫ ቬልቬት።',use:'Bedrooms · Boardrooms',useAm:'መኝታ ቤት · የስብሰባ ክፍል'},
  {code:'HB-118',en:'Oyster Satin',am:'ኦይስተር ነጸብራቅ',cat:'neutral',collection:'Aster Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A light oyster neutral with a graceful glow.',descAm:'ቀላል ኦይስተር ቀለም ከረጋ ያለ ነጸብራቅ ጋር።',use:'Dining rooms · Suites',useAm:'መመገቢያ · ስዊት'},
  {code:'HB-119',en:'Lake Tana Lace',am:'ጣና ሰማያዊ ሼር',cat:'sheer blue',collection:'Blue Nile Sheers',collectionAm:'ሰማያዊ ሼር',desc:'An airy open weave with a blue botanical motif.',descAm:'ከሰማያዊ የቅጠል ጥለት ጋር ብርሃንን የሚያሳልፍ ሼር።',use:'Living rooms · Verandas',useAm:'ሳሎን · በረንዳ'},
  {code:'HB-120',en:'Frosted Pearl',am:'የቀዘቀዘ ዕንቁ',cat:'grey',collection:'Lalibela Textures',collectionAm:'ግራጫ ቀለሞች',desc:'A pearl-grey finish with a fine light-catching grain.',descAm:'ረቂቅ ነጸብራቅና የዕንቁ መልክ ያለው ፈዛዛ ግራጫ።',use:'Apartments · Offices',useAm:'አፓርታማ · ቢሮ'}
];

let currentLanguage = localStorage.getItem('habiba-language') === 'am' ? 'am' : 'en';
let activeFilter = 'all';
const studioImages = new Set(
  Array.from({ length: 20 }, (_, index) => `HB-${index + 101}`)
);

function fabricImage(code) {
  return `assets/images/catalog/${code}${studioImages.has(code) ? '-studio.png' : '.jpg'}`;
}

function renderCatalog() {
  catalogGrid.innerHTML = fabrics.map((fabric, index) => {
    const visible = activeFilter === 'all' || fabric.cat.split(' ').includes(activeFilter);
    const name = currentLanguage === 'am' ? fabric.am : fabric.en;
    const collection = currentLanguage === 'am' ? fabric.collectionAm : fabric.collection;
    return `<article class="catalog-card${visible ? '' : ' is-hidden'}" data-index="${index}" tabindex="0"><div class="catalog-card-image"><img src="${fabricImage(fabric.code)}" alt="${name} curtain fabric" loading="lazy"><span>${fabric.code}</span></div><div class="catalog-card-copy"><div><p>${collection}</p><h3>${name}</h3></div><button type="button" aria-label="View ${name}">↗</button></div></article>`;
  }).join('');
  document.querySelectorAll('.catalog-card:not(.is-hidden)').forEach(card => {
    card.addEventListener('click', () => openDetail(Number(card.dataset.index)));
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetail(Number(card.dataset.index)); } });
  });
}

function openDetail(index) {
  const fabric = fabrics[index];
  const isAm = currentLanguage === 'am';
  const image = detailDialog.querySelector('img');
  image.src = fabricImage(fabric.code);
  image.alt = `${isAm ? fabric.am : fabric.en} curtain fabric`;
  detailDialog.querySelector('.detail-code').textContent = fabric.code;
  detailDialog.querySelector('h2').textContent = isAm ? fabric.am : fabric.en;
  detailDialog.querySelector('.detail-description').textContent = isAm ? fabric.descAm : fabric.desc;
  detailDialog.querySelector('.detail-collection').textContent = isAm ? fabric.collectionAm : fabric.collection;
  detailDialog.querySelector('.detail-use').textContent = isAm ? fabric.useAm : fabric.use;
  detailDialog.showModal();
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-am]').forEach(element => element.innerHTML = element.dataset[language]);
  languageButtons.forEach(button => { button.classList.toggle('is-am', language === 'am'); button.querySelectorAll('span').forEach((label, index) => label.classList.toggle('active', language === (index ? 'am' : 'en'))); });
  localStorage.setItem('habiba-language', language);
  renderCatalog();
}

menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); mobileNav.classList.toggle('open', !open); });
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'am' : 'en')));
filterButtons.forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; filterButtons.forEach(item => item.classList.toggle('active', item === button)); renderCatalog(); }));
detailDialog.querySelector('.dialog-close').addEventListener('click', () => detailDialog.close());
detailDialog.addEventListener('click', event => { if (event.target === detailDialog) detailDialog.close(); });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
setLanguage(currentLanguage);
