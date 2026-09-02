-- ============================================
-- Habiba Curtains Platform - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('furniture', 'interior', 'design', 'hospitality', 'retail')),
  phone TEXT NOT NULL,
  whatsapp TEXT,
  maps_url TEXT,
  brand_color TEXT NOT NULL DEFAULT '#f1a900',
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Staff users table
CREATE TABLE IF NOT EXISTS staff_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  pin_hash TEXT NOT NULL,
  role TEXT DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Fabrics reference table
CREATE TABLE IF NOT EXISTS fabrics (
  code TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_am TEXT NOT NULL,
  category TEXT NOT NULL,
  collection_en TEXT NOT NULL,
  collection_am TEXT NOT NULL,
  description_en TEXT,
  description_am TEXT,
  use_en TEXT,
  use_am TEXT,
  tier TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quotes table (for analytics and order tracking)
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_user_id UUID REFERENCES staff_users(id),
  partner_id UUID REFERENCES partners(id),
  fabric_code TEXT NOT NULL REFERENCES fabrics(code),
  width_cm DECIMAL(10,2) NOT NULL,
  height_cm DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_price DECIMAL(12,2),
  currency TEXT DEFAULT 'ETB',
  status TEXT DEFAULT 'quoted' CHECK (status IN ('quoted', 'viewed', 'converted', 'expired')),
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Page views table (analytics)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  page TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Custom events table (analytics)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quotes_partner ON quotes(partner_id);
CREATE INDEX IF NOT EXISTS idx_quotes_fabric ON quotes(fabric_code);
CREATE INDEX IF NOT EXISTS idx_quotes_created ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_partner ON page_views(partner_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_staff_partner ON staff_users(partner_id);

-- Row Level Security (RLS)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fabrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read access for fabrics (catalogue is public)
CREATE POLICY "Fabrics are viewable by everyone" ON fabrics
  FOR SELECT USING (true);

-- Public read access for active partners
CREATE POLICY "Partners are viewable by everyone" ON partners
  FOR SELECT USING (is_active = true);

-- Service role can do everything (bypass RLS)
CREATE POLICY "Service role full access" ON partners
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON staff_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON quotes
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON page_views
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON events
  FOR ALL USING (auth.role() = 'service_role');

-- Insert initial fabrics data
INSERT INTO fabrics (code, name_en, name_am, category, collection_en, collection_am, description_en, description_am, use_en, use_am, tier) VALUES
('HB-101', 'Silk Ivory', '瑪แล้วด้าน', 'sheer', 'Signature', 'Siqna', 'Elegant sheer silk', 'የስልክ ቀላል', 'Living room, bedroom', 'ሳሎን፣ መኝታ ክፍል', 'A'),
('HB-102', 'Linen Natural', 'ਲਿਨਿਨ', 'neutral', 'Essential', 'Itsqal', 'Natural linen blend', 'የተፈጥሮ ላይኑን', 'All rooms', 'ሁሉም ክፍሎች', 'B'),
('HB-103', 'Cotton White', '棉白', 'neutral', 'Essential', 'Itsqal', 'Pure cotton', 'ንጹህ ቦታ', 'Kitchen, bathroom', 'ኩሽና፣ መታጠቢያ ክፍል', 'A'),
('HB-104', 'Velvet Navy', '天鹅绒', 'blue', 'Premium', 'Premium', 'Rich velvet', 'ሀብታም ቮልเวት', 'Living room, study', 'ሳሎን፣ መጽሐፍ ክፍል', 'C'),
('HB-105', 'Satin Silver', '缎银', 'grey', 'Luxe', 'Lx', 'Luxurious satin', 'ቅንጦት ሳቲን', 'Bedroom, dining', 'መኝታ ክፍል፣ ምግብ ቤት', 'D'),
('HB-106', 'Sheer Crystal', '水晶纱', 'sheer', 'Signature', 'Siqna', 'Crystal sheer', 'ክሪስታል ቀላል', 'All rooms', 'ሁሉም ክፍሎች', 'A'),
('HB-107', 'Linen Grey', '亚麻灰', 'grey', 'Essential', 'Itsqal', 'Grey linen', 'ግራይ ላይኑን', 'Living room, bedroom', 'ሳሎን፣ መኝታ ክፍል', 'B'),
('HB-108', 'Cotton Blue', '棉蓝', 'blue', 'Essential', 'Itsqal', 'Blue cotton', 'ሰማያዊ ቦታ', 'Bedroom, kids room', 'መኝታ ክፍል፣ ህጻናት ክፍል', 'B'),
('HB-109', 'Velvet Emerald', '天鹅绒', 'pattern', 'Premium', 'Premium', 'Emerald velvet', 'የзум frameborder ቮልเวት', 'Living room, dining', 'ሳሎን፣ ምግብ ቤት', 'E'),
('HB-110', 'Satin Gold', '缎金', 'pattern', 'Luxe', 'Lx', 'Gold satin', 'ወርቅ ሳቲን', 'Bedroom, master suite', 'መኝታ ክፍል', 'F'),
('HB-111', 'Sheer Pearl', '珍珠纱', 'sheer', 'Signature', 'Siqna', 'Pearl sheer', 'እንatura ቀላል', 'Living room, dining', 'ሳሎን፣ ምግብ ቤት', 'A'),
('HB-112', 'Linen Beige', '亚麻米', 'neutral', 'Essential', 'Itsqal', 'Beige linen', 'ቤज ላይኑን', 'All rooms', 'ሁሉም ክፍሎች', 'B'),
('HB-113', 'Cotton Grey', '棉灰', 'grey', 'Essential', 'Itsqal', 'Grey cotton', 'ግራይ ቦታ', 'Office, living room', 'ቢሮ፣ ሳሎን', 'B'),
('HB-114', 'Velvet Burgundy', '天鹅绒', 'pattern', 'Premium', 'Premium', 'Burgundy velvet', 'ቡርጋንዲ ቮልเวት', 'Dining, study', 'ምግብ ቤት፣ መጽሐፍ ክፍል', 'D'),
('HB-115', 'Satin Rose', '缎粉', 'pattern', 'Luxe', 'Lx', 'Rose satin', ' ሮዝ ሳቲን', 'Bedroom, boudoir', 'መኝታ ክፍል', 'E'),
('HB-116', 'Sheer Mist', '薄雾纱', 'sheer', 'Signature', 'Siqna', 'Mist sheer', 'ጭviders ቀላል', 'All rooms', 'ሁሉም ክፍሎች', 'A'),
('HB-117', 'Linen Charcoal', '亚麻炭', 'grey', 'Essential', 'Itsqal', 'Charcoal linen', 'ቻርኮል ላይኑን', 'Office, study', 'ቢሮ፣ መጽሐፍ ክፍል', 'C'),
('HB-118', 'Cotton Navy', '棉深蓝', 'blue', 'Essential', 'Itsqal', 'Navy cotton', 'ነቭি ቦታ', 'Bedroom, living room', 'መኝታ ክፍል፣ ሳሎን', 'C'),
('HB-119', 'Velvet Charcoal', '天鹅绒', 'pattern', 'Premium', 'Premium', 'Charcoal velvet', 'ቻርኮል ቮልเวት', 'Living room, dining', 'ሳሎን፣ ምግብ ቤት', 'E'),
('HB-120', 'Satin Ivory', '缎象牙', 'pattern', 'Luxe', 'Lx', 'Ivory satin', 'እንatura ሳቲን', 'Bedroom, master suite', 'መኝታ ክፍል', 'F')
ON CONFLICT (code) DO NOTHING;

-- Insert Ararat partner
INSERT INTO partners (name, slug, type, phone, whatsapp, maps_url, brand_color, logo_url) VALUES
('Ararat Furniture', 'ararat', 'furniture', '+251960304444', '+251960304444', 'https://maps.app.goo.gl/hNPLcq3k5NiwD6JdA', '#f1a900', '/assets/partners/ararat/ararat-logo.jpg')
ON CONFLICT (slug) DO NOTHING;
