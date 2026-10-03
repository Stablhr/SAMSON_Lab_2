export default function TaskInput({ value, onChange, onAdd, onFocus, onBlur }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      onAdd()
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-3 short-screen:mt-3 sm:flex-row">
      <label htmlFor="new-task" className="sr-only">
        New task
      </label>
      <input
        id="new-task"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="New task…"
        autoComplete="off"
        autoCapitalize="sentences"
        enterKeyHint="done"
        className="min-w-0 flex-1 rounded-2xl bg-sand px-4 py-3 text-base text-espresso placeholder:text-mocha focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
      />
      <button
        type="button"
        onClick={onAdd}
        className="w-full shrink-0 rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none sm:w-auto"
      >
        Add Task
      </button>
    </div>
  )
}
