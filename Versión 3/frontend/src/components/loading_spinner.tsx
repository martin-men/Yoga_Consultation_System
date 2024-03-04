import '../styles/components/loading_spinner.css'

export function LoadingSpinner() {
    return (
        <div id="spinner-container">
            <h1>Cargando, Por favor espere...</h1>
            <div id="spinner">
                <div id="spinner2" />
            </div>
        </div>
    );
}