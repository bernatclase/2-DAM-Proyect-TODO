import React, { useState } from 'react'
import '../index.css'

export const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false)

    const [editText, setEditText] = useState(todo.text)

    const handleSave = () => {
        if (editText.trim() && editText !== todo.text) {

            const updatedFields = { text: editText.trim() }
            onUpdate(todo.id, updatedFields)
        }

        setIsEditing(false)
    }

    const handleToggleDone = () => {
        const updatedFields = { done: !todo.done }
        onUpdate(todo.id, updatedFields)
    }

    return (
        <li>
            <input
                type='checkbox'
                checked={todo.done}
                onChange={handleToggleDone}
            />

            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSave()
                        }
                    }}
                />
            ) : (

                <span>{todo.text}</span>
            )}


            {isEditing ? (

                <button className='button-primary' onClick={handleSave}>Save</button>
            ) : (
                <button className='button-primary' onClick={() => setIsEditing(true)}>Edit</button>
            )}

            < button className='button-primary' onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    )
}