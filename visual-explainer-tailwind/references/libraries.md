# Libraries

Optional CDN libraries for Tailwind/daisyUI-based visual explainer pages.

## Tailwind CSS + daisyUI

Default stack for this fork:

```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css">
<link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

Use `@theme` and `@layer` inside `<style type="text/tailwindcss">` for page-local tokens and helpers.

### Good daisyUI primitives

- `card` for sections
- `stats` for KPI rows
- `badge` for status and metadata
- `table` for audits and comparison matrices
- `collapse` for secondary detail
- `menu` and `navbar` for section navigation
- `hero` for the page entry point
- `mockup-window` and `mockup-code` for code or UI previews

Avoid building generic div soup when a daisyUI primitive already fits.

## Mermaid.js

Use for flowcharts, sequence diagrams, ER diagrams, state machines, mind maps, class diagrams, and architecture overviews with meaningful edge routing.

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    flowchart: { useMaxWidth: false, htmlLabels: true, curve: 'basis' },
    themeVariables: {
      primaryColor: '#00000000',
      primaryTextColor: '#f5f5f5',
      primaryBorderColor: '#6b7280',
      lineColor: '#9ca3af',
      fontFamily: 'IBM Plex Sans, system-ui, sans-serif'
    }
  });
</script>
```

### Layout Direction: TD vs LR

- Prefer `flowchart TD` for anything non-trivial
- Use `flowchart LR` only for short 3-4 step flows
- If the graph needs more than 10-12 nodes, use a hybrid: simple Mermaid overview + Tailwind/daisyUI cards below

### Mermaid styling notes

- Keep node labels quoted when they contain punctuation
- Use `<br/>` for line breaks in flowcharts
- Do not define a page-level `.node` class; Mermaid uses it internally
- Style the container with Tailwind/daisyUI, then use scoped CSS for Mermaid SVG overrides when needed

## Chart.js

Use for dashboards and metric-heavy pages, not for simple counts.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Wrap charts in a `card` and keep the chart canvas inside a fixed-height container like `h-72`.

## anime.js

Optional for choreographed entrances. Most pages do not need it.

```html
<script src="https://cdn.jsdelivr.net/npm/animejs/lib/anime.min.js"></script>
```

Use only when a page has enough moving pieces to justify orchestration. Prefer CSS transitions and small Tailwind motion utilities first.

## Typography By Content Voice

Pick one pairing and commit.

- Technical: `IBM Plex Sans` + `IBM Plex Mono`
- Editorial: `Instrument Serif` + `JetBrains Mono`
- Bold/product: `Bricolage Grotesque` + `Fragment Mono`
- Friendly/systemic: `Plus Jakarta Sans` + `Azeret Mono`
- Dense ops page: `DM Sans` + `Fira Code`

Load fonts from Google Fonts in the page `<head>`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Do not default to Inter or generic system fonts as the main voice.
