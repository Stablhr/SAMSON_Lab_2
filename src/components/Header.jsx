import { CoffeeIcon } from './icons.jsx'

export default function Header({ title, date }) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="truncate text-3xl font-medium tracking-[0.16em] text-espresso uppercase sm:text-4xl">
          {title}
        </h1>
        {date ? <p className="mt-1 text-sm text-mocha">{date}</p> : null}
      </div>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sand text-latte-dark">
        <CoffeeIcon className="h-6 w-6" />
      </span>
    </header>
  )
}
