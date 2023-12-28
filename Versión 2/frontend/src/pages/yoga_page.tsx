import { useGlobalContext } from '../../global_context.tsx'
import { SingleAsana } from './single_asana.tsx'
import { Menu } from './menu.tsx'

export function YogaPage() {
    const { currentAsana, asanas } = useGlobalContext()
    
    const displayPage = () => {
        if (currentAsana === '') {
            return <Menu />
        } else {
            // const asana = asanas[currentAsana]
            // return <SingleAsana name_en={asana.nombre_in} name_es={asana.nombre_es} sanskrit={asana.sanscrito} image={asana.imagen} />
            return <SingleAsana name_en={'name_en'} name_es={'name_es'} sanskrit={'sanskrit'} image={'https://cdn.vox-cdn.com/thumbor/y4JhyA4mwezZJROHq1a7AbED-xM=/0x0:1920x1280/1200x800/filters:focal(837x243:1143x549)/cdn.vox-cdn.com/uploads/chorus_image/image/72795236/5769_D030_00226_R.0.png'} />
        }
    }

    return (
        <div>
            {displayPage()}
        </div>
    )
}