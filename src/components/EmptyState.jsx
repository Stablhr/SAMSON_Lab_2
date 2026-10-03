import { CoffeeIcon } from './icons.jsx'

export default function EmptyState() {
  return (
    <div className="mt-4 flex flex-col items-center gap-3 rounded-3xl bg-sand/50 px-5 py-10 text-center short-screen:py-6 sm:px-6 sm:py-12">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-sand text-latte-dark">
        <CoffeeIcon className="h-8 w-8" />
      </span>
      <p className="max-w-[22ch] text-sm text-mocha">Nothing here yet — add your first task.</p>
      <p className="max-w-[24ch] font-hand text-2xl text-latte">
        one small step at a time para hindi ka ma-stress
      </p>
    </div>
  )
}
