import { AsanaPreview } from "../components/asana_preview"
import { SearchBar } from "../components/search_bar"
import '../styles/menu.css'
import { useGlobalContext } from '../../global_context'
import { useEffect, useState } from 'react'
import { getAsanas } from "../services/menu_asanas_service"
import { Asana } from "../../types"
import { LoadingSpinner } from "../components/loading_spinner"
import Switch from "react-switch";
import Yoga from '../assets/icons/yoga.svg'
import Morphemes from '../assets/icons/morphemes.svg'
import { Morpheme } from "../components/morpheme"

export function Menu() {
    const { asanas, setAsanas } = useGlobalContext()
    const [visibleAsanas, setVisibleAsanas] = useState<string[]>([])
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
        // fetchAsanas()
    }, [])

    const resetSearch = () => {
        setSearch('')
        setVisibleAsanas(Object.keys(asanas))
    }

    const filterAsanas = () => {
        setVisibleAsanas(
            Object.keys(asanas).filter((key: string) => {
                const asana: Asana = asanas[key]
                return (
                    asana.nombre_es.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase()) ||
                    asana.nombre_in.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase()) ||
                    asana.sanscrito.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase())
                )
            })
        )
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
                                <Switch className="toggle-switch-element" onChange={setViewAsanas} checked={viewAsanas} offHandleColor="#c3a6cd" onHandleColor="#9fcfd3" onColor="#ffffff" offColor="#ffffffaa" checkedIcon={false} uncheckedIcon={false} />
                                {
                                    viewAsanas
                                        ?
                                        <img src={Yoga} alt='Yoga position icon' />
                                        :
                                        <img src={Morphemes} alt='Morphemes icon' />
                                }
                            </div>
                            <div id='search-bar'>
                                <SearchBar search={search} setSearch={setSearch} filterAsanas={filterAsanas} resetSearch={resetSearch} asanasSearch={viewAsanas} />
                            </div>
                        </header>
                        {
                            viewAsanas
                                ?
                                <p id='asanas-view'>Asanas</p>
                                :
                                <p id='morfemas-view'>Morfemas</p>
                        }
                        {
                            // visibleAsanas.length === 0
                            //     ?
                            //     <p id='no-results'>Ninguna coincidencia encontrada</p>
                            //     :
                            //     <main id='menu-content'>
                            //         {
                            //             visibleAsanas.map((key: string) => {
                            //                 const asana: Asana = asanas[key]
                            //                 return (
                            //                     <div className='menu-content-item' key={key}>
                            //                         <AsanaPreview asanaID={asana.asanasID} name_es={asana.nombre_es} sanskrit={asana.sanscrito} name_en={asana.nombre_in} image={asana.imagen} />
                            //                     </div>
                            //                 )
                            //             })
                            //         }
                            //     </main>
                        }
                        <main id='menu-content'>
                            {
                                viewAsanas
                                    ?
                                    <>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                        <div className='menu-content-item'>
                                            <AsanaPreview asanaID={"001"} name_es={"Asana 1"} sanskrit={"Asana 1"} name_en={"Asana 1"} image={"https://img.freepik.com/premium-vector/woman-yoga-poses-vector-illustration-cartoon-style_650087-227.jpg?w=2000"} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Superman" es_trans="Super hombre" en_trans="Megaman" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Sturdiness" es_trans="Fortaleza" en_trans="Potency" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Aeronautics" es_trans="Aeronáutica" en_trans="Airspeed" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Heroicism" es_trans="Heroísmo" en_trans="Valiant" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Righteousness" es_trans="Rectitud" en_trans="Equity" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Cloak" es_trans="Capa" en_trans="Mantle" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Kryptonite" es_trans="Kriptonita" en_trans="Krypton" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Antagonistic" es_trans="Antagónico" en_trans="Antagonist" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Metropolitan" es_trans="Metropolitano" en_trans="Metropolis" />
                                        </div>
                                        <div className='menu-content-item'>
                                            <Morpheme morfema="Salvaging" es_trans="Salvamento" en_trans="Salvation" />
                                        </div>
                                    </>
                            }
                        </main>
                    </>
            }
        </>
    )
}
