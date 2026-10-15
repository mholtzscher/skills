# Domain record formats

Adapted from Matt Pocock's glossary and ADR formats.

## Glossary

```markdown
# Ordering

The context responsible for accepting and fulfilling orders.

## Language

**Order:** A customer's accepted request for specified goods.
_Avoid_: Purchase, transaction
```

Define project-specific concepts in one or two sentences. Choose canonical names and list meaningful alternatives to avoid. Group naturally related terms when useful. Keep general programming vocabulary and implementation detail out of the glossary.

For multiple contexts, `GLOSSARY-MAP.md` links their glossaries and briefly describes relationships and shared contracts. Preserve the repository's existing organization.

## ADR

Use the next available sequential filename under `docs/adr/`, such as `0004-event-delivery.md`.

```markdown
# Persist events before delivery

We write accepted events with the transaction and deliver them asynchronously.
This makes delivery retryable without losing committed changes. Consumers must
deduplicate events by identity.
```

Add status, rejected alternatives, or consequences only when they carry information needed by a future reader. Create directories only when there is a real record to write.
