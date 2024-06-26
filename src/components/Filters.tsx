import { FILTERS_BUTTONS } from "../consts"
import { type FilterValue } from "../types"


interface Props {
    onFilterChange: (filter: FilterValue) => void
    filterSelected: FilterValue
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
    

    return (
       <ul className="filters">
        {
            Object.entries(FILTERS_BUTTONS).map(([key, {href, literal}]) => {
                return  (
                    <li key={key}>
                        < a 
                            className={key === filterSelected ? 'selected' : ''}
                            href={href}
                            onClick={(event) => {
                                event.preventDefault()
                                onFilterChange(key as FilterValue)}}
                        >
                            {literal}
                        </a>
                    </li>
                )
            }) 
        }
        
        {/* <li>
            <a className={`${filterSelected === 'all' ? 'selected' : ''}`}
                onClick={() => {onFilterChange('all')}}
            >All</a>
        </li>
        <li>
            <a className={`${filterSelected === 'active' ? 'selected' : ''}`}
                onClick={() => {onFilterChange('active')}}
            >Actives</a>
        </li>
        <li>
            <a className={`${filterSelected === 'completed' ? 'selected' : ''}`}
                onClick={() => {onFilterChange('completed')}}
            >Completed</a>
        </li> */}
       </ul>
    )
}