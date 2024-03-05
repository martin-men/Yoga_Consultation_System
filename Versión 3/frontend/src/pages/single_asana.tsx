import { useGlobalContext } from '../../global_context.tsx'
import { getMorphemes } from "../services/single_asana_service.ts"
import { useEffect, useState } from "react"
import { Morfema } from "../../types.ts"
import '../styles/pages/single_asana.css'
import Back from '../assets/icons/back.svg'
import { LoadingSpinner } from '../components/loading_spinner.tsx'

type SingleAsanaProps = {
    id: string;
    name_es: string;
    sanskrit: string;
    name_en: string;
    image: string;
    video: string;
}

export function SingleAsana({ id, name_es, sanskrit, name_en, image, video }: SingleAsanaProps) {
    const { setCurrentAsana } = useGlobalContext()
    const [morphemes, setMorphemes] = useState<Morfema[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchMorphemes = async () => {
            setIsLoading(true)
            try {
                const morphemesData = await getMorphemes(id)
                console.log(morphemesData)
                setMorphemes(morphemesData)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        fetchMorphemes()
    }, [])

    return (
        <>
            {
                isLoading
                    ?
                    <LoadingSpinner />
                    :
                    <>
                        <div id='single-asana-header'>
                            <button id='go-back' onClick={() => { setCurrentAsana('') }}>
                                <img id='back-icon' src={Back} alt={'Go back icon'} />
                                <span>Volver</span>
                            </button>
                            <div id="asana-name">
                                <h1>{name_es}</h1>
                            </div>
                        </div>
                        <div id='content'>
                            <div id="img-posture">
                                <img src={image} alt={name_en + ' posture'} />
                            </div>
                            <h2 className='subtitle'>Traducciones</h2>
                            <div id="translations">
                                <h3>{name_es} · ES</h3>
                                <h3>{sanskrit} · SKT</h3>
                                <h3>{name_en} · EN</h3>
                            </div>
                            <h2 className='subtitle'>Morfemas</h2>
                            <div id='morphemes-container'>
                                {morphemes.map((morpheme, index) => {
                                    return (
                                        <div key={index} className='morpheme-container'>
                                            <p className='morpheme-name'>{morpheme.morfema}</p>
                                            <p className='morpheme-meaning'>ES → {morpheme.significado_es}</p>
                                            <p className='morpheme-meaning'>EN → {morpheme.significado_in}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <h2 className='subtitle'>Aprende la postura</h2>
                            <iframe id='asana-video' src={video}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </>
            }
        </>
    )
}
