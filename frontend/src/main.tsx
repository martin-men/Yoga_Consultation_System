import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { GlobalContextProvider } from '../global_context.tsx'
import { MenuAsanas } from './pages/menu_asanas.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalContextProvider>
    <MenuAsanas />
  </GlobalContextProvider>
)
