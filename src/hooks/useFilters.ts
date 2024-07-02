import { useState } from "react"
import { useTodos } from "./useTodos"
import {  FilterValue, type ListOfTodos, type UseFilters } from "../types"
import { TODO_FILTERS } from "../consts"

 export  const useFilters = (): UseFilters => {
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
    const {todos } : {
      todos: ListOfTodos;
    } = useTodos();

  
    const activeCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.length - activeCount
  
    const changeFilter = (filter : FilterValue) => {
      setFilterSelected(filter)
    }
  
    return { activeCount, completedCount, changeFilter, filterSelected }
  }