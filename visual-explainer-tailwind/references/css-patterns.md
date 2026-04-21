# Tailwind + daisyUI Patterns

Reusable patterns for self-contained HTML diagrams that use Tailwind CSS and daisyUI from CDN.

## Theme Setup

Load Tailwind and daisyUI in every page unless the user asks otherwise.

```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css">
<link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<style type="text/tailwindcss">
  @theme {
    --font-sans: "IBM Plex Sans", system-ui, sans-serif;
    --font-mono: "IBM Plex Mono", monospace;
  }

  @layer components {
    .ve-shell { @apply min-h-screen bg-base-200 text-base-content; }
    .ve-card { @apply card border border-base-content/10 bg-base-100 shadow-sm; }
    .ve-card-body { @apply card-body; }
    .ve-label { @apply text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-primary; }
    .ve-kicker { @apply badge badge-outline badge-primary badge-sm font-mono; }
  }
</style>
```

Use a daisyUI theme that matches the page tone. Good defaults:

- `business`, `dim`, `night` for dark technical pages
- `corporate`, `winter`, `silk` for lighter editorial pages
- `dracula`, `forest`, `coffee` for stronger visual character

If theme should follow OS preference, set `data-theme` with a tiny script:

```html
<script>
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'business' : 'winter');
</script>
```

## Background Atmosphere

Tailwind utilities handle most atmosphere. Use one restrained background system, not five.

```html
<body class="ve-shell bg-base-200 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_30%)]">
```

For blueprint-style pages, layer a grid:

```html
<div class="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--color-base-content)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-base-content)_10%,transparent)_1px,transparent_1px)] [background-size:28px_28px]"></div>
```

## Card Components

Prefer daisyUI cards over bespoke wrappers.

```html
<section class="ve-card bg-base-100/92 backdrop-blur">
  <div class="card-body gap-4">
    <div class="ve-label">Gateway Layer</div>
    <h2 class="card-title text-2xl">Event Router</h2>
    <p class="max-w-prose text-base-content/70">Routes inbound messages to the right workflow.</p>
  </div>
</section>
```

Depth tiers:

- Hero: `bg-primary/8 border-primary/30 shadow-xl`
- Default: `bg-base-100 border-base-content/10 shadow-sm`
- Recessed: `bg-base-300/45 border-base-content/8 shadow-inner`

## Stats And KPI Rows

Use daisyUI `stats` for quick scannability.

```html
<div class="stats stats-vertical lg:stats-horizontal border border-base-content/10 bg-base-100 shadow-sm">
  <div class="stat">
    <div class="stat-title font-mono uppercase tracking-[0.2em]">Files Changed</div>
    <div class="stat-value text-primary">12</div>
    <div class="stat-desc">src + tests + docs</div>
  </div>
</div>
```

## Overflow Protection

This is still mandatory in Tailwind layouts.

- Put `min-w-0` on every grid or flex child that holds prose
- Put `overflow-x-auto` on wide table or code wrappers
- Use `break-words` on long prose blocks
- Use `whitespace-pre-wrap` for code that should preserve line breaks
- Do not use `flex` directly on list items when the marker is decorative; use `relative pl-4` and position the marker absolutely

Safe list pattern:

```html
<li class="relative pl-4 break-words">
  <span class="absolute left-0 top-0 text-primary">›</span>
  <code class="font-mono text-xs">resolveRoute()</code> picks the pipeline.
</li>
```

## Code Blocks

Use daisyUI `mockup-code` for short excerpts. Use bordered `<pre>` blocks for longer code.

```html
<div class="mockup-code border border-base-content/10 bg-base-300/50 text-sm">
  <pre data-prefix="$"><code>npm run build</code></pre>
  <pre data-prefix=">"><code>done in 1.2s</code></pre>
</div>

<pre class="overflow-x-auto rounded-box border border-base-content/10 bg-base-300/40 p-4 font-mono text-sm whitespace-pre-wrap break-words"><code>export function example() {
  return true;
}</code></pre>
```

## Data Tables

Use a real `<table>` with daisyUI table styling.

```html
<div class="overflow-x-auto rounded-box border border-base-content/10 bg-base-100">
  <table class="table table-zebra table-pin-rows">
    <thead>
      <tr>
        <th>Requirement</th>
        <th>Plan</th>
        <th>Status</th>
      </tr>
    </thead>
  </table>
</div>
```

Status language:

- Match: `badge badge-success badge-outline`
- Gap: `badge badge-error badge-outline`
- Partial: `badge badge-warning badge-outline`
- Info: `badge badge-info badge-outline`

## Mermaid Containers

Mermaid still needs a controlled shell.

```html
<section class="ve-card">
  <div class="card-body gap-4">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="ve-label">System Flow</p>
        <h2 class="card-title">Request Lifecycle</h2>
      </div>
      <div class="join">
        <button class="btn btn-sm join-item" data-zoom-out>-</button>
        <button class="btn btn-sm join-item" data-reset>100%</button>
        <button class="btn btn-sm join-item" data-zoom-in>+</button>
        <button class="btn btn-sm join-item" data-open>Open</button>
      </div>
    </div>
    <div class="diagram-shell overflow-hidden rounded-box border border-base-content/10 bg-base-200 p-4">
      <div class="mermaid-stage cursor-grab overflow-hidden rounded-xl bg-base-100 p-4">
        <div class="mermaid-canvas origin-top transition-transform duration-200"></div>
      </div>
    </div>
  </div>
</section>
```

## Mermaid Zoom Controls

Minimum interaction set:

- `+` and `-` buttons update `scale`
- `reset` returns to `scale = 1`, `x = 0`, `y = 0`
- drag to pan when scaled above `1`
- `open` launches the rendered SVG in a new tab

The active templates include a compact implementation. Reuse it wholesale instead of rewriting it every time.

## Prose Page Elements

Use prose as accent, not default mode.

Lead paragraph:

```html
<p class="max-w-3xl text-xl leading-8 text-base-content/75">
  The core change is simple: move expensive coordination behind a single durable queue.
</p>
```

Pull quote:

```html
<blockquote class="border-l-4 border-primary pl-6 text-2xl italic text-base-content/80">
  The plan is really a sequencing fix disguised as a refactor.
</blockquote>
```

Callout:

```html
<div class="alert alert-warning">
  <span>Rollback is cheap until the schema migration lands.</span>
</div>
```

Collapsible secondary detail:

```html
<div class="collapse collapse-arrow border border-base-content/10 bg-base-100">
  <input type="checkbox">
  <div class="collapse-title font-semibold">Detailed assumptions</div>
  <div class="collapse-content text-base-content/70">
    The queue contract assumes item IDs are globally unique.
  </div>
</div>
```
