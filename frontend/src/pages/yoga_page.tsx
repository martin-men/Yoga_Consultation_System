import { useGlobalContext } from '../../global_context.tsx'
import { ElementoAsanas } from './elemento_asanas.tsx'
import { MenuAsanas } from './menu_asanas.tsx'

export function YogaPage() {
    const { currentAsana } = useGlobalContext()
    return (
        <div>
            {currentAsana === '' ? <MenuAsanas /> : <ElementoAsanas />}
        </div>
    )
}