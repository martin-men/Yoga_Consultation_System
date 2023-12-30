// importación de librerá de prisma 
import { PrismaClient } from "@prisma/client";

//creación de objeto prisma 
const prisma = new PrismaClient();

//función para consultar todos los morfemas
async function consult_morfemas() {
    try {
        //ejecución de la query para obtener los morfemas
        const morfemas = await prisma.$queryRaw `SELECT m.*
                                                FROM morfemas m`;
        return morfemas;
        // control de excepciones
    } catch (error) {
        return { error: error };
    } finally {
        await prisma.$disconnect();
    }
}

//función para consultar los morfemas en base del id de la postura
async function consult_morfemas_asana(asanaID) {
    try {
        // ejecución del query para obtener los morfemas asociados
        const morfemas = await prisma.$queryRaw `
                                        SELECT m.morfema, m.significado_es, m.significado_in
                                        FROM morfemas m
                                        JOIN decomposition d ON m.id = d.morfema
                                        WHERE d.asana = ${asanaID};`;

        //modificación de las posiciones de morfemas si asana es el primer morfema
        if (morfemas[0].morfema == 'Asana') {
            //elimina y devuelve el primer elemento del arreglo
            const morfemaAsana = morfemas.shift();
            //colocamos el morfema obtenido al final
            morfemas.push(morfemaAsana);
        }

        return morfemas;
        // control de excepciones
    } catch (error) {
        return { error: error };
    } finally {
        await prisma.$disconnect();
    }
}
//exportación de las funciones
export { consult_morfemas };
export { consult_morfemas_asana };