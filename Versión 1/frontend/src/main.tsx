import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { GlobalContextProvider } from '../global_context.tsx'
import { YogaPage } from './pages/yoga_page.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalContextProvider>
    <YogaPage />
  </GlobalContextProvider>
)
