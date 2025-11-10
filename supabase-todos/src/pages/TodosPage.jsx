import { AddTodo, } from '../components/AddTodo'
import { TodoList } from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'

export const TodosPage = () => {
    const { todos, loading, error, create, update, remove } = useTodos()

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <div>
            <h1>Todos</h1>
            <AddTodo onAdd={(text) => create({ text: text, done: false })} />
            <TodoList todos={todos} onUpdate={(id, todo) => update(id, todo)} onDelete={(id) => remove(id)} />
        </div>
    )
}