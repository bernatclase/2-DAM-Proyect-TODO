import { useState, useEffect, useCallback } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todosApi'

export const useTodos = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const todos = await getTodos()
            setTodos(todos)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const create = useCallback(async (todoData) => {
        setLoading(true)
        try {
            const newTodo = await createTodo(todoData)
            setTodos(prevTodos => [...prevTodos, newTodo])
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [todos])

    const update = useCallback(async (id, updateData) => {
        setLoading(true)
        try {
            const updatedTodo = await updateTodo(id, updateData)

            setTodos(prevTodos =>
                prevTodos.map(t => t.id === id ? updatedTodo : t)
            )
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [todos])

    const remove = useCallback(async (id) => {
        setLoading(true)
        try {
            await deleteTodo(id)
            setTodos(prevTodos => prevTodos.filter(t => t.id !== id))
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [todos])

    useEffect(() => {
        load()
    }, [load])

    return {
        todos,
        loading,
        error,
        create,
        update,
        remove
    }
}