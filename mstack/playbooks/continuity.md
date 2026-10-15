# Continuity

Follow only the requested section. For pickup or pause, read [history guidance](../references/history.md) and the current [host adapter](../SKILL.md#host-selection).

## Recall

**Before you start or resume work, you rebuild the user's recent working context and hand back a tight capsule of where things stand now and what to do next.**

Keep it tight and on-topic. Read only what the in-scope threads need, then stop.

Your context lives in two records. Your own chat history holds what you did and decided. The shared record holds everything that happened around the same code under other names: the symptoms users keep reporting, the fixes that shipped and got reverted, the errors still firing in prod. That second record is what [Why](explanation.md#why) searches, across source control, the issue tracker, chat and issue channels, long-form docs, and error tracking. A feature with a long bug tail keeps most of its story there, so don't reconstruct it from your transcripts alone.

Use [history guidance](../references/history.md) and the actual [host history adapter](../SKILL.md#host-selection), not a hardcoded transcript directory or UUID path. Recall is bounded read-only research. It does not authorize integration setup, broad unrelated access, product changes, or external writes.

1. Classify, then route. One specific prior chat to resume is [Pickup](#pickup), not this. Turning habits into a durable skill belongs to separately approved [Author or Reflect](skill-development.md), not automatic workflow encoding. A human-readable activity summary is a different task. Recall loads working context across recent chats before you act. If the user already gave you a full state capsule (paths, branch, the change), use it and skip transcript mining. Still reconcile relevant current state and specific gaps as needed; a supplied capsule is not a reason for broad extra mining.
2. Lock the scope before searching. Pin the window ("recent" is a real range, default the last 7 days), the topic if named, and the workspace (default the active one). State the scope back, including the actual date range. Never read another project's transcripts without being asked. Never quietly turn "all" into "recent N". If an all-history request needs bounded batches, preserve its full scope and report incomplete coverage rather than silently truncating it.
3. Search the relevant chat history. For one or two chats, search directly. For a bulky corpus, use selective bounded retrieval or delegated slices when useful, following [orchestration](../references/orchestration.md) and host-configured models rather than a fixed cheap-model fanout. Order candidates by real modification or update timestamps, never lexicographic session IDs. If timestamps are absent, disclose that chronological ordering is unverified. Filter by topic first, then read only matching chats and their relevant regions. Skip the current chat, its children, and obvious subagent, eval, and test noise. Preserve the same schema for direct and delegated work, one block per chat: **topic, the user's goal, decisions, open threads, struggles and corrections, and artifacts (PRs, tickets, branches)**. Cite each block's source session/entry IDs and dates. Keep raw bulk transcripts out of the lead's context when delegated; return concise findings and source pointers.
4. Sweep the shared record whenever the topic names a feature, file, subsystem, area, or bug. This is the default, not a judgment call, and "my work on X" does not exempt it. Follow Why's methods and [source-playbook index](../references/explanation/why/source-playbook.md), but steer the question from "why was this built this way" to "what's the current state, what's been tried and didn't hold, and what are users still reporting". Reuse adequate supplied evidence and search bounded relevant read-only sources. Investigate directly or delegate independent source slices when useful; history mining and independent shared-record searches can run in parallel. Inherit Why's confidence, contradiction, date, and coverage discipline. Empty searches are findings; distinguish searched-empty, unavailable, and intentionally unsearched sources with reasons. Skip an unavailable integration and say so rather than configuring it or claiming a negative result. Fold what comes back into the brief. Pure activity recall with no named target ("what did I do this week") skips this sweep; history and live state are then the entire answer.
5. Verify against live state. Take the PRs, branches, and tickets that the mining and sweep surfaced and check them through actual available read-only tools, such as Git, authenticated GitHub tools, or the relevant ticket interface. Report unavailable checks and label last-known state rather than treating stale records as current. When the answer hinges on what an agent actually did (the tools it ran, files it read, errors it hit), read the full relevant transcript, not just a summary or trimmed local copy. A summary is not complete action history.
6. Write the brief to the contract below. Group by thread. Stay on the named topic. Preserve current settled decisions, identify superseded proposals, and keep approval and writer/process ownership boundaries visible where they affect the next move.

### Output contract

Lead with the capsule, then the thread status, then the problems, then the next move. Deeper detail goes below or gets cut.

- **Capsule.** At most 5 bullets. What this work is and where it stands overall: current goal, settled decisions, and completed or unresolved work.
- **Threads.** One line each, prefixed with exactly one status tag: `[merged #N]`, `[open PR #N]`, `[in flight <branch>]`, `[verified, uncommitted]`, `[reverted #N]`, or `[planned, not started]`. A thread with no tag is not done yet, so tag it. Use those tags only when supported. If status cannot be verified, use `[status unverified]` and name the last-known state and missing check. If the actual state is outside the list, use an honest actual-status tag such as `[closed, not merged #N]` instead of forcing a false state.
- **Problems.** At most 5, the recurring ones. Include the symptoms users keep reporting and any fix that shipped and was reverted, so the next attempt starts where the last one failed.
- **Next move.** The single most useful next action, concrete.

An adjacent feature or ticket stays out unless it blocks this one. When the capsule and thread lines outgrow a screen, cut detail before you cut threads. Write the brief through the local [prose cleanup pass](cleanup.md#prose-cleanup), preserving evidence uncertainty. Cite chat findings by session/entry ID and date, and shared-record findings by their source (PR number, ticket ID, chat permalink, error-tracker issue). Sanitize private context before any public output.

**Reply:** the brief, to the contract above. Stop there. Recall does not resume old commands, implement, publish, or encode preferences on inherited intent. Confirm applicable authorization and ownership before any subsequent execution.

## Catch up

Catch the user up on everything in this chat since the last message they wrote before this request, or the checkpoint they explicitly requested. Notifications and subagent results are not their messages. Write in a plain human voice, simply and concisely, without jargon. This is not a restatement of the prior assistant reply. Assume the user remembers their last message and nothing after it. Call each PR, branch, or agent by a name they would know, not by a label you invented during the work.

### Gather what changed

Keep this turn read-only, except for reply visuals drawn from evidence you already have. Do not change code, start an app or a job, or post anything to make them. Do not make product or external-system writes or create new executable artifacts. Collect your own work since that message, reports from subagents, and messages from anyone else in this chat. Use actual results, not the intended plan as proof of completion.

Check the current state of each PR, CI run, or agent this chat touched through actual available read-only capabilities. Say which are still running and which you could not check. Distinguish verified current state, unavailable verification, and last-known state. A stale status or a completion notification is not proof of current child/process liveness. Pending CI is not green CI; a successful run does not prove all required checks passed when the required set is unknown. Do not invent a host status operation or start a job to obtain a fresher result.

An action item is a decision or step only the user can take, such as a product choice, an approval, an irreversible action, or access you lack. Include **all** items still waiting on the user, even ones raised before their last message. Work you can still do yourself is not an action item.

### Write the reply

Open with one sentence that says the exact number of action items, or that there are none. If nothing happened and nothing waits on the user, say so and stop.

Then say what happened, most important first. Give each result and what it means for the user. Skip steps that changed nothing. Name in one line any work left that you can do yourself, without starting it as part of this summary.

Then give each action item a short executive summary. Cover the decision to make, why it matters now, the options and what each costs, your recommendation, and what happens if the user does not answer. Supply enough context to decide without rereading the transcript or opening a link. If you do not know a part, say so instead of guessing. Link to the actual detail when there is one.

Show each action item as a before and after, side by side. For a choice, put the current state beside each option, or the options alone when there is no current state. Use existing real screenshots or a video when the change is visible. Otherwise use another artifact, such as a table of numbers, a diff, or a diagram. If no visual exists yet, make a reply visual from existing evidence, such as an inline comparison table or Mermaid diagram. If you cannot, say plainly that none exists. If real screenshots or video are unavailable, say so and show allowed text or table evidence instead; do not start an app or job to capture them. Never invent a number, and never draw or generate a picture of a screen you did not capture. Link only artifacts that exist.

Prefer visuals to dense prose. Use a table, a Mermaid diagram, a chart, or an authorized conceptual image that does not pretend to be a captured screen. Reply visuals do not authorize project changes; code, HTML, or other project artifacts require separate approval under the existing [scope boundary](../SKILL.md#scope-and-approval). End with the summary, not execution of its action items or self-owned work.

## Pickup

Read the supplied handoff or relevant prior session. Reconstruct goal, approved design, scope, decisions, branches/PRs, checks, and unresolved work. Verify current Git state and published head instead of trusting a stale summary. Identify active writers/processes before taking ownership. Do not start another writer in a worktree still owned by an unconfirmed child.

Confirm the next task and applicable authority when the handoff is incomplete or consequential choices remain. Resume the relevant playbook from its unmet acceptance criterion, not from the beginning of an already-approved interview.

If the task has a decision trail, read its latest rows and follow [Decision trail](decision-trail.md) before appending. A pickup starts a new run and must identify the inherited rows rather than claiming them as its own.

## Pause

Stop launching new work. Ask running children to checkpoint/stop only through actual host controls, and verify the response where supported. If the host cannot stop them, record their IDs, ownership, and unknown state explicitly; do not claim the pause is complete.

Record goal, approvals, current branch/base/head, changed paths, child/process IDs, verification, published PR/check state, blockers, and the next concrete action. Use an existing task/spec record or a user-agreed handoff path. Preserve uncommitted work; do not commit or discard it merely to make a handoff tidy. Report what continues running and what the next operator must verify.

If the task produced a decision trail, include its canonical path and evidence pointers in the handoff. Follow [Decision trail](decision-trail.md) for the owner audit and Attention status, naming unavailable transcript evidence and incomplete review.
