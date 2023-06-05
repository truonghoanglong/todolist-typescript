import { useState } from 'react'
import style from './taskInput.module.scss'
import { Todo } from '../../@types/doto.type'

interface TaskInputProps {
    addTodos: (name: string) => void
    currentTodo: Todo | null
    editTodo: (name: string) => void
    finnishEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
    const { addTodos, currentTodo, editTodo, finnishEditTodo } = props

    const [name, setName] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (currentTodo) {
            finnishEditTodo()
            if (name) setName('')
        } else {
            addTodos(name)
            setName('')
        }
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (currentTodo) {
            editTodo(value)
        } else {
            setName(value)
        }
    }

    return (
        <div className='mb-2'>
            <h1 className={style.title}>To do List typescript</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='caption gose here'
                    value={currentTodo ? currentTodo.name : name}
                    onChange={onChangeInput}
                />
                <button type='submit'>{currentTodo ? '✒' : '➕'}</button>
            </form>
        </div>
    )
}
