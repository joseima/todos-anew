import { useState } from "react"
import { Todos } from "./components/Todos"
import { useTodos } from "./hooks/useTodos"
import { type TodoId, Todo as TodoType, FilterValue, TodoTitle, type ListOfTodos } from "./types"
import { Footer } from "./components/Footer"
import { TODO_FILTERS } from "./consts"
import { Header } from "./components/Header"



const App  = (): JSX.Element => {
  const {todos, removeTodo, completeTodo, removeCompleted, addNewTodo } : {
    todos: ListOfTodos;
    removeTodo: (id: TodoId) => void;
    completeTodo: ({id, completed} :  Pick<TodoType, 'id' | 'completed'>) => void;
    removeCompleted: () => void;
    addNewTodo: (title: TodoTitle) => void;
  } = useTodos();

  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemove = ({id}: TodoId) => {
      removeTodo({id})
  }

  const handleCompleted = ({id, completed} :  Pick<TodoType, 'id' | 'completed'> ): void => {
    completeTodo({id, completed})
  }

  const handleFilterChange = (filter: FilterValue) : void =>  {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
      removeCompleted()
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount


  const handleAddTodo = ({title}: TodoTitle): void => {
    addNewTodo({title})
  }

  return (
      <main>
        <Header onAddTodo={handleAddTodo} />
       <Todos 
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos} />
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          onClearCompleted={handleRemoveAllCompleted}
          handleFilterChange={handleFilterChange}
        />
      </main>
  )
}

export default App
