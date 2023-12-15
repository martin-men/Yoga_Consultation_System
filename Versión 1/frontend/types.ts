export interface Morfema {
    morfema: string;
    significado: string;
}

export interface Morfemas {
    morfemas: Morfema[];
}

export interface Asana {
    asanasID: string;
    nombre_es: string;
    sanscrito: string;
    nombre_in: string;
    imagen: string;
}

export interface AsanaMorfemas {
    asana: Asana;
    morfemas: Morfemas;
}
