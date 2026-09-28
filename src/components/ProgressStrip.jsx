export default function ProgressStrip({ total, done }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div
      role="progressbar"
      aria-label="Tasks completed"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-sand-dark/70"
    >
      <div
        className="h-full rounded-full bg-latte-dark transition-[width] duration-200 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
