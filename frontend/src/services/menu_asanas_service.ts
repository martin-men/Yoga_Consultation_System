import { Asana } from '../../types'

export const getAsanas = async (): Promise<Asana []> => {
    const url = 'http://localhost:3000/Posturas'
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
        return data
    }).catch(error => {
        console.error('Fetch error:', error)
        throw error
    })
}
