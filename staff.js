const quoteForm = document.querySelector('.quote-form');
const staffCodeInput = document.querySelector('#staff-code');
const fabricInput = document.querySelector('#fabric-search');
const sheerFabricInput = document.querySelector('#sheer-fabric-search');
const sheerFabricField = document.querySelector('.sheer-fabric-field');
const widthInput = document.querySelector('#width-m');
const heightInput = document.querySelector('#height-m');
const quantityInput = document.querySelector('#quantity');
const calculateButton = document.querySelector('.calculate-button');
const resetButton = document.querySelector('.reset-button');
const formMessage = document.querySelector('.form-message');
const quoteResult = document.querySelector('.quote-result');
const resultAmount = document.querySelector('.result-amount');
const resultSummary = document.querySelector('.result-summary');
const resultBreakdownArea = document.querySelector('.result-breakdown-area');
const marginInput = document.querySelector('#margin-percent');
const partnerAmount = document.querySelector('.partner-amount');
const partnerMarginDetail = document.querySelector('.partner-margin-detail');
const modeButtons = document.querySelectorAll('[data-mode]');
const toggles = document.querySelectorAll('[data-toggle]');
let selectedMode = 'both';
let lastBaseTotal = 0;

const fabricPattern = /^(HB-1(?:0[1-9]|1[0-9]|20))(?:\s+—.*)?$/i;

function setMessage(message, success = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle('success', success);
}

function readFabricId() {
  const match = fabricInput.value.trim().match(fabricPattern);
  return match ? match[1].toUpperCase() : '';
}

function readSheerFabricId() {
  const match = sheerFabricInput.value.trim().match(fabricPattern);
  return match ? match[1].toUpperCase() : '';
}

function updateSheerField() {
  const show = selectedMode === 'both' || selectedMode === 'shear-only';
  sheerFabricField.hidden = !show;
  sheerFabricInput.required = show;
}

function changeQuantity(amount) {
  const current = Number.parseInt(quantityInput.value, 10) || 1;
  quantityInput.value = Math.min(500, Math.max(1, current + amount));
}

function updatePartnerPrice() {
  const margin = Number.parseFloat(marginInput.value) || 0;
  const partnerTotal = Math.round(lastBaseTotal * (1 + margin / 100));
  const markup = partnerTotal - lastBaseTotal;
  partnerAmount.textContent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(partnerTotal);
  if (margin > 0 && lastBaseTotal > 0) {
    partnerMarginDetail.textContent = `+${new Intl.NumberFormat('en-US').format(markup)} ETB (${margin}%)`;
  } else {
    partnerMarginDetail.textContent = lastBaseTotal > 0 ? 'No markup applied' : '';
  }
}

document.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => changeQuantity(Number(button.dataset.step)));
});

modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    modeButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    selectedMode = button.dataset.mode;
    updateSheerField();
  });
});

marginInput.addEventListener('input', updatePartnerPrice);

quoteForm.addEventListener('submit', async event => {
  event.preventDefault();
  setMessage('');
  quoteResult.hidden = true;

  const fabricId = readFabricId();
  const sheerFabricId = readSheerFabricId();
  if (!staffCodeInput.value.trim()) {
    setMessage('Enter the staff access code.');
    staffCodeInput.focus();
    return;
  }
  if (!fabricId) {
    setMessage('Choose a valid fabric from the list.');
    fabricInput.focus();
    return;
  }
  if ((selectedMode === 'both' || selectedMode === 'shear-only') && !sheerFabricId) {
    setMessage('Choose a sheer fabric.');
    sheerFabricInput.focus();
    return;
  }
  if (!quoteForm.reportValidity()) return;

  calculateButton.disabled = true;
  calculateButton.firstChild.textContent = 'Calculating… ';

  try {
    const response = await fetch('/api/calculate-price', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${staffCodeInput.value.trim()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fabricId,
        sheerFabricId: (selectedMode === 'both' || selectedMode === 'shear-only') ? sheerFabricId : '',
        widthM: Number(widthInput.value),
        heightM: Number(heightInput.value),
        quantity: Number(quantityInput.value),
        fabricMode: selectedMode,
        includeSewing: toggles[0].checked,
        includeRail: toggles[1].checked,
        includeBelts: toggles[2].checked,
        includeHolders: toggles[3].checked,
        includeInstallation: toggles[4].checked
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'Could not calculate this quote.');

    if (data.projectRequired) {
      resultAmount.textContent = 'PROJECT';
      resultSummary.textContent = `${data.reason} Ararat staff should request an internal project price.`;
      quoteResult.hidden = false;
      setMessage('Manual project quotation required.');
      quoteResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    resultAmount.textContent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(data.total);
    lastBaseTotal = data.total;

    let breakdownHtml = '';
    if (data.breakdown) {
      breakdownHtml = '<div class="price-breakdown">';
      for (const [key, item] of Object.entries(data.breakdown)) {
        const detail = item.meters !== undefined
          ? `${item.meters.toFixed(1)}m`
          : item.count !== undefined
            ? `×${item.count}`
            : '';
        breakdownHtml += `<div class="breakdown-row"><span>${item.label}</span><span>${detail}</span><strong>${new Intl.NumberFormat('en-US').format(item.cost)}</strong></div>`;
      }
      breakdownHtml += '</div>';
    }

    const modeLabel = data.fabricMode === 'main-only' ? 'Main only' : data.fabricMode === 'shear-only' ? 'Sheer only' : 'Both layers';
    const fabricLabel = data.fabricMode === 'both'
      ? `${fabricId} + ${sheerFabricInput.value.trim().split(' — ')[0] || sheerFabricId}`
      : data.fabricMode === 'shear-only'
        ? sheerFabricId
        : fabricId;
    resultSummary.innerHTML = `${fabricLabel} · ${widthInput.value} × ${heightInput.value} m · ${quantityInput.value} window${Number(quantityInput.value) === 1 ? '' : 's'} · ${modeLabel}`;
    resultBreakdownArea.innerHTML = breakdownHtml;
    updatePartnerPrice();
    quoteResult.hidden = false;
    setMessage('Price calculated securely.', true);
    quoteResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (error) {
    setMessage(error.message);
  } finally {
    calculateButton.disabled = false;
    calculateButton.firstChild.textContent = 'Calculate price ';
  }
});

resetButton.addEventListener('click', () => {
  const retainedStaffCode = staffCodeInput.value;
  quoteForm.reset();
  staffCodeInput.value = retainedStaffCode;
  quantityInput.value = '1';
  marginInput.value = '0';
  lastBaseTotal = 0;
  quoteResult.hidden = true;
  setMessage('');
  fabricInput.focus();
});
