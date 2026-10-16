# Rationale template

The prose accompanies the architecture type sketch. Aim for one page with sentence-case headings and no boilerplate. Replace the notes below with actual content. Preserve every section, with honest limits where evidence or alternatives are unavailable.

## Problem

One paragraph. What are we trying to do, and what makes the shape non-obvious in the existing system or constraints? Name the constraints established during grounding, including types to interoperate with, callers that must remain compatible, and invariants crossing the boundary. Distinguish source-established constraints from design hypotheses.

## Usage, caller's view

Write this first, before the type sketch. Show the README or quickstart the consumer reads, plus two or three realistic call sites in the consumer's own code. Show imports, calls, and returned values. Label proposed calls as proposed; use source evidence when describing actual callers. Derive the type sketch in [Shape](#shape) from this required usage. When they diverge, reconcile the sketch to the usage and actual contract rather than adding unrequested constraints. The types serve the caller's experience.

## Shape

State the recommended architecture, data structures first, then data flow through signatures and the owning modules. Name the decisions the contract depends on. State which invariants types encode, where validation happens, and what the system deliberately does not do. Judge interface depth explicitly. Name the complexity hidden behind the public interface, what callers still need to know, and why the interface is no larger than necessary. Cite each read principle that materially changes a choice, with the specific choice rather than a restatement of the principle.

## Synthesis decision

For multiple candidates, the lead records which became the base and why, what was adapted from each other candidate, and what was rejected and why. Attribute actual contributions and known identities. For one direct candidate, state that fact and the evidence supporting the choice. Local architecture comparison need not run Arena. Record an Arena result only if it actually occurred; do not manufacture candidates, judge verdicts, or independent agreement.

## Tradeoffs accepted

One bullet per consequential tradeoff, in the form "we accept X in exchange for Y." Name anything a future reader might mistake for an oversight, including choices that resemble premature optimization or premature simplification.

## Alternatives considered

Name concrete alternative shapes actually considered and give a line on why each lost. Judge interface depth, not implementation simplicity alone. Name the complexity each exposes to callers and what it hides. Two or three alternatives belong here when there were real contenders, not flavors of the same shape. When constraints leave only one viable shape, explain "this was the only viable shape because..." with the deciding constraints. Do not manufacture a token alternative. These are design alternatives considered by the chosen shape, distinct from runner attribution in Synthesis decision.

## Open questions and risks

State what the human needs to weigh before implementation and risks worth flagging. Phrase unresolved choices as questions so the human's answer can resolve them. Keep verified facts separate from hypotheses, unknowns, and unexecuted checks. Do not turn a speculative risk into an observed caller defect.

## Next implementation step

One sentence naming the first thing to build against the sketch after approval and only within the caller's implementation authority. For an architecture-only task, propose that next step without starting it. Implementation approval is always required; it is not an opt-in checkpoint.
