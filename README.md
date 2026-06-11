# Student Task Tracker

> **Offline-first academic task management for students**

Student Task Tracker is a simple browser-based app for organizing assignments, deadlines, and study tasks across multiple subjects. It runs as a static web app, requires no login, and saves task data locally in the user's browser.

## Features

- **Add tasks:** Create tasks with a title, subject, and optional due date.
- **View task list:** See task details and completion status in one place.
- **Mark tasks complete:** Toggle tasks between active and completed states.
- **Delete tasks:** Remove tasks that are no longer needed.
- **Filter by status:** View all, active, or completed tasks.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Browser `localStorage`
- Jest

## Setup

Clone the repository and install the test dependencies:

```bash
git clone https://github.com/Prayerr10/student-task-tracker
cd student-task-tracker
npm install
```

## Run the App

The app requires no build step.

- Open `src/index.html` directly in a modern browser.
- Alternatively, open the project in VS Code and serve `src/index.html` using the Live Server extension.

## Run Tests

Run the Jest test suite:

```bash
npm test
```

## Project Structure

```text
student-task-tracker/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── vertical-slice.md
│   └── pull_request_template.md
├── assets/
│   └── screenshots/
├── docs/
│   ├── 01-requirements.md
│   ├── 02-prd.md
│   ├── 03-vertical-slice-issues.md
│   ├── 04-design.md
│   ├── 05-tdd-and-testing.md
│   └── 06-reflection.md
├── src/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── task-logic.js
├── tests/
│   └── task.test.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Known Limitations

- The app has no backend or cloud synchronization.
- The app has no user accounts or login system.
- Task data is stored only in one browser through `localStorage`.
- Clearing browser storage removes saved tasks.
- Tasks do not synchronize between devices or browsers.

## Screenshots

Testing and browser verification evidence are stored in the `assets/screenshots/` folder.

* RED failing test evidence: `assets/screenshots/red-failing-test.png`
* GREEN passing test evidence: `assets/screenshots/green-passing-test.png`
* App working in browser: `assets/screenshots/app-working-browser.png`
* Chrome DevTools localStorage check: `assets/screenshots/devtools-localstorage.png`
* Chrome DevTools console check: `assets/screenshots/devtools-console.png`
* Responsive layout check at 375px: `assets/screenshots/mobile-375px.png`

