import '../styles/components/asana_preview.css';
import { useGlobalContext } from '../../global_context.tsx'

type AsanaPreviewProps = {
    asanaID: string;
    name_es: string;
    sanskrit: string;
    name_en: string;
    image: string;
}

export function AsanaPreview({ asanaID, name_es, sanskrit, name_en, image }: AsanaPreviewProps) {
    const { setCurrentAsana } = useGlobalContext()

    return (
        <div id='preview-container' onClick={() => { setCurrentAsana(asanaID) }}>
            <img src={image} alt="Asana position image" />
            <h2>{name_es}</h2>
            <div id="asana-translations">
                <h3>{sanskrit}</h3>
                <h3>{name_en}</h3>
            </div>
        </div>
    )
}
