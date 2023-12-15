import { useGlobalContext } from '../../global_context.tsx'
import { SingleAsana } from './single_asana.tsx'
import { MenuAsanas } from './menu_asanas.tsx'

export function YogaPage() {
    const { currentAsana, asanas } = useGlobalContext()
    
    const displayPage = () => {
        if (currentAsana === '') {
            return <MenuAsanas />
        } else {
            const asana = asanas[currentAsana]
            return <SingleAsana name_en={asana.nombre_in} name_es={asana.nombre_es} sanskrit={asana.sanscrito} image={asana.imagen} />
        }
    }

    return (
        <div>
            {displayPage()}
        </div>
    )
}