import Search from '../assets/icons/search.svg'
import Reset from '../assets/icons/reset.svg'
import '../styles/components/search_bar.css'
import { useEffect, useState } from 'react'

type SearchBarProps = {
    search: string;
    setSearch: (search: string) => void;
    viewAsanas: boolean;
    filterAsanas: () => void;
    filterMorphemes: () => void;
    resetSearch: () => void;
    asanasSearch: boolean;
}

export function SearchBar({ search, setSearch, viewAsanas, filterAsanas, filterMorphemes, resetSearch, asanasSearch }: SearchBarProps) {
    const [searching, setSearching] = useState(false)
    useEffect(() => {
        if (search === '') {
            setSearching(false)
        }
    })

    return (
        <div id="search-bar">
            {
                searching
                    ?
                    <button id='reset-button' className={asanasSearch ? 'green-button' : 'purple-button'} onClick={() => { resetSearch(); setSearching(false); }}><img src={Reset} alt="Reset icon" id='reset-icon' /></button>
                    :
                    <></>
            }
            <input
                type="text"
                value={search}
                placeholder="Búsqueda por nombre..."
                onChange={(text) => {
                    const textValue = text.target.value
                    setSearching(textValue !== '')
                    setSearch(textValue)
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        viewAsanas ? filterAsanas() : filterMorphemes();
                    }
                }}
            />
            <button id='search-button' className={asanasSearch ? 'green-button' : 'purple-button'} onClick={() => { viewAsanas ? filterAsanas() : filterMorphemes() }}><img src={Search} alt="Reset icon" id='reset-icon' /></button>
        </div>
    )
}
