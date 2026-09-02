const { supabase } = require('./db');
const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (!body) body = {};
    if (typeof body === 'string') body = JSON.parse(body);

    const { event_type, event_data, partner_slug } = body;

    if (!event_type) {
      return res.status(400).json({ error: 'Missing event_type' });
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

    const { error } = await supabase
      .from('events')
      .insert({
        partner_id,
        event_type,
        event_data,
        ip_hash
      });

    if (error) throw error;

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error('Events API error:', err.message);
    return res.status(500).json({ error: err.message || 'Failed to track event' });
  }
};
