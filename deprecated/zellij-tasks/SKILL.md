---
name: zellij-tasks
description: Manage long-running processes (dev servers, watchers, builds, test runners, background jobs) with Zellij from inside the user's active Zellij session. Use whenever the user needs to start, monitor, restart, or organize persistent terminal tasks; run multiple dev servers in parallel; keep processes alive across disconnections; capture logs; or manage any CLI task that should outlive the current shell command. Prefer this over raw backgrounding (&, nohup) or tmux when Zellij is available.
---

# Zellij Task Manager

Use Zellij to manage long-running processes in the user's current Zellij session. Assume the agent is already inside Zellij (`echo $ZELLIJ` is set). Run commands without `--session` by default. Do not create, target, attach to, or kill separate named sessions unless the user explicitly asks.

## Naming

Use kebab-case names so panes/tabs are easy to scan in `list-panes` output.

- Tabs: service/subsystem, e.g. `api`, `frontend`, `db`, `worker`
- Panes: process/tool, e.g. `dev-server`, `test-watch`, `build`, `logs`
- Disambiguate duplicates: `test-watch-api`, `test-watch-web`

## Core commands

### Confirm current session

Only needed if behavior is unclear:

```bash
echo $ZELLIJ
```

If empty, ask the user whether to start or target a named session before proceeding.

### Start a process in a new pane

```bash
zellij run --name <pane-name> -- <command>
```

Example:
```bash
zellij run --name dev-server -- npm run dev
```

Useful flags:
- `--cwd <path>`: run in a directory
- `--close-on-exit`: close pane when command exits
- `--start-suspended`: create pane paused until Enter
- `-d right|down`: choose split direction
- `--tab-id <id>`: open in a specific tab

Wrap commands that need shell syntax (`&&`, `|`, redirects, env vars, globbing, aliases, command substitution):

```bash
zellij run --name web-dev --cwd ./web -- sh -lc 'PORT=3001 npm run dev 2>&1 | tee dev.log'
```

### Start a process in a new tab

```bash
zellij action new-tab -n <tab-name> -- <command>
```

Example:
```bash
zellij action new-tab -n frontend -- npm run dev:frontend
```

Useful flags:
- `--cwd <path>`: run the tab's initial command in a directory
- `--close-on-exit`: close the pane when the initial command exits
- `--start-suspended`: create the tab paused until Enter

`new-tab` returns the tab ID, not the pane ID. Run `list-panes` afterward if you need the pane ID for logs/input. Use `sh -lc '<command>'` here too for complex shell commands.

### List panes / status

```bash
zellij action list-panes -j -c -s -t
```

Important JSON fields:
- `id`: pane id, used as `terminal_<id>`
- `title`: pane name
- `terminal_command`: launch command, when available
- `pane_command`: currently running process
- `exited`, `exit_status`: process state
- `tab_id`, `tab_name`: location
- `pane_cwd`: current directory

Filter by `title`, `tab_name`, or command fields to find a specific pane.

### Read output

```bash
zellij action dump-screen -p terminal_<id>
zellij action dump-screen -p terminal_<id> --full
zellij action dump-screen -p terminal_<id> --full --path /tmp/logs.txt
```

`dump-screen` captures rendered terminal content. Prefer `--full` for scrollback.

### Send input

```bash
zellij action send-keys "Ctrl c" -p terminal_<id>
zellij action send-keys "Enter" -p terminal_<id>
zellij action write-chars "restart" -p terminal_<id>
zellij action paste -p terminal_<id> '<text>'
```

Use `paste` for multiline input; use `write-chars` for short text, then send Enter if needed.

## Restart a process

Zellij has no native restart-pane command. Use this pattern:

1. Run `list-panes` and capture `id`, `tab_id`, `pane_cwd`, `title`, and `terminal_command`.
2. Stop it: `zellij action send-keys "Ctrl c" -p terminal_<id>`
3. Wait briefly or check `exited`.
4. Close it: `zellij action close-pane -p terminal_<id>`
5. Recreate it in the same tab/cwd:

```bash
zellij run --tab-id <tab_id> --cwd <pane_cwd> --name <same-name> -- <command>
```

Wrap with `sh -lc '<command>'` if needed.

To reuse the existing pane instead of closing it:

```bash
zellij action write-chars "<command>" -p terminal_<id>
zellij action send-keys "Enter" -p terminal_<id>
```

## Stop / clean up

Close a pane:

```bash
zellij action close-pane -p terminal_<id>
```

List sessions:

```bash
zellij list-sessions -n -s
```

Do not kill the current session unless the user explicitly asks; it terminates their workspace. For a separate named session only:

```bash
zellij kill-session <session-name>
```

## Patterns

### Multiple dev servers

```bash
zellij action new-tab -n backend -- npm run dev:backend
zellij action new-tab -n frontend -- npm run dev:frontend
zellij action new-tab -n db -- docker-compose up db
```

### Server plus logs

```bash
zellij run --name api-server --cwd ./api -- npm run dev
zellij run --name api-logs --cwd ./api -- npm run logs
```

### Focus/reuse a pane

```bash
zellij action focus-pane-id terminal_<id>
zellij action write-chars "<command>" -p terminal_<id>
zellij action send-keys "Enter" -p terminal_<id>
```

## Named-session exception

Only when the user explicitly asks for a separate session: create it with `zellij attach -b -c <name>`, then pass the global session flag before the subcommand:

```bash
zellij --session <name> run --name <pane-name> -- <command>
zellij --session <name> action list-panes -j -c -s -t
zellij --session <name> action dump-screen -p terminal_<id> --full
```
