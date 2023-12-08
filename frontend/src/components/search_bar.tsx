import Search from '../assets/icons/search.svg'
import Reset from '../assets/icons/reset.svg'
import '../styles/search_bar.css'
import { useState } from 'react'

type SearchBarProps = {
    search: string;
    setSearch: (search: string) => void;
    filterAsanas: () => void;
    resetSearch: () => void;
}

export function SearchBar({ search, setSearch, filterAsanas, resetSearch }: SearchBarProps) {
    const [ searching, setSearching ] = useState(false)
    return (
        <div id="search-bar">
            {
                searching
                ?
                <img src={Reset} alt="Reset icon" id='reset-icon' onClick={() => { resetSearch(); setSearching(false); }}/>
                :
                <img src={Search} alt="Search icon" id='search-icon'/>
            }
            <input 
                type="text" 
                value={search} 
                placeholder="Búsqueda por nombre..." 
                onChange={(text) => {
                    const textValue = text.target.value 
                    textValue !== '' ? setSearching(true) : setSearching(false)
                    setSearch(textValue);
                }
            }/>
            <button onClick={() => { filterAsanas() }}>Buscar</button>
        </div>
    )
}