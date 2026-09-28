# Plan.md — To-Do List Website

A to-do list website built with **React** and **Tailwind CSS**, visually inspired by Apple Reminders and the warm, minimal planner mockup provided as the UI reference (see `Design.md`).

---

## 1. Goals

- Deliver a clean, single-page to-do app that covers every required feature.
- Demonstrate React fundamentals: `useState`, event handlers, conditional rendering, list rendering with keys.
- Match the warm cream/brown visual style of the reference mockup.
- Include an on-page Instructions / User Guide.

## 2. Requirements Checklist

### Main page (To-Do List Interface)
- [x] Text input for adding tasks
- [x] **Add Task** button
- [x] List of added tasks
- [x] **Done** / **Not Done** status shown on every task
- [x] Button to mark a task as Done or Not Done
- [x] **Delete** button to remove a task

### Instructions / User Guide
- [x] How to add a task
- [x] How to mark a task as Done or Not Done
- [x] How to delete a task

### React features (minimum 3 interactive features)
- [x] Adding tasks dynamically
- [x] Marking tasks as Done / Not Done
- [x] Deleting tasks
- [x] Clear / reset functionality
- [x] State updates with `useState`
- [x] Button click events (`onClick`)

## 3. Tech Stack

| Area | Choice |
| --- | --- |
| Framework | React 19 (functional components + hooks) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 (CSS-first `@theme`, Vite plugin) |
| State | `useState` only (no external state library) |
| Lint | oxlint (`npm run lint`) |
| Fonts | Google Fonts, loaded via `<link>` (see `Design.md`) |
| Persistence | `localStorage`, key `todo.tasks.v1` |

## 4. Data Model

```js
// A single task
{
  id: number | string,   // unique, e.g. Date.now()
  text: string,          // the task title
  done: boolean          // false = Not Done, true = Done
}
```

## 5. State Design

All state lives in `App.jsx` and is passed down via props.

| State | Type | Purpose |
| --- | --- | --- |
| `tasks` | `Task[]` | The list of tasks (persisted) |
| `input` | `string` | Controlled value of the text input |
| `view` | `'tasks' \| 'guide'` | Which page/tab is showing |

Derived values (`total`, `done`, `remaining`, the sorted list) are computed during render, not
stored. The list is sorted with `Number(a.done) - Number(b.done)` so **Done tasks sink to the
bottom**; `Array.prototype.sort` is stable, so insertion order is preserved within each group.

### State updates

- **Add:** `setTasks([...tasks, { id, text: input.trim(), done: false }])`, then `setInput('')`. Ignore empty input.
- **Toggle:** `setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))`
- **Delete:** `setTasks(tasks.filter(t => t.id !== id))`
- **Clear all / reset:** `setTasks([])` (behind a two-step confirm)
- **Clear completed:** `setTasks(tasks.filter(t => !t.done))`

### Persistence

`src/lib/storage.js` exposes two pure functions, `loadTasks()` and `saveTasks(tasks)`. The initial
list is read with a lazy `useState(loadTasks)` initializer and a single `useEffect` writes every
change back:

```js
const [tasks, setTasks] = useState(loadTasks)

useEffect(() => { saveTasks(tasks) }, [tasks])
```

A lazy initializer is used rather than a mount-time `useEffect` on purpose: under `StrictMode`
effects run twice, so a read effect paired with a write effect would save `[]` over the stored list
before the second read. `loadTasks` also tolerates a missing, malformed or hand-edited value and
returns `[]` rather than throwing.

## 6. Component Structure

```
.
├── index.html                # Fonts (<link>), title
├── package.json
├── vite.config.js            # react() + tailwindcss()
├── .oxlintrc.json
├── Design.md
├── Plan.md
└── src/
    ├── main.jsx
    ├── index.css              # @import "tailwindcss" + @theme + reduced-motion
    ├── App.jsx                # State owner, layout, tab switching
    ├── lib/storage.js         # loadTasks() / saveTasks()
    └── components/
        ├── icons.jsx          # Coffee, Check, Trash, List, Book
        ├── Header.jsx         # "TODAY" title + date
        ├── ProgressStrip.jsx  # Thin Done/Total bar
        ├── TaskInput.jsx      # Text input + Add Task button
        ├── TaskList.jsx       # Renders the list or empty state
        ├── TaskItem.jsx       # Checkbox circle, text, status badge, delete
        ├── EmptyState.jsx     # Coffee glyph + prompt
        ├── Stats.jsx          # Total / Done / Remaining, donut, clear buttons
        ├── UserGuide.jsx      # Instructions section
        └── TabBar.jsx         # Bottom navigation (Tasks / Guide)
```

### Component responsibilities

| Component | Props | Notes |
| --- | --- | --- |
| `TaskInput` | `value`, `onChange`, `onAdd` | Enter key also triggers add |
| `TaskList` | `tasks`, `onToggle`, `onDelete` | Shows empty state when no tasks |
| `TaskItem` | `task`, `onToggle`, `onDelete` | Displays **Done** / **Not Done** label |
| `EmptyState` | none | Shown when the list is empty |
| `ProgressStrip` | `total`, `done` | `role="progressbar"` |
| `Stats` | `total`, `done`, `remaining`, `onClearDone`, `onAskClear`, `onConfirmClear`, `onCancelClear`, `confirmingClear` | Derived counts; owns only the confirm auto-reset timer |
| `UserGuide` | none | Static content, 3 steps |
| `TabBar` | `view`, `onChange` | Switches between Tasks and Guide |

## 7. Build Steps

1. **Scaffold** — Vite + React, install `tailwindcss` and `@tailwindcss/vite`, wire the plugin. ✅
2. **Theme** — Declare the palette, fonts, radii and shadows via `@theme` in `index.css` (`Design.md` §11). ✅
3. **Layout shell** — `App`, `Header` and `TabBar` with the cream background and centered card. ✅
4. **Add tasks** — `TaskInput` with controlled input, Add Task button, Enter key, empty-input guard. ✅
5. **Task list** — `TaskList` and `TaskItem` with the circular checkbox, title, and status. ✅
6. **Toggle** — Wire the checkbox and status badge to `onToggle`. ✅
7. **Delete** — Wire the Delete button to `onDelete`. ✅
8. **Clear / reset** — "Clear all" with a two-step confirm, plus "Clear completed". ✅
9. **Stats** — Total / Done / Remaining chips and the donut progress ring. ✅
10. **User Guide** — the three-step instructions section. ✅
11. **Persistence** — `localStorage` load on init, save on change. ✅
12. **Polish** — Empty state, hover / focus / active states, transitions, reduced motion, responsive tweaks. ✅
13. **QA** — `npm run lint`, `npm run build`, and a scripted browser pass over the acceptance criteria. ✅

## 8. Acceptance Criteria

- [x] Typing a task and clicking **Add Task** (or pressing Enter) adds it to the list and clears the input.
- [x] Empty or whitespace-only input does not create a task.
- [x] Every task visibly shows **Done** or **Not Done**.
- [x] Clicking the toggle flips the status and updates the styling (muted, strikethrough when Done).
- [x] Clicking **Delete** removes only that task.
- [x] **Clear completed** removes only Done tasks; **Clear all** empties the list behind a confirm.
- [x] The User Guide clearly explains adding, toggling and deleting.
- [x] The UI matches the reference style and works on mobile and desktop widths.
- [x] Tasks survive a page refresh, and a corrupted `localStorage` value does not break the app.

## 9. Stretch Goals (remaining, optional)

- Filter tabs: All / Done / Not Done.
- Inline task editing.
- Dark mode.
- Multi-day / due-date views.

## 10. Deliverables

- Working React + Tailwind project (`npm install && npm run dev`)
- `Plan.md` (this file)
- `Design.md`
