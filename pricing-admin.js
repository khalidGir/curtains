const fabrics = [
  ['HB-101','Pearl Dust'],['HB-102','Heritage Sand'],['HB-103','Cloud Ivory'],['HB-104','Ivory Relief'],['HB-105','Silver Canvas'],
  ['HB-106','Warm Maize'],['HB-107','Sage Bloom'],['HB-108','Blue Nile Velvet'],['HB-109','Moon Garden'],['HB-110','Indigo Impression'],
  ['HB-111','Silver Bouclé'],['HB-112','Dove Silk'],['HB-113','Platinum Veil'],['HB-114','Graphite Etching'],['HB-115','Stone Relief'],
  ['HB-116','Soft Chalk'],['HB-117','Charcoal Velvet'],['HB-118','Oyster Satin'],['HB-119','Lake Tana Lace'],['HB-120','Frosted Pearl']
];

const assignments = document.querySelector('.fabric-assignments');
const assignmentCount = document.querySelector('.assignment-count');
const exportButton = document.querySelector('.export-button');
const exportMessage = document.querySelector('.export-message');

assignments.innerHTML = fabrics.map(([code, name]) => `<label class="fabric-row"><span>${code}</span><strong>${name}</strong><select data-fabric="${code}" required><option value="">Unassigned</option>${['A','B','C','D','E','F'].map(tier => `<option value="${tier}">Tier ${tier}</option>`).join('')}</select></label>`).join('');

function updateProgress() {
  const selects = [...document.querySelectorAll('[data-fabric]')];
  const completed = selects.filter(select => select.value).length;
  assignmentCount.textContent = `${completed} / ${selects.length} assigned`;
  exportButton.disabled = completed !== selects.length;
  exportButton.textContent = completed === selects.length ? 'Download private config' : 'Assign all fabrics first';
  exportMessage.textContent = '';
}

function buildConfiguration() {
  const tiers = Object.fromEntries([...document.querySelectorAll('[data-tier-rate]')].map(input => [input.dataset.tierRate, Number(input.value)]));
  const fabricTiers = Object.fromEntries([...document.querySelectorAll('[data-fabric]')].map(select => [select.dataset.fabric, select.value]));
  return {
    version: 1,
    currency: 'ETB',
    tiers,
    fabricTiers,
    rules: {
      sheerRatePerMeter: 900,
      fullnessPerLayer: 2.5,
      fabricWidthCm: 280,
      sewingPerFabricMeter: 250,
      railPerMeter: 500,
      standardBeltsPerWindow: 800,
      beltHoldersPerWindow: 800,
      installationBase: 800,
      installationIncludedWindows: 4,
      installationPerAdditionalWindow: 200,
      projectWindowThreshold: 6
    }
  };
}

document.querySelectorAll('select,input').forEach(control => control.addEventListener('change', updateProgress));
exportButton.addEventListener('click', () => {
  const configuration = JSON.stringify(buildConfiguration(), null, 2);
  const blob = new Blob([configuration], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'habiba-pricing-config.private.json';
  link.click();
  URL.revokeObjectURL(url);
  exportMessage.textContent = 'Private configuration downloaded. Do not publish or commit this file.';
});

updateProgress();
