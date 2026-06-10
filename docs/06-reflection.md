# Reflection on AI-Assisted Development

## 1. How did you use AI during requirements clarification?

I used Codex CLI to turn the initial Student Task Tracker idea into structured requirements covering the problem, target users, user goals, functional requirements, constraints, assumptions, and open questions. It helped identify details that were easy to overlook, such as empty states, invalid input, responsive behavior, and the risk of losing data when browser storage is cleared. I still had to decide which questions should remain open and keep the scope realistic for a two-day project.

## 2. How did you use AI during PRD creation?

I used Codex CLI to convert the clarified requirements into a concise PRD with goals, non-goals, user stories, five core features, and acceptance criteria. It did well at translating broad requirements into behavior that could be tested, such as requiring completed tasks to remain completed after refresh. I reviewed the result to ensure advanced features such as accounts, notifications, editing, and cloud synchronization stayed out of scope.

## 3. How did you use AI during issue breakdown?

Codex CLI broke the PRD into six vertical-slice issues based on user-visible behavior instead of technical layers. It added acceptance criteria, dependencies, testing notes, and AFK or HITL classifications for each issue. Human judgment was needed for the HITL filter issue, where I accepted three visible filter buttons as the UI pattern.

## 4. How did you use AI during coding?

I used Codex CLI to create the semantic HTML, responsive CSS, and vanilla JavaScript implementation for adding, viewing, completing, deleting, filtering, and persisting tasks. It also separated the core task operations into `src/task-logic.js` so the same logic could be used by the browser app and imported by Jest. I reviewed the code structure and accepted the trade-off of a small shared module instead of adding a framework or build system.

## 5. How did you use AI during testing?

Codex CLI created Jest tests for `addTask`, `deleteTask`, `toggleComplete`, and `filterTasks`, then installed Jest and ran the suite. It verified that all seven automated tests passed and documented the TDD cycle, coverage, and browser checklist. It also performed a headless mobile render at 375px, but the full automated browser interaction test could not be completed because the browser integration and DevTools connection were unavailable.

## 6. Where did AI make mistakes or give weak suggestions?

Codex CLI initially produced a CSS container width expression without `calc()`, which caused horizontal overflow in the 375px headless render. It detected and corrected that issue after visual verification, but the first implementation shows why generated UI code still needs inspection. There was also an inconsistency between the earlier requirement that due date was required and the later coding instruction that it was optional; Codex followed the latest instruction, but this decision required human awareness.

## 7. What did you verify manually?

I reviewed the requirements, PRD, issue dependencies, design decisions, file structure, and code to confirm they matched the assignment scope. I checked the generated mobile screenshot and confirmed that the corrected layout fit a 375px viewport, and I reviewed the Jest output showing seven passing tests. The Chrome DevTools console, interactive browser workflow, and `localStorage` behavior should still be completed manually using the checklist in `docs/05-tdd-and-testing.md`.

## 8. What software engineering decision are you most confident about?

I am most confident about separating pure task logic from DOM, rendering, and storage concerns. The functions in `src/task-logic.js` accept data and return new task arrays, which makes their behavior easy to understand and test without a browser. This kept the implementation small while improving testability and reducing the risk of UI code hiding logic errors.

## 9. What would you improve with more time?

With more time, I would add automated browser tests for the complete user workflow, validation, and `localStorage` persistence. I would also improve error feedback when browser storage is unavailable, add more accessibility checks, and test the layout across more browsers and screen sizes. Finally, I would capture the required failing and passing test screenshots and complete the Chrome DevTools notes with direct manual evidence.
