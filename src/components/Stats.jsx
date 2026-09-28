import { useEffect } from 'react'

const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function Chip({ label, value, accent }) {
  return (
    <div className="rounded-2xl bg-cream px-3.5 py-2 text-center">
      <div className="text-[11px] tracking-wide text-mocha uppercase">{label}</div>
      <div className={`text-lg font-semibold ${accent ? 'text-leaf' : 'text-espresso'}`}>{value}</div>
    </div>
  )
}

function Donut({ percent }) {
  return (
    <div className="relative grid h-[68px] w-[68px] shrink-0 place-items-center">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="32" cy="32" r={RADIUS} fill="none" strokeWidth="7" className="stroke-sand-dark" />
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE}
          className="stroke-leaf transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-semibold text-espresso">{percent}%</span>
    </div>
  )
}

export default function Stats({
  total,
  done,
  remaining,
  onClearDone,
  onAskClear,
  onConfirmClear,
  onCancelClear,
  confirmingClear,
}) {
  useEffect(() => {
    if (!confirmingClear) return
    const timer = window.setTimeout(onCancelClear, 4000)
    return () => window.clearTimeout(timer)
  }, [confirmingClear, onCancelClear])

  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <section className="mt-5 rounded-3xl bg-sand/60 p-5">
      <div className="flex items-center gap-4">
        <Donut percent={percent} />
        <div className="grid flex-1 grid-cols-3 gap-2">
          <Chip label="Total" value={total} />
          <Chip label="Done" value={done} accent />
          <Chip label="Remaining" value={remaining} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:mt-4">
        <button
          type="button"
          onClick={onClearDone}
          disabled={done === 0}
          className="min-h-11 text-sm text-mocha transition-colors duration-150 hover:text-latte-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-mocha focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none sm:min-h-0"
        >
          Clear completed
        </button>

        {confirmingClear ? (
          <span className="flex flex-wrap items-center justify-end gap-x-3 text-sm">
            <span className="text-mocha">Clear everything?</span>
            <button
              type="button"
              onClick={onConfirmClear}
              className="min-h-11 font-medium text-rose transition-colors duration-150 hover:text-rose/80 focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none sm:min-h-0"
            >
              Yes, clear all
            </button>
            <button
              type="button"
              onClick={onCancelClear}
              className="min-h-11 text-mocha transition-colors duration-150 hover:text-espresso focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none sm:min-h-0"
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={onAskClear}
            disabled={total === 0}
            className="min-h-11 text-sm text-mocha transition-colors duration-150 hover:text-rose disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-mocha focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none sm:min-h-0"
          >
            Clear all
          </button>
        )}
      </div>
    </section>
  )
}
