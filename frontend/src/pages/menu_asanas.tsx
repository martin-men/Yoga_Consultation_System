import { AsanaPreview } from "../components/asana_preview";
import { SearchBar } from "../components/search_bar";
import '../styles/menu_asanas.css';

export function MenuAsanas() {
    return (
        <>
            <header id='header'>
                <div id='header-title-section'>
                    <h1>·Asanas·Learn·</h1>
                    <SearchBar />
                </div>
                <h2>Posturas - Asanas - Postures</h2>
            </header>
            <main id='menu-content'>
                <div className='row'>
                    <AsanaPreview name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAJ1BMVEV5vZr/suCU57x/P5jWoPJ3upeW6r6W8L99KJV3NJDcpvjTn/P/s9+fI4b2AAABCElEQVR4nO3QQQGAIAAEMERARfrnpcN9+GwRVkqkj5p43jvxzZb41xXJSpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4OXuyAdPHrEGNCAzvAAAAAElFTkSuQmCC"/>
                    <AsanaPreview name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_QL75_UX500_CR0,234,500,281_.jpg"/>
                    <AsanaPreview name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_QL75_UX500_CR0,234,500,281_.jpg"/>
                    <AsanaPreview name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_QL75_UX500_CR0,234,500,281_.jpg"/>
                </div>
                <div className='row'>
                    <AsanaPreview name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_QL75_UX500_CR0,234,500,281_.jpg"/>
                    <AsanaPreview name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_QL75_UX500_CR0,234,500,281_.jpg"/>
                    <AsanaPreview name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_QL75_UX500_CR0,234,500,281_.jpg"/>
                    <AsanaPreview name_es="Asana 1" sanskrit="Asana 1" name_en="Posture 1" link="" image="https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_QL75_UX500_CR0,234,500,281_.jpg"/>
                </div>
            </main>
        </>
    )
}
