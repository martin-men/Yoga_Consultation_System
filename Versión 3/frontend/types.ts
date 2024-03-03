export interface MorfemaWithId {
    id: string;
    morfema: string;
    significado_es: string;
    significado_in: string;
}

export interface Morfema {
    morfema: string;
    significado_es: string;
    significado_in: string;
}

export interface Asana {
    asanasID: string;
    nombre_es: string;
    sanscrito: string;
    nombre_in: string;
    imagen: string;
    video: string;
}
