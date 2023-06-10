import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import style from './todoList.module.scss'
import { Todo } from '../../@types/doto.type'
import { AsyncLocalStorage } from 'async_hooks'

interface handleNewTodos {
    (todos: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewTodos: handleNewTodos) => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj = handleNewTodos(todosObj)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
    const doneTodo = todos.filter((todo) => todo.done)
    const notdoneTodo = todos.filter((todo) => !todo.done)

    useEffect(() => {
        const todosString = localStorage.getItem('todos')
        const todosObj: Todo[] = JSON.parse(todosString || '[]')
        setTodos(todosObj)
    }, [])

    const addTodos = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        setTodos((prev) => [...prev, todo])
        syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])
    }

    const deleteTodos = (id: string) => {
        if (currentTodo) {
            setCurrentTodo(null)
        }
        const handler = (todoObj: Todo[]) => {
            return todoObj.filter((todo) => todo.id !== id)
        }
        setTodos(handler)
        syncReactToLocal(handler)
    }

    const handleDoneTodo = (id: string, done: boolean) => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done }
                }
                return todo
            })
        })
    }

    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id)
        if (findedTodo) {
            setCurrentTodo(findedTodo)
        }
    }

    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) return { ...prev, name }
            return null
        })
    }

    const finnishEditTodo = () => {
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === currentTodo?.id) {
                    return currentTodo
                }
                return todo
            })
        }

        setTodos(handler)
        setCurrentTodo(null)
        syncReactToLocal(handler)
    }

    return (
        <div className={style.todoList}>
            <div className={style.todoListContainer}>
                <TaskInput
                    addTodos={addTodos}
                    currentTodo={currentTodo}
                    editTodo={editTodo}
                    finnishEditTodo={finnishEditTodo}
                />
                <TaskList
                    todos={notdoneTodo}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodos={deleteTodos}
                />
                <TaskList
                    doneTaskList
                    todos={doneTodo}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodos={deleteTodos}
                />
            </div>
        </div>
    )
}
