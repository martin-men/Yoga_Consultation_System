import Search from '../assets/icons/search.svg'
import Reset from '../assets/icons/reset.svg'
import '../styles/search_bar.css'
import { useState } from 'react'

type SearchBarProps = {
    search: string;
    setSearch: (search: string) => void;
    filterAsanas: () => void;
    resetSearch: () => void;
    asanasSearch: boolean;
}

export function SearchBar({ search, setSearch, filterAsanas, resetSearch, asanasSearch }: SearchBarProps) {
    const [ searching, setSearching ] = useState(false)
    return (
        <div id="search-bar">
            <input 
                type="text" 
                value={search} 
                placeholder="Búsqueda por nombre..." 
                onChange={(text) => {
                    const textValue = text.target.value
                    setSearching(textValue !== '')
                    setSearch(textValue);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        filterAsanas();
                    }
                }}
            />
            {
                searching
                ?
                <button id='reset-button' className={asanasSearch ?  'green-button' : 'purple-button'} onClick={() => { resetSearch(); setSearching(false); }}><img src={Reset} alt="Reset icon" id='reset-icon'/></button>
                :
                <button id='search-button' className={asanasSearch ?  'green-button' : 'purple-button'} onClick={() => { filterAsanas() }}><img src={Search} alt="Reset icon" id='reset-icon'/></button>
            }
        </div>
    )
}