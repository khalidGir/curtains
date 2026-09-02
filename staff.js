const quoteForm = document.querySelector('.quote-form');
const staffCodeInput = document.querySelector('#staff-code');
const fabricInput = document.querySelector('#fabric-search');
const widthInput = document.querySelector('#width-cm');
const heightInput = document.querySelector('#height-cm');
const quantityInput = document.querySelector('#quantity');
const calculateButton = document.querySelector('.calculate-button');
const resetButton = document.querySelector('.reset-button');
const formMessage = document.querySelector('.form-message');
const quoteResult = document.querySelector('.quote-result');
const resultAmount = document.querySelector('.result-amount');
const resultSummary = document.querySelector('.result-summary');
const modeButtons = document.querySelectorAll('[data-mode]');
const toggles = document.querySelectorAll('[data-toggle]');
let selectedMode = 'both';

const fabricPattern = /^(HB-1(?:0[1-9]|1[0-9]|20))(?:\s+—.*)?$/i;

function setMessage(message, success = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle('success', success);
}

function readFabricId() {
  const match = fabricInput.value.trim().match(fabricPattern);
  return match ? match[1].toUpperCase() : '';
}

function changeQuantity(amount) {
  const current = Number.parseInt(quantityInput.value, 10) || 1;
  quantityInput.value = Math.min(500, Math.max(1, current + amount));
}

document.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => changeQuantity(Number(button.dataset.step)));
});

modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    modeButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    selectedMode = button.dataset.mode;
  });
});

quoteForm.addEventListener('submit', async event => {
  event.preventDefault();
  setMessage('');
  quoteResult.hidden = true;

  const fabricId = readFabricId();
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
        widthCm: Number(widthInput.value),
        heightCm: Number(heightInput.value),
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
    resultSummary.innerHTML = `${fabricId} · ${widthInput.value} × ${heightInput.value} cm · ${quantityInput.value} window${Number(quantityInput.value) === 1 ? '' : 's'} · ${modeLabel}${breakdownHtml}`;
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
  quoteResult.hidden = true;
  setMessage('');
  fabricInput.focus();
});
