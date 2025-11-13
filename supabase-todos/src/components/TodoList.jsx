import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, onUpdate, onDelete }) => {
    const todosToMap = todos || []

    const validTodos = todosToMap.filter(t => t)

    return (
        <ul>
            {validTodos.map((todo, index) => (
                <TodoItem key={index} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </ul>
    )
}