import { useState } from "react"
import { useTodos } from "./useTodos"
import {  FilterValue, type ListOfTodos, type UseFilters } from "../types"
import { TODO_FILTERS } from "../consts"

 export  const useFilters = (): UseFilters => {
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
    const {todos } : {
      todos: ListOfTodos;
    } = useTodos();
  
    const filterTodos = (todos: ListOfTodos) => {
      const newFilteredTodos= todos.filter(todo => {
        if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
        if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
        return todo
      })  
      return newFilteredTodos
    }
   const filteredTodos = filterTodos(todos)

    const activeCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.length - activeCount
  
    const changeFilter = (filter : FilterValue) => {
      setFilterSelected(filter)
    }
  
    return { filteredTodos, filterTodos, activeCount, completedCount, changeFilter, filterSelected }
  }