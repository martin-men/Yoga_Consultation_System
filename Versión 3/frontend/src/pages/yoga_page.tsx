import { useGlobalContext } from '../../global_context.tsx'
import { SingleAsana } from './single_asana.tsx'
import { Menu } from './menu.tsx'

export function YogaPage() {
    const { currentAsana, asanas } = useGlobalContext()

    const displayPage = () => {
        if (currentAsana === '') {
            return <Menu />
        } else {
            const asana = asanas[currentAsana]
            return <SingleAsana id={currentAsana} name_en={asana.nombre_in} name_es={asana.nombre_es} sanskrit={asana.sanscrito} image={asana.imagen} video={asana.video} />
        }
    }

    return (
        <div>
            {displayPage()}
        </div>
    )
}
