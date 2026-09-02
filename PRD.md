# Product Requirements Document
## Habiba Curtains — White-Label Curtain Platform

**Version:** 1.0
**Date:** September 2026
**Status:** Active Development

---

## 1. Executive Summary

Habiba Curtains is a white-label digital platform that enables furniture-showroom partners to offer made-to-measure curtains under their own brand. The platform provides a customer-facing fabric catalogue, a staff-only pricing calculator, and a portfolio showcase — all deployed as a static site on Vercel with serverless pricing logic.

**Target Market:** Furniture-showroom partners in Ethiopia (first partner: Ararat Furniture)

**Core Value Proposition:**
- Partners retain the customer relationship while offering premium curtain products
- QR-led showroom browsing replaces physical sample books
- Server-side pricing ensures consistent, private quotes
- Bilingual support (English / Amharic) serves the local market

---

## 2. Problem & Opportunity

### Current Pain Points
- Physical fabric sample books become outdated and expensive to produce
- Manual pricing calculations are inconsistent across staff members
- No digital presence for partner-branded curtain offerings
- Customers cannot browse fabrics independently in the showroom
- Quote turnaround time is slow — staff must call Habiba for every price

### Opportunity
- Digitize the showroom experience with QR-triggered fabric browsing
- Empower partner staff with instant, accurate pricing
- Scale to multiple partners without rebuilding the platform
- Build a premium brand presence in the Ethiopian home-furnishing market

---

## 3. Goals & Success Metrics

| Goal | Metric | Target |
|------|--------|--------|
| Partner onboarding | First partner live (Ararat Furniture) | Q3 2026 |
| Quote speed | Staff quote generation time | < 30 seconds |
| Customer engagement | Catalogue page views per showroom visit | > 3 pages |
| Pricing accuracy | Quote errors reported | 0 |
| Platform uptime | Vercel availability | 99.9% |
| Bilingual adoption | Amharic toggle usage | > 40% of sessions |

---

## 4. User Roles

### 4.1 Customer (Showroom Visitor)
- Browses fabric catalogue via QR code in partner showroom
- Views fabric details, collections, and suggested use cases
- Requests a consultation or calls for pricing
- Cannot access staff pricing tools

### 4.2 Staff (Partner Employee)
- Accesses staff-only pricing calculator with access code
- Enters fabric code, window dimensions, and quantity
- Receives instant price quote from server
- Escalates complex orders (>6 windows, non-standard heights) to project team

### 4.3 Admin (Habiba HQ)
- Manages pricing tiers and fabric-tier assignments via local admin tool
- Exports pricing configuration JSON for Vercel deployment
- Controls pricing rules (sheer rates, fullness, installation costs)

### 4.4 Partner (Furniture Showroom Owner)
- Receives white-label catalogue branded for their showroom
- Manages customer relationships independently
- Accesses project pricing for large orders

---

## 5. Feature Requirements

### 5.1 Marketing Website (`index.html`)

**Description:** Landing page introducing Habiba Curtains and driving consultation bookings.

**Requirements:**
- Hero section with product photography and primary CTA
- Fabric collection showcase (3 featured fabrics + link to full catalogue)
- "Our Process" section (3-step: Meet → Choose → Install)
- Consultation booking form (name, email, space description)
- Bilingual support (English / Amharic toggle)
- Responsive design (mobile-first)
- Social media links (Instagram, Facebook, TikTok)

**User Stories:**
- As a customer, I want to understand what Habiba offers in < 10 seconds
- As a customer, I want to switch between English and Amharic
- As a customer, I want to book a consultation without leaving the page

---

### 5.2 Fabric Catalogue (`catalog.html`)

**Description:** Interactive browseable catalogue of 20 curtain fabrics.

**Requirements:**
- Grid display of all 20 fabrics (HB-101 to HB-120)
- Filter by category: All, Warm Neutrals, Quiet Greys, Signature Blues, Patterns, Sheers
- Fabric detail dialog (modal) showing:
  - Fabric image (detail view)
  - Habiba code
  - Fabric name (bilingual)
  - Description (bilingual)
  - Collection name (bilingual)
  - Suggested use cases (bilingual)
  - "Call for price" CTA with phone number
- Bilingual support (English / Amharic)
- Lazy loading for images (performance)
- Keyboard accessible (tab navigation, Enter/Space to open detail)

**Fabric Data Model:**
```javascript
{
  code: 'HB-101',
  en: 'Pearl Dust',
  am: 'የዕንቁ ጭጋግ',
  cat: 'neutral',
  collection: 'Aster Neutrals',
  collectionAm: 'ሞቅ ያሉ ቀለሞች',
  desc: 'Softly mottled ivory with a discreet champagne glimmer.',
  descAm: 'ለስላሳ የዝሆን ጥርስ ቀለም ከቀላል የሻምፓኝ ነጸብራቅ ጋር።',
  use: 'Living rooms · Bedrooms',
  useAm: 'ሳሎን · መኝታ ቤት'
}
```

**User Stories:**
- As a customer, I want to browse all fabrics visually
- As a customer, I want to filter fabrics by color/style preference
- As a customer, I want to see fabric details and suggested rooms
- As a customer, I want to call for pricing with the fabric code ready

---

### 5.3 Projects Portfolio (`projects.html`)

**Description:** Showcase of completed and potential project types.

**Requirements:**
- Hero section: "Spaces of consequence" positioning
- Three project types with descriptions:
  1. Hospitality (double-height lobby curtains)
  2. Workplace (office vertical blinds)
  3. Residential (layered apartment curtains)
- Completed residential work gallery (5 images with captions)
- Commercial delivery workflow (4 phases: Survey → Sampling → Production → Handover)
- CTA for project inquiries
- Bilingual support

**User Stories:**
- As a partner, I want to show customers what Habiba can deliver
- As a commercial client, I want to understand the project process
- As a customer, I want to see completed residential work

---

### 5.4 Staff Pricing Calculator (`staff.html`)

**Description:** Private tool for partner staff to generate instant price quotes.

**Requirements:**
- Access control via staff code (password field)
- Fabric selection via searchable input with datalist
- Window dimensions input (width cm, height cm)
- Quantity selector with +/- controls (1-500 windows)
- Server-side price calculation via `/api/calculate-price`
- Result display showing:
  - Total price in ETB (Ethiopian Birr)
  - Fabric code, dimensions, quantity summary
  - "PROJECT" flag for orders requiring manual quotation
- Reset functionality (retains staff code)
- Security features:
  - `noindex, nofollow, noarchive` meta tags
  - `no-store` cache control
  - `no-referrer` policy
  - Bearer token authentication

**User Stories:**
- As staff, I want to quickly price a standard curtain order
- As staff, I want to know when an order needs project-level pricing
- As staff, I want to retain my access code between quotes

---

### 5.5 Pricing Admin Tool (`pricing-admin.html`)

**Description:** Local-only tool for Habiba HQ to configure pricing rules.

**Requirements:**
- Tier rate configuration (6 tiers: A-F, default rates 900-1800 ETB/m)
- Fabric-tier assignment (20 fabrics, each assigned to a tier)
- Progress tracker (X/20 assigned)
- Export button (enabled only when all fabrics assigned)
- Downloads JSON config file: `habiba-pricing-config.private.json`
- Fixed pricing rules panel:
  - Sheer rate: 900 ETB/m
  - Fullness: 2.5x per layer
  - Fabric width: 280cm
  - Project threshold: >6 windows
- **Excluded from Vercel deployment** (local-only tool)

**Exported Configuration Schema:**
```json
{
  "version": 1,
  "currency": "ETB",
  "tiers": { "A": 900, "B": 1200, "C": 1300, "D": 1400, "E": 1600, "F": 1800 },
  "fabricTiers": { "HB-101": "A", "HB-102": "B", ... },
  "rules": {
    "sheerRatePerMeter": 900,
    "fullnessPerLayer": 2.5,
    "fabricWidthCm": 280,
    "sewingPerFabricMeter": 250,
    "railPerMeter": 500,
    "standardBeltsPerWindow": 800,
    "beltHoldersPerWindow": 800,
    "installationBase": 800,
    "installationIncludedWindows": 4,
    "installationPerAdditionalWindow": 200,
    "projectWindowThreshold": 6
  }
}
```

**User Stories:**
- As admin, I want to adjust tier rates without code changes
- As admin, I want to assign fabrics to tiers visually
- As admin, I want to export a private config for deployment

---

### 5.6 Pricing API (`/api/calculate-price`)

**Description:** Serverless function for secure price calculation.

**Endpoint:** `POST /api/calculate-price`

**Authentication:**
- Bearer token in `Authorization` header
- Compared against `STAFF_CALCULATOR_PIN` env var
- Timing-safe comparison to prevent timing attacks

**Request Body:**
```json
{
  "fabricId": "HB-101",
  "widthCm": 300,
  "heightCm": 250,
  "quantity": 4
}
```

**Validation Rules:**
- `fabricId`: Must be HB-101 to HB-120
- `widthCm`: 1-10,000 (number)
- `heightCm`: 1-10,000 (number)
- `quantity`: 1-500 (integer)
- Only allowed fields accepted (rejects unexpected fields)

**Pricing Calculation:**
```
mainMeters = widthMeters × fullnessPerLayer × quantity
sheerMeters = widthMeters × fullnessPerLayer × quantity
totalFabricMeters = mainMeters + sheerMeters

total = (mainMeters × tierRate)
      + (sheerMeters × sheerRatePerMeter)
      + (totalFabricMeters × sewingPerFabricMeter)
      + (widthMeters × quantity × railPerMeter)
      + (quantity × standardBeltsPerWindow)
      + (quantity × beltHoldersPerWindow)
      + installation
```

**Installation Calculation:**
```
installation = installationBase + max(0, quantity - installationIncludedWindows) × installationPerAdditionalWindow
```

**Response Codes:**
- `200`: Success with `{ total, currency, projectRequired: false }`
- `200`: Project required with `{ projectRequired: true, reason }`
- `400`: Invalid request (validation error)
- `401`: Incorrect staff code
- `405`: Method not allowed (non-POST)
- `409`: Fabric not assigned a tier
- `415`: Non-JSON content type
- `503`: Pricing not configured

**Project Escalation Triggers:**
- Quantity > `projectWindowThreshold` (6 windows)
- Height > `fabricWidthCm` (280cm) — requires manual fabric planning

**User Stories:**
- As staff, I want accurate pricing without calling Habiba
- As admin, I want pricing rules enforced server-side
- As the business, I want pricing logic hidden from customers

---

## 6. Technical Architecture

### 6.1 Deployment
- **Platform:** Vercel (static site + serverless functions)
- **Frontend:** Vanilla HTML/CSS/JavaScript (no framework)
- **API:** Node.js serverless function (`/api/calculate-price.js`)
- **Configuration:** Environment variables (`STAFF_CALCULATOR_PIN`, `HABIBA_PRICING_CONFIG`)

### 6.2 Security
- Staff pages: `noindex, nofollow, noarchive` + `no-store` cache
- API endpoints: `no-store` cache + `nosniff` + `no-referrer`
- Authentication: Bearer token with timing-safe comparison
- Pricing config: Never committed to repo (`.gitignore` excludes `.env`, `*.private.json`)
- Admin tool: Excluded from Vercel deployment (local-only)

### 6.3 Performance
- Lazy loading for catalogue images
- `fetchpriority="high"` for hero images
- Intersection Observer for scroll-triggered animations
- Minimal JavaScript (no framework overhead)

### 6.4 Accessibility
- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`)
- ARIA labels on interactive elements
- Keyboard navigation for catalogue cards
- `<dialog>` element for fabric detail modal
- `aria-live="polite"` for filter results

---

## 7. Data Model

### 7.1 Fabric Catalog
| Field | Type | Description |
|-------|------|-------------|
| code | string | Unique identifier (HB-101 to HB-120) |
| en | string | English name |
| am | string | Amharic name |
| cat | string | Category (neutral, grey, blue, pattern, sheer, etc.) |
| collection | string | English collection name |
| collectionAm | string | Amharic collection name |
| desc | string | English description |
| descAm | string | Amharic description |
| use | string | English suggested use cases |
| useAm | string | Amharic suggested use cases |

### 7.2 Pricing Configuration
| Field | Type | Description |
|-------|------|-------------|
| version | number | Config schema version (currently 1) |
| currency | string | Currency code (ETB) |
| tiers | object | Tier letter → rate per meter mapping |
| fabricTiers | object | Fabric code → tier letter mapping |
| rules | object | Pricing calculation rules |

### 7.3 Pricing Rules
| Rule | Default | Description |
|------|---------|-------------|
| sheerRatePerMeter | 900 | ETB per meter for sheer fabric |
| fullnessPerLayer | 2.5 | Fabric multiplier for fullness |
| fabricWidthCm | 280 | Standard fabric width in cm |
| sewingPerFabricMeter | 250 | ETB per meter for sewing labor |
| railPerMeter | 500 | ETB per meter for curtain rail |
| standardBeltsPerWindow | 800 | ETB per window for tieback belts |
| beltHoldersPerWindow | 800 | ETB per window for belt holders |
| installationBase | 800 | Base installation fee in ETB |
| installationIncludedWindows | 4 | Windows included in base fee |
| installationPerAdditionalWindow | 200 | ETB per additional window |
| projectWindowThreshold | 6 | Orders above this require project quote |

---

## 8. Bilingual Support

### Implementation
- HTML `data-en` and `data-am` attributes on translatable elements
- JavaScript `setLanguage()` function swaps `innerHTML` based on active language
- Language preference stored in `localStorage` (`habiba-language`)
- Toggle button in header and mobile nav

### Coverage
- All navigation labels
- Hero copy, section headings, body text
- Fabric names, descriptions, use cases
- Form labels and placeholders
- CTAs and button text

---

## 9. Roadmap

### Phase 1 — Current (v1.0)
- [x] Marketing website with bilingual support
- [x] Fabric catalogue (20 fabrics)
- [x] Projects portfolio
- [x] Staff pricing calculator
- [x] Pricing admin tool
- [x] Server-side pricing API
- [x] Vercel deployment

### Phase 2 — Partner Launch (v1.1)
- [ ] Partner-branded catalogue (custom logos, colors)
- [ ] QR code generation for showroom tables
- [ ] Partner-specific landing pages
- [ ] Partner access dashboard

### Phase 3 — Enhanced Experience (v1.2)
- [ ] Customer-facing pricing estimates (approximate)
- [ ] Fabric swatch ordering system
- [ ] Consultation booking with calendar integration
- [ ] Email/SMS quote delivery

### Phase 4 — Scale (v2.0)
- [ ] Multi-partner support
- [ ] Partner analytics dashboard
- [ ] Inventory/availability tracking
- [ ] Mobile app for staff
- [ ] Integration with partner POS systems

---

## 10. Non-Functional Requirements

### Performance
- Page load time < 3 seconds on 3G
- Image lazy loading for catalogue
- No render-blocking JavaScript

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigable
- Screen reader compatible
- Focus management in dialogs

### SEO
- Meta descriptions on all public pages
- Semantic HTML structure
- Open Graph tags (planned)

### Security
- No pricing data in client-side code
- Staff pages excluded from search engines
- API authentication required
- Environment variables for secrets

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome for Android)

---

## 11. Open Questions

1. **Partner branding:** How much customization per partner (logo only vs. full theme)?
2. **Customer registration:** Should customers create accounts for saved quotes?
3. **Payment integration:** Will online payment be required in future phases?
4. **Inventory sync:** Should fabric availability be real-time from Habiba stock?
5. **Analytics:** What metrics should be tracked per partner (views, quotes, conversions)?
6. **Support channel:** How will staff escalate complex orders (email, WhatsApp, internal tool)?
7. **Fabric updates:** How often will new fabrics be added to the catalogue?
8. **Pricing reviews:** How frequently should tier rates be reviewed/adjusted?

---

## Appendix A: File Structure

```
curtains/
├── api/
│   └── calculate-price.js    # Serverless pricing API
├── assets/
│   ├── brand/                 # Brand assets (logos, etc.)
│   └── images/                # Product and project images
├── docs/                      # Documentation
├── index.html                 # Marketing landing page
├── catalog.html               # Fabric catalogue
├── catalog.js                 # Catalogue logic
├── projects.html              # Projects portfolio
├── projects.js                # Projects page logic
├── staff.html                 # Staff pricing calculator
├── staff.js                   # Staff calculator logic
├── staff.css                  # Staff page styles
├── pricing-admin.html         # Local pricing admin tool
├── pricing-admin.js           # Admin tool logic
├── pricing-admin.css          # Admin tool styles
├── styles.css                 # Main stylesheet
├── script.js                  # Main page logic
├── vercel.json                # Vercel deployment config
├── .gitignore                 # Git ignore rules
├── .vercelignore              # Vercel ignore rules
└── README.md                  # Project documentation
```

## Appendix B: Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STAFF_CALCULATOR_PIN` | Staff access code for pricing API | Yes |
| `HABIBA_PRICING_CONFIG` | JSON pricing configuration (exported from admin tool) | Yes |

## Appendix C: Pricing Example

**Order:** 4 windows, HB-108 (Blue Nile Velvet, Tier B @ 1200 ETB/m), 300cm wide × 250cm high

```
Main fabric:    3.0m × 2.5 × 4 = 30.0m × 1,200 = 36,000 ETB
Sheer fabric:   3.0m × 2.5 × 4 = 30.0m ×   900 = 27,000 ETB
Sewing labor:   60.0m × 250 = 15,000 ETB
Rail:           3.0m × 4 × 500 =  6,000 ETB
Belts:          4 × 800 =  3,200 ETB
Belt holders:   4 × 800 =  3,200 ETB
Installation:   800 (base, 4 windows included) =    800 ETB
────────────────────────────────────────────────────
TOTAL:          91,200 ETB
```
