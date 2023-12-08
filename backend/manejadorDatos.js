import { PrismaClient } from "@prisma/client";

class ManejadorDatos {
    constructor() {
        this.prisma = new PrismaClient();
        this.datos_resultantes = null;

    }

    async _extraerDatos() {
        try {
            const asanasConMorfemas = await this.prisma.$queryRaw `
                SELECT a.*, m.morfema, m.significado
                FROM asanas a
                LEFT JOIN decomposition d ON a.asanasID = d.asana
                LEFT JOIN morfemas m ON d.morfema = m.morfemaID
            `;

            const asanas = [];
            const asanasMap = new Map();

            for (const row of asanasConMorfemas) {
                const asanaID = row.asanasID;

                if (!asanasMap.has(asanaID)) {
                    asanasMap.set(asanaID, {
                        asana_completa: {
                            asana: {
                                asanasID: row.asanasID,
                                nombre_es: row.nombre_es,
                                sanscrito: row.sanscrito,
                                nombre_in: row.nombre_in,
                            },
                            morfemas: [],
                        },
                    });
                    asanas.push(asanasMap.get(asanaID));
                }

                if (row.morfema) {
                    asanasMap.get(asanaID).asana_completa.morfemas.push({
                        morfema: row.morfema,
                        significado: row.significado,
                    });
                }
            }
            this.datos_resultantes = asanas;
            return asanas;
        } catch (error) {
            return { error: "Problemas con la base" + error };
        }
    }

    async extraerInfo(sanscrito) {

        try {
            if (!this.datos_resultantes) {
                // Si los datos no han sido extraídos, llamar al método extraerDatos
                await this._extraerDatos();
            }

            const resultadoBusqueda = this.datos_resultantes.filter(asana => {

                return asana.asana_completa.asana.sanscrito == sanscrito;
            });

            return resultadoBusqueda;
        } catch (error) {
            return { error: 'Error al obtener morfemas', detalle: error.message };
        }
    }

    async buscarPorSanscrito(cadenaBusqueda) {
        try {
            if (!this.datos_resultantes) {
                // Si los datos no han sido extraídos, llamar al método extraerDatos
                await this._extraerDatos();
            }

            const resultadoBusqueda = this.datos_resultantes.filter(asana => {
                // Convertir ambas cadenas a minúsculas para hacer la búsqueda sin distinguir mayúsculas y minúsculas
                const sanscritoMinusculas = asana.asana_completa.asana.sanscrito.toLowerCase();
                const cadenaBusquedaMinusculas = cadenaBusqueda.toLowerCase();

                // Verificar si la cadena de búsqueda está al principio de la cadena sánscrita
                return sanscritoMinusculas.startsWith(cadenaBusquedaMinusculas);
            });
            const asanas = resultadoBusqueda.map(asanaCompleta => asanaCompleta.asana_completa.asana)
            return asanas;

        } catch (error) {
            return { error: "Problemas con la búsqueda" + error };
        }
    }

    async mostrarDatosGenerales() {
        try {
            if (!this.datos_resultantes) {
                await this._extraerDatos();
            }
            const Asanas = this.datos_resultantes.map(asanaCompleta => {
                return asanaCompleta.asana_completa.asana;
            });
            return Asanas;
        } catch (error) {
            return { error: "Problemas con la base" + error };
        }
    };

}

export default ManejadorDatos;