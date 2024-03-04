import React, { useState } from 'react';
import '../styles/components/create_asana.css';
import { MorfemaWithId } from '../../types';
import { JSX } from 'react/jsx-runtime';

type CreateAsanaProps = {
    setShowCreateAsana: (show: boolean) => void;
    morphemes: { [key: string]: MorfemaWithId };
}

export function CreateAsana({ setShowCreateAsana, morphemes }: CreateAsanaProps) {
    const [nameES, setNameES] = useState<string>('')
    const [nameEN, setNameEN] = useState<string>('')
    const [nameSKT, setNameSKT] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [video, setVideo] = useState<string>('')
    const [morphemesSelected, setMorphemesSelected] = useState<string[]>([])
    const [morphemesNumber, setMorphemesNumber] = useState<number>(1)
    const morphemeAdders: JSX.Element[] = []

    const createMorphemeAdders = () => {
        for (let i = 0; i < morphemesNumber; i++) {
            morphemeAdders.push(
                <div key={i} data-key={i}>
                    <select>
                        {
                            Object.keys(morphemes).map((key) => {
                                return (
                                    <option key={key} value={key}>{morphemes[key].morfema}</option>
                                )
                            })
                        }
                    </select>
                    <button onClick={() => {setMorphemesNumber(morphemesNumber + 1)}}>+</button>
                </div>
            )
        }
        return morphemeAdders
    }

    return (
        <div id="modal-container">
            <div id="modal">
                <h1>Registra una Asana</h1>
                <label htmlFor='nameES'>Nombre en español: </label>
                <input
                    type="text"
                    id="nameES"
                    value={nameES}
                    placeholder="Ingrese el nombre en español"
                    onChange={(text) => {
                        setNameES(text.target.value)
                    }}
                /> <br />
                <label htmlFor="">Nombre en inglés: </label>
                <input
                    type="text"
                    id="nameEN"
                    value={nameEN}
                    placeholder="Ingrese el nombre en inglés"
                    onChange={(text) => {
                        setNameEN(text.target.value)
                    }}
                /> <br />
                <label htmlFor="nameSKT">Nombre en sánscrito: </label>
                <input
                    type="text"
                    id="nameSKT"
                    value={nameSKT}
                    placeholder="Ingrese el nombre en sánscrito"
                    onChange={(text) => {
                        setNameSKT(text.target.value)
                    }}
                /> <br />
                <label htmlFor="image">Link de la imagen: </label>
                <input
                    type="text"
                    id="image"
                    value={image}
                    placeholder="Ingrese el link de la imagen"
                    onChange={(text) => {
                        setImage(text.target.value)
                    }}
                /> <br />
                <label htmlFor="video">Link del vídeo: </label>
                <input
                    type="text"
                    id="video"
                    value={video}
                    placeholder="Ingrese el link del vídeo"
                    onChange={(text) => {
                        setVideo(text.target.value)
                    }}
                /> <br />
                {createMorphemeAdders()}
                <button onClick={() => setShowCreateAsana(false)}>Cerrar</button>
            </div>
        </div>
    )
}