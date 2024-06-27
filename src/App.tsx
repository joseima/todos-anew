import { Todos } from "./components/Todos"
import { useTodos } from "./hooks/useTodos"
import { useFilters } from "./hooks/useFilters"
import { type TodoId, Todo as TodoType, FilterValue, TodoTitle, type ListOfTodos } from "./types"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { TODO_FILTERS } from "./consts"


const App  = (): JSX.Element => {
  const {todos, removeTodo, completeTodo, removeCompleted, addNewTodo } : {
    todos: ListOfTodos;
    removeTodo: (id: TodoId) => void;
    completeTodo: ({id, completed} :  Pick<TodoType, 'id' | 'completed'>) => void;
    removeCompleted: () => void;
    addNewTodo: (title: TodoTitle) => void;
  } = useTodos();

  const {activeCount, completedCount, changeFilter, filterSelected } : {
    filterSelected: FilterValue;
    activeCount: number;
    completedCount: number;
    changeFilter: (filter: FilterValue) => void;
  } = useFilters();

  const handleRemove = ({id}: TodoId) => {
      removeTodo({id})
  }

  const handleCompleted = ({id, completed} :  Pick<TodoType, 'id' | 'completed'> ): void => {
    completeTodo({id, completed})
  }

  const handleFilterChange = (filter: FilterValue) : void =>  {
    changeFilter(filter)
  }

  const handleRemoveAllCompleted = (): void => {
      removeCompleted()
  }

  const handleAddTodo = ({title}: TodoTitle): void => {
    addNewTodo({title})
  }
  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

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
