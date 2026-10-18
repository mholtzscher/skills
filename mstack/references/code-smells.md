# Smell baseline

A fixed set of code smells from chapter 3 of Fowler's _Refactoring_ that applies to a diff even when a repository documents nothing. Two rules bind it:

- **The repository overrides.** A documented repository standard always wins. Where it endorses something the baseline would flag, suppress the smell.
- **Always a judgment call.** Report each smell as a labelled heuristic, such as "possible Feature Envy", never a hard violation. Skip anything tooling already enforces.

Each entry says what the smell is, then how to fix it. Match each one against the diff:

- **Mysterious Name.** A function, variable, or type whose name doesn't reveal what it does or holds. Fix: rename it. If no honest name comes, the design is murky.
- **Duplicated Code.** The same logic shape appears in more than one hunk or file in the change. Fix: extract the shared shape and call it from both.
- **Feature Envy.** A method that reaches into another object's data more than its own. Fix: move the method onto the data it envies.
- **Data Clumps.** The same few fields or parameters keep travelling together, a type wanting to be born. Fix: bundle them into one type and pass that.
- **Primitive Obsession.** A primitive or string standing in for a domain concept that deserves its own type. Fix: give the concept its own small type.
- **Repeated Switches.** The same `switch` or `if` cascade on the same type recurs across the change. Fix: replace it with polymorphism, or one map both sites share.
- **Shotgun Surgery.** One logical change forces scattered edits across many files in the diff. Fix: gather what changes together into one module.
- **Divergent Change.** One file or module is edited for several unrelated reasons. Fix: split it so each module changes for one reason.
- **Speculative Generality.** Abstraction, parameters, or hooks added for needs the spec doesn't have. Fix: delete it and inline back until a real need shows.
- **Message Chains.** Long `a.b().c().d()` navigation the caller shouldn't depend on. Fix: hide the walk behind one method on the first object.
- **Middle Man.** A class or function that mostly just delegates onward. Fix: cut it and call the real target directly.
- **Refused Bequest.** A subclass or implementer that ignores or overrides most of what it inherits. Fix: drop the inheritance and use composition.

Report each smell with its name and the quoted hunk.
