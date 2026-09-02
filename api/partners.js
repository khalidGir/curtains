const { supabase } = require('./db');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug, active } = req.query;

    let query = supabase.from('partners').select('*');

    if (slug) {
      query = query.eq('slug', slug);
    }

    if (active === 'true') {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query.order('name');

    if (error) throw error;

    return res.status(200).json({ partners: data });
  } catch (err) {
    console.error('Partners API error:', err);
    return res.status(500).json({ error: 'Failed to fetch partners' });
  }
};
