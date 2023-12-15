import { useGlobalContext } from '../../global_context.tsx'
import { getMorphemes } from "../services/single_asana_service.ts"
import { useEffect, useState } from "react"
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
        const fetchMorphemes = async () => {
            try {
                const morphemesData = await getMorphemes(sanskrit)
                console.log(morphemesData)
                setMorphemes(morphemesData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMorphemes()
    }, [])

    return (
        <>
            <header id='single-asana-header' onClick={() => { setCurrentAsana('') }}>
                <div id='go-back'>
                    <img id='back-icon' src={Back} alt={'Go back icon'} />
                    <h1 id='asana-name'>{name_es}</h1>
                </div>
            </header>
            <div id='content'>
                <img id='img-posture' src={image} alt={name_en + ' posture'} />
                <div id='card-container'>
                    <div id='translations'>
                        <h3>{name_es} · ES</h3>
                        <h3>{sanskrit} · SKT</h3>
                        <h3>{name_en} · EN</h3>
                    </div>
                    <div id='morphemes-container'>
                        {morphemes.map((morpheme, index) => {
                            return (
                                <div key={index} className='morpheme-container'>
                                    <p className='morpheme-name'>{morpheme.morfema}</p>
                                    <p className='morpheme-meaning'>{morpheme.significado}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <footer id='single-asana-footer'/>
        </>
    )
}
