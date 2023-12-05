import Search from '../assets/icons/search.svg';
import '../styles/search_bar.css'

export function SearchBar() {
    return (
        <div id="search-bar">
            <img src={Search} alt="Search icon" />
            <input type="text" placeholder="Búsqueda por nombre..." />
            <button>Buscar</button>
        </div>
    )
}