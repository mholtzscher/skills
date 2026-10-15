# Show me

Adapted from HumanLayer's show-me skill.

Skip the preamble. Pick the smallest view that makes the current point clear and place brief evidence beside it.

| Question                          | Useful view                                        |
| --------------------------------- | -------------------------------------------------- |
| Logic or algorithm                | Pseudocode                                         |
| Runtime control flow              | Call tree                                          |
| UI ownership and state            | Component tree with important hooks and boundaries |
| File/package responsibilities     | Shallow file tree                                  |
| Component interaction or sequence | Mermaid with labeled relationships                 |
| A change to an existing shape     | Focused diff of the relevant code, tree, or flow   |

For example, when the evidence establishes the change:

```diff
 on(save)
-  write content
+  if content is unchanged
+    return cached result
+  write content
+  invalidate cache
```

Use the complete target block when most of it is new, the user needs a copyable definition, or omitted context would conceal ownership or ordering. Keep actual names and distinguish a proposal from observed behavior.

For visual UI/layout comparisons or concepts too dense for a text diagram, use an available HTML/diagram specialist to create one focused, self-contained artifact. Use real product labels and data; show it with an available preview/review tool. If no preview tool exists, provide the artifact path and state that it has not been visually verified. An illustration does not substitute for a real screenshot when proving application behavior.

Use several views only when each answers a different question. The deliverable is understanding of the current topic, not implementation of the illustrated change.
