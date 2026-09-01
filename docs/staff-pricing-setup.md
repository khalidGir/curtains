# Habiba staff pricing setup

The staff calculator is intentionally unlinked from the public website and is marked `noindex`. Its URL is `/staff.html`.

## Required Vercel environment variables

- `STAFF_CALCULATOR_PIN`: the shared staff access code. Do not put this value in HTML, JavaScript, Git, or screenshots.
- `HABIBA_PRICING_CONFIG`: reserved for the approved server-side pricing configuration. Do not add this until the pricing basis and rules have been confirmed.

Set both values for Production, Preview, and Development as appropriate in the Vercel project settings. Local development should use `.env.local`, which is ignored by Git.

## Business information still required

- measurement unit and whether dimensions are opening or finished-curtain sizes
- pricing basis for each fabric
- fabric roll widths and usable widths
- fullness, hem, heading, pattern-repeat, and wastage rules
- lining, sheer, hardware, labour, delivery, and installation charges
- VAT, minimum charge, discount permissions, and final rounding rule
- meaning of quantity: identical windows, panels, or complete curtain sets

Use `pricing-admin.html` locally to assign every fabric to its current price tier and download `habiba-pricing-config.private.json`. The setup page and private JSON files are excluded from Vercel deployments. Paste the JSON content into the `HABIBA_PRICING_CONFIG` environment variable, then redeploy.

The current approved rules are: 2.5× fullness for both main fabric and sheer, 900 ETB/m sheer, 250 ETB per sewn fabric metre, 500 ETB/m rail, 800 ETB belts per window, 800 ETB belt holders per window, and an 800 ETB installation minimum covering four windows plus 200 ETB for each additional window. More than six windows or a height above the 280 cm fabric width requires a manual project quotation.
