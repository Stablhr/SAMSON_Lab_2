import TaskItem from './TaskItem.jsx'
import EmptyState from './EmptyState.jsx'

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <ul className="mt-4 divide-y divide-sand-dark/60">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
