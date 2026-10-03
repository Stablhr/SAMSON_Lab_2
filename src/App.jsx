import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import ProgressStrip from './components/ProgressStrip.jsx'
import Stats from './components/Stats.jsx'
import TabBar from './components/TabBar.jsx'
import TaskInput from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'
import UserGuide from './components/UserGuide.jsx'
import { loadTasks, saveTasks } from './lib/storage.js'

const newId = () => globalThis.crypto?.randomUUID?.() ?? Date.now()

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Hand-rolled so the label reads "29 Sep · Tuesday" as in the reference mockup;
// Intl's en-GB short month renders "Sept".
const today = new Date()
const dateLabel = `${today.getDate()} ${MONTHS[today.getMonth()]} · ${DAYS[today.getDay()]}`

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [input, setInput] = useState('')
  const [view, setView] = useState('tasks')
  const [confirmingClear, setConfirmingClear] = useState(false)
  // On a phone the on-screen keyboard shrinks the visible area but not the layout
  // viewport, so the fixed tab bar would end up stranded under the keys.
  const [composing, setComposing] = useState(false)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const total = tasks.length
  const done = tasks.filter((task) => task.done).length
  const remaining = total - done

  // Array.prototype.sort is stable, so insertion order survives within each group.
  const orderedTasks = useMemo(
    () => [...tasks].sort((a, b) => Number(a.done) - Number(b.done)),
    [tasks],
  )

  function handleAdd() {
    const text = input.trim()
    if (!text) return
    setTasks([...tasks, { id: newId(), text, done: false }])
    setInput('')
  }

  function handleToggle(id) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function handleClearDone() {
    setTasks(tasks.filter((task) => !task.done))
  }

  function handleClearAll() {
    setTasks([])
    setConfirmingClear(false)
  }

  function handleViewChange(next) {
    setView(next)
    setConfirmingClear(false)
  }

  return (
    <div className="min-h-dvh bg-cream">
      <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col sm:my-6 sm:h-[calc(100dvh-3rem)] sm:min-h-0 sm:rounded-3xl sm:border sm:border-sand-dark/50 sm:shadow-card">
        <main className="scroll-area safe-x app-pt flex-1 overflow-y-auto overscroll-contain pb-32 short-screen:pb-6 sm:min-h-0 sm:pb-6">
          {view === 'tasks' ? (
            <>
              <Header title="Today" date={dateLabel} />
              <ProgressStrip total={total} done={done} />
              <TaskInput
                value={input}
                onChange={setInput}
                onAdd={handleAdd}
                onFocus={() => setComposing(true)}
                onBlur={() => setComposing(false)}
              />
              <TaskList tasks={orderedTasks} onToggle={handleToggle} onDelete={handleDelete} />
              <Stats
                total={total}
                done={done}
                remaining={remaining}
                confirmingClear={confirmingClear}
                onClearDone={handleClearDone}
                onAskClear={() => setConfirmingClear(true)}
                onConfirmClear={handleClearAll}
                onCancelClear={() => setConfirmingClear(false)}
              />
            </>
          ) : (
            <>
              <Header title="Guide" />
              <UserGuide />
            </>
          )}
        </main>

        <div
          className={`safe-x safe-pb fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-cream to-transparent pt-8 transition-[opacity,transform] duration-200 ease-out sm:static sm:shrink-0 sm:bg-none sm:p-5 ${
            // Parked (not display:none) so the state survives a remount of the
            // list while the field keeps focus; the sm: overrides un-hide it on
            // wider screens, where no keyboard can cover it.
            composing
              ? 'pointer-events-none translate-y-full opacity-0 sm:pointer-events-auto sm:translate-y-0 sm:opacity-100'
              : ''
          }`}
        >
          <TabBar view={view} onChange={handleViewChange} />
        </div>
      </div>
    </div>
  )
}
