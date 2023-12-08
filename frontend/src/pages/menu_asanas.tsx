import { AsanaPreview } from "../components/asana_preview"
import { SearchBar } from "../components/search_bar"
import '../styles/menu_asanas.css'
import { useGlobalContext } from '../../global_context'
import { useEffect, useState } from 'react'
import { getAsanas } from "../services/menu_asanas_service"
import { Asana } from "../../types"

export function MenuAsanas() {
    const { asanas, setAsanas } = useGlobalContext()
    const [ visibleAsanas, setVisibleAsanas ] = useState<string[]>([])
    const [ search, setSearch ] = useState<string>('')

    useEffect(() => {
        const fetchAsanas = async () => {
            const asanas = await getAsanas()
            const dataAsanas : {[key: string] : Asana} = {}
            asanas.forEach((asana: Asana) => {
                dataAsanas[asana.asanasID] = asana
            })
            setAsanas(dataAsanas)
            setVisibleAsanas(Object.keys(dataAsanas))
        }
        fetchAsanas()
    }, [])

    const resetSearch = () => {
        setSearch('')
        setVisibleAsanas(Object.keys(asanas))
    }

    const filterAsanas = () => {
        setVisibleAsanas(
            Object.keys(asanas).filter((key : string) => {
                const asana : Asana = asanas[key]
                return (
                    asana.nombre_es.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase()) ||
                    asana.nombre_in.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase()) ||
                    asana.sanscrito.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase())
                )
            })
        )
    }

    return (
        <div>
            <header id='header'>
                <div id='header-title-section'>
                    <h1>·Asanas·Learn·</h1>
                    <SearchBar search={search} setSearch={setSearch} filterAsanas={filterAsanas} resetSearch={resetSearch}/>
                </div>
                <h2>Posturas - Asanas - Postures</h2>
            </header>
            <main id='menu-content'>
                {
                    visibleAsanas.map((key : string) => {
                        const asana : Asana = asanas[key]
                        return(
                            <div className='asana-preview' key={key}>
                                <AsanaPreview asanaID={asana.asanasID} name_es={asana.nombre_es} sanskrit={asana.sanscrito} name_en={asana.nombre_in} image={asana.imagen}/>
                            </div>
                        )
                    })
                }
            </main>
        </div>
    )
}
