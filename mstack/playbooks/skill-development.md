# Author, evaluate, and reflect

Use installed skill-creator and writing-for-agents when available. Keep general authoring tools external. For a project-specific skill that drives the app and proves behavior, use [verification-skill creation or maintenance](verification-skill.md).

## Author

Identify actual requests the skill should serve, the decisions it changes, and its invocation boundary. Propose the entry point, conditional references, script interfaces, dependencies, and validation. Obtain sketch/spec approval before creating or changing the implementation.

Keep always-loaded discovery text precise and the main workflow concise. Disclose branch-specific detail through links. Put deterministic repeated mechanics into scripts when they improve reliability. Preserve provenance and license notices for adapted content. Validate names/frontmatter, links, discovery on intended hosts, and executable behavior. Use the approved coding delivery path when publication is part of the task.

## Evaluate

Choose realistic tasks and independent expected outcomes before judging a skill revision. Include material boundary cases, not only the happy path. Give evaluators the actual skill and raw task/fixtures without the intended answer or your suspected failure. Use isolated temporary output targets and bounded permissions. Observe actions and artifacts, not just a model's claim that it followed instructions.

Compare revisions against the same cases where practical. Report limitations and failures, then fix only supported defects. Re-run affected cases after changes. An offline scenario test cannot establish live host discovery or GitHub delivery.

## Reflect

Inspect the task's real history, tool outcomes, user corrections, and artifacts. Identify a recurring failure or a demonstrated improvement. Prefer a structural correction over another blanket instruction; read [Encode lessons](../principles/encode-lessons.md).

Propose the smallest change to the authoritative skill/source with evidence and tradeoffs. Ask before editing shared/global guidance. Do not convert one task's exception into universal policy or silently patch a skill mid-task outside its scope.
