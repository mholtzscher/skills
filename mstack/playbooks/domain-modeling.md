# Domain modeling

Adapted from Matt Pocock's domain-modeling skill.

Read `GLOSSARY-MAP.md` when present to find bounded contexts; otherwise inspect the current context's `GLOSSARY.md`. Challenge overloaded terms and conflicts with established language. Prefer one precise name per concept. Cross-check claims against actual code and test edge-case scenarios that expose ambiguous ownership or relationships.

Use the host question tool for genuine domain decisions. Reuse settled answers from planning. When the requested work includes modeling, capture agreed terms as they crystallize in the appropriate glossary. Create a glossary lazily, not as a mandatory artifact for every task. In a read-only investigation, propose documentation changes rather than writing them.

A glossary contains domain concepts, not implementation notes or a task plan. Use the [record formats](../references/planning/domain-records.md).

Offer an ADR only for a decision that is hard to reverse, surprising without context, and the result of a real tradeoff. A short explanation of what was chosen and why is usually sufficient. Preserve existing numbering and record the decision's actual status.
