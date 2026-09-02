const crypto = require('crypto');
const { supabase } = require('./db');

const fabricIds = new Set(Array.from({ length: 20 }, (_, index) => `HB-${index + 101}`));
const allowedFields = new Set(['fabricId', 'widthCm', 'heightCm', 'quantity']);

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(status).json(body);
}

function secureEqual(received, expected) {
  const receivedBuffer = Buffer.from(received || '');
  const expectedBuffer = Buffer.from(expected || '');
  if (receivedBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}

function finiteNumber(value, minimum, maximum) {
  return typeof value === 'number' && Number.isFinite(value) && value >= minimum && value <= maximum;
}

function readPricingConfiguration(rawConfiguration) {
  try {
    const configuration = JSON.parse(rawConfiguration);
    const rules = configuration.rules;
    if (!configuration || configuration.version !== 1 || !configuration.tiers || !configuration.fabricTiers || !rules) return null;
    const requiredRules = ['sheerRatePerMeter', 'fullnessPerLayer', 'fabricWidthCm', 'sewingPerFabricMeter', 'railPerMeter', 'standardBeltsPerWindow', 'beltHoldersPerWindow', 'installationBase', 'installationIncludedWindows', 'installationPerAdditionalWindow', 'projectWindowThreshold'];
    if (requiredRules.some(rule => !finiteNumber(rules[rule], 0, 1000000))) return null;
    return configuration;
  } catch {
    return null;
  }
}

function roundEtb(value) {
  return Math.round(value);
}

module.exports = function calculatePrice(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { message: 'Method not allowed.' });
  }

  const configuredCode = process.env.STAFF_CALCULATOR_PIN;
  if (!configuredCode) return send(res, 503, { message: 'Staff access is not configured yet.' });

  const authorization = req.headers.authorization || '';
  const receivedCode = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!secureEqual(receivedCode, configuredCode)) return send(res, 401, { message: 'The staff access code is incorrect.' });

  if (!req.headers['content-type']?.toLowerCase().startsWith('application/json')) {
    return send(res, 415, { message: 'A JSON request is required.' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return send(res, 400, { message: 'Invalid quote request.' });
  }
  if (Object.keys(body).some(field => !allowedFields.has(field))) {
    return send(res, 400, { message: 'Unexpected quote fields were rejected.' });
  }

  const fabricId = typeof body.fabricId === 'string' ? body.fabricId.toUpperCase() : '';
  if (!fabricIds.has(fabricId)) return send(res, 400, { message: 'Choose a valid Habiba fabric.' });
  if (!finiteNumber(body.widthCm, 1, 10000) || !finiteNumber(body.heightCm, 1, 10000)) {
    return send(res, 400, { message: 'Width and height must be between 1 and 10,000 cm.' });
  }
  if (!Number.isInteger(body.quantity) || body.quantity < 1 || body.quantity > 500) {
    return send(res, 400, { message: 'Quantity must be a whole number between 1 and 500.' });
  }

  const rawPricingConfiguration = process.env.HABIBA_PRICING_CONFIG;
  if (!rawPricingConfiguration) {
    return send(res, 503, { message: 'Pricing is not configured yet. Add the approved Habiba pricing rules before quoting.' });
  }
  const configuration = readPricingConfiguration(rawPricingConfiguration);
  if (!configuration) return send(res, 503, { message: 'The server pricing configuration is invalid.' });

  const rules = configuration.rules;
  if (body.quantity > rules.projectWindowThreshold) {
    return send(res, 200, { projectRequired: true, reason: 'This order requires a project quotation.' });
  }
  if (body.heightCm > rules.fabricWidthCm) {
    return send(res, 200, { projectRequired: true, reason: 'This curtain height requires manual fabric planning.' });
  }

  const tier = configuration.fabricTiers[fabricId];
  const mainRate = configuration.tiers[tier];
  if (!tier || !finiteNumber(mainRate, 0, 1000000)) {
    return send(res, 409, { message: 'This fabric has not been assigned a current price tier.' });
  }

  const widthMeters = body.widthCm / 100;
  const mainMeters = widthMeters * rules.fullnessPerLayer * body.quantity;
  const sheerMeters = widthMeters * rules.fullnessPerLayer * body.quantity;
  const totalFabricMeters = mainMeters + sheerMeters;
  const installation = rules.installationBase + Math.max(0, body.quantity - rules.installationIncludedWindows) * rules.installationPerAdditionalWindow;
  const total = roundEtb(
    mainMeters * mainRate +
    sheerMeters * rules.sheerRatePerMeter +
    totalFabricMeters * rules.sewingPerFabricMeter +
    widthMeters * body.quantity * rules.railPerMeter +
    body.quantity * rules.standardBeltsPerWindow +
    body.quantity * rules.beltHoldersPerWindow +
    installation
  );

  // Log quote to database (fire and forget)
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ip_hash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);

    supabase.from('quotes').insert({
      fabric_code: fabricId,
      width_cm: body.widthCm,
      height_cm: body.heightCm,
      quantity: body.quantity,
      total_price: total,
      currency: configuration.currency || 'ETB',
      ip_hash,
      user_agent: req.headers['user-agent']
    }).then(() => {}).catch(() => {});
  } catch (e) {
    // Silently fail - don't break pricing for analytics
  }

  return send(res, 200, { currency: configuration.currency || 'ETB', total, projectRequired: false });
};
