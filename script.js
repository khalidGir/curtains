const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const languageButtons = document.querySelectorAll('.language-toggle');

const translations = {
  en: {
    title: 'Habiba Curtains — Made to measure curtains',
    description: 'Made-to-measure curtains, softly tailored for the way you live.',
    text: {
      '.announcement': 'Complimentary design consultation · Made for your windows',
      '.desktop-nav a:nth-child(1)': 'Fabrics', '.desktop-nav a:nth-child(2)': 'Our process', '.desktop-nav a:nth-child(3)': 'The atelier',
      '.projects-link': 'Projects',
      '.header-cta': 'Book a measure <span>↗</span>',
      '.mobile-nav a:nth-of-type(1)': 'Fabrics', '.mobile-nav a:nth-of-type(2)': 'Our process', '.mobile-nav a:nth-of-type(3)': 'The atelier', '.mobile-nav a:nth-of-type(5)': 'Book a consultation',
      '.hero .eyebrow': 'MADE TO MEASURE · BEAUTIFULLY YOURS', '.hero h1': 'Light, <em>tailored.</em>',
      '.hero-lede': 'Curtains with quiet presence—thoughtfully designed, precisely measured and hand-finished for your home.',
      '.hero .button': 'Begin your room <span>↗</span>', '.hero .text-link': 'Explore fabrics <span>↓</span>', '.hero-note p': 'Natural linen<br>in Burnt Sienna', '.scroll-cue': 'SCROLL <i></i>',
      '.intro > .section-tag': '01 / THE COLLECTION', '.intro h2': 'More than a finishing touch.<br><em>The feeling of a room.</em>',
      '.intro-copy > p': 'From whisper-light sheers to grounding, room-darkening weaves, our edit is built around texture, movement and the many ways you live with light.',
      '.fabric-card:nth-child(1) h3': 'The Sheer', '.fabric-card:nth-child(1) > p': 'Softly filters daylight',
      '.fabric-card:nth-child(2) h3': 'The Linen', '.fabric-card:nth-child(2) > p': 'Relaxed texture, elegant fall',
      '.fabric-card:nth-child(3) h3': 'The Velvet', '.fabric-card:nth-child(3) > p': 'Rich colour, enveloping calm',
      '.fabric-card:nth-child(1) button': 'View the weave <span>↗</span>', '.fabric-card:nth-child(2) button': 'View the weave <span>↗</span>', '.fabric-card:nth-child(3) button': 'View the weave <span>↗</span>',
      '.promise-copy .section-tag': 'THE HABIBA DIFFERENCE', '.promise h2': 'Made slowly.<br><em>Lived with daily.</em>',
      '.promise-copy > p': 'Every panel is cut and finished by hand in our local workroom. We obsess over every fold, hem and heading, so the result feels effortless in your space.',
      '.stats div:nth-child(1) span': 'years of craft', '.stats div:nth-child(2) span': 'curated textiles', '.stats div:nth-child(3) span': 'workmanship promise', '.arrow-link': 'Meet our makers <span>↗</span>',
      '.process > .section-tag': '02 / FROM WINDOW TO WONDER', '.process h2': 'Simple by design.', '.process-head > p': 'We bring the showroom, expertise and final fit to you. One thoughtful process, with a dedicated designer throughout.',
      '.steps li:nth-child(1) h3': 'Meet at home', '.steps li:nth-child(1) p': 'We listen, look at the light and bring an edited library of fabrics to your room.',
      '.steps li:nth-child(2) h3': 'Make it yours', '.steps li:nth-child(2) p': 'Choose your fabric, heading, lining and hardware—with calm, expert guidance.',
      '.steps li:nth-child(3) h3': 'Leave it to us', '.steps li:nth-child(3) p': 'We measure, hand-make and install. Your only job is to enjoy the reveal.',
      '.consult-copy .section-tag': 'YOUR WINDOWS, REIMAGINED', '.consultation h2': 'Let’s make<br><em>something beautiful.</em>', '.consult-copy > p': 'Book a complimentary in-home consultation. We’ll bring the fabrics and ideas.',
      '.consult-catalog small': '20 CURATED FABRICS', '.consult-catalog strong': 'View the fabric catalogue',
      '.consult-form label:nth-child(1) > span': 'Your name', '.consult-form label:nth-child(2) > span': 'Email address', '.consult-form label:nth-child(3) > span': 'Tell us about your space',
      '.consult-form .button': 'Request consultation <span>↗</span>', '.form-status': 'We’ll reply within one working day.',
      'footer > p': 'Made-to-measure curtains.', 'footer div a:nth-child(3)': 'Contact', 'footer div a:nth-child(4)': 'Back to top ↑',
      '.swatch-dialog .section-tag': 'FABRIC STUDY', '.swatch-dialog > p:not(.section-tag)': 'Order a complimentary swatch and see how the weave changes with the light in your own room.', '.swatch-dialog .button': 'Request a swatch <span>↗</span>'
    },
    placeholders: ['e.g. Amara', 'you@example.com', "Rooms, style, or what you'd love to change"],
    fabrics: ['The Sheer', 'The Linen', 'The Velvet'],
    success: ['Consultation requested ✓', 'Thank you. Your Habiba designer will be in touch within one working day.']
  },
  am: {
    title: 'ሀቢባ መጋረጃ — ለመስኮትዎ በልክ፣ ለቤትዎ በውበት', description: 'ለቤት፣ ለቢሮና ለሆቴል በልክ የሚዘጋጁ መጋረጃዎችና የመስኮት ማስዋቢያዎች።',
    text: {
      '.announcement': 'ነፃ የቤት ውስጥ ምክክር · ለመስኮትዎ በልክ እንሰራለን',
      '.desktop-nav a:nth-child(1)': 'ጨርቆች', '.desktop-nav a:nth-child(2)': 'እንዴት እንሰራለን', '.desktop-nav a:nth-child(3)': 'ስለ ሀቢባ',
      '.projects-link': 'ፕሮጀክቶች',
      '.header-cta': 'የቤት ልኬት ይያዙ <span>↗</span>',
      '.mobile-nav a:nth-of-type(1)': 'ጨርቆች', '.mobile-nav a:nth-of-type(2)': 'እንዴት እንሰራለን', '.mobile-nav a:nth-of-type(3)': 'ስለ ሀቢባ', '.mobile-nav a:nth-of-type(5)': 'የቤት ልኬት ይያዙ',
      '.hero .eyebrow': 'ለመስኮትዎ በልክ · ለቤትዎ በውበት', '.hero h1': 'ብርሃንን፣ <em>በውበት እናልብሰዋለን።</em>',
      '.hero-lede': 'በጸጥታ የሚያምሩ፣ ለመስኮትዎ በትክክል የተለኩና በጥንቃቄ የተሰሩ መጋረጃዎች።',
      '.hero .button': 'ለቤትዎ እንጀምር <span>↗</span>', '.hero .text-link': 'ጨርቆችን ይምረጡ <span>↓</span>', '.hero-note p': 'ተፈጥሯዊ ሊነን<br>ሞቅ ያለ ቡናማ', '.scroll-cue': 'ይውረዱ <i></i>',
      '.intro > .section-tag': '01 / የጨርቅ ምርጫ', '.intro h2': 'መጋረጃ ውበት ብቻ አይደለም።<br><em>የክፍሉን ስሜት ይቀይራል።</em>',
      '.intro-copy > p': 'ለስላሳ ብርሃን ከሚያሳልፍ ሼር እስከ ሙሉ ግላዊነት የሚሰጥ ወፍራም ጨርቅ፤ ለክፍልዎ ብርሃን፣ ቀለምና አጠቃቀም የሚመች ምርጫ እናቀርባለን።',
      '.fabric-card:nth-child(1) h3': 'ሼር', '.fabric-card:nth-child(1) > p': 'ብርሃንን ሳይከለክል ግላዊነት ይጨምራል',
      '.fabric-card:nth-child(2) h3': 'ሊነን', '.fabric-card:nth-child(2) > p': 'ተፈጥሯዊ ሸካራነት፣ ለስላሳ አወዳደቅ',
      '.fabric-card:nth-child(3) h3': 'ቬልቬት', '.fabric-card:nth-child(3) > p': 'የበለጸገ ቀለም፣ ሞቅ ያለ የቅንጦት ስሜት',
      '.fabric-card:nth-child(1) button': 'ጨርቁን ይመልከቱ <span>↗</span>', '.fabric-card:nth-child(2) button': 'ጨርቁን ይመልከቱ <span>↗</span>', '.fabric-card:nth-child(3) button': 'ጨርቁን ይመልከቱ <span>↗</span>',
      '.promise-copy .section-tag': 'የሀቢባ ልዩነት', '.promise h2': 'በጥንቃቄ እንሰራዋለን።<br><em>በየቀኑ ይወዱታል።</em>',
      '.promise-copy > p': 'እያንዳንዱን መጋረጃ በልክ ቆርጠን፣ በጥንቃቄ ሰፍተን እናጠናቅቃለን። እጥፋቱ፣ ርዝመቱና አሰቃቀሉ በቦታዎ ላይ ተፈጥሯዊና የተሟላ እንዲታይ ለዝርዝሩ ሁሉ ትኩረት እንሰጣለን።',
      '.stats div:nth-child(1) span': 'ዓመታት የእጅ ጥበብ', '.stats div:nth-child(2) span': 'የተመረጡ ጨርቆች', '.stats div:nth-child(3) span': 'የስራ ጥራት ዋስትና', '.arrow-link': 'ባለሙያዎቻችንን ያግኙ <span>↗</span>',
      '.process > .section-tag': '02 / ከምርጫ እስከ ገጠማ', '.process h2': 'ቀላል፣ ግልጽ፣ የተደራጀ።', '.process-head > p': 'ጨርቆቹንና የባለሙያ ምክራችንን ወደ ቤትዎ እናመጣለን። ከመጀመሪያው ምርጫ እስከ መጨረሻው ገጠማ ድረስ አንድ ባለሙያ ከጎንዎ ይሆናል።',
      '.steps li:nth-child(1) h3': 'ወደ ቤትዎ እንመጣለን', '.steps li:nth-child(1) p': 'ፍላጎትዎን እናዳምጣለን፣ የክፍሉን ብርሃንና ቀለም እናያለን፣ የሚመቹ ጨርቆችንም ይዘን እንመጣለን።',
      '.steps li:nth-child(2) h3': 'የሚወዱትን ይምረጡ', '.steps li:nth-child(2) p': 'ጨርቁን፣ እጥፋቱን፣ ውስጠኛ ሽፋኑንና መስቀያውን ከባለሙያችን ምክር ጋር ይምረጡ።',
      '.steps li:nth-child(3) h3': 'ቀሪውን ለእኛ ይተዉ', '.steps li:nth-child(3) p': 'ልኬቱን፣ ስፌቱንና ገጠማውን እኛ እንይዛለን። እርስዎ ውጤቱን መደሰት ብቻ ነው።',
      '.consult-copy .section-tag': 'መስኮትዎን በአዲስ ይዩ', '.consultation h2': 'ለቤትዎ የሚመጥን ውበት<br><em>አብረን እንፍጠር።</em>', '.consult-copy > p': 'ነፃ የቤት ውስጥ ምክክር ይያዙ። ጨርቆቹን፣ ምርጫዎቹንና ሙያዊ ምክራችንን ይዘን ወደ እርስዎ እንመጣለን።',
      '.consult-catalog small': '20 የተመረጡ ጨርቆች', '.consult-catalog strong': 'የጨርቅ ካታሎጉን ይመልከቱ',
      '.consult-form label:nth-child(1) > span': 'ስም', '.consult-form label:nth-child(2) > span': 'ኢሜይል', '.consult-form label:nth-child(3) > span': 'ስለ ቤትዎ ወይም ፕሮጀክትዎ ይንገሩን',
      '.consult-form .button': 'ነፃ ምክክር ይጠይቁ <span>↗</span>', '.form-status': 'በአንድ የስራ ቀን ውስጥ እናገኝዎታለን።',
      'footer > p': 'በልክ የሚሰሩ መጋረጃዎች።', 'footer div a:nth-child(3)': 'ያግኙን', 'footer div a:nth-child(4)': 'ወደ ላይ ↑',
      '.swatch-dialog .section-tag': 'የጨርቅ ናሙና', '.swatch-dialog > p:not(.section-tag)': 'ነፃ የጨርቅ ናሙና ይጠይቁ እና ጨርቁ በክፍልዎ ብርሃን እንዴት እንደሚታይ ይመልከቱ።', '.swatch-dialog .button': 'ናሙና ይጠይቁ <span>↗</span>'
    },
    placeholders: ['ለምሳሌ፣ ሀቢባ', 'you@example.com', 'የትኞቹን ክፍሎች ማሳመር ይፈልጋሉ?'],
    fabrics: ['ሼር', 'ሊነን', 'ቬልቬት'],
    success: ['ጥያቄዎ ደርሶናል ✓', 'እናመሰግናለን። የሀቢባ ባለሙያ በአንድ የስራ ቀን ውስጥ ያገኝዎታል።']
  }
};

let currentLanguage = (localStorage.getItem('habiba-language') || localStorage.getItem('elan-language')) === 'am' ? 'am' : 'en';

function setLanguage(language) {
  currentLanguage = language;
  const copy = translations[language];
  document.documentElement.lang = language;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  Object.entries(copy.text).forEach(([selector, value]) => {
    document.querySelectorAll(selector).forEach(element => element.innerHTML = value);
  });
  document.querySelectorAll('.consult-form input, .consult-form textarea').forEach((field, index) => field.placeholder = copy.placeholders[index]);
  document.querySelectorAll('[data-fabric]').forEach((button, index) => button.dataset.fabric = copy.fabrics[index]);
  languageButtons.forEach(button => {
    button.classList.toggle('is-am', language === 'am');
    button.querySelectorAll('span').forEach((label, index) => label.classList.toggle('active', language === (index ? 'am' : 'en')));
    button.setAttribute('aria-label', language === 'en' ? 'Switch to Amharic' : 'ወደ እንግሊዝኛ ይቀይሩ');
  });
  localStorage.setItem('habiba-language', language);
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileNav.classList.toggle('open', !open);
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'am' : 'en')));

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
}), { threshold: .12 });
reveals.forEach(item => observer.observe(item));

const dialog = document.querySelector('.swatch-dialog');
const dialogTitle = dialog.querySelector('h2');
const swatch = dialog.querySelector('.dialog-swatch');
document.querySelectorAll('[data-fabric]').forEach((button, index) => button.addEventListener('click', () => {
  dialogTitle.textContent = translations[currentLanguage].fabrics[index];
  swatch.className = 'dialog-swatch ' + ['sheer', 'linen', 'velvet'][index];
  dialog.showModal();
}));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.querySelector('a').addEventListener('click', () => dialog.close());

document.querySelector('.consult-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  form.querySelector('button').textContent = translations[currentLanguage].success[0];
  form.querySelector('button').disabled = true;
  form.querySelector('.form-status').textContent = translations[currentLanguage].success[1];
});

setLanguage(currentLanguage);
