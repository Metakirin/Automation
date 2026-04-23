# How to create the P1 bug auto-fix routine on claude.ai

Step-by-step for `Metakirin/Automation`. Takes ~5 minutes end-to-end.

## 1. Open the routines UI

<https://claude.ai/code/routines> → click **New routine**.

If that URL 404s / the button is missing, routines isn't enabled on your
account yet. Verify plan (Max is fine) and that Claude Code on the web is
enabled under Settings.

## 2. Fill the form

| Field | Value |
|-------|-------|
| **Name** | `p1-bug-autofix` |
| **Model** | Latest Sonnet or Opus. Sonnet is cheaper and fine for a bug this simple; Opus is worth it on real work. |
| **Repositories** | `Metakirin/Automation` — when you type this, GitHub will prompt you to install the **Claude GitHub App** on the repo. Click through; grant access to `Automation` only (not all repos). |
| **Environment** | Click **New environment**, name it `automation-demo`. See §3 below for what to put in it. |
| **Connectors** | Disable everything. We don't need Slack, Linear, Jira, etc. for the shakedown. Fewer moving parts. |
| **Branch permissions** | Leave **Allow unrestricted branch pushes** OFF. The routine should only push `claude/*` branches. |
| **Triggers** | Start with **NO triggers** — we'll use "Run now" for the first two runs, then add the cron once it works. |
| **Prompt** | Copy the entire contents of [ROUTINE-PROMPT.md](./ROUTINE-PROMPT.md) in this repo into the prompt field. No placeholders to replace — it's already filled in for this repo. |

## 3. Cloud environment config

Inside the `automation-demo` environment:

**Env vars** (Settings → Environment variables):

| Key | Value |
|-----|-------|
| `GH_TOKEN` | paste your classic PAT (`project` + `repo` scopes) |
| `DRY_RUN` | `1` |

**Setup script** (runs once per environment, cached — only re-runs if you
edit the script):

```bash
#!/bin/bash
set -euo pipefail

# Install gh CLI if not already present.
if ! command -v gh >/dev/null 2>&1; then
  type -p curl >/dev/null || (apt-get update && apt-get install -y curl)
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
  chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    > /etc/apt/sources.list.d/github-cli.list
  apt-get update
  apt-get install -y gh
fi

gh --version
```

Save the environment.

## 4. Save the routine

Click **Create routine**. You'll land on its detail page at
`claude.ai/code/routines/<id>`.

Record the `<id>` — you'll want it for `RemoteTrigger` calls from chat
later (to pause/resume/run from a conversation).

## 5. File the test ticket

Before you run the routine, populate the existing "Test bug 1" issue on
your Project board with the body from [TEST_TICKET.md](./TEST_TICKET.md).
Make sure:
- Label `bug` is applied
- Project custom field `Priority` is `P1`
- Status is `Backlog` or `Todo` (anything that isn't `Done` / `Closed`)

## 6. First run (dry)

On the routine detail page click **Run now**. With `DRY_RUN=1`, the
routine will:
1. Install `gh` (first time, ~30s)
2. Clone the repo
3. Query the Project
4. Print what it *would* do
5. Exit without touching any branches, PRs, labels, or comments

Open the session link that appears, scroll to the bottom. You should see
something like:
```
Candidate issues:
  #<N> "Test bug 1" (P1, bug)
Would process: 1 issue.
DRY_RUN=1, exiting before any writes.
```

If the candidate list is empty, check the field-name case (must be
exactly `Priority` and `P1`) and the label spelling (`bug`). If something
else breaks, read the session transcript — Claude logs each step.

## 7. Real run

1. Edit the environment, change `DRY_RUN` to `0` (or delete the var).
2. Back on the routine page, click **Run now**.
3. Wait ~2–5 minutes (install + clone + fix + test + push).
4. Expected outcome:
   - A draft PR appears at <https://github.com/Metakirin/Automation/pulls>
   - The issue has a new comment linking the PR
   - The issue has a new label `claude/triaged`
   - `npm run test` passes on the branch

Open the PR, review the diff, and merge if it looks right.

## 8. Arm the schedule (only after two clean runs)

Edit routine → Triggers → Add schedule → Custom cron `0 2 * * *` (2am
local every day). Save.

## 9. Dispatch controls from chat

Once the routine is live, from any Claude Code session you can:

```
RemoteTrigger({ action: "list" })
RemoteTrigger({ action: "run", trigger_id: "<id>" })
RemoteTrigger({ action: "update", trigger_id: "<id>", body: { enabled: false } })
```

See `F:\Job\automation\claude-routines-integration.md` §4.2 for the full
pattern.
