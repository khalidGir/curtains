# Curtains

White-label curtain catalogue and private pricing tools for Habiba Curtains' furniture-showroom partners.

## Current direction

- Partner-branded customer catalogues
- Furniture sellers retain the customer relationship
- QR-led showroom browsing
- Private staff pricing calculator
- Server-side pricing rules on Vercel
- No customer database in the initial release

The first partner experience is being prepared for Ararat Furniture.

## Local development

Serve the static site from the project directory:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

The local-only pricing tier manager is available at `pricing-admin.html`. It is excluded from Vercel deployments and exports private configuration that must never be committed.
