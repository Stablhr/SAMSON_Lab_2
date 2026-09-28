import { CheckIcon, TrashIcon } from './icons.jsx'

export default function TaskItem({ task, onToggle, onDelete }) {
  const { id, text, done } = task

  return (
    <li className="animate-task-in flex items-center gap-2 py-2.5 sm:gap-3">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-pressed={done}
        aria-label={done ? `Mark "${text}" as not done` : `Mark "${text}" as done`}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none sm:h-9 sm:w-9"
      >
        <span
          className={`grid h-6 w-6 place-items-center rounded-full border-2 transition-[background-color,border-color,transform] duration-150 ease-out active:scale-90 ${
            done ? 'border-leaf bg-leaf text-white' : 'border-latte bg-transparent'
          }`}
        >
          {done ? <CheckIcon className="h-3.5 w-3.5" /> : null}
        </span>
      </button>

      <span
        className={`min-w-0 flex-1 text-base transition-colors duration-150 ${
          done ? 'text-mocha line-through' : 'text-espresso'
        }`}
      >
        {text}
      </span>

      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-label={done ? `Status: done. Change "${text}" to not done` : `Status: not done. Change "${text}" to done`}
        className={`min-h-11 shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none sm:min-h-0 ${
          done ? 'bg-leaf/15 text-leaf' : 'bg-sand text-mocha'
        }`}
      >
        {done ? 'Done' : 'Not Done'}
      </button>

      <button
        type="button"
        onClick={() => onDelete(id)}
        aria-label={`Delete task: ${text}`}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-mocha transition-colors duration-150 hover:bg-rose/10 hover:text-rose focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none sm:h-9 sm:w-9"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </li>
  )
}
