import {type TODO_FILTERS, FILTERS_BUTTONS} from '../consts'

export interface Todo  {
	id:string
    title: string
    completed: boolean
}

export type TodoId = Pick<Todo, 'id'> 
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]


export interface UseTodos {
    todos: ListOfTodos;
    removeTodo: (id: TodoId) => void;
    completeTodo: ({id, completed} :  Pick<TodoType, 'id' | 'completed'>) => void;
    removeCompleted: () => void;
    addNewTodo: (title: TodoTitle) => void;
  }

export interface UseFilters {
    filteredTodos: ListOfTodos
    filterTodos: (todos: ListOfTodos) => void;
    filterSelected: FilterValue;
    activeCount: number;
    completedCount: number;
    changeFilter: (filter: FilterValue) => void;
  }