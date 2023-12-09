import { Morfema } from '../../types'

export const getMorphemes = async (sanskrit: string) : Promise<Morfema[]> => {
    const url = `http://localhost:3000/Posturas/info/${sanskrit}`
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
    }).then(data => {
        return data[0].asana_completa.morfemas
    }).catch(error => {
        console.error('Fetch error:', error)
        throw error
    })
}
