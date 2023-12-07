export interface Morfema {
    morfema: string;
    significado: string;
}

export interface Morfemas {
    morfemas: Morfema[];
}

export interface Asana {
    asanaID: string;
    nombre_es: string;
    sanscrito: string;
    nombre_in: string;
    imagen: string;
}

export interface Asanas {
    forEach(arg0: (asana: Asana) => void): unknown;
    asanas: Asana[];
}

export interface AsanaMorfemas {
    asana: Asana;
    morfemas: Morfemas;
}
