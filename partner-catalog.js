const partnerFabrics = [
  {id:'HB-101',code:'AR-101',en:'Pearl Dust',am:'የዕንቁ ጭጋግ',cat:'neutral',collection:'Warm Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'Softly mottled ivory with a discreet champagne glimmer.',descAm:'ለስላሳ የዝሆን ጥርስ ቀለም ከቀላል የሻምፓኝ ነጸብራቅ ጋር።',use:'Living rooms · Bedrooms',useAm:'ሳሎን · መኝታ ቤት'},
  {id:'HB-102',code:'AR-102',en:'Heritage Sand',am:'ቅርስ አሸዋ',cat:'pattern neutral',collection:'Heritage Patterns',collectionAm:'ቅርሳዊ ጥለቶች',desc:'A warm geometric velvet pattern with a handcrafted character.',descAm:'ሞቅ ያለ ጂኦሜትሪያዊ ጥለትና የቬልቬት ሸካራነት ያለው ልዩ ምርጫ።',use:'Feature rooms · Hotels',useAm:'ልዩ ሳሎን · ሆቴል'},
  {id:'HB-103',code:'AR-103',en:'Cloud Ivory',am:'የደመና ነጭ',cat:'neutral',collection:'Warm Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A clean, calm ivory with a velvety surface and easy drape.',descAm:'ንጹህና ረጋ ያለ የዝሆን ጥርስ ቀለም፤ ለስላሳ ገጽታና ውብ አወዳደቅ አለው።',use:'Bedrooms · Apartments',useAm:'መኝታ ቤት · አፓርታማ'},
  {id:'HB-104',code:'AR-104',en:'Ivory Relief',am:'ነጭ ሸካራነት',cat:'neutral',collection:'Warm Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A luminous ivory with a subtle architectural texture.',descAm:'ብርሃን የሚያንጸባርቅ ነጭ ቀለም ከረቀቀ ሸካራነት ጋር።',use:'Formal rooms · Hotels',useAm:'መቀበያ ክፍል · ሆቴል'},
  {id:'HB-105',code:'AR-105',en:'Silver Canvas',am:'የብር ሸራ',cat:'grey',collection:'Silver Textures',collectionAm:'ግራጫ ሸካራነቶች',desc:'An abstract silver-grey weave that brings quiet depth.',descAm:'ክፍሉን ሳያጨናንቅ ጥልቀት የሚጨምር የብር ግራጫ ሸካራነት።',use:'Offices · Contemporary homes',useAm:'ቢሮ · ዘመናዊ ቤት'},
  {id:'HB-106',code:'AR-106',en:'Warm Maize',am:'ሞቅ ያለ ቢጫ',cat:'neutral',collection:'Warm Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A gentle maize tone that adds warmth while keeping a room light.',descAm:'ክፍሉን ብሩህ አድርጎ ሙቀት የሚጨምር ለስላሳ ቢጫ ቀለም።',use:'Family rooms · Dining rooms',useAm:'የቤተሰብ ክፍል · መመገቢያ'},
  {id:'HB-107',code:'AR-107',en:'Sage Bloom',am:'ሴጅ አበባ',cat:'pattern',collection:'Soft Patterns',collectionAm:'ለስላሳ ጥለቶች',desc:'A tonal sage floral with a soft sheen.',descAm:'ረጋ ያለ የሴጅ ቀለም ከአበባ ጥለትና ለስላሳ ነጸብራቅ ጋር።',use:'Bedrooms · Lounges',useAm:'መኝታ ቤት · ሳሎን'},
  {id:'HB-108',code:'AR-108',en:'Royal Blue Velvet',am:'ደማቅ ሰማያዊ',cat:'blue',collection:'Signature Blues',collectionAm:'ሰማያዊ ቀለሞች',desc:'A saturated royal blue velvet for dramatic, grounded rooms.',descAm:'ደማቅና ጥልቅ ሰማያዊ ቬልቬት፤ ለተለየ የክፍል ገጽታ።',use:'Feature rooms · Hospitality',useAm:'ልዩ ክፍል · ሆቴል'},
  {id:'HB-109',code:'AR-109',en:'Moon Garden',am:'የጨረቃ አትክልት',cat:'pattern grey',collection:'Soft Patterns',collectionAm:'ለስላሳ ጥለቶች',desc:'Sculptural circular motifs in soft silver.',descAm:'ለየት ያለ የውስጥ ዲዛይን የሚፈጥር የብር ክብ ጥለት።',use:'Living rooms · Suites',useAm:'ሳሎን · ስዊት'},
  {id:'HB-110',code:'AR-110',en:'Indigo Impression',am:'ኢንዲጎ ጥለት',cat:'blue pattern',collection:'Signature Blues',collectionAm:'ሰማያዊ ቀለሞች',desc:'An artistic indigo pattern with brush-like movement.',descAm:'እንደ ብሩሽ ስዕል እንቅስቃሴ ያለው ጥልቅ ሰማያዊ ጥለት።',use:'Creative rooms · Lounges',useAm:'የፈጠራ ክፍል · ሳሎን'},
  {id:'HB-111',code:'AR-111',en:'Silver Bouclé',am:'የብር ቡክሌ',cat:'grey',collection:'Silver Textures',collectionAm:'ግራጫ ሸካራነቶች',desc:'A tactile pale grey with a contemporary finish.',descAm:'ለስላሳና ዘመናዊ ሸካራነት ያለው ፈዛዛ ግራጫ።',use:'Bedrooms · Offices',useAm:'መኝታ ቤት · ቢሮ'},
  {id:'HB-112',code:'AR-112',en:'Dove Silk',am:'የርግብ ግራጫ',cat:'grey',collection:'Silver Textures',collectionAm:'ግራጫ ሸካራነቶች',desc:'A smooth dove-grey finish with an elegant lustre.',descAm:'ረጋ ያለ ነጸብራቅና ውብ አወዳደቅ ያለው የርግብ ግራጫ።',use:'Formal rooms · Apartments',useAm:'መቀበያ ክፍል · አፓርታማ'},
  {id:'HB-113',code:'AR-113',en:'Platinum Veil',am:'ፕላቲነም መጋረጃ',cat:'grey',collection:'Silver Textures',collectionAm:'ግራጫ ሸካራነቶች',desc:'A pale platinum drape with a fine crosswoven surface.',descAm:'ረቂቅ የተጠላለፈ ሸካራነት ያለው ፈዛዛ ፕላቲነም ቀለም።',use:'Offices · Living rooms',useAm:'ቢሮ · ሳሎን'},
  {id:'HB-114',code:'AR-114',en:'Graphite Etching',am:'ግራፋይት ጥለት',cat:'grey',collection:'Silver Textures',collectionAm:'ግራጫ ሸካራነቶች',desc:'A deep graphite fabric with a subtle etched texture.',descAm:'ጥልቅ ግራጫ ቀለም ከረቀቀ የተቀረጸ ሸካራነት ጋር።',use:'Media rooms · Hotels',useAm:'የመዝናኛ ክፍል · ሆቴል'},
  {id:'HB-115',code:'AR-115',en:'Stone Relief',am:'የድንጋይ ሸካራነት',cat:'grey',collection:'Silver Textures',collectionAm:'ግራጫ ሸካራነቶች',desc:'A dimensional stone-grey textile with refined relief.',descAm:'የተራቀቀ ከፍና ዝቅ ጥለት ያለው የድንጋይ ግራጫ ጨርቅ።',use:'Living rooms · Lobbies',useAm:'ሳሎን · ሎቢ'},
  {id:'HB-116',code:'AR-116',en:'Soft Chalk',am:'ለስላሳ ነጭ',cat:'neutral',collection:'Warm Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A quiet, plush and versatile chalk-white velvet.',descAm:'ረጋ ያለ፣ ለስላሳና ከብዙ ቀለሞች ጋር የሚስማማ ነጭ ቬልቬት።',use:'Bedrooms · Nurseries',useAm:'መኝታ ቤት · የሕፃናት ክፍል'},
  {id:'HB-117',code:'AR-117',en:'Charcoal Velvet',am:'ከሰል ግራጫ',cat:'grey',collection:'Silver Textures',collectionAm:'ግራጫ ሸካራነቶች',desc:'A rich charcoal velvet with a light-catching pile.',descAm:'ብርሃንን በውበት የሚያንጸባርቅ ጥልቅ የከሰል ግራጫ ቬልቬት።',use:'Bedrooms · Boardrooms',useAm:'መኝታ ቤት · የስብሰባ ክፍል'},
  {id:'HB-118',code:'AR-118',en:'Oyster Satin',am:'ኦይስተር ነጸብራቅ',cat:'neutral',collection:'Warm Neutrals',collectionAm:'ሞቅ ያሉ ቀለሞች',desc:'A light oyster neutral with a graceful glow.',descAm:'ቀላል ኦይስተር ቀለም ከረጋ ያለ ነጸብራቅ ጋር።',use:'Dining rooms · Suites',useAm:'መመገቢያ · ስዊት'},
  {id:'HB-119',code:'AR-119',en:'Botanical Lace',am:'የቅጠል ጥለት ሼር',cat:'blue pattern',collection:'Light Sheers',collectionAm:'ብርሃን አሳላፊ ሼር',desc:'An airy open weave with a blue botanical motif.',descAm:'ከሰማያዊ የቅጠል ጥለት ጋር ብርሃንን የሚያሳልፍ ሼር።',use:'Living rooms · Verandas',useAm:'ሳሎን · በረንዳ'},
  {id:'HB-120',code:'AR-120',en:'Frosted Pearl',am:'የቀዘቀዘ ዕንቁ',cat:'grey',collection:'Silver Textures',collectionAm:'ግራጫ ሸካራነቶች',desc:'A pearl-grey finish with a fine light-catching grain.',descAm:'ረቂቅ ነጸብራቅና የዕንቁ መልክ ያለው ፈዛዛ ግራጫ።',use:'Apartments · Offices',useAm:'አፓርታማ · ቢሮ'}
];

const grid = document.querySelector('.partner-grid');
const searchInput = document.querySelector('.fabric-search');
const filterButtons = document.querySelectorAll('.filter-list button');
const languageButton = document.querySelector('.language-toggle');
const dialog = document.querySelector('.fabric-dialog');
let language = localStorage.getItem('ararat-language') === 'am' ? 'am' : 'en';
let activeFilter = 'all';

function imagePath(id, size = 'thumb') { return `../assets/images/catalog/${id}-${size}.webp`; }
function localValue(fabric, key) {
  if (key === 'name') return language === 'am' ? fabric.am : fabric.en;
  return language === 'am' ? fabric[`${key}Am`] || fabric[key] : fabric[key];
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  grid.innerHTML = partnerFabrics.map((fabric, index) => {
    const filterMatch = activeFilter === 'all' || fabric.cat.split(' ').includes(activeFilter);
    const searchMatch = !query || [fabric.code, fabric.en, fabric.am, fabric.collection, fabric.collectionAm, fabric.cat].join(' ').toLowerCase().includes(query);
    const name = localValue(fabric, 'name');
    const collection = localValue(fabric, 'collection');
    return `<article class="fabric-card" data-index="${index}" tabindex="0"${filterMatch && searchMatch ? '' : ' hidden'}><div class="fabric-card-image"><img src="${imagePath(fabric.id)}" alt="${name} curtain fabric" width="720" height="960" loading="${index < 4 ? 'eager' : 'lazy'}" fetchpriority="${index < 4 ? 'high' : 'low'}" decoding="async"></div><div class="fabric-card-info"><p class="fabric-card-code">${fabric.code} · ${collection}</p><h3 class="fabric-card-name">${name}</h3></div></article>`;
  }).join('');
  document.querySelectorAll('.fabric-card:not([hidden])').forEach(card => {
    card.addEventListener('click', () => openFabric(Number(card.dataset.index)));
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openFabric(Number(card.dataset.index)); } });
  });
}

function openFabric(index) {
  const fabric = partnerFabrics[index];
  const name = localValue(fabric, 'name');
  dialog.querySelector('img').src = imagePath(fabric.id, 'detail');
  dialog.querySelector('img').alt = `${name} curtain fabric`;
  dialog.querySelector('.dialog-code').textContent = fabric.code;
  dialog.querySelector('h2').textContent = name;
  dialog.querySelector('.dialog-description').textContent = localValue(fabric, 'desc');
  dialog.querySelector('.dialog-collection').textContent = localValue(fabric, 'collection');
  dialog.querySelector('.dialog-use').textContent = localValue(fabric, 'use');
  dialog.showModal();
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-am]').forEach(element => { element.innerHTML = element.dataset[language]; });
  searchInput.placeholder = searchInput.dataset[`placeholder${language === 'am' ? 'Am' : 'En'}`];
  languageButton.classList.toggle('is-am', language === 'am');
  languageButton.querySelectorAll('span').forEach((span, index) => span.classList.toggle('active', language === (index ? 'am' : 'en')));
  localStorage.setItem('ararat-language', language);
  render();
}

searchInput.addEventListener('input', render);
filterButtons.forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; filterButtons.forEach(item => item.classList.toggle('active', item === button)); render(); }));
languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'am' : 'en'));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
setLanguage(language);
