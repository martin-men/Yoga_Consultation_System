import { AsanaPreview } from "../components/asana_preview"
import { SearchBar } from "../components/search_bar"
import '../styles/pages/menu.css'
import { useGlobalContext } from '../../global_context'
import { useEffect, useState } from 'react'
import { getAsanas, getMorphemes } from "../services/menu_service"
import { Asana, MorfemaWithId } from "../../types"
import { LoadingSpinner } from "../components/loading_spinner"
import Switch from "react-switch";
import Yoga from '../assets/icons/yoga.svg'
import Morphemes from '../assets/icons/morphemes.svg'
import { Morpheme } from "../components/morpheme"

export function Menu() {
    const { asanas, setAsanas, morphemes, setMorphemes } = useGlobalContext()
    const [visibleAsanas, setVisibleAsanas] = useState<string[]>([])
    const [visibleMorphemes, setVisibleMorphemes] = useState<string[]>([])
    const [search, setSearch] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [viewAsanas, setViewAsanas] = useState<boolean>(true)

    useEffect(() => {
        const fetchAsanas = async () => {
            setIsLoading(true)
            try {
                const asanas = await getAsanas()
                const dataAsanas: { [key: string]: Asana } = {}
                asanas.forEach((asana: Asana) => {
                    dataAsanas[asana.asanasID] = asana
                })
                setAsanas(dataAsanas)
                setVisibleAsanas(Object.keys(dataAsanas))
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        const fetchMorphemes = async () => {
            setIsLoading(true)
            try {
                const morphemes = await getMorphemes()
                const dataMorphemes: { [key: string]: MorfemaWithId } = {}
                morphemes.forEach((morpheme: MorfemaWithId) => {
                    dataMorphemes[morpheme.id] = morpheme
                })
                setMorphemes(dataMorphemes)
                setVisibleMorphemes(Object.keys(dataMorphemes))
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        if (Object.keys(asanas).length === 0 || Object.keys(morphemes).length === 0) {
            fetchAsanas()
            fetchMorphemes()
        } else {
            setVisibleAsanas(Object.keys(asanas))
            setVisibleMorphemes(Object.keys(morphemes))
        }
    }, [])

    const resetSearch = () => {
        setSearch('')
        setVisibleAsanas(Object.keys(asanas))
        setVisibleMorphemes(Object.keys(morphemes))
    }

    const filterAsanas = () => {
        const tempVisibleAsanas = Object.keys(asanas).filter((key: string) => {
            const asana: Asana = asanas[key]
            return (
                asana.nombre_es.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase()) ||
                asana.nombre_in.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase()) ||
                asana.sanscrito.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase())
            )
        })
        setVisibleAsanas(tempVisibleAsanas)
        if (tempVisibleAsanas.length === 0) {
            setSearch('')
        }
    }

    const filterMorphemes = () => {
        const tempVisibleMorphemes = Object.keys(morphemes).filter((key: string) => {
            const morpheme: MorfemaWithId = morphemes[key]
            return (
                morpheme.morfema.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase()) ||
                morpheme.significado_es.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase()) ||
                morpheme.significado_in.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase())
            )
        })
        setVisibleMorphemes(tempVisibleMorphemes)
        if (tempVisibleMorphemes.length === 0) {
            setSearch('')
        }
    }

    return (
        <>
            {
                isLoading
                    ?
                    <LoadingSpinner />
                    :
                    <>
                        <header id='header'>
                            <h1>·Asanas·Learn·</h1>
                            <h2>Posturas · Asanas · Postures</h2>
                            <div id="toggle-switch">
                                <span>Busca por {viewAsanas ? "Morfemas" : "Asanas"}</span>
                                <Switch className="toggle-switch-element" onChange={(value: boolean) => { resetSearch(); setViewAsanas(value); }} checked={viewAsanas} offHandleColor="#c3a6cd" onHandleColor="#9fcfd3" onColor="#ffffff" offColor="#ffffffaa" checkedIcon={false} uncheckedIcon={false} />
                                {
                                    viewAsanas
                                        ?
                                        <img src={Yoga} alt='Yoga position icon' />
                                        :
                                        <img src={Morphemes} alt='Morphemes icon' />
                                }
                            </div>
                            <div id='search-bar'>
                                <SearchBar search={search} setSearch={setSearch} viewAsanas={viewAsanas} filterAsanas={filterAsanas} filterMorphemes={filterMorphemes} resetSearch={resetSearch} asanasSearch={viewAsanas} />
                            </div>
                        </header>
                        {
                            viewAsanas
                                ?
                                <h2 id='asanas-view'>Asanas</h2>
                                :
                                <h2 id='morfemas-view'>Morfemas</h2>
                        }
                        {
                            ((visibleAsanas.length === 0) || (visibleMorphemes.length === 0))
                                ?
                                <p id='no-results'>Ninguna coincidencia encontrada</p>
                                :
                                <main id='menu-content' tabIndex={0}>
                                    {
                                        viewAsanas
                                            ?
                                            <>
                                                {
                                                    visibleAsanas.map((key: string) => {
                                                        const asana: Asana = asanas[key]
                                                        return (
                                                            <div className='menu-content-item' key={key}>
                                                                <AsanaPreview asanaID={asana.asanasID} name_es={asana.nombre_es} sanskrit={asana.sanscrito} name_en={asana.nombre_in} image={asana.imagen} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    visibleMorphemes.map((key: string) => {
                                                        const morpheme: MorfemaWithId = morphemes[key]
                                                        return (
                                                            <div className='menu-content-item' key={key}>
                                                                <Morpheme morfema={morpheme.morfema} es_trans={morpheme.significado_es} en_trans={morpheme.significado_in} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </>
                                    }
                                </main>
                        }
                    </>
            }
        </>
    )
}
