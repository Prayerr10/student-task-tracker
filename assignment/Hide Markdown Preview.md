**Two-Day Software Engineering Assignment: AI-Assisted Product Development**

**Course:** Software Engineering\
**Duration:** Two days\
**Work mode:** Individual or small team, as assigned by the instructor\
**Main outcome:** A small working software product and evidence of the engineering process used to build it

-----
**1. Assignment Overview**

In this assignment, you will experience a compact version of a modern software engineering workflow. You will start with a vague product idea, clarify it into requirements, convert the requirements into a Product Requirements Document (PRD), break the PRD into vertical-slice implementation issues, implement selected issues using AI-assisted development, test the product using test-driven development and browser verification, and finally deliver the project through GitHub.

AI is allowed and encouraged, but it must be used as a **software engineering assistant**, not as a replacement for your own understanding. You are responsible for every requirement, design decision, code change, test, and delivery artifact that you submit.

-----
**2. Learning Objectives**

By the end of this assignment, you should be able to:

1. Clarify an unclear product idea into structured requirements.
1. Write a concise PRD with goals, non-goals, user stories, features, and acceptance criteria.
1. Break a PRD into vertical-slice implementation issues.
1. Use GitHub to organize engineering work through issues, branches, commits, and pull requests.
1. Implement software incrementally with AI assistance while maintaining your own understanding.
1. Apply a red-green-refactor test-driven development cycle to at least part of the implementation.
1. Verify user-facing behavior using browser testing and Chrome DevTools.
1. Deliver a working product with documentation and reflection on AI usage.
-----
**3. Project Scope**

Choose a small but meaningful software product. The product should be simple enough to build in two days but complete enough to demonstrate the full software engineering process.

**Suggested project ideas**

- Student task tracker
- Habit tracker
- Mini expense tracker
- Course feedback form with summary page
- Lost-and-found listing app
- Simple inventory manager
- Appointment or booking request form
- Personal portfolio generator
- Study planner
- Simple quiz app

**Scope rule**

Your project should have **3-5 core user-facing features**. Avoid large ideas such as full social media platforms, e-commerce systems, ride-hailing apps, or complex learning management systems.

-----
**4. Required AI Skills / Workflow**

You will use AI at each stage of the process. The recommended skill-inspired workflow is:

1. **Grill-me / grill-with-docs**: Use AI to challenge and clarify your product idea.
1. **To-PRD**: Convert the clarified requirements into a PRD.
1. **To-issues**: Convert the PRD into vertical-slice implementation issues.
1. **Design / coding**: Use AI to support design decisions and implementation.
1. **TDD**: Use a red-green-refactor loop for selected issues.
1. **Browser testing / Chrome DevTools**: Verify behavior in the browser.
1. **Delivery**: Prepare the GitHub repository, README, demo, and reflection.

**References**

- Matt Pocock Skills repository: <https://github.com/mattpocock/skills>
- to-issues skill: <https://github.com/mattpocock/skills/blob/main/skills/engineering/to-issues/SKILL.md>
- tdd skill: <https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd>
- to-prd skill: <https://github.com/mattpocock/skills/blob/main/skills/engineering/to-prd/SKILL.md>
- grill-me skill: <https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me>
- grill-with-docs skill: <https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs>
-----
**5. Required GitHub Repository Structure**

Your project must be submitted as a GitHub repository. Use the following structure:

student-project/

├── README.md

├── docs/

│   ├── 01-requirements.md

│   ├── 02-prd.md

│   ├── 03-vertical-slice-issues.md

│   ├── 04-design.md

│   ├── 05-tdd-and-testing.md

│   └── 06-reflection.md

├── src/

│   └── ...

├── tests/

│   └── ...

├── assets/

│   └── screenshots/

├── .github/

│   ├── ISSUE\_TEMPLATE/

│   │   └── vertical-slice.md

│   └── pull\_request\_template.md

└── package.json / requirements.txt / other project files

If your technology stack uses a different standard structure, you may adjust the src/, tests/, and configuration files, but the docs/ folder and GitHub workflow evidence are required.

-----
**6. Stage 1: Requirements Clarification**

Start with a vague product idea. Use AI to question your idea until it becomes clear enough to document.

**Required output**

Create:

docs/01-requirements.md

It must include:

- Product idea
- Problem statement
- Target users
- User goals
- Functional requirements
- Non-functional requirements
- Assumptions
- Constraints
- Open questions

**Example AI prompt**

Act as a strict software engineering interviewer. Grill me with one question at a time until my product idea is clear enough to write requirements. Challenge vague answers. Ask about users, goals, constraints, workflows, edge cases, and success criteria.

-----
**7. Stage 2: Product Requirements Document (PRD)**

Convert your clarified requirements into a concise PRD.

**Required output**

Create:

docs/02-prd.md

It must include:

- Product overview
- Goals
- Non-goals
- Target users
- User stories
- Core features
- Acceptance criteria
- Success criteria
- Risks
- Out-of-scope items

**Example AI prompt**

Convert the following clarified requirements into a concise PRD for a two-day software engineering project. Include product overview, goals, non-goals, target users, user stories, core features, acceptance criteria, success criteria, risks, and out-of-scope items.

-----
**8. Stage 3: Vertical-Slice Issues**

Convert the PRD into implementation issues. These issues should follow the spirit of the to-issues workflow: each issue should be an independently grabbable vertical slice of work.

A vertical slice is a small, testable piece of user-facing behavior. It should cut across the necessary parts of the system, such as UI, logic, storage, API, and tests.

**Weak horizontal issue breakdown**

Avoid this style:

Issue 1: Create database

Issue 2: Build backend

Issue 3: Build frontend

Issue 4: Add CSS

Issue 5: Write tests

This separates work by technical layer and delays user-visible progress.

**Better vertical-slice issue breakdown**

Prefer this style:

Issue 1: User can create a task

Issue 2: User can view the task list

Issue 3: User can mark a task as completed

Issue 4: User can delete a task

Issue 5: User sees validation errors for invalid task input

Each issue should be small enough to implement, test, and demonstrate.

**Required output**

Create:

docs/03-vertical-slice-issues.md

Also create the issues in GitHub Issues.

Minimum required issues:

- 5-8 vertical-slice issues
- At least 4 AFK issues
- At least 1 HITL issue
- Clear acceptance criteria for every issue
- Dependency order shown clearly

**AFK and HITL**

Use these simple definitions:

- **AFK**: Clear enough to implement directly without additional product or design decisions.
- **HITL**: Human-in-the-loop. Requires a decision from the student, team, or instructor before implementation.

**Required issue format**

\# Title

Short feature-oriented title.

\## Type

AFK or HITL

\## What to build

Describe the end-to-end behavior this slice delivers.

\## User stories covered

\- As a ..., I want ..., so that ...

\## Acceptance criteria

\- [ ] Criterion 1

\- [ ] Criterion 2

\- [ ] Criterion 3

\## Blocked by

None, or list the issue that must be completed first.

\## Testing notes

How this slice should be verified.

\## AI usage notes

How AI may be used and what must be manually checked.

-----
**9. Stage 4: Design Before Coding**

Before implementation, create a simple design document. This does not need to be long, but it must show that you thought before coding.

**Required output**

Create:

docs/04-design.md

It must include at least four of the following:

- UI sketch or wireframe
- User flow
- Component breakdown
- Data model
- API design
- File/module structure
- Architecture diagram
- Technology stack decision
- Important trade-offs

**Example AI prompt**

Based on this PRD and these vertical-slice issues, propose a simple design for a two-day implementation. Include user flow, component breakdown, data model, file structure, and trade-offs. Keep the design small and practical.

-----
**10. Stage 5: Implementation with AI Assistance**

Implement selected vertical-slice issues one at a time. Use AI to help you understand, design, code, debug, and review, but do not blindly copy AI output.

**Required GitHub workflow**

You must show evidence of:

- GitHub repository
- GitHub Issues
- At least 3 meaningful commits
- At least 1 feature branch
- At least 1 pull request
- Pull request linked to at least 1 issue
- README with setup and usage instructions

Recommended branch names:

feature/create-task

feature/view-task-list

feature/form-validation

fix/mobile-layout

Recommended commit message style:

Add task creation form

Implement task list rendering

Add validation for empty task title

Fix responsive layout on mobile

**Example AI prompt**

Help me implement this vertical-slice issue. Before writing code, explain which files need to change, what behavior will be added, and how I should test it. Keep the solution small and easy to understand.

-----
**11. Stage 6: Test-Driven Development**

For selected issues, use a red-green-refactor cycle.

**What red-green-refactor means**

- **RED**: Write a test for one expected behavior. Run it and confirm that it fails.
- **GREEN**: Write the minimum implementation needed to make the test pass.
- **REFACTOR**: Improve the code while keeping the test passing.

**Minimum TDD requirement**

You must show evidence for at least **2 vertical-slice issues** using TDD.

For each TDD issue, include:

- The issue being tested
- Behavior under test
- The test you wrote first
- Evidence that the test failed at first
- Minimal implementation that made it pass
- Refactor note
- Final passing result

**Required output**

Create:

docs/05-tdd-and-testing.md

Use this structure:

\# TDD and Testing Report

\## Issue tested

Link to GitHub Issue.

\## Behavior under test

What user-visible behavior is being tested?

\## Public interface

What interface is tested? Example: UI form, API endpoint, component behavior, or function.

\## RED

What test was written first? What was the failing result?

\## GREEN

What minimal implementation made it pass?

\## REFACTOR

What was improved after the test passed?

\## Final result

Pass, fail, or known limitation.

**Example AI prompt**

Act as a TDD coach. For this vertical-slice issue, help me identify one behavior to test first. Write a test that uses the public interface, not private implementation details. Then guide me through red, green, and refactor.

-----
**12. Stage 7: Browser and Chrome DevTools Verification**

Automated tests are not enough. You must also verify the product in a real browser.

**Required browser checks**

Use Chrome and Chrome DevTools to check:

- Main user flow works
- Acceptance criteria are satisfied
- Invalid input is handled
- Console has no unexpected errors
- Layout works on at least one mobile-sized viewport
- Relevant network requests behave correctly, if your app uses an API
- Local storage/session storage is correct, if your app uses browser storage

**Evidence**

Add screenshots or notes in:

assets/screenshots/

docs/05-tdd-and-testing.md

Minimum evidence:

- One screenshot or log of a failing test
- One screenshot or log of a passing test
- One screenshot of the app working in the browser
- One note about Chrome DevTools checks

**Example AI prompt**

Act as a QA engineer. Based on this PRD and this implemented feature, create a browser test checklist. Include happy path, edge cases, invalid input, responsive layout, console errors, and Chrome DevTools checks.

-----
**13. Stage 8: Delivery**

Prepare your final project for submission.

**Required output**

Create or complete:

README.md

docs/06-reflection.md

Your README must include:

- Project name
- Short description
- Features implemented
- Tech stack
- Setup instructions
- How to run the app
- How to run tests
- Screenshots, if available
- Known limitations

Your reflection must answer:

1. How did you use AI during requirements clarification?
1. How did you use AI during PRD creation?
1. How did you use AI during issue breakdown?
1. How did you use AI during coding?
1. How did you use AI during testing?
1. Where did AI make mistakes or give weak suggestions?
1. What did you verify manually?
1. What software engineering decision are you most confident about?
1. What would you improve with more time?
-----
**14. Pull Request Template**

Create this file:

.github/pull\_request\_template.md

Use the following template:

\## Summary

What does this PR change?

\## Related Issue

Closes #...

\## Behavior implemented

What user-visible behavior does this PR deliver?

\## Changes made

\- 

\- 

\- 

\## TDD evidence

\- [ ] RED: failing test shown

\- [ ] GREEN: passing test shown

\- [ ] REFACTOR: improvement explained

\## Test command

\```bash

npm test

**Browser verification**

- ` `Feature tested manually
- ` `Console checked
- ` `Responsive layout checked
- ` `Edge cases checked

**AI usage**

How did AI help? What did you verify manually?

**Screenshots**

Add screenshots if relevant.

Adjust the test command if you are not using Node.js.

\---

\## 15. GitHub Issue Template

Create this file:

\```text

.github/ISSUE\_TEMPLATE/vertical-slice.md

Use the following template:

\# Title

Short feature-oriented title.

\## Type

AFK or HITL

\## What to build

Describe the end-to-end behavior this slice delivers.

\## User stories covered

\- As a ..., I want ..., so that ...

\## Acceptance criteria

\- [ ] Criterion 1

\- [ ] Criterion 2

\- [ ] Criterion 3

\## Blocked by

None, or list the issue that must be completed first.

\## Testing notes

How this slice should be verified.

\## AI usage notes

How AI may be used and what must be manually checked.

-----
**16. Submission Checklist**

Before submitting, make sure your repository contains:

- ` `README.md
- ` `docs/01-requirements.md
- ` `docs/02-prd.md
- ` `docs/03-vertical-slice-issues.md
- ` `docs/04-design.md
- ` `docs/05-tdd-and-testing.md
- ` `docs/06-reflection.md
- ` `Source code in src/ or equivalent
- ` `Tests in tests/ or equivalent
- ` `Screenshots or logs in assets/screenshots/
- ` `GitHub Issues created
- ` `At least 3 meaningful commits
- ` `At least 1 branch
- ` `At least 1 pull request
- ` `At least 2 TDD cycles documented
- ` `Browser verification completed
- ` `AI usage reflected honestly
-----
<w:p><w:r><w:br w:type="page"/></w:r></w:p>

**17. Grading Rubric**

**Requirements and PRD - 25%**

- Excellent: Clear problem, users, goals, non-goals, user stories, and acceptance criteria.
- Needs improvement: Vague, incomplete, or disconnected from the product.

**Vertical-slice issue breakdown - 20%**

- Excellent: Issues are user-facing, small, testable, dependency-aware, and include AFK/HITL classification.
- Needs improvement: Issues are horizontal, too large, unclear, or missing acceptance criteria.

**TDD process and evidence - 20%**

- Excellent: Clear red-green-refactor evidence for at least two issues.
- Needs improvement: Tests added only after coding, weak evidence, or unclear behavior tested.

**Implementation - 15%**

- Excellent: Working product with selected features implemented cleanly.
- Needs improvement: Product incomplete, unstable, or hard to run.

**Browser testing and Chrome DevTools verification - 10%**

- Excellent: Manual verification covers main flow, edge cases, console, and responsive behavior.
- Needs improvement: Minimal browser testing or no DevTools evidence.

**GitHub workflow and delivery - 5%**

- Excellent: Repository is organized, issues/branches/PRs are meaningful, and README is useful.
- Needs improvement: Repository is disorganized or missing workflow evidence.

**Reflection on AI use - 5%**

- Excellent: Honest, specific reflection on AI benefits, mistakes, and manual verification.
- Needs improvement: Generic reflection or no discussion of AI limitations.
-----
**18. AI Usage Policy**

AI may be used for:

- Asking clarification questions
- Drafting requirements
- Drafting PRDs
- Breaking PRDs into vertical-slice issues
- Suggesting designs
- Explaining code
- Generating small code snippets
- Reviewing code
- Writing tests
- Debugging
- Creating test plans
- Improving documentation

However:

- You must understand and explain the work you submit.
- You must review and adapt AI output.
- You must verify generated code and tests.
- You must not submit AI output that you cannot explain.
- You must document how AI was used in your reflection and pull request.

A good rule:

*AI can help you move faster, but it cannot be responsible for your engineering decisions.*

-----
**19. Suggested Two-Day Schedule**

**Day 1**

|**Time / Session**|**Activity**|**Output**|
| :- | :- | :- |
|Session 1|Choose product idea and use AI to clarify requirements|01-requirements.md|
|Session 2|Convert requirements into PRD|02-prd.md|
|Session 3|Break PRD into vertical-slice issues|03-vertical-slice-issues.md and GitHub Issues|
|Session 4|Create design document and repository structure|04-design.md, GitHub repo setup|

**Day 2**

|**Time / Session**|**Activity**|**Output**|
| :- | :- | :- |
|Session 5|Implement selected vertical-slice issues|Source code, commits, branch|
|Session 6|Apply TDD to at least two issues|Tests and TDD evidence|
|Session 7|Browser and Chrome DevTools verification|Screenshots/logs, testing report|
|Session 8|Final delivery and reflection|README, reflection, final demo|

-----
**20. Final Submission**

Submit the GitHub repository link. The repository must be accessible to the instructor.

Your final project will be evaluated based on both:

1. The working software product.
1. The visible software engineering process used to create it.

Remember: the goal is not only to build an app. The goal is to experience how software engineering turns a vague idea into a tested and delivered product, with AI used responsibly as an assistant throughout the process.
