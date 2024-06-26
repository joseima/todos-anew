import { type  TodoTitle } from "../types"
import { CreateTodo } from "./CreateTodo"

interface Props {
    onAddTodo: ({title}: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ 
    onAddTodo
}) => {
    return (
        <header className="header">
           <h1>Daily Todos</h1>
           <p>Write your new task here and Enter:</p>
           <CreateTodo saveTodo={onAddTodo} />
        </header>
    )
}