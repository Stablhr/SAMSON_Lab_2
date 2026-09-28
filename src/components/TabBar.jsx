import { BookIcon, ListIcon } from './icons.jsx'

const TABS = [
  { id: 'tasks', label: 'Tasks', Icon: ListIcon },
  { id: 'guide', label: 'Guide', Icon: BookIcon },
]

export default function TabBar({ view, onChange }) {
  return (
    <nav className="rounded-3xl bg-sand p-1.5 shadow-card">
      <ul className="flex items-center gap-1.5">
        {TABS.map(({ id, label, Icon }) => {
          const active = view === id
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none ${
                  active ? 'bg-cream text-latte-dark shadow-btn' : 'text-mocha hover:text-espresso'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
