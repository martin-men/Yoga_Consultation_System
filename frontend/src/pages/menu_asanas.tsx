import { AsanaPreview } from "../components/asana_preview"
import { SearchBar } from "../components/search_bar"
import '../styles/menu_asanas.css'
import { useGlobalContext } from '../../global_context'
import { useEffect } from 'react'
import { getAsanas } from "../services/menu_asanas_service"
import { Asana } from "../../types"

export function MenuAsanas() {
    const { asanas, setAsanas, setCurrentAsana } = useGlobalContext()

    useEffect(() => {
        const fetchAsanas = async () => {
            const asanas = await getAsanas()
            const dataAsanas : {[key: string] : Asana} = {}
            asanas.forEach((asana: Asana) => {
                dataAsanas[asana.asanasID] = asana
            })
            setAsanas(dataAsanas)
        }
        fetchAsanas()
    }, [])

    return (
        <>
            <header id='header'>
                <div id='header-title-section'>
                    <h1>·Asanas·Learn·</h1>
                    <SearchBar />
                </div>
                <h2>Posturas - Asanas - Postures</h2>
            </header>
            <main id='menu-content'>
                {
                    Object.keys(asanas).map((key : string) => {
                        const asana : Asana = asanas[key]
                        return(
                            <div className='asana-preview'>
                                <AsanaPreview asanaID={asana.asanasID} name_es={asana.nombre_es} sanskrit={asana.sanscrito} name_en={asana.nombre_in} image={asana.imagen}/>
                            </div>
                        )
                    })
                }
            </main>
        </>
    )
}
