import { useGlobalContext } from '../../global_context.tsx'
import { getMorphemes } from "../services/single_asana_service.ts"
import { useEffect, useRef, useState } from "react"
import { Morfema } from "../../types.ts"
import '../styles/single_asana.css'
import Back from '../assets/icons/back.svg'

type SingleAsanaProps = {
    name_es: string;
    sanskrit: string;
    name_en: string;
    image: string;
}

export function SingleAsana({ name_es, sanskrit, name_en, image }: SingleAsanaProps) {
    const { setCurrentAsana } = useGlobalContext()
    const [morphemes, setMorphemes] = useState<Morfema[]>([])

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchMorphemes = async () => {
            try {
                const morphemesData = await getMorphemes(sanskrit)
                console.log(morphemesData)
                setMorphemes(morphemesData)
            } catch (error) {
                console.log(error)
            }
        }
        
        // fetchMorphemes()
    }, [])

    return (
        <>
            <button id='go-back' onClick={() => { setCurrentAsana('') }}>
                <img id='back-icon' src={Back} alt={'Go back icon'} />
                <span>Volver</span>
            </button>
            <div id='content'>
                <div id="asana-name">
                    <h1>{name_es + ' triangulo invertido 2 de la virgen'}</h1>
                </div>
                <div id="img-posture">
                    <img src={image} alt={name_en + ' posture'} />
                </div>
                <h2 className='subtitle'>Traducciones</h2>
                <div id="translations">
                    <h3>{name_es } · ES</h3>
                    <h3>{sanskrit} · SKT</h3>
                    <h3>{name_en} · EN</h3>
                </div>
                <h2 className='subtitle'>Morfemas</h2>
                <div id='morphemes-container'>
                    {/* {morphemes.map((morpheme, index) => {
                            return (
                                <div key={index} className='morpheme-container'>
                                    <p className='morpheme-name'>{morpheme.morfema}</p>
                                    <p className='morpheme-meaning'>{morpheme.significado}</p>
                                </div>
                            )
                        })} */}
                    <div className='morpheme-container'>
                        <p className='morpheme-name'>I</p>
                        <p className='morpheme-meaning'>Yo</p>
                    </div>
                    <div className='morpheme-container'>
                        <p className='morpheme-name'>Am</p>
                        <p className='morpheme-meaning'>Soy</p>
                    </div>
                    <div className='morpheme-container'>
                        <p className='morpheme-name'>Batman</p>
                        <p className='morpheme-meaning'>Muercielago</p>
                    </div>
                </div>
                <h2 className='subtitle'>Aprende la postura</h2>
                <a id='asana-video' href="https://www.youtube.com/watch?v=C7ssrLSheg4&list=RDC7ssrLSheg4&start_radio=1&ab_channel=shakiraVEVO" target='_blank'>¡ Click aquí ! →</a>
            </div>
        </>
    )
}
