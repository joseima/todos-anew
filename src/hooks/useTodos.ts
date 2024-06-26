
import { useState } from "react"
import { type TodoId, Todo as TodoType, TodoTitle, type ListOfTodos, type UseTodos } from "../types"
import { MOCK_TODOS } from "../consts"

export const useTodos = (): UseTodos  => {
  const [todos, setTodos] = useState<ListOfTodos>(MOCK_TODOS)


  const removeTodo = ({id}: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const removeCompleted = () => {
    const  newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos) 
  }
   const completeTodo = ({id, completed} :  Pick<TodoType, 'id' | 'completed'> ): void  => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
  })
    setTodos(newTodos)
   }

   const addNewTodo = ({title} : TodoTitle) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos) 
   }

   return { todos, removeTodo, completeTodo, removeCompleted, addNewTodo };
}
