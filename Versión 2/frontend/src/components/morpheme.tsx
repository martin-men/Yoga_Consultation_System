import '../styles/components/morpheme.css'

type MorphemeProps = {
    morfema: string;
    es_trans: string;
    en_trans: string;
}

export function Morpheme({ morfema, es_trans, en_trans }: MorphemeProps) {
    return (
        <div id='container'>
            <h3>{morfema} · SKT</h3>
            <div id="morpheme-translations">
                <div className="translation">
                    <div></div>
                    <p>{es_trans} · ES</p>
                </div>
                <div className="translation">
                    <div></div>
                    <p>{en_trans} · EN</p>
                </div>
            </div>
        </div>
    )
}