import { supabase } from './supabaseClient'

export const getTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*')

    if (error) {
        throw error;
    }

    return data || []
}


export const createTodo = async (todo) => {
    const { data, error } = await supabase.from('todos').insert(todo).select()
    if (error) throw error;

    return data[0] || null
}

export const updateTodo = async (id, todo) => {
    const { data, error } = await supabase.from('todos').update(todo).eq('id', id).select()
    if (error) throw error;

    return data[0] || null
}

export const deleteTodo = async (id) => {
    const { data, error } = await supabase.from('todos').delete().eq('id', id)

    if (error) {
        throw error;
    }

    return data
}