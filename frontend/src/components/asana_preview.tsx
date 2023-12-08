import '../styles/asana_preview.css';

type AsanaPreviewProps = {
    asanaID: string;
    name_es: string;
    sanskrit: string;
    name_en: string;
    image: string;
}

export function AsanaPreview({ asanaID, name_es, sanskrit, name_en, image } : AsanaPreviewProps) {
    return (
        <div id='preview-container'>
            <a href=''>
                <img src={image} alt={name_en + ' posture'} />
                <h2>{name_es}</h2>
                <h3>{sanskrit}</h3>
                <h3>{name_en}</h3>
            </a>
        </div>
    )
}