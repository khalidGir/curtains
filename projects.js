const menuButton=document.querySelector('.menu-button');
const mobileNav=document.querySelector('.mobile-nav');
const toggles=document.querySelectorAll('.language-toggle');
const amPolish={
  '.project-hero .eyebrow':'ሆቴሎች · ቢሮዎች · መኖሪያ ቤቶች',
  '.project-hero h1':'ትልቅ ቦታ፣ <em>የተሟላ ገጽታ።</em>',
  '.project-hero-copy>p:last-child':'ለትልቅ ፕሮጀክቶች ከጨርቅ ምርጫና ልኬት ጀምሮ እስከ ስፌትና ገጠማ ድረስ በአንድ ኃላፊነት እንሰራለን።',
  '.portfolio-intro>.section-tag':'01 / የሰራናቸው ስራዎች',
  '.portfolio-lead h2':'ለክፍሉ በውበት።<br>ለፕሮጀክቱ <em>በሙያ።</em>',
  '.portfolio-lead>p':'ውበት፣ ወጥነትና በጊዜ የሚደርስ ስራ ለሚፈልጉ የሆቴል፣ የቢሮና የመኖሪያ ፕሮጀክቶች ሀቢባ አስተማማኝ አጋር ነው።',
  '.project-type:nth-child(1) h3':'ረጅም የሎቢ መጋረጃ',
  '.project-type:nth-child(1)>p:last-child':'ለከፍተኛ ሎቢ ግርማና ለስላሳ ብርሃን የሚሰጥ ባለ ሁለት ንብርብር መጋረጃ።',
  '.project-type:nth-child(2) h3':'የቢሮ ቁመታዊ ብላይንድ',
  '.project-type:nth-child(2)>p:last-child':'ግላዊነትን የሚጠብቅ፣ የፀሐይ ነጸብራቅን የሚቀንስና ንጹህ የቢሮ ገጽታ የሚሰጥ መፍትሔ።',
  '.project-type:nth-child(3) h3':'ባለ ሁለት ንብርብር የአፓርታማ መጋረጃ',
  '.project-type:nth-child(3)>p:last-child':'ነጭ ሼርና ሞቅ ያለ ቡናማ መጋረጃ በማጣመር ለቤቱ ምቹና የተሟላ ገጽታ የሰጠ ስራ።',
  '.delivery-heading .section-tag':'03 / ለትልቅ ፕሮጀክቶች',
  '.delivery-heading h2':'አንድ ቡድን።<br><em>ከመጀመሪያ እስከ መጨረሻ።</em>',
  '.project-cta h2':'ከመጀመሪያው <em>ያሳትፉን።</em>',
  '.project-cta>p:not(.section-tag)':'የፕሮጀክት ስዕል፣ የመስኮት ዝርዝር ወይም አጭር መግለጫ ያጋሩን። ተግባራዊና ውብ መፍትሔ አብረን እናዘጋጃለን።'
};
let lang=localStorage.getItem('habiba-language')||'en';
function setLanguage(next){
  lang=next;document.documentElement.lang=lang;
  document.querySelectorAll('[data-en]').forEach(el=>el.innerHTML=el.dataset[lang]);
  if(lang==='am')Object.entries(amPolish).forEach(([selector,value])=>document.querySelectorAll(selector).forEach(el=>el.innerHTML=value));
  toggles.forEach(toggle=>{toggle.classList.toggle('is-am',lang==='am');toggle.querySelectorAll('span').forEach((span,i)=>span.classList.toggle('active',lang===(i?'am':'en')))});
  document.title=lang==='am'?'ፕሮጀክቶች — ሀቢባ መጋረጃ':'Projects — Habiba Curtains';localStorage.setItem('habiba-language',lang);
}
toggles.forEach(toggle=>toggle.addEventListener('click',()=>setLanguage(lang==='en'?'am':'en')));
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));mobileNav.classList.toggle('open',!open)});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>mobileNav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));setLanguage(lang);
