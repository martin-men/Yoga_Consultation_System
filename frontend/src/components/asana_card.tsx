import '../styles/asana_card.css';

type AsanaCardProps = {
    name_es: string;
    sanskrit: string;
    name_en: string;
    image: string;
    link: string;
    morpheme: string;
}

export function AsanaCard({name_es, sanskrit, name_en, image, morpheme} : AsanaCardProps) {
    return (
        <div id='card-container'>
            <img src={image} alt={name_en + ' posture'} />
            <h2>{name_es}</h2>
            <h3>{sanskrit}</h3>
            <h3>{name_en}</h3>
            <h1>{morpheme}</h1>
        </div>
    )
}