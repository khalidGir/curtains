const { supabase } = require('./db');

module.exports = async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        return await createQuote(req, res);
      case 'GET':
        return await getQuotes(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Quotes API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function createQuote(req, res) {
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  const { fabric_code, width_cm, height_cm, quantity, partner_slug, staff_user_id } = body;

  if (!fabric_code || !width_cm || !height_cm || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Get partner_id from slug if provided
  let partner_id = null;
  if (partner_slug) {
    const { data: partner } = await supabase
      .from('partners')
      .select('id')
      .eq('slug', partner_slug)
      .single();
    if (partner) partner_id = partner.id;
  }

  // Hash IP for uniqueness
  const crypto = require('crypto');
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
      staff_user_id,
      ip_hash,
      user_agent: req.headers['user-agent']
    })
    .select()
    .single();

  if (error) throw error;

  return res.status(201).json({ quote: data });
}

async function getQuotes(req, res) {
  const { partner_id, fabric_code, from, to, limit = 100 } = req.query;

  let query = supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (partner_id) {
    query = query.eq('partner_id', partner_id);
  }

  if (fabric_code) {
    query = query.eq('fabric_code', fabric_code);
  }

  if (from) {
    query = query.gte('created_at', from);
  }

  if (to) {
    query = query.lte('created_at', to);
  }

  const { data, error } = await query;

  if (error) throw error;

  return res.status(200).json({ quotes: data });
}
