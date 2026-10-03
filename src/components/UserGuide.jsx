const STEPS = [
  {
    title: 'Add a task',
    body: 'Type your task in the input at the top, then press Add Task (or hit Enter). Your task appears in the list marked Not Done.',
  },
  {
    title: 'Mark Done / Not Done',
    body: 'Tap the circle next to a task, or its status badge. It switches between Not Done and Done. Tap again to switch back.',
  },
  {
    title: 'Delete a task',
    body: 'Press the trash Delete button on the right side of the task. To remove everything, use Clear all.',
  },
]

export default function UserGuide() {
  return (
    <ol className="mt-5 flex flex-col gap-3 short-screen:mt-3">
      {STEPS.map((step, index) => (
        <li key={step.title} className="flex gap-3 rounded-3xl bg-sand/60 p-4 sm:gap-4 sm:p-5">
          <span className="font-hand text-4xl leading-none text-latte">{index + 1}</span>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-espresso">{step.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-mocha">{step.body}</p>
          </div>
        </li>
      ))}
      <li className="px-1 pt-2 text-center font-hand text-2xl leading-tight text-latte">
        Samson, Aries B.
        <br />
        BSIT 3-3
      </li>
    </ol>
  )
}
