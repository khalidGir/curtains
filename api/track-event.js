const { supabase } = require('./db');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
    }
    const { event_type, event_data, partner_slug } = body;

    if (!event_type) {
      return res.status(400).json({ error: 'Missing event_type' });
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
    console.error('Events API error:', err);
    return res.status(500).json({ error: 'Failed to track event' });
  }
};
