# Visual evidence

Applies to visible output or interaction changes in CLI, TUI, web, desktop, mobile, and other rendered interfaces.

## Capture

- Capture screenshots of the changed states. Add a short video when the change involves an interaction, sequence, animation, progress display, or timing-dependent behavior. A static appearance or output-only change can use screenshots alone.
- For an existing interface, capture before and after states under comparable conditions when the baseline can run. Preserve a reproduced visual failure before applying the fix. If the baseline cannot be captured, explain why and retain the after evidence.
- Capture the real application. Read and use `agent-browser` for browser capture or `terminal-control` for CLI and TUI capture when available; otherwise use an available project-specific driver. Capture terminal rendering and interactions in a real terminal, including a PTY where behavior depends on it. Transcripts, test logs, mockups, and reconstructed screens do not replace captured media.
- Record the revision, command or interaction steps, relevant data, and viewport or terminal dimensions. Save evidence outside tracked source unless the repository has an artifact convention.
- Inspect screenshots and play back videos to check the claimed behavior, legibility, and start and end states. Exclude secrets and unrelated private content; disclose redaction or edits.
- Refresh media when the demonstrated behavior changes. Reuse an earlier capture only after confirming that behavior is unchanged; retain its captured revision and state its applicability to the delivered head.

## Include in the PR

Embed screenshots and attach or link playable videos. Caption each with the scenario, before or after state, captured revision, and observed result.

Publish through the repository's established attachment or artifact mechanism. Verify that each link opens the intended image or playable video with reviewers' access. Local paths are not PR attachments. Keep local originals until published evidence is verified; note artifact expiration. Creating a hosting destination or changing access requires user agreement.

Report unavailable capture, playback, upload, or reviewer access in Verification and the completion report. Preserve local artifacts and give their paths for handoff. Missing required media remains incomplete evidence.

Metadata-only rewrites use existing verified media for the PR revision. Report missing or stale captures without launching the application, recording new media, or uploading files.
