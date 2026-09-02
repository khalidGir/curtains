const form = document.getElementById('onboarding-form');
const nameInput = document.getElementById('partner-name');
const typeSelect = document.getElementById('partner-type');
const slugPreview = document.getElementById('slug-preview');
const phoneInput = document.getElementById('phone');
const whatsappInput = document.getElementById('whatsapp');
const mapsInput = document.getElementById('maps-url');
const logoUpload = document.getElementById('logo-upload');
const logoFile = document.getElementById('logo-file');
const logoPreview = document.getElementById('logo-preview');
const brandColour = document.getElementById('brand-colour');
const brandHex = document.getElementById('brand-hex');
const summaryDiv = document.getElementById('summary');
const previewIframe = document.getElementById('preview-iframe');
const generateBtn = document.getElementById('generate-btn');
const formMessage = document.getElementById('form-message');
const resultSection = document.getElementById('result-section');
const partnersContainer = document.getElementById('partners-container');

let currentStep = 1;
let logoData = null;
let partners = JSON.parse(localStorage.getItem('habiba-partners') || '[]');

// Slug generation
nameInput.addEventListener('input', () => {
  const slug = nameInput.value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  slugPreview.textContent = slug || 'partner-name';
});

// Brand colour sync
brandColour.addEventListener('input', () => {
  brandHex.value = brandColour.value;
});
brandHex.addEventListener('input', () => {
  if (/^#[0-9a-f]{6}$/i.test(brandHex.value)) {
    brandColour.value = brandHex.value;
  }
});

// Logo upload
logoUpload.addEventListener('click', () => logoFile.click());
logoFile.addEventListener('change', handleLogo);

logoUpload.addEventListener('dragover', (e) => {
  e.preventDefault();
  logoUpload.style.borderColor = 'var(--rust)';
});
logoUpload.addEventListener('dragleave', () => {
  logoUpload.style.borderColor = '';
});
logoUpload.addEventListener('drop', (e) => {
  e.preventDefault();
  logoUpload.style.borderColor = '';
  if (e.dataTransfer.files.length) {
    logoFile.files = e.dataTransfer.files;
    handleLogo();
  }
});

function handleLogo() {
  const file = logoFile.files[0];
  if (!file) return;
  
  if (file.size > 2 * 1024 * 1024) {
    showMessage('Logo must be under 2MB', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    logoData = {
      dataUrl: e.target.result,
      ext: file.name.split('.').pop().toLowerCase()
    };
    logoPreview.src = e.target.result;
    logoPreview.hidden = false;
    logoUpload.classList.add('has-logo');
    logoUpload.querySelector('p').innerHTML = `<strong>${file.name}</strong><br><small>Click to change</small>`;
  };
  reader.readAsDataURL(file);
}

// Step navigation
function nextStep() {
  if (!validateStep(currentStep)) return;
  
  if (currentStep === 3) {
    updateSummary();
    updatePreview();
  }
  
  currentStep = Math.min(4, currentStep + 1);
  updateSteps();
}

function prevStep() {
  currentStep = Math.max(1, currentStep - 1);
  updateSteps();
}

function updateSteps() {
  document.querySelectorAll('.form-section').forEach(section => {
    section.classList.toggle('active', Number(section.dataset.step) === currentStep);
  });
  document.querySelectorAll('.step-indicator').forEach(indicator => {
    indicator.classList.toggle('active', Number(indicator.dataset.step) <= currentStep);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
  clearMessage();
  
  if (step === 1) {
    if (!nameInput.value.trim()) {
      showMessage('Please enter a partner name', 'error');
      nameInput.focus();
      return false;
    }
    if (!typeSelect.value) {
      showMessage('Please select a partner type', 'error');
      typeSelect.focus();
      return false;
    }
  }
  
  if (step === 2) {
    if (!phoneInput.value.trim()) {
      showMessage('Please enter a phone number', 'error');
      phoneInput.focus();
      return false;
    }
    if (!mapsInput.value.trim()) {
      showMessage('Please enter a Google Maps URL', 'error');
      mapsInput.focus();
      return false;
    }
  }
  
  if (step === 3 && !logoData) {
    showMessage('Please upload a partner logo', 'error');
    return false;
  }
  
  return true;
}

function showMessage(text, type = '') {
  formMessage.textContent = text;
  formMessage.className = 'form-message ' + type;
}

function clearMessage() {
  formMessage.textContent = '';
  formMessage.className = 'form-message';
}

// Summary
function updateSummary() {
  const name = nameInput.value.trim();
  const type = typeSelect.options[typeSelect.selectedIndex].text;
  const phone = phoneInput.value.trim();
  const whatsapp = whatsappInput.value.trim() || phone;
  const slug = slugPreview.textContent;
  
  summaryDiv.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px;">
      <div style="padding:16px;background:var(--cream);">
        <small style="color:var(--muted);font-size:10px;letter-spacing:.12em;text-transform:uppercase;">Partner</small>
        <strong style="display:block;margin-top:4px;font-size:16px;">${name}</strong>
        <span class="partner-type-badge">${type}</span>
      </div>
      <div style="padding:16px;background:var(--cream);">
        <small style="color:var(--muted);font-size:10px;letter-spacing:.12em;text-transform:uppercase;">Contact</small>
        <strong style="display:block;margin-top:4px;font-size:14px;">${phone}</strong>
        <span style="font-size:12px;color:var(--muted);">WhatsApp: ${whatsapp}</span>
      </div>
      <div style="padding:16px;background:var(--cream);">
        <small style="color:var(--muted);font-size:10px;letter-spacing:.12em;text-transform:uppercase;">Catalogue URL</small>
        <strong style="display:block;margin-top:4px;font-size:14px;word-break:break-all;">/${slug}/</strong>
      </div>
      <div style="padding:16px;background:var(--cream);">
        <small style="color:var(--muted);font-size:10px;letter-spacing:.12em;text-transform:uppercase;">Brand colour</small>
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
          <div style="width:24px;height:24px;background:${brandColour.value};border-radius:4px;"></div>
          <strong style="font-size:14px;">${brandColour.value}</strong>
        </div>
      </div>
    </div>
  `;
}

// Live preview
function updatePreview() {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const whatsapp = whatsappInput.value.trim() || phone;
  const maps = mapsInput.value.trim();
  const slug = slugPreview.textContent;
  const colour = brandColour.value;
  const logoExt = logoData ? `.${logoData.ext}` : '.jpg';
  
  const phoneFormatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  const nameUpper = name.toUpperCase();
  
  const whatsappHtml = `
    <a class="header-whatsapp" href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp ↗" data-am="ዋትስአፕ ↗">WhatsApp ↗</a>
  `;
  
  const heroWhatsapp = `
    <a class="text-button" href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp us ↗" data-am="ዋትስአፕ ይልኩን ↗">WhatsApp us ↗</a>
  `;
  
  const ctaWhatsapp = `
    <a class="whatsapp-button" href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp us ↗" data-am="ያዋትስአፕሉ ↗">WhatsApp us ↗</a>
  `;
  
  const footerWhatsapp = `
    <a href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp ↗" data-am="ዋትስአፕ ↗">WhatsApp ↗</a>
  `;
  
  const mobileWhatsapp = `
    <a href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp" data-am="ዋትስአፕ">WhatsApp</a>
  `;
  
  const dialogWhatsapp = `
    <a class="whatsapp-button dialog-whatsapp" href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp us ↗" data-am="ያዋትስአፕሉ ↗">WhatsApp us ↗</a>
  `;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="${colour}">
  <title>Curtain Collection — ${name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Italiana&family=Noto+Sans+Ethiopic:wght@400;500;600&family=Noto Serif+Ethiopic:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="partner-catalog.css">
  <style>:root{--brand:${colour}}</style>
</head>
<body>
  <header class="partner-header">
    <a class="partner-logo" href="#top" aria-label="${name} curtain collection"><img src="assets/partners/${slug}/logo${logoExt}" alt="${name}"></a>
    <nav aria-label="Catalogue navigation"><a href="#collection">Fabrics</a><a href="#how">How to order</a></nav>
    <div class="header-actions">
      <button class="language-toggle" type="button" aria-label="Switch language"><span class="active">EN</span><i></i><span>አማ</span></button>
      ${whatsappHtml}
      <a class="header-call" href="tel:+251${phone}">Call for price ↗</a>
    </div>
  </header>

  <main id="top">
    <section class="partner-hero">
      <div class="hero-copy">
        <p>${nameUpper} · CURTAIN COLLECTION</p>
        <h1>Complete the room<br><em>beautifully.</em></h1>
        <span>Explore our considered collection of curtain fabrics, available through the ${name} showroom.</span>
        <div>
          <a class="primary-button" href="#collection">Explore fabrics ↓</a>
          ${heroWhatsapp}
          <a class="text-button" href="${maps}" target="_blank" rel="noopener noreferrer">Get directions ↗</a>
        </div>
      </div>
      <div class="hero-gallery" aria-hidden="true">
        <figure><img src="assets/images/catalog/HB-102-thumb.webp" alt=""></figure>
        <figure><img src="assets/images/catalog/HB-108-thumb.webp" alt=""></figure>
        <figure><img src="assets/images/catalog/HB-101-thumb.webp" alt=""></figure>
      </div>
    </section>

    <section class="collection-intro" id="collection">
      <div>
        <p>01 / THE COLLECTION</p>
        <h2>Find the fabric<br><em>for your room.</em></h2>
      </div>
      <span>Search by colour, finish or fabric code. When you find a favourite, call our showroom and mention its code.</span>
    </section>

    <section class="catalog-controls" aria-label="Find fabrics">
      <label>
        <span>Search fabrics</span>
        <input class="fabric-search" type="search" placeholder="Code, name or colour">
      </label>
      <div class="filter-list" role="group" aria-label="Filter fabrics">
        <button class="active" data-filter="all">All</button>
        <button data-filter="neutral">Neutral</button>
        <button data-filter="grey">Grey</button>
        <button data-filter="blue">Blue</button>
        <button data-filter="pattern">Pattern</button>
      </div>
    </section>
    <section class="partner-grid" aria-live="polite"></section>

    <section class="ordering" id="how">
      <div>
        <p>02 / FROM SAMPLE TO ROOM</p>
        <h2>Simple from<br><em>the start.</em></h2>
      </div>
      <ol>
        <li><span>01</span><div><h3>Choose your fabric</h3><p>Explore online or compare physical samples in our showroom.</p></div></li>
        <li><span>02</span><div><h3>Bring your measurements</h3><p>Note the width and height of each window, or ask our showroom team for guidance.</p></div></li>
        <li><span>03</span><div><h3>Ask for your price</h3><p>Mention the fabric code and our team will prepare your tailored price.</p></div></li>
      </ol>
    </section>

    <section class="showroom-cta">
      <img src="assets/partners/${slug}/logo${logoExt}" alt="${name}">
      <div>
        <p>AVAILABLE THROUGH ${nameUpper}</p>
        <h2>Found a fabric<br><em>you love?</em></h2>
        <span>Call our showroom with its code for current availability and a tailored price.</span>
        <div>
          <a class="primary-button" href="tel:+251${phone}">${phoneFormatted} ↗</a>
          ${ctaWhatsapp}
          <a class="text-button" href="${maps}" target="_blank" rel="noopener noreferrer">Get directions ↗</a>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <img src="assets/partners/${slug}/logo${logoExt}" alt="${name}">
    <p>Furniture and curtain solutions for a complete room.</p>
    <div>
      <a href="tel:+251${phone}">${phoneFormatted}</a>
      ${footerWhatsapp}
      <a href="${maps}" target="_blank" rel="noopener noreferrer">Showroom directions ↗</a>
    </div>
    <small>© 2026 ${name}</small>
  </footer>

  <div class="mobile-actions">
    <a href="tel:+251${phone}">Call for price</a>
    ${mobileWhatsapp}
    <a href="${maps}" target="_blank" rel="noopener noreferrer">Directions</a>
  </div>

  <dialog class="fabric-dialog">
    <button class="dialog-close" type="button" aria-label="Close">×</button>
    <div class="dialog-image"><img src="" alt=""></div>
    <div class="dialog-copy">
      <p class="dialog-code"></p>
      <h2></h2>
      <p class="dialog-description"></p>
      <dl>
        <div><dt>Collection</dt><dd class="dialog-collection"></dd></div>
        <div><dt>Works well in</dt><dd class="dialog-use"></dd></div>
      </dl>
      <a class="primary-button dialog-call" href="tel:+251${phone}">Call for price ↗</a>
      ${dialogWhatsapp}
      <span class="dialog-note">Mention this fabric code when you call.</span>
    </div>
  </dialog>
  <script src="partner-catalog.js"><\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  previewIframe.src = url;
}

// Generate partner
async function generatePartner() {
  generateBtn.disabled = true;
  generateBtn.textContent = 'Generating...';
  showMessage('Creating partner catalogue...', 'success');

  const name = nameInput.value.trim();
  const slug = slugPreview.textContent;
  const phone = phoneInput.value.trim();
  const whatsapp = whatsappInput.value.trim() || phone;
  const maps = mapsInput.value.trim();
  const colour = brandColour.value;
  const type = typeSelect.value;
  const logoExt = logoData ? logoData.ext : 'jpg';

  try {
    // Save to registry
    const partner = {
      name,
      slug,
      type,
      phone,
      whatsapp,
      maps,
      colour,
      logoExt,
      createdAt: new Date().toISOString()
    };

    partners.push(partner);
    localStorage.setItem('habiba-partners', JSON.stringify(partners));

    // Save logo if provided
    if (logoData) {
      // In a real implementation, this would save to the server
      // For now, we'll store the data URL in localStorage
      localStorage.setItem(`partner-logo-${slug}`, logoData.dataUrl);
    }

    // Generate catalogue HTML
    const phoneFormatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    const nameUpper = name.toUpperCase();

    const whatsappHeader = `<a class="header-whatsapp" href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp ↗" data-am="ዋትስአፕ ↗">WhatsApp ↗</a>`;
    const whatsappHero = `<a class="text-button" href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp us ↗" data-am="ዋትስአፕ ይልኩን ↗">WhatsApp us ↗</a>`;
    const whatsappCta = `<a class="whatsapp-button" href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp us ↗" data-am="ያዋትስአፕሉ ↗">WhatsApp us ↗</a>`;
    const whatsappFooter = `<a href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp ↗" data-am="ዋትስአፕ ↗">WhatsApp ↗</a>`;
    const whatsappMobile = `<a href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp" data-am="ዋትስአፕ">WhatsApp</a>`;
    const whatsappDialog = `<a class="whatsapp-button dialog-whatsapp" href="https://wa.me/251${whatsapp}" target="_blank" rel="noopener noreferrer" data-en="WhatsApp us ↗" data-am="ያዋትስአፕሉ ↗">WhatsApp us ↗</a>`;

    const catalogueHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="${colour}">
  <meta name="description" content="Explore the curtain fabric collection available from ${name}.">
  <title>Curtain Collection — ${name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Italiana&family=Noto+Sans+Ethiopic:wght@400;500;600&family=Noto Serif+Ethiopic:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../partner-catalog.css">
  <style>:root{--brand:${colour}}</style>
</head>
<body>
  <header class="partner-header">
    <a class="partner-logo" href="#top" aria-label="${name} curtain collection"><img src="../assets/partners/${slug}/logo.${logoExt}" alt="${name}"></a>
    <nav aria-label="Catalogue navigation"><a href="#collection" data-en="Fabrics" data-am="ጨርቆች">Fabrics</a><a href="#how" data-en="How to order" data-am="እንዴት ማዘዝ እንደሚቻል">How to order</a></nav>
    <div class="header-actions"><button class="language-toggle" type="button" aria-label="Switch language"><span class="active">EN</span><i></i><span>አማ</span></button>${whatsappHeader}<a class="header-call" href="tel:+251${phone}" data-en="Call for price ↗" data-am="ዋጋ ለመጠየቅ ይደውሉ ↗">Call for price ↗</a></div>
  </header>

  <main id="top">
    <section class="partner-hero">
      <div class="hero-copy"><p data-en="${nameUpper} · CURTAIN COLLECTION" data-am="${name} · የመጋረጃ ስብስብ">${nameUpper} · CURTAIN COLLECTION</p><h1 data-en="Complete the room<br><em>beautifully.</em>" data-am="ክፍልዎን በውብ መጋረጃ<br><em>ያሟሉ።</em>">Complete the room<br><em>beautifully.</em></h1><span data-en="Explore our considered collection of curtain fabrics, available through the ${name} showroom." data-am="በ${name} ሾውሩም የሚገኙ የመጋረጃ ጨርቆችን ይመልከቱ።">Explore our considered collection of curtain fabrics, available through the ${name} showroom.</span><div><a class="primary-button" href="#collection" data-en="Explore fabrics ↓" data-am="ጨርቆችን ይመልከቱ ↓">Explore fabrics ↓</a>${whatsappHero}<a class="text-button" href="${maps}" target="_blank" rel="noopener noreferrer" data-en="Get directions ↗" data-am="አድራሻውን ይመልከቱ ↗">Get directions ↗</a></div></div>
      <div class="hero-gallery" aria-hidden="true"><figure><img src="../assets/images/catalog/HB-102-thumb.webp" alt=""></figure><figure><img src="../assets/images/catalog/HB-108-thumb.webp" alt=""></figure><figure><img src="../assets/images/catalog/HB-101-thumb.webp" alt=""></figure></div>
    </section>

    <section class="collection-intro" id="collection"><div><p data-en="01 / THE COLLECTION" data-am="01 / የጨርቅ ስብስብ">01 / THE COLLECTION</p><h2 data-en="Find the fabric<br><em>for your room.</em>" data-am="ለክፍልዎ የሚስማማውን<br><em>ጨርቅ ይምረጡ።</em>">Find the fabric<br><em>for your room.</em></h2></div><span data-en="Search by colour, finish or fabric code. When you find a favourite, call our showroom and mention its code." data-am="በቀለም፣ በገጽታ ወይም በጨርቅ ኮድ ይፈልጉ። የወደዱትን ሲያገኙ ወደ ሾውሩማችን ይደውሉና ኮዱን ይጥቀሱ።">Search by colour, finish or fabric code. When you find a favourite, call our showroom and mention its code.</span></section>

    <section class="catalog-controls" aria-label="Find fabrics"><label><span data-en="Search fabrics" data-am="ጨርቅ ይፈልጉ">Search fabrics</span><input class="fabric-search" type="search" placeholder="Code, name or colour" data-placeholder-en="Code, name or colour" data-placeholder-am="ኮድ፣ ስም ወይም ቀለም"></label><div class="filter-list" role="group" aria-label="Filter fabrics"><button class="active" data-filter="all" data-en="All" data-am="ሁሉም">All</button><button data-filter="neutral" data-en="Neutral" data-am="ፈዛዛ">Neutral</button><button data-filter="grey" data-en="Grey" data-am="ግራጫ">Grey</button><button data-filter="blue" data-en="Blue" data-am="ሰማያዊ">Blue</button><button data-filter="pattern" data-en="Pattern" data-am="ጥለት">Pattern</button></div></section>
    <section class="partner-grid" aria-live="polite"></section>

    <section class="ordering" id="how"><div><p data-en="02 / FROM SAMPLE TO ROOM" data-am="02 / ከናሙና እስከ ቤትዎ">02 / FROM SAMPLE TO ROOM</p><h2 data-en="Simple from<br><em>the start.</em>" data-am="ከመጀመሪያው<br><em>ቀላል ነው።</em>">Simple from<br><em>the start.</em></h2></div><ol><li><span>01</span><div><h3 data-en="Choose your fabric" data-am="ጨርቅዎን ይምረጡ">Choose your fabric</h3><p data-en="Explore online or compare physical samples in our showroom." data-am="በድረ ገጹ ይመልከቱ ወይም በሾውሩማችን ያሉትን ናሙናዎች ያወዳድሩ።">Explore online or compare physical samples in our showroom.</p></div></li><li><span>02</span><div><h3 data-en="Bring your measurements" data-am="ልኬትዎን ይዘው ይምጡ">Bring your measurements</h3><p data-en="Note the width and height of each window, or ask our showroom team for guidance." data-am="የእያንዳንዱን መስኮት ስፋትና ቁመት ይያዙ ወይም የሾውሩም ባለሙያዎቻችንን ይጠይቁ።">Note the width and height of each window, or ask our showroom team for guidance.</p></div></li><li><span>03</span><div><h3 data-en="Ask for your price" data-am="ዋጋዎን ይጠይቁ">Ask for your price</h3><p data-en="Mention the fabric code and our team will prepare your tailored price." data-am="የጨርቁን ኮድ ይጥቀሱ፤ ቡድናችንም ለእርስዎ የተዘጋጀ ዋጋ ይሰጣል።">Mention the fabric code and our team will prepare your tailored price.</p></div></li></ol></section>

    <section class="showroom-cta"><img src="../assets/partners/${slug}/logo.${logoExt}" alt="${name}"><div><p data-en="AVAILABLE THROUGH ${nameUpper}" data-am="በ${name} ይገኛል">AVAILABLE THROUGH ${nameUpper}</p><h2 data-en="Found a fabric<br><em>you love?</em>" data-am="የወዱትን ጨርቅ<br><em>አግኝተዋል?</em>">Found a fabric<br><em>you love?</em></h2><span data-en="Call our showroom with its code for current availability and a tailored price." data-am="የጨርቁን ኮድ ይዘው ይደውሉ፤ ክምችቱን እናረጋግጥና ዋጋ እንሰጥዎታለን።">Call our showroom with its code for current availability and a tailored price.</span><div><a class="primary-button" href="tel:+251${phone}">${phoneFormatted} ↗</a>${whatsappCta}<a class="text-button" href="${maps}" target="_blank" rel="noopener noreferrer" data-en="Get directions ↗" data-am="አድራሻውን ይመልከቱ ↗">Get directions ↗</a></div></div></section>
  </main>

  <footer><img src="../assets/partners/${slug}/logo.${logoExt}" alt="${name}"><p data-en="Furniture and curtain solutions for a complete room." data-am="ለተሟላ ክፍል የቤት ዕቃና የመጋረጃ አማራጮች።">Furniture and curtain solutions for a complete room.</p><div><a href="tel:+251${phone}">${phoneFormatted}</a>${whatsappFooter}<a href="${maps}" target="_blank" rel="noopener noreferrer" data-en="Showroom directions ↗" data-am="የሾውሩም አድራሻ ↗">Showroom directions ↗</a></div><small>© 2026 ${name}</small></footer>

  <div class="mobile-actions"><a href="tel:+251${phone}" data-en="Call for price" data-am="ዋጋ ይጠይቁ">Call for price</a>${whatsappMobile}<a href="${maps}" target="_blank" rel="noopener noreferrer" data-en="Directions" data-am="አድራሻ">Directions</a></div>

  <dialog class="fabric-dialog"><button class="dialog-close" type="button" aria-label="Close">×</button><div class="dialog-image"><img src="" alt=""></div><div class="dialog-copy"><p class="dialog-code"></p><h2></h2><p class="dialog-description"></p><dl><div><dt data-en="Collection" data-am="ስብስብ">Collection</dt><dd class="dialog-collection"></dd></div><div><dt data-en="Works well in" data-am="የሚመችበት">Works well in</dt><dd class="dialog-use"></dd></div></dl><a class="primary-button dialog-call" href="tel:+251${phone}" data-en="Call for price ↗" data-am="ዋጋ ለመጠየቅ ይደውሉ ↗">Call for price ↗</a>${whatsappDialog}<span class="dialog-note" data-en="Mention this fabric code when you call." data-am="ሲደውሉ ይህን ጨርቅ ኮድ ይጥቀሱ።">Mention this fabric code when you call.</span></div></dialog>
  <script src="../partner-catalog.js"><\/script>
</body>
</html>`;

    // Create downloadable catalogue file
    const catalogueBlob = new Blob([catalogueHtml], { type: 'text/html' });
    const catalogueUrl = URL.createObjectURL(catalogueBlob);
    
    // Generate QR code
    const qrCanvas = document.createElement('canvas');
    const cataloguePageUrl = `${window.location.origin}/${slug}/`;
    
    if (typeof QRCode !== 'undefined') {
      await QRCode.toCanvas(qrCanvas, cataloguePageUrl, {
        width: 400,
        margin: 2,
        color: { dark: '#27251f', light: '#ffffff' }
      });
    }

    // Show result
    resultSection.hidden = false;
    document.getElementById('result-name').textContent = name;
    document.getElementById('result-info').innerHTML = `
      Catalogue URL: <strong>/${slug}/</strong><br>
      Phone: <strong>${phone}</strong> · WhatsApp: <strong>${whatsapp}</strong><br>
      Brand colour: <strong>${colour}</strong>
    `;

    // Setup download buttons
    document.getElementById('download-qr-btn').onclick = () => {
      const link = document.createElement('a');
      link.download = `${slug}-qr-code.png`;
      link.href = qrCanvas.toDataURL('image/png');
      link.click();
    };

    document.getElementById('copy-url-btn').onclick = () => {
      navigator.clipboard.writeText(cataloguePageUrl).then(() => {
        document.getElementById('copy-url-btn').textContent = 'Copied!';
        setTimeout(() => {
          document.getElementById('copy-url-btn').textContent = 'Copy catalogue URL';
        }, 2000);
      });
    };

    document.getElementById('view-catalogue-btn').href = `/${slug}/`;

    // Trigger catalogue download
    const link = document.createElement('a');
    link.download = `${slug}-catalogue.html`;
    link.href = catalogueUrl;
    link.click();

    showMessage(`Partner "${name}" created successfully! Download the catalogue file and place it in /${slug}/`, 'success');
    updatePartnersList();

  } catch (error) {
    showMessage('Error generating partner: ' + error.message, 'error');
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate partner catalogue';
  }
}

// Load existing partners
function updatePartnersList() {
  if (partners.length === 0) {
    partnersContainer.innerHTML = '<p style="color:var(--muted);font-size:14px;">No partners added yet.</p>';
    return;
  }

  partnersContainer.innerHTML = partners.map(p => `
    <div class="partner-row">
      <div style="width:48px;height:48px;background:var(--cream);display:flex;align-items:center;justify-content:center;font-weight:600;color:${p.colour};">${p.name.charAt(0)}</div>
      <div class="info">
        <strong>${p.name}</strong>
        <small>/${p.slug}/ · ${p.type} · Created ${new Date(p.createdAt).toLocaleDateString()}</small>
      </div>
      <a href="/${p.slug}/" target="_blank">View catalogue →</a>
    </div>
  `).join('');
}

// Initialize
updatePartnersList();
