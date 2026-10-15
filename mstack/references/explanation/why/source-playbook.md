# Source playbooks

The Why playbook investigates relevant evidence categories directly or with selective bounded delegation. Read only the source-specific reference for the stage/source being investigated below. These are concrete examples for common MCPs, not dependencies or a required fanout. Adapt them for a different available source in the same category.

Before using a tool-specific recipe, discover the actual tools and inspect their schemas. Tool names, arguments, SQL dialects, and column conventions below are examples: preserve the search strategy, query order, limits, and returned evidence fields while translating syntax to the real tools. Confirm access and schema rather than inventing results or assuming a configured server proves query access. An inaccessible relevant source is a reported gap, not permission to configure it, search unrelated systems, or substitute a different evidentiary claim. Keep all operations read-only; availability alone does not justify a search.

| Category                     | Playbook                                           | Example MCP it documents                                        |
| ---------------------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| Source control history       | [code-archaeology.md](sources/code-archaeology.md) | git, `gh`                                                       |
| Issue / ticket tracker       | [linear.md](sources/linear.md)                     | Linear (adapt for Jira, GitHub Issues, Plane, Shortcut)         |
| Long-form documents          | [notion.md](sources/notion.md)                     | Notion (adapt for Confluence, Google Docs, Coda)                |
| Real-time team chat          | [slack.md](sources/slack.md)                       | Slack (adapt for Discord, Microsoft Teams, Mattermost)          |
| Infrastructure observability | [datadog.md](sources/datadog.md)                   | Datadog (adapt for New Relic, Honeycomb, Grafana, Splunk)       |
| Error / exception tracking   | [sentry.md](sources/sentry.md)                     | Sentry (adapt for Rollbar, Bugsnag, Airbrake)                   |
| Product analytics warehouse  | [databricks.md](sources/databricks.md)             | Databricks SQL (adapt for Snowflake, BigQuery, ClickHouse, dbt) |

Cross-cutting:

- [incident-postmortem.md](sources/incident-postmortem.md). Add this if the target code looks defensive (null checks, retry, timeout, rate limit, feature flag, egress guard, OOM handler); run the relevant queries within the assigned source.
- For prior session evidence, read [history guidance](../../history.md) and the actual [host adapter](../../../SKILL.md#host-selection), not an assumed chat or database interface.
