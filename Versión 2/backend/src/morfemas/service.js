// importación de librería de prisma 
import { PrismaClient } from "@prisma/client";

//creación de objeto prisma 
const prisma = new PrismaClient();

//función para consultar todos los morfemas
async function consult_morfemas() {
    try {
        //ejecución de la query para obtener los morfemas
        const morfemas = await prisma.morfemas.findMany();
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
        const decompositions = await prisma.decomposition.findMany({
            where: {
                asana: asanaID,
            },
            select: {
                morfema: true, // Incluye la relación con morfemas
            },
        });
        const ids = [...new Set(decompositions.map((item) => item.morfema))];
        const morfemas = await prisma.morfemas.findMany({
            where: {
                id: { in: ids,
                },
            },
            select: {
                morfema: true,
                significado_es: true,
                significado_in: true,
            },
        });

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
        console.log(error);
        return { error: error };
    } finally {
        await prisma.$disconnect();
    }
}
//exportación de las funciones
export { consult_morfemas };
export { consult_morfemas_asana };