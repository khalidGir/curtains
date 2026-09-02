const { supabase } = require('./db');
const crypto = require('crypto');

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return await getQuotes(req, res);
    }
    if (req.method === 'POST') {
      return await createQuote(req, res);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Quotes API error:', err.message, err.stack);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    return JSON.parse(req.body);
  }
  return {};
}

async function createQuote(req, res) {
  const body = parseBody(req);
  const { fabric_code, width_cm, height_cm, quantity, partner_slug, staff_user_id } = body;

  if (!fabric_code || !width_cm || !height_cm || !quantity) {
    return res.status(400).json({ error: 'Missing required fields', received: body });
  }

  let partner_id = null;
  if (partner_slug) {
    const { data: partner } = await supabase
      .from('partners')
      .select('id')
      .eq('slug', partner_slug)
      .single();
    if (partner) partner_id = partner.id;
  }

  const ip = req.headers['x-forwarded-for'] || 'unknown';
  const ip_hash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);

  const { data, error } = await supabase
    .from('quotes')
    .insert({
      fabric_code,
      width_cm,
      height_cm,
      quantity,
      partner_id,
      staff_user_id: staff_user_id || null,
      ip_hash,
      user_agent: req.headers['user-agent'] || ''
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error.message, error.details);
    return res.status(500).json({ error: error.message, details: error.details });
  }

  return res.status(201).json({ quote: data });
}

async function getQuotes(req, res) {
  const { partner_id, fabric_code, from, to, limit = 100 } = req.query;

  let query = supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(Number(limit) || 100);

  if (partner_id) query = query.eq('partner_id', partner_id);
  if (fabric_code) query = query.eq('fabric_code', fabric_code);
  if (from) query = query.gte('created_at', from);
  if (to) query = query.lte('created_at', to);

  const { data, error } = await query;
  if (error) throw error;

  return res.status(200).json({ quotes: data });
}
