---
name: zellij-tasks
description: Manage long-running processes (dev servers, watchers, build processes, test runners, background jobs) using Zellij terminal multiplexer. Use whenever the user needs to start, monitor, restart, or organize persistent terminal tasks. Also use for running multiple dev servers in parallel (frontend + backend + db), keeping processes alive across disconnections, capturing logs from background processes, or managing any CLI task that should outlive the current shell session. Always prefer this skill over raw backgrounding (&, nohup) or tmux when Zellij is available.
---

# Zellij Task Manager

Manage long-running processes via the Zellij CLI. This skill assumes the agent can run shell commands. The agent may be inside a Zellij session or outside it — the commands below work in both cases.

## Prerequisites

- Zellij must be installed (`zellij --version`)
- If the agent is inside a Zellij session, the `ZELLIJ` env var is set. In that case, omit the `--session <name>` flag from commands.
- If outside a session, always use `--session <name>` to target a specific session.

## Naming Conventions

Consistent naming makes it easy to identify panes, tabs, and sessions when listing, filtering, and debugging.

| Scope | Format | Convention | Examples |
|-------|--------|------------|----------|
| **Session** | `kebab-case-{agent}` | Project or task group name suffixed with `-agent`. Short, no spaces, matches the repo or service identifier. The `-agent` suffix distinguishes agent-spawned sessions from manual ones. | `myproject-agent`, `docs-site-agent`, `nix-config-agent` |
| **Tab** | `kebab-case` | Service or subsystem within the project. One tab per concern. | `api`, `frontend`, `db`, `worker`, `admin-panel` |
| **Pane** | `kebab-case` | Specific process or tool. Include a verb when multiple panes run in the same tab. | `dev-server`, `test-watch`, `build`, `logs`, `linter` |

**Guidelines:**
- Always use kebab-case (lowercase, hyphens). Avoid spaces, underscores, and mixed case — these require quoting in shell commands and are harder to grep.
- A pane name should let you uniquely identify it from `list-panes` output at a glance.
- When a pane runs the same command as another pane (e.g., two test watchers), disambiguate with a suffix: `test-watch-api`, `test-watch-web`.

## Core Workflow

All operations target an existing session. The session is set up once, then panes and tabs are added within it.

---

### Setup: Ensure a session exists (one-time)

Before any commands, create a detached session in the background. If the session already exists, this is a no-op.

```bash
zellij attach -b -c <session-name>
```

- `-b` = create detached/background session
- `-c` = create if it does not exist (idempotent)
- Returns immediately; does not block.

**Do this once per session.** After the session exists, skip this step for all subsequent commands.

---

### Add a pane to the session

```bash
zellij --session <session-name> run --name <pane-name> -- <command>
```

Example:
```bash
zellij --session myproject-agent run --name "dev-server" -- npm run dev
```

This returns the pane ID (e.g., `terminal_1`) and runs the command in the background.

**Useful flags:**
- `--cwd <path>`: set working directory
- `--close-on-exit`: close the pane when the command finishes
- `--start-suspended`: start paused; user presses Enter to begin
- `-d right|down`: direction for pane split

### Add a tab to the session

```bash
zellij --session <session-name> action new-tab -n <tab-name> -- <command>
```

Creates a new tab (with a pane inside it) within the existing session. Good for grouping related processes (e.g., one tab per service).

**Key difference:** `run` adds a pane to whichever tab is currently focused; `new-tab` creates a new tab with its own pane. Use `new-tab` to separate services into named tabs, use `run` to add a pane alongside existing ones.

---

### Check process status

List panes with command and state info:

```bash
zellij --session <session-name> action list-panes -j -c -s
```

Parse the JSON array. Key fields:
- `id`: numeric pane id (used with `terminal_<id>`)
- `title` / `pane_command`: what is running
- `exited`: `true` if the process has ended
- `exit_status`: exit code if exited (may be `null` in some zellij versions; rely on `exited: true` for exit detection)
- `tab_name`: which tab the pane belongs to
- `is_focused`: whether this pane is currently focused

To find a specific pane by name, grep the JSON output or filter by `title`.

### Read logs / output

Dump the visible screen content of a pane:

```bash
zellij --session <session-name> action dump-screen -p terminal_<id>
```

Include full scrollback:
```bash
zellij --session <session-name> action dump-screen -p terminal_<id> --full
```

Save to file:
```bash
zellij --session <session-name> action dump-screen -p terminal_<id> --full --path /tmp/logs.txt
```

> Note: `dump-screen` captures what is currently rendered, not a streaming log. For long logs, prefer `--full`.

---

### Send input to a running process

Send Ctrl+C to gracefully stop:
```bash
zellij --session <session-name> action send-keys "Ctrl c" -p terminal_<id>
```

Send Enter:
```bash
zellij --session <session-name> action send-keys "Enter" -p terminal_<id>
```

Send raw text:
```bash
zellij --session <session-name> action write-chars "restart" -p terminal_<id>
```

Then send Enter if needed.

---

### Restart a process

Zellij does not have a native "restart pane" command. To restart:

1. Find the pane ID via `list-panes`
2. Send Ctrl+C to the pane
3. Wait briefly or check `exited` status
4. Close the pane: `zellij --session <session-name> action close-pane -p terminal_<id>`
5. Start it again with `zellij --session <session-name> run --name <same-name> -- <command>`

Alternatively, if you want to keep the pane and run a new command in it, use:
```bash
zellij --session <session-name> action write-chars "<command>" -p terminal_<id>
zellij --session <session-name> action send-keys "Enter" -p terminal_<id>
```

---

### Stop / clean up

Close a specific pane:
```bash
zellij --session <session-name> action close-pane -p terminal_<id>
```

Kill an entire session and all its processes:
```bash
zellij kill-session <session-name>
```

List active sessions:
```bash
zellij list-sessions -n -s
```

## Recommended Patterns

### Monorepo with multiple dev servers

Create one session per project, or one session with one tab per service:

```bash
# Ensure session
zellij attach -b -c myproject-agent

# Backend tab
zellij --session myproject-agent action new-tab -n "backend" -- npm run dev:backend

# Frontend tab
zellij --session myproject-agent action new-tab -n "frontend" -- npm run dev:frontend

# DB tab
zellij --session myproject-agent action new-tab -n "db" -- docker-compose up db
```

### Dev server + log monitoring

```bash
zellij --session myproject-agent run --name "api-server" --cwd ./api -- npm run dev
zellij --session myproject-agent run --name "api-logs" --cwd ./api -- npm run logs
```

### Reusing an existing pane

If you want to run a new command in an existing pane instead of opening a new one:
1. Focus the pane: `zellij action focus-pane-id terminal_<id>`
2. Write chars and send Enter.

## Troubleshooting

**"Session not found" when using `zellij run`:**
- You must create the session first with `zellij attach -b -c <name>`.

**Pane ID format:**
- Use `terminal_1`, `terminal_2`, etc. Bare integers like `1` also work and are treated as `terminal_1`.

**Process exited but pane remains:**
- If you did not use `--close-on-exit`, the pane stays open showing the final output. Use `close-pane` to remove it.

**Agent is inside Zellij already:**
- Omit `--session <name>`. All `zellij run`, `zellij action`, etc. will target the current session.
- Check with: `echo $ZELLIJ`

## Reference: Common Commands

| Task | Command |
|------|---------|
| Create background session | `zellij attach -b -c <name>` |
| Run in new named pane | `zellij --session <name> run --name <pane> -- <cmd>` |
| Run in new named tab | `zellij --session <name> action new-tab -n <tab> -- <cmd>` |
| List panes (JSON) | `zellij --session <name> action list-panes -j -c -s` |
| Read pane output | `zellij --session <name> action dump-screen -p terminal_<id> --full` |
| Send Ctrl+C | `zellij --session <name> action send-keys "Ctrl c" -p terminal_<id>` |
| Close pane | `zellij --session <name> action close-pane -p terminal_<id>` |
| Focus pane | `zellij --session <name> action focus-pane-id terminal_<id>` |
| List sessions | `zellij list-sessions -n -s` |
| Kill session | `zellij kill-session <name>` |
| Save session state | `zellij --session <name> action save-session` |
