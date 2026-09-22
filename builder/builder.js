const routeParts = window.location.pathname.split('/').filter(Boolean);
const partnerSlug = routeParts[0] === 'builder' ? 'habiba' : (routeParts[0] || 'habiba');
const STORAGE_KEY = `${partnerSlug}-curtain-builder-v1`;

const steps = [
  { id: 1, short: 'Window', title: 'What kind of window are we dressing?' },
  { id: 2, short: 'Design', title: 'Choose how your curtains should look.' },
  { id: 3, short: 'Fabric', title: 'Choose the fabric and colour.' },
  { id: 4, short: 'Install', title: 'How would you like it installed?' },
  { id: 5, short: 'Measure', title: 'Add your window measurements.' }
];

const defaults = {
  version: 1,
  currentStep: 1,
  windowType: null,
  design: { treatment: 'layered', hangingStyle: 'wave', length: 'floor' },
  fabric: null,
  installation: null,
  measurements: { width: '', height: '', quantity: 1 }
};

const choices = {
  windowType: [
    ['standard', 'Standard window', 'One straight window on a flat wall.'],
    ['sliding', 'Sliding door', 'A wide opening that needs easy daily access.'],
    ['bay', 'Bay window', 'Three or more connected window sections.'],
    ['corner', 'Corner window', 'Windows that meet at the corner of a room.']
  ],
  treatment: [
    ['single', 'Single layer', 'One curtain layer.'],
    ['layered', 'Curtain + sheer', 'Privacy and softer daylight.'],
    ['sheer', 'Sheer only', 'Light, airy daytime coverage.']
  ],
  hangingStyle: [
    ['wave', 'Wave fold', 'Clean, even folds.'],
    ['pinch', 'Pinch pleat', 'Tailored, formal folds.'],
    ['eyelet', 'Eyelet', 'Relaxed and easy to slide.']
  ],
  length: [
    ['sill', 'To the sill', 'Ends at the window sill.'],
    ['floor', 'Just above floor', 'A clean everyday finish.'],
    ['puddle', 'Soft puddle', 'Extra length rests on the floor.']
  ],
  installation: [
    ['full', 'Measure & install for me', 'A professional measures, supplies, and installs everything.'],
    ['supply', 'Supply only', 'Curtains are prepared using the measurements you provide.']
  ]
};

const fabrics = [
  ['HB-101', 'Pearl Dust', 'Soft neutral', 'neutral'],
  ['HB-102', 'Heritage Sand', 'Warm pattern', 'neutral pattern'],
  ['HB-103', 'Cloud Ivory', 'Calm ivory', 'neutral'],
  ['HB-104', 'Ivory Relief', 'Textured ivory', 'neutral'],
  ['HB-105', 'Silver Canvas', 'Abstract silver', 'grey'],
  ['HB-106', 'Warm Maize', 'Soft warm yellow', 'neutral'],
  ['HB-107', 'Sage Bloom', 'Sage floral', 'pattern'],
  ['HB-108', 'Royal Blue Velvet', 'Royal blue', 'blue'],
  ['HB-109', 'Moon Garden', 'Silver pattern', 'grey pattern'],
  ['HB-110', 'Indigo Impression', 'Indigo pattern', 'blue pattern'],
  ['HB-111', 'Silver Bouclé', 'Textured grey', 'grey'],
  ['HB-112', 'Dove Silk', 'Dove grey', 'grey'],
  ['HB-113', 'Platinum Veil', 'Pale platinum', 'grey'],
  ['HB-114', 'Graphite Etching', 'Deep graphite', 'grey'],
  ['HB-115', 'Stone Relief', 'Stone texture', 'grey'],
  ['HB-116', 'Soft Chalk', 'Chalk white', 'neutral'],
  ['HB-117', 'Charcoal Velvet', 'Charcoal grey', 'grey'],
  ['HB-118', 'Oyster Satin', 'Oyster neutral', 'neutral'],
  ['HB-119', 'Botanical Lace', 'Blue botanical sheer', 'blue pattern'],
  ['HB-120', 'Frosted Pearl', 'Pearl grey', 'grey']
].map(([id, name, colour, categories]) => ({
  id,
  name,
  colour,
  categories,
  thumb: `/assets/images/catalog/${id}-thumb.webp`,
  image: `/assets/images/catalog/${id}-detail.webp`
}));

const optionImages = {
  windowType: {
    standard: '/assets/images/builder/window-standard.webp',
    sliding: '/assets/images/builder/window-sliding.webp',
    bay: '/assets/images/builder/window-bay.webp',
    corner: '/assets/images/builder/window-corner.webp'
  },
  installation: {
    full: '/assets/images/builder/installation-full.webp',
    supply: '/assets/images/builder/installation-supply.webp'
  }
};

const choiceImages = {
  treatment: {
    single: '/assets/images/builder/treatment-single.webp',
    layered: '/assets/images/builder/treatment-layered.webp',
    sheer: '/assets/images/builder/treatment-sheer.webp'
  },
  hangingStyle: {
    wave: '/assets/images/builder/style-wave.webp',
    pinch: '/assets/images/builder/style-pinch.webp',
    eyelet: '/assets/images/builder/style-eyelet.webp'
  },
  length: {
    sill: '/assets/images/builder/length-sill.webp',
    floor: '/assets/images/builder/length-floor.webp',
    puddle: '/assets/images/builder/length-puddle.webp'
  }
};

const panel = document.querySelector('#step-panel');
const stepNavigation = document.querySelector('.step-navigation');
const summaryList = document.querySelector('#summary-list');
const previewImage = document.querySelector('#preview-image');
const previewBadges = document.querySelector('#preview-badges');
const nextButton = document.querySelector('#next-button');
const backButton = document.querySelector('#back-button');
const validationMessage = document.querySelector('#validation-message');
const savedStatus = document.querySelector('#saved-status');

let state = restoreState();
applyFabricFromUrl();

function applyFabricFromUrl() {
  const requestedId = new URLSearchParams(window.location.search).get('fabric');
  const requestedFabric = fabrics.find(fabric => fabric.id === requestedId);
  if (requestedFabric && state.fabric?.id !== requestedFabric.id) {
    state.fabric = requestedFabric;
    state.currentStep = 3;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

function restoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.version !== 1) return structuredClone(defaults);
    return {
      ...structuredClone(defaults),
      ...saved,
      design: { ...defaults.design, ...saved.design },
      measurements: { ...defaults.measurements, ...saved.measurements }
    };
  } catch {
    return structuredClone(defaults);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  savedStatus.textContent = 'Saved just now';
  window.clearTimeout(saveState.timer);
  saveState.timer = window.setTimeout(() => { savedStatus.textContent = 'Saved on this device'; }, 1400);
}

function updateState(path, value) {
  if (path.includes('.')) {
    const [group, key] = path.split('.');
    state[group][key] = value;
  } else {
    state[path] = value;
  }
  validationMessage.textContent = '';
  saveState();
  render();
}

function labelFor(group, value) {
  if (!value) return 'Not chosen yet';
  const found = choices[group]?.find(item => item[0] === value);
  return found?.[1] || value;
}

function optionCards(group) {
  return `<div class="option-grid">${choices[group].map(([value, title, description]) => `
    <button class="option-card ${state[group] === value ? 'selected' : ''}" type="button" data-path="${group}" data-value="${value}">
      ${optionImages[group]
        ? `<img class="option-photo" src="${optionImages[group][value]}" alt="" width="520" height="320" loading="${group === 'windowType' && (value === 'standard' || value === 'sliding') ? 'eager' : 'lazy'}" decoding="async">`
        : '<span class="option-visual" aria-hidden="true"></span>'}
      <span class="option-copy"><strong>${title}</strong><small>${description}</small></span>
      <span class="option-check">✓</span>
    </button>`).join('')}</div>`;
}

function choiceGroup(group, title) {
  return `<section class="choice-group"><h2>${title}</h2><div class="choice-row">${choices[group].map(([value, name, description]) => `
    <button class="choice-chip ${state.design[group] === value ? 'selected' : ''}" type="button" data-path="design.${group}" data-value="${value}">
      <img src="${choiceImages[group][value]}" alt="" width="420" height="250" loading="lazy" decoding="async">
      <span class="choice-copy"><strong>${name}</strong><small>${description}</small></span>
      <span class="choice-check" aria-hidden="true">✓</span>
    </button>`).join('')}</div></section>`;
}

function renderStep() {
  const step = state.currentStep;
  if (step === 1) panel.innerHTML = `<p class="step-kicker">STEP 1 OF 5 · WINDOW TYPE</p><h1>${steps[0].title}</h1><p class="step-intro">Choose the closest match. You can change this later without losing your other selections.</p>${optionCards('windowType')}`;
  if (step === 2) panel.innerHTML = `<p class="step-kicker">STEP 2 OF 5 · DESIGN</p><h1>${steps[1].title}</h1><p class="step-intro">Start with the feeling you want. These choices stay together as you compare fabrics.</p>${choiceGroup('treatment', 'Layers')}${choiceGroup('hangingStyle', 'Hanging style')}${choiceGroup('length', 'Finished length')}`;
  if (step === 3) panel.innerHTML = `<p class="step-kicker">STEP 3 OF 5 · FABRIC & COLOUR</p><h1>${steps[2].title}</h1><p class="step-intro">Search or filter all ${fabrics.length} fabrics. Thumbnails stay lightweight; the larger texture loads only after selection.</p>
    <div class="fabric-tools"><label><span>Search fabrics</span><input id="fabric-search" type="search" placeholder="Name, code or colour" autocomplete="off"></label><div class="fabric-filters" role="group" aria-label="Filter fabrics">${['all', 'neutral', 'grey', 'blue', 'pattern'].map(filter => `<button type="button" data-fabric-filter="${filter}" class="${filter === 'all' ? 'active' : ''}">${filter[0].toUpperCase() + filter.slice(1)}</button>`).join('')}</div></div>
    <p class="fabric-count" id="fabric-count">Showing all ${fabrics.length} fabrics</p><div class="fabric-grid">${fabrics.map((fabric, index) => `
    <button class="fabric-option ${state.fabric?.id === fabric.id ? 'selected' : ''}" type="button" data-fabric="${fabric.id}" data-search="${`${fabric.id} ${fabric.name} ${fabric.colour}`.toLowerCase()}" data-categories="${fabric.categories}">
      <img src="${fabric.thumb}" alt="${fabric.name} fabric" width="720" height="960" loading="${index < 4 ? 'eager' : 'lazy'}" decoding="async"><span><strong>${fabric.name}</strong><small>${fabric.id} · ${fabric.colour}</small></span>
    </button>`).join('')}</div>`;
  if (step === 4) panel.innerHTML = `<p class="step-kicker">STEP 4 OF 5 · INSTALLATION</p><h1>${steps[3].title}</h1><p class="step-intro">Choose the level of help you need. Pricing will be introduced only after this experience is approved.</p>${optionCards('installation')}`;
  if (step === 5) panel.innerHTML = `<p class="step-kicker">STEP 5 OF 5 · MEASUREMENTS</p><h1>${steps[4].title}</h1><p class="step-intro">Use metres. An approximate size is fine for this prototype; a professional measure can still be selected.</p>
    <div class="measurement-grid">
      <div class="measurement-field"><label for="width">Window width</label><div class="measurement-input"><input id="width" type="number" min="0.3" max="20" step="0.01" inputmode="decimal" value="${state.measurements.width}" placeholder="2.00"><span>metres</span></div></div>
      <div class="measurement-field"><label for="height">Window height</label><div class="measurement-input"><input id="height" type="number" min="0.3" max="20" step="0.01" inputmode="decimal" value="${state.measurements.height}" placeholder="2.80"><span>metres</span></div></div>
      <div class="measurement-field"><label for="quantity">How many?</label><div class="measurement-input"><input id="quantity" type="number" min="1" max="100" step="1" inputmode="numeric" value="${state.measurements.quantity}"><span>windows</span></div></div>
    </div><p class="measurement-help"><strong>Measure the full opening.</strong> Enter the widest and tallest points. Final production measurements should still be confirmed before an order is placed.</p>`;
  if (step === 6) renderReview();
}

function renderReview() {
  const items = summaryItems();
  panel.innerHTML = `<p class="step-kicker">YOUR CURTAIN DESIGN · READY TO REVIEW</p><h1>Everything in one place.</h1><p class="step-intro">Check each choice below. Nothing is sent or priced yet.</p><div class="review-card">${items.map(item => `
    <div class="review-item"><span>${item.title}</span><strong>${item.value}</strong><button type="button" data-edit="${item.step}">Edit</button></div>`).join('')}</div>
    <div class="review-price"><span>PRICE PLACEHOLDER</span><strong>Pricing will be added after the builder flow is approved.</strong></div>`;
}

function summaryItems() {
  const measurement = state.measurements.width && state.measurements.height
    ? `${state.measurements.width} m × ${state.measurements.height} m · ${state.measurements.quantity} window${Number(state.measurements.quantity) === 1 ? '' : 's'}`
    : 'Not added yet';
  return [
    { title: 'Window', value: labelFor('windowType', state.windowType), step: 1 },
    { title: 'Design', value: `${labelFor('treatment', state.design.treatment)} · ${labelFor('hangingStyle', state.design.hangingStyle)} · ${labelFor('length', state.design.length)}`, step: 2 },
    { title: 'Fabric', value: state.fabric ? `${state.fabric.name} · ${state.fabric.id}` : 'Not chosen yet', step: 3 },
    { title: 'Installation', value: labelFor('installation', state.installation), step: 4 },
    { title: 'Measurements', value: measurement, step: 5 }
  ];
}

function isStepComplete(step) {
  if (step === 1) return Boolean(state.windowType);
  if (step === 2) return Object.values(state.design).every(Boolean);
  if (step === 3) return Boolean(state.fabric);
  if (step === 4) return Boolean(state.installation);
  if (step === 5) return Number(state.measurements.width) > 0 && Number(state.measurements.height) > 0 && Number(state.measurements.quantity) > 0;
  return true;
}

function renderNavigation() {
  stepNavigation.innerHTML = steps.map(step => `<button class="step-tab ${state.currentStep === step.id ? 'active' : ''} ${isStepComplete(step.id) ? 'complete' : ''}" type="button" data-step="${step.id}"><b>${isStepComplete(step.id) ? '✓' : step.id}</b><span>${step.short}</span></button>`).join('');
}

function renderSummary() {
  summaryList.innerHTML = summaryItems().map(item => `<div class="summary-row"><div><span>${item.title}</span><strong>${item.value}</strong></div><button type="button" data-edit="${item.step}">Edit</button></div>`).join('');
}

function renderPreview() {
  if (state.fabric) {
    previewImage.src = state.fabric.image;
    previewImage.alt = `${state.fabric.name} curtain preview`;
  }
  const badges = [
    state.windowType && labelFor('windowType', state.windowType),
    labelFor('treatment', state.design.treatment),
    labelFor('hangingStyle', state.design.hangingStyle),
    labelFor('length', state.design.length),
    state.fabric?.name
  ].filter(Boolean);
  previewBadges.innerHTML = badges.map(label => `<span>${label}</span>`).join('');
}

function bindEvents() {
  panel.querySelectorAll('[data-path]').forEach(button => button.addEventListener('click', () => updateState(button.dataset.path, button.dataset.value)));
  panel.querySelectorAll('[data-fabric]').forEach(button => button.addEventListener('click', () => updateState('fabric', fabrics.find(fabric => fabric.id === button.dataset.fabric))));
  const fabricSearch = panel.querySelector('#fabric-search');
  const fabricFilters = panel.querySelectorAll('[data-fabric-filter]');
  let activeFabricFilter = 'all';
  const filterFabrics = () => {
    const query = fabricSearch?.value.trim().toLowerCase() || '';
    let visible = 0;
    panel.querySelectorAll('[data-fabric]').forEach(button => {
      const matchesQuery = !query || button.dataset.search.includes(query);
      const matchesFilter = activeFabricFilter === 'all' || button.dataset.categories.split(' ').includes(activeFabricFilter);
      button.hidden = !(matchesQuery && matchesFilter);
      if (!button.hidden) visible += 1;
    });
    const count = panel.querySelector('#fabric-count');
    if (count) count.textContent = visible === fabrics.length ? `Showing all ${fabrics.length} fabrics` : `${visible} fabric${visible === 1 ? '' : 's'} found`;
  };
  fabricSearch?.addEventListener('input', filterFabrics);
  fabricFilters.forEach(button => button.addEventListener('click', () => {
    activeFabricFilter = button.dataset.fabricFilter;
    fabricFilters.forEach(item => item.classList.toggle('active', item === button));
    filterFabrics();
  }));
  panel.querySelectorAll('[data-edit]').forEach(button => button.addEventListener('click', () => goToStep(Number(button.dataset.edit))));
  ['width', 'height', 'quantity'].forEach(key => {
    const input = panel.querySelector(`#${key}`);
    input?.addEventListener('input', event => {
      state.measurements[key] = event.target.value;
      saveState();
      renderSummary();
    });
  });
  document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => goToStep(Number(button.dataset.step))));
  document.querySelectorAll('[data-edit]').forEach(button => button.addEventListener('click', () => goToStep(Number(button.dataset.edit))));
}

function goToStep(step) {
  state.currentStep = Math.max(1, Math.min(6, step));
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderActions() {
  backButton.disabled = state.currentStep === 1;
  nextButton.hidden = state.currentStep === 6;
  nextButton.textContent = state.currentStep === 5 ? 'Review design →' : 'Continue →';
}

function render() {
  renderStep();
  renderNavigation();
  renderSummary();
  renderPreview();
  renderActions();
  bindEvents();
}

nextButton.addEventListener('click', () => {
  if (!isStepComplete(state.currentStep)) {
    validationMessage.textContent = state.currentStep === 5 ? 'Add width, height, and quantity to continue.' : 'Choose one option to continue.';
    return;
  }
  goToStep(state.currentStep + 1);
});

backButton.addEventListener('click', () => goToStep(state.currentStep - 1));

document.querySelector('#reset-builder').addEventListener('click', () => {
  state = structuredClone(defaults);
  localStorage.removeItem(STORAGE_KEY);
  render();
});

render();
