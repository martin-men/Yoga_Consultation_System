import { createContext, useState, ReactNode, useContext } from 'react'
import { Asana, MorfemaWithId } from './types';

type contextType = {
    asanas: { [key: string]: Asana };
    setAsanas: (asanas: { [key: string]: Asana }) => void;
    morphemes: { [key: string]: MorfemaWithId };
    setMorphemes: (morphemes: { [key: string]: MorfemaWithId }) => void;
    currentAsana: string;
    setCurrentAsana: (asana: string) => void;
}

const GlobalContext = createContext<contextType | undefined>(undefined)

export function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [asanas, setAsanas] = useState<{ [key: string]: Asana }>({})
    const [morphemes, setMorphemes] = useState<{ [key: string]: MorfemaWithId }>({})
    const [currentAsana, setCurrentAsana] = useState<string>('')

    return (
        <GlobalContext.Provider value={{ asanas, setAsanas, morphemes, setMorphemes, currentAsana, setCurrentAsana }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext)
    
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider')
    }
    
    return context
}
