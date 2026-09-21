# Guided Curtain Builder — Prototype Notes

## Product goal

Help a showroom customer or sales partner make a complete curtain specification through five plain-language decisions, then review one final summary. The prototype intentionally excludes pricing and checkout.

## Flow

1. Window type
2. Design, hanging style, and length
3. Fabric and colour
4. Installation
5. Measurements
6. Review summary

Every step writes to local state immediately. Users can move backward without losing choices, resume after a refresh, and use Edit links in the running summary to jump to an earlier decision.

## Component structure

The prototype is vanilla HTML/CSS/JavaScript but follows these component boundaries:

- `BuilderShell`: header, progress, stage, navigation, and responsive layout.
- `StepNavigation`: five numbered progress buttons.
- `WindowTypeStep`: large visual cards for standard, sliding, bay, and corner windows.
- `DesignStep`: grouped cards for treatment, hanging style, and finished length.
- `FabricStep`: searchable-looking visual fabric cards backed by optimized catalog WebPs.
- `InstallationStep`: full service or supply-only selection.
- `MeasurementsStep`: width, height, and quantity inputs with plain-language guidance.
- `LivePreview`: swaps an existing optimized WebP when fabric changes and overlays the retained configuration as compact badges. It is deliberately not 3D.
- `RunningSummary`: always derived from current state, with Edit links for completed sections.
- `ReviewStep`: final specification, preview, and reserved pricing placeholder.
- `BuilderStorage`: localStorage persistence and safe restoration.

## State model

```js
{
  version: 1,
  currentStep: 1,
  windowType: null,
  design: {
    treatment: "layered",
    hangingStyle: "wave",
    length: "floor"
  },
  fabric: null,
  installation: null,
  measurements: {
    width: "",
    height: "",
    quantity: 1
  }
}
```

State is the single source of truth. Labels, preview badges, progress, and summaries are computed from it. No pricing data or business rules belong in this state.

## Prototype files

- `builder/index.html`
- `builder/builder.css`
- `builder/builder.js`

## Review questions before production integration

- Should the builder be public Habiba-branded, or injected into each white-label partner route?
- Which window types and heading styles are actually offered?
- Should measurements be optional for browsing customers but required for staff?
- Which preview WebPs should be professionally rendered for each treatment/style combination?
- What should the final action be: save a reference, WhatsApp the partner, or hand the configuration to staff?
