import { AsanaCard } from "../components/asana_card";
import { SearchBar } from "../components/search_bar";
import '../styles/menu_asanas.css';

export function ElementoAsanas() {
    return (
        <>
            <header id='header'>
                <div id='header-title-section'>
                    <h1>Nombre Posicion</h1>
                    <SearchBar />
                </div>
            </header>
            <main id='menu-content'>
            
            <AsanaCard name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_QL75_UX500_CR0,234,500,281_.jpg"/>
            </main>
        </>
    )
}
