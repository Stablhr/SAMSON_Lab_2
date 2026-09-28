# Design.md — To-Do List Website

Design specification for the to-do list site. The look is based on the provided reference mockup ("Your day. Finally in focus.") and the general feel of Apple Reminders: calm, warm, minimal and easy to scan.

---

## 1. Design Principles

- **Simple. Beautiful. Effective.** Nothing on screen that does not help the user.
- **Warm and calm.** Cream backgrounds, soft browns, no harsh contrast or saturated colors.
- **Soft shapes.** Rounded corners and gentle shadows everywhere.
- **One small step at a time.** Generous spacing, one clear primary action.

## 2. Color Palette

Colors are sampled by eye from the reference and should be tuned once in the browser.

| Token | Hex | Usage |
| --- | --- | --- |
| `cream` | `#F7F1E8` | Page background |
| `sand` | `#EFE4D6` | Cards, input, inactive surfaces |
| `sand-dark` | `#E2D2BF` | Borders, dividers, pressed states |
| `latte` | `#B98A64` | Primary buttons, selected day, accents |
| `latte-dark` | `#9A6C47` | Button hover, progress bar, underline accents |
| `espresso` | `#3E2C22` | Primary text, headings |
| `mocha` | `#8C7565` | Secondary text, placeholders, muted (Done) text |
| `leaf` | `#6FAE5F` | "Done" status and progress ring |
| `rose` | `#C96B5C` | Delete hover / destructive actions |

## 3. Typography

| Role | Font | Weight | Size |
| --- | --- | --- | --- |
| Page title ("TODAY") | Inter or DM Sans | 500, uppercase, wide tracking | 32–40px |
| Section headings | Inter or DM Sans | 600 | 20–24px |
| Task text | Inter or DM Sans | 500 | 16px |
| Secondary text | Inter or DM Sans | 400 | 13–14px |
| Handwritten accents | Caveat (or Reenie Beanie) | 400–600 | 22–28px |

- Use the handwritten font sparingly: taglines such as "Simple. Beautiful. Effective." and small underline or circle doodles.
- Done tasks: `mocha` text with `line-through`.

## 4. Spacing, Radius and Shadows

- **Spacing scale:** Tailwind default (4px base). Card padding `p-5`, gaps between rows `gap-3`.
- **Radius:** inputs and buttons `rounded-2xl`, cards `rounded-3xl`, checkbox circle `rounded-full`.
- **Shadow (card):** `0 8px 24px rgba(120, 85, 55, 0.10)`
- **Shadow (button):** `0 2px 6px rgba(120, 85, 55, 0.15)`
- **Dividers:** 1px `sand-dark` at about 60% opacity between tasks.

## 5. Layout

### Overall
- Centered container, `max-w-md` on mobile-first layout, widening to `max-w-xl` on desktop.
- Full-height cream background with a subtle warm gradient (optional).
- Content sits on a rounded "phone-style" card on desktop, edge to edge on mobile.

### Main page (Tasks view), top to bottom
1. **Header:** "TODAY" title, date underneath (e.g. "29 Sep · Tuesday"), optional coffee-cup icon tile at top right.
2. **Progress strip:** thin `latte-dark` bar showing Done ÷ Total.
3. **Add task area:** wide `sand` input with placeholder "New task…" and an **Add Task** button in `latte`.
4. **Task list:** stacked rows separated by dividers.
5. **Stats card:** Total / Done / Remaining chips, plus a **Clear all** button.
6. **Bottom tab bar:** Tasks | Guide.

### User Guide view
- Same header style with the title "GUIDE".
- Three numbered cards: **Add a task**, **Mark Done / Not Done**, **Delete a task**.
- Optional handwritten note at the bottom.

## 6. Components

### 6.1 Task Input
- `sand` background, no visible border, `focus:ring-2 ring-latte/50`.
- Add Task button: `bg-latte text-white rounded-2xl px-5 py-3`, hover `bg-latte-dark`, active `scale-95`.
- Enter key submits.

### 6.2 Task Row
```
[ ○ ]  Task title                     [Not Done]   [ 🗑 ]
```
- **Checkbox circle** (left): 24px, 2px `latte` border. When Done, filled `leaf` with a white check icon.
- **Title:** `espresso` when Not Done; `mocha` + strikethrough when Done.
- **Status badge:**
  - Not Done: `sand` pill, `mocha` text, label "Not Done".
  - Done: `leaf/15` pill, `leaf` text, label "Done".
- **Toggle button:** clicking the circle or the status badge toggles the status. Include an accessible label ("Mark as Done" / "Mark as Not Done").
- **Delete button** (right): small icon button in `mocha`; hover turns `rose` with a light `rose/10` background.

### 6.3 Empty State
- Centered soft illustration or coffee icon, text "Nothing here yet — add your first task."
- Handwritten accent below.

### 6.4 Stats Card
- Three chips: **Total**, **Done**, **Remaining** (matching the "Total 6 / Done 1 / Remaining 5" style in the mockup).
- **Optional donut ring in `leaf` over `sand-dark` showing % done.** (Implemented.)
- **Clear completed button:** removes only tasks marked Done; disabled when none are Done.
- **Clear all** button: text button in `mocha`, hover `rose`. Requires a second click to confirm
  (it swaps to "Clear everything? / Yes, clear all / Cancel" and resets after 4 seconds).

### 6.5 Bottom Tab Bar
- Rounded `sand` bar floating at the bottom with two tabs (Tasks, Guide).
- Active tab: `latte` icon and label; inactive: `mocha`.

### 6.6 User Guide Cards
- `sand` card, `rounded-3xl`, large step number in `latte`, title in `espresso`, one-sentence description in `mocha`.

## 7. User Guide Content (copy)

1. **How to add a task:** Type your task in the input at the top, then press **Add Task** (or hit Enter). Your task appears in the list marked **Not Done**.
2. **How to mark a task as Done or Not Done:** Tap the circle next to a task, or its status badge. It switches between **Not Done** and **Done**. Tap again to switch back.
3. **How to delete a task:** Press the trash **Delete** button on the right side of the task. To remove everything, use **Clear all**.

## 8. Interaction and Motion

- Transitions: 150–200ms ease-out on color, scale and opacity.
- New task: gentle fade and slide-in.
- Delete: fade out before removal (optional).
- Checkbox: quick scale pop when toggled.
- Respect `prefers-reduced-motion`.

## 9. Responsive Behavior

| Breakpoint | Behavior |
| --- | --- |
| Mobile (< 640px) | Full-width content, tab bar fixed at bottom, comfortable tap targets (min 44px) |
| Tablet / Desktop (≥ 640px) | Centered card with `max-w-xl`, shadow and rounded corners, tab bar inside the card, list scrolls within the card |

## 10. Accessibility

- Text contrast: `espresso` on `cream` and `sand` passes AA; avoid `mocha` for essential small text on `sand-dark`.
- All buttons are real `<button>` elements with `aria-label`s (toggle, delete, clear all).
- Visible focus rings on all interactive elements.
- Status is communicated by text ("Done" / "Not Done"), not color alone.
- Input has an associated label (visually hidden if needed).

## 11. Tailwind Theme Setup

Tailwind **v4** is configured CSS-first: there is no `tailwind.config.js`. The theme is declared
with the `@theme` directive in `src/index.css`, and the build runs through the official Vite plugin.

```js
// vite.config.js
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-cream: #F7F1E8;
  --color-sand: #EFE4D6;
  --color-sand-dark: #E2D2BF;
  --color-latte: #B98A64;
  --color-latte-dark: #9A6C47;
  --color-espresso: #3E2C22;
  --color-mocha: #8C7565;
  --color-leaf: #6FAE5F;
  --color-rose: #C96B5C;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-hand: 'Caveat', cursive;

  --radius-3xl: 1.75rem;
  --shadow-card: 0 8px 24px rgb(120 85 55 / 0.1);
  --shadow-btn: 0 2px 6px rgb(120 85 55 / 0.15);
}
```

Notes:

- `sand-dark` and `latte-dark` are flat tokens (no `DEFAULT` nesting), giving `bg-sand-dark`, `text-latte-dark`, and so on.
- `--radius-3xl` replaces Tailwind's default `1.5rem` with `1.75rem`.
- Fonts load from a `<link>` in `index.html` rather than a CSS `@import`, to avoid a render-blocking request chain.
- Content detection is automatic in v4; no `content` array is needed.

## 12. Reference Notes

Elements taken from the provided mockup:
- Warm cream and brown palette
- Large uppercase "TODAY" header with date
- Wide "NEW TASK" action at the top
- Rounded checkbox on the left of each task with a small subtitle line
- Total / Done / Remaining stat chips and donut progress ring
- Bottom tab bar
- Handwritten tagline accents
