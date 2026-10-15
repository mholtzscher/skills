# Slack Conversations

## How to search it

Slack MCP tools vary. Discover which relevant team-chat tools are actually available and inspect their schemas first, following the [source-playbook guidance](../source-playbook.md). Authentication may be required (example: `mcp_auth`), but this investigation does not authorize configuring or changing authentication. If access is unavailable or authentication fails, stop and report the gap. Translate the following search patterns to the actual schema and keep them within the relevant project/topic and period.

1. **Author-bounded search.** Messages from the PR author around the PR merge date. Limits scope dramatically and often hits gold.
2. **PR URL search.** Slack often links PRs when they're reviewed or discussed. Search for the PR URL (or just `/pull/<number>`).
3. **Error string search.** If the code handles a specific error, search for the error string. Incident threads often surface.

## Common pitfalls

- **Channel archaeology limits.** Very old messages may be gone due to retention policies. If you can't find anything before a certain date, note the retention cliff.
- **Unsearched DMs.** Many decisions happen in DMs that aren't searchable. You'll miss them. That's a known limitation.
- **Speculative jokes as "decisions."** Slack is casual. "Lol just do the thing" isn't a decision, even if it preceded the commit. Look for considered discussion.
- **Context collapse in single messages.** Without the thread, a single message often reads differently than in context. Always fetch threads.
- **Auth failures.** If the MCP isn't authenticated, stop. Don't make up findings. Report that Slack wasn't searchable.
