import { useState } from 'react'
import style from './taskList.module.scss'
import { Todo } from '../../@types/doto.type'

interface TaskListProps {
    doneTaskList?: boolean
    todos: Todo[]
    handleDoneTodo: (id: string, done: boolean) => void
    startEditTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
    const { doneTaskList, todos, handleDoneTodo, startEditTodo } = props

    return (
        <div className='mb-2'>
            <h2 className={style.title}>
                {doneTaskList ? 'Hoàn Thành' : 'Chưa Hoàn Thành'}
            </h2>
            <div className={style.tasks}>
                {todos &&
                    todos.length > 0 &&
                    todos?.map((todo) => (
                        <div className={style.task} key={todo.id}>
                            <input
                                type='checkbox'
                                checked={todo.done}
                                className={style.taskCheckbox}
                                onChange={(event) =>
                                    handleDoneTodo(
                                        todo.id,
                                        event.target.checked
                                    )
                                }
                            />
                            <span
                                className={`${style.taskName} ${
                                    todo.done ? style.taskNameDone : ''
                                }`}
                            >
                                {todo.name}
                            </span>
                            <div className={style.taskAction}>
                                <button
                                    onClick={() => startEditTodo(todo.id)}
                                    className={style.taskBtn}
                                >
                                    🖍
                                </button>
                                <button className={style.taskBtn}>🗑</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
