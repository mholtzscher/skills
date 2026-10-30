# Technical-writing standard

Write so a tired engineer understands on the first read.

Apply all four layers to technical documentation. For PR descriptions and commit messages, apply the sentence-level layers while preserving their required format. Product UI strings follow the product's copy guidelines.

Apply the prose diagnostics below to every document this standard touches. They supplement the four layers in this same reference.

Preserve technical requirements, confidence, legitimate uncertainty, and the author's meaning. Keep exact quotations, code, commands, citations, examples under review, and structured technical notation literal. Keep tables and diagrams when they explain something rather than decorate it. Report substantive ambiguity instead of silently choosing a new requirement. The caller determines what may be edited.

## Write for the first read

- Cut words that do no work. "In order to" becomes "to", "due to the fact that" becomes "because", and "it is important to note that" adds nothing. Reduce stacked hedges such as "could potentially possibly" to "may" while retaining genuine uncertainty.
- Prefer the short, everyday word unless a longer word buys precision. "Utilize" and "leverage" become "use", "facilitate" becomes "help", "perform" becomes "do", "numerous" becomes "many", and "in the event that" becomes "if". Prefer "is" or "has" to "serves as", "stands as", "boasts", or "features" when the meaning is the same.
- When a style rule makes a sentence worse, fix it another way or leave it alone. Clarity exceptions apply to stylistic preferences, not technical meaning, exact evidence, required formats, or the caller's authority.
- The codebase is the word list. Use the real symbol, file, flag, or command name rather than a synonym or description. Define named patterns on first use. Use the words a developer would say out loud: "move", "delete", "a budget that only decreases", not "evacuate", "ratchet", or "endgame". Propose a new jargon offender and its replacement as a diff to the abstract-metaphor diagnostic below; do not edit the standard as part of a writing task.
- Replace adverbs propping up weak verbs with a direct description or measurement: "runs quickly" becomes "is fast" or the measured time; "significantly improves" becomes the measured delta.

## Vary the rhythm

A doc can obey every layer and still read machine-written: every sentence clipped short, no view anywhere, nothing specific.

- Mix sentence lengths on purpose. Short sentences land a point. Longer ones carry a fact with its condition or consequence.
- One thought per sentence does not mean one length per sentence. Split the sentence that carries two thoughts. Keep the long sentence that carries one.
- Have a view where the mode allows it. Explanation weighs trade-offs, so say what you make of them instead of listing pros and cons. Reference stays dry.
- Be specific over sterile. Not "schema changes can cause issues" but "a column rename fails the build".

## Pick the mode first: Diátaxis

Choose by purpose: action or understanding, learning or work.

| Purpose                    | Mode        |
| -------------------------- | ----------- |
| Action for learning        | Tutorial    |
| Action for work            | How-to      |
| Understanding for work     | Reference   |
| Understanding for learning | Explanation |

**Tutorial: learning by doing.** The learner's success is your job, not theirs. Open by saying what the learner will build, not what they will "learn". Every step produces a visible result, early and often. Tell them what they should see: the expected output, the prompt change, the log line. Cut explanation to one clause and a link. Stay concrete. Write as "we", in commands: "First, do x. Now, do y."

**How-to: steps to a goal.** Solve a problem a person has, not an operation the machine can perform. Assume competence and skip teaching. Action only: no digressions, no background, no completeness for its own sake. Link those instead. Allow forks and judgment: "If you want x, do y." Name the guide by the task: "How to calibrate the radar array", not "Radar array calibration".

**Reference: facts for lookup.** Only describe. No instruction, no persuasion, no opinion. Be dry and complete. State verified facts, options, limits, and errors directly; expose missing evidence rather than presenting uncertainty as certainty. Mirror the structure of the thing described, so code and docs can be navigated together. Put material where readers expect it. Generate from code where possible.

**Explanation: understanding and why.** One bounded topic, readable away from the product. Each title should tolerate an implicit "About..." in front. Anchor on a real why question. Give context: design decisions, history, constraints, alternatives. Of the four modes, opinion belongs here.

Keep each document focused on one mode where its format allows: no reference tables inside a tutorial, no tutorial hand-holding inside reference, no arguing inside a how-to. Split and link instead. Required RFC, planning, README, and PR templates retain their structure; use the compass at the section or sentence level rather than forcing the whole artifact into one mode.

## Write to the reader: Google developer style

- Address the reader as "you", in the present tense. Reserve "will" for genuinely later events.
- Name who does what. Check "is/are/was/were + past participle": "queries are validated" becomes "the compiler validates queries", and "the file is parsed by the loader" becomes "the loader parses the file". Passive voice is useful when the actor is unknown or beside the point.
- Give instructions as commands: "Click Submit." State facts plainly. Never "should be done". Put the condition before the instruction: "To delete the document, click Delete." Put the common case before exceptions.
- Sound like a knowledgeable friend. Avoid buzzwords, figurative language, and "please" in instructions. Avoid "simply", "easy", and "quickly" in procedures. If it were simple, the reader would not be here.
- Avoid premature announcements ("we will soon support...") and consecutive sentences starting with the same phrase.
- Link with a page title or useful description, not "click here". Prefer a sentence of local context over sending readers elsewhere for it.
- Make headings carry the point, not just the topic ("Pick the mode first", not "Modes"). Use sentence case, bare verb phrases for tasks ("Create an instance"), and noun phrases for concepts. Use one h1 and do not skip heading levels.
- Number sequences; use bullets otherwise. Introduce lists with a complete sentence and keep items parallel.
- Format code as code and UI elements in bold. Use serial commas. Say that a list is partial instead of appending "etc.".
- Use straight quotes. Prefer colons before lists or examples rather than as mid-sentence connectors. "If you're coming from traditional automation: instead of registering event handlers, you describe conditions" adds nothing with the colon. Rewrite to let the point stand on its own without comparison framing. "Describing when the scheduler should fire works best as plain English." Same meaning, no crutch punctuation.

## Present one thought at a time: STE

- Give one instruction per sentence and one thought per sentence elsewhere. If the reader must backtrack, split the sentence or drop clauses. Consider splitting instructions over about 20 words and other sentences over about 25; these are clarity guides, not mechanical limits.
- Put warnings and conditions before the steps they govern: "If hot oil touches your skin, injuries can occur."
- Keep articles: "Remove the backup file", not "Remove backup file".
- Give each word one meaning and job. If "check" means inspect, don't also use it for restrain. Pick one word per action and retain it, rather than alternating "start" and "initiate".
- Write procedures as direct commands rather than narration or passive requirements: "Install the component", not "the component must be installed".
- Avoid "-ing" words where you can; prefer direct verbs, especially for ambiguous or unnecessary constructions.

## Remove ambiguous readings: Global English

- Keep "only" and "not" next to what they modify. "Only fails on growth" differs from "fails only on growth".
- Break up noun strings: "the proto import budget check script" becomes "the script that checks the proto-import budget".
- Give every "it", "they", and "this" one obvious referent. Repeat the noun when needed; avoid "this" or "which" standing for an entire clause.
- Retain verbs in parallel clauses: "Phase 1 moves the converters and Phase 2 the runtime" leaves Phase 2 without one. Give it one.
- Keep small structural words, such as "that" in "Ensure that the switch is off". Never trade clarity for word count. Repeat articles when needed to distinguish "the client and the host" from "the client and host".
- Clarify how "and" and "or" group alternatives. Use "both...and", "either...or", or "if...then" where helpful.
- Prefer periods or commas to semicolons, em dashes, and dash substitutes. Parentheses may contain a grammatical unit when they improve clarity; otherwise use a separate sentence. Spell out plurals rather than adding "(s)".
- In prose, write "a, b, or both" instead of "a/b" or "and/or". Preserve literal paths, commands, and notation.
- Use one name for each thing, everywhere. A doc that says "the gate", "the ratchet", and "the budget check" for one thing teaches three things. "Protagonist", "main character", "central figure", and "hero" in one paragraph cycle synonyms for one thing; pick one and repeat it. Don't churn what didn't change.
- Avoid idioms, colloquialisms, Latin abbreviations, and metaphors that require interpretation.
- Write complete sentences with articles and verbs rather than compressed symbol-speak. "Parser rejects bad date → exit 2, no write" becomes "The parser rejects a bad date, exits with code 2, and writes nothing." Spell out prose arrows and abbreviations; preserve syntax in genuine diagrams and code.

## Technical artifacts

Keep PR descriptions brief enough to scan in under a minute. Link detailed logs and evidence instead of pasting swarm logs, SHA lists, or metric tables. Preserve required verification and visual-outline sections.

Use repository conventions for snippet indentation. Use real paths and check count and tree claims against the target revision, including the command that regenerates them.

## Prose diagnostics

Scan all of these diagnostics when drafting or reviewing selected text. Rule numbers preserve the former catalog's stable IDs; gaps are rules consolidated into the layers above. Clarity exceptions and literal-evidence protections apply throughout.

### Unsupported claims and empty analysis

#### 3. Superficial -ing phrases

"highlighting...", "ensuring...", "reflecting...", "showcasing...", "fostering...". Delete or expand with real sources.

#### 5. Vague attributions

"Experts believe", "Industry reports suggest", "Some critics argue". Name the source or delete.

#### 27. Say what it does, not how it feels

"the database stays close at hand", "SQL you can read", "types that follow your schema" name a feeling. The fix names the mechanism or a number: "`.toSQL()` returns the exact string sent to the database", "a column rename fails the build". Ask what the sentence tells the reader to do or know, then write that. If you can't restate it as a concrete instruction, fact, or number, cut it. One more check: if the sentence could appear unchanged in another project's docs, it says nothing about this one. Cut it.

### Jargon and stock rhetorical phrases

#### 7. AI vocabulary

Additionally, crucial, delve, enduring, enhance, fostering, garner, interplay, intricate, landscape (abstract), pivotal, showcase, tapestry (abstract), testament, underscore, vibrant. Replace with plain words.

#### 9. "Not just X, but Y."

State the point directly instead.

#### 10. Rule of three

Don't force ideas into groups of three. Use the natural number.

#### 12. False ranges

"from X to Y" where X and Y aren't on a meaningful scale. List topics directly.

#### 26. Abstract metaphor nouns

Substrate (base), wedge, wedge in (add), vector (way, method), locus, vantage, nexus, primitive as a noun, harness as a metaphor, surface as in "API surface", bedrock, scaffolding as a metaphor, modality, paradigm, gold-plating (more than the job needs), ratchet as a metaphor (the mechanism's real name, or a limit that only tightens), evacuate for moving code (move out), endgame (the last phase), north star, flywheel. These read as technical but usually have a plainer concrete word. Pick the concrete word.

#### 32. Mannered prose

Metaphor or flourish where a literal phrase exists: aphorisms ("wire it or delete it"), rhetorical fragments for effect, personified code ("the plan holds it"), figurative verbs ("rides along", "stands on"), stock framing phrases. "A dial worth turning" becomes "a parameter worth varying". Say what you mean. Rule 26 covers the metaphor nouns.

### Decorative or repetitive formatting

#### 15. Boldface overuse

Don't bold every proper noun or acronym.

#### 16. Inline-header lists

The tell is a bold label and colon that restates the line: "**Performance:** Performance improved...". Convert those to prose. A bold lead-in that ends in a period, names the item, and is followed by genuinely new detail ("**Schema in TypeScript.** Tables live in one file.") is fine, not a tell.

#### 18. Decorative emojis

Remove from headings and bullets.

### Chatbot language and generic conclusions

#### 20. Chatbot phrases

"I hope this helps!", "Let me know if...", "Of course!", "Certainly!", "Found the smoking gun!" Remove.

#### 22. Sycophantic tone

"Great question! You're absolutely right!" Respond directly.

#### 25. Generic conclusions

"The future looks bright." State specific plans or facts.

## Worked example

Before:

> Configuration of the proto import ratchet budget script parameters is performed via budget.json. Note that it's important to remember that running with --write, which updates the committed budget to reflect the current count, should only be done when lowering it. If exceeded, CI fails.

After:

> `budget.mjs` reads the committed budget from `budget.json` and counts the files that import protos. If the count exceeds the budget, CI fails. Run `budget.mjs --write` only to lower the budget.
