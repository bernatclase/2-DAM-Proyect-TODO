// En AddTodo.jsx

import React, { useState } from 'react'
// Asegúrate de importar useState
import '../index.css'

export const AddTodo = ({ onAdd }) => {
    // 1. Definir el estado para el valor del input
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const todoText = text.trim() // Usamos el valor del estado

        if (todoText) {
            onAdd(todoText)

            // 2. Limpiar el input reseteando el estado a una cadena vacía
            setText('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='text'
                placeholder='Add todo'
                // 3. Establecer el valor controlado por el estado
                value={text}
                // 4. Actualizar el estado con cada cambio
                onChange={(e) => setText(e.target.value)}
            />
            <button className='button-primary' type='submit'>Add</button>
        </form>
    )
}