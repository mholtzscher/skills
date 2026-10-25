# Show me

For an explicitly requested HTML explainer, including `big-pics-little-words`, follow [Big pictures, little words](#big-pictures-little-words). Otherwise follow [General visual explanation](#general-visual-explanation).

## General visual explanation

Help the user understand the current topic of conversation visually. Skip the preamble and keep prose brief. Pick the smallest view that makes the key point clear. For code, data, and flow views, reuse the components in [visual components](../../references/visual-components.md); its accuracy rules apply.

- Use `diff` in the shape that matches the topic: component, file-layout, call-tree, or control-flow. The catalog shows each form.
- Show the whole block when most of it is new, when omitted context would hide ownership or order, or when the user needs a copyable target shape:

```ts
function expandSkill(command: string): string {
  const skillName = command.slice(1);
  return `use the ${skillName} skill`;
}
```

### HTML presentation

- For a visual UI, layout, state comparison, or concept too dense for Mermaid, write one focused HTML file — a diagram, an infographic, or a short slide deck, whichever fits the point. Match the product's colors, type, spacing, and components; use real labels and data; support desktop and mobile. Then open it for the user:

Use an available preview or file-opening tool to open `path/to/show-me-{description}.html`. If opening is unavailable, provide the file path and say it has not been visually verified.

### guidance

Place each visual next to the short text it supports. Keep only the calls, files, props, states, and boundaries needed to answer the user's current question or the options to resolve the current discussion point.

Use only the formats the point needs.

## Big pictures, little words

Create an HTML explanation of the current discussion, led by large visuals and short text. Keep the key details and material caveats needed for an accurate understanding, even when the prose is brief.

Design the page for its subject. Add real-world pictures, icons, or other imagery selectively where they clarify the explanation.

Write for someone new to the subject. Use clear, concise, plain language and explain necessary technical terms. Favor literal explanations over strained metaphors.

Apply the styling, responsive-layout, and preview instructions in [HTML presentation](#html-presentation). This mode completes with the HTML artifact, its path, and its actual preview status.
