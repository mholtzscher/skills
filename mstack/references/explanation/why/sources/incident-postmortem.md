# Incident & Postmortem Context

Apply only the recipe for the relevant assigned source, using tools discovered through the [source-playbook index](../source-playbook.md); these examples do not authorize cross-source expansion.

- **Linear**: look for tickets labeled `incident`, `sev-*`, `postmortem-action-item`, `reliability`
- **Slack**: search `#sev-*` and `#incident-*` channels around the dates the target code was added
- **Git**: commits with messages like "fix for incident", "add defensive check", "revert" followed by "re-apply with..." are strong signals
