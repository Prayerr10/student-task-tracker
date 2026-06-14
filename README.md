# Student Task Tracker

> Offline-first academic task management for students.

Student Task Tracker is a small browser app for tracking Academic Tasks by status, due date, and completion state. It runs as a static site, stores data locally in the browser, and supports a focused workflow for adding, filtering, completing, and deleting tasks.

## Core Features

- Add Academic Tasks with title, course, and due date.
- View Academic Tasks in a clear list with status badges and overdue markers.
- Mark tasks as Pending or Completed.
- Filter by All, Pending, and Completed using accessible segmented native buttons.
- Delete tasks through an accessible confirmation dialog.
- Persist tasks in browser `localStorage`, with recovery and save-failure handling.
- Keep the app usable on desktop and 320px mobile viewports.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Browser `localStorage`
- Jest
- Chrome DevTools MCP for browser verification

## Setup

```bash
git clone https://github.com/Prayerr10/student-task-tracker
cd student-task-tracker
npm install
```

## Run the App

Open `src/index.html` directly in a modern browser, or serve the `src/` folder with any static file server.

## Run Tests

```bash
npm test
```

## Final Delivery Evidence

Final browser verification and regression evidence:

- [Final empty state after deleting the last task](assets/screenshots/issue-27-final-empty-state-320.png)
- [Filtered empty state before the final delete](assets/screenshots/issue-27-filtered-empty-state-320.png)

Historical TDD and browser evidence from earlier issues remains in `assets/screenshots/` and is documented in `docs/05-tdd-and-testing.md`.

## Engineering Workflow

The project followed a vertical-slice workflow:

1. Clarify requirements.
2. Publish a PRD.
3. Break the PRD into independently grabbable issues.
4. Approve the interface and design decisions.
5. Implement one issue at a time with TDD.
6. Verify each slice in Chrome using Chrome DevTools MCP.
7. Review, merge, and close the issue before moving on.

## Browser Verification

AI-operated browser verification was performed with Chrome DevTools MCP. The final pass covered empty states, filtering, deletion, keyboard and focus behavior, refresh behavior, console cleanliness, and 320px layout checks.

## Known Limitations

- No backend or cloud synchronization.
- No user accounts or authentication.
- Data lives only in the current browser profile through `localStorage`.
- Clearing browser storage removes saved Academic Tasks.
- The app does not synchronize across devices or browsers.

## Project Structure

```text
student-task-tracker/
|-- assets/
|   `-- screenshots/
|-- docs/
|   |-- 01-requirements.md
|   |-- 02-prd.md
|   |-- 03-vertical-slice-issues.md
|   |-- 04-design.md
|   |-- 05-tdd-and-testing.md
|   `-- 06-reflection.md
|-- src/
|   |-- index.html
|   |-- style.css
|   |-- app.js
|   `-- task-logic.js
|-- tests/
|   `-- task.test.js
|-- package.json
`-- README.md
```
