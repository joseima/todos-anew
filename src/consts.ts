export const MOCK_TODOS = [
    {
      id: '1',
      title: 'todo 1',
      completed: false,
    },
    {
      id: '2',
      title: 'todo 2',
      completed: true,
    },
    {
      id: '3',
      title: 'todo 3',
      completed: false,
    }
  ]


export const TODO_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
  } as const
  

 export  const FILTERS_BUTTONS = {
    [TODO_FILTERS.ALL]: {
        literal: 'All',
        href: `/?filters=${TODO_FILTERS.ALL}`
    },
    [TODO_FILTERS.ACTIVE]: {
        literal: 'Actives',
        href: `/?filters=${TODO_FILTERS.ACTIVE}`
    },
    [TODO_FILTERS.COMPLETED]: {
        literal: 'Completed',
        href: `/?filters=${TODO_FILTERS.COMPLETED}`
    },
} as const


