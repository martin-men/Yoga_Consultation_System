// importación de librerá de prisma 
import { PrismaClient } from "@prisma/client";

//creación de objeto prisma 
const prisma = new PrismaClient();

//función para consultar todas las posturas o asanas
async function consult_asanas() {
    try {
        // ejecución de la query
        const asanas = await prisma.$queryRaw `SELECT a.*
                                                FROM asanas a`;
        return asanas;
        // control de excepciones
    } catch (error) {
        return { error: "Error al consultar la base de datos" };
    } finally {
        await prisma.$disconnect();
    }
}
// exportar la función
export { consult_asanas };