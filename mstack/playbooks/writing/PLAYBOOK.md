# Writing

Select the editing depth requested. Review-only and proposal-only requests use the matching mode but return findings or proposed wording instead of edits. Preserve required repository templates and the caller's approval boundary.

| Request                                                         | Mode              |
| --------------------------------------------------------------- | ----------------- |
| Create docs, RFCs, readmes, PR descriptions, or commit messages | [Draft](#draft)   |
| Improve or review existing structure and sentences              | [Revise](#revise) |
| Remove filler and AI patterns, or run publication prose cleanup | [Polish](#polish) |

## Draft

Establish the audience, reader's task, and source facts. Read the [technical-writing guide](references/technical-writing.md). Choose the document mode before writing, then apply all four layers. PR descriptions and commit messages skip Diátaxis and retain their required format.

Produce the scoped text, then run [Polish](#polish). Verify symbols, paths, commands, and factual claims against the available sources. Finish with the requested text and any substantive ambiguity or unverified facts.

## Revise

Read the complete scoped text and establish its audience and purpose. Read the [technical-writing guide](references/technical-writing.md). Assess document mode, organization, and sentence clarity against every applicable layer. Preserve the requested scope; propose splits or restructuring that would exceed it.

Revise within the caller's authority, then run [Polish](#polish). In review-only requests, report findings and proposed wording instead. Verify changed factual claims and technical names. Finish when the scoped text has been checked against every applicable layer, with substantive ambiguity and unverified facts identified.

## Polish

Edit text to remove AI patterns. Read the complete text and establish its intended audience. For every Polish invocation, read the [complete prose-pattern catalog](references/prose-patterns.md), scan the selected text against every entry, then rewrite within the caller's authority. Preserve meaning and match the intended tone. Standalone Polish keeps the existing document structure and does not require the technical-writing guide.

Apply the catalog's strict punctuation and style rules to selected editable prose. Rule 13 excludes em dashes and punctuation substitutes, including parentheses. Rule 14 permits colons before lists or examples, not as mid-sentence connectors. These are editing rules, not permission to alter exact quotations, code, commands, citations, catalog examples, or structured technical notation. Keep those literal. Rule 33 does not remove syntax arrows in genuine diagrams or code. Preserve requirements, technical contracts, confidence, legitimate epistemic hedges, and the author's meaning. Keep tables and diagrams when they explain something rather than decorate it. Report substantive ambiguity instead of silently choosing a new requirement.

Honor proposal-only and review-only scope. Present proposed wording and wait when the caller requires agreement, including spec refinement. During approved implementation or publication cleanup, apply accepted in-scope prose edits without changing technical meaning. Check scoped PR titles, bodies, and commit prose before remote writes, but writing guidance itself grants no permission to edit PR metadata, publish, or modify other files.

Finish with the scoped edits or review findings after checking every catalog entry. Report unresolved ambiguity rather than inventing a requirement.
