// importación de librería de prisma 
const { PrismaClient } = require("@prisma/client");

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
                id: {
                    in: ids,
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

async function crearMorfema(morfemaData) {
    try {
        // Crear el nuevo morfema
        let morfema = await prisma.morfemas.findFirst({
            where: {
                morfema: morfemaData.morfema,
            },
        });
        if (morfema) {
            return { error: "asana ya existente" };
        }

        const siguienteNumero = await obtenerSiguienteNumeroRegistro();

        await prisma.morfemas.create({
            data: {
                morfema: morfemaData.morfema,
                significado_es: morfemaData.significado_es,
                significado_in: morfemaData.significado_in,
                id: siguienteNumero.toString().padStart(2, '0')
            },
        });
        return { mesagge: "Morfema guardado exitosamente" };

    } catch (error) {
        return { error: "Error al guardar morfema" };
    } 
}
async function obtenerSiguienteNumeroRegistro() {
    try {
        // Consulta la base de datos para obtener el último registro
        const ultimoRegistro = await prisma.morfemas.findFirst({
            orderBy: { id: 'desc' } // Ordena los registros por id de forma descendente
        });

        let siguienteNumero = 1; // Valor predeterminado si no hay registros

        // Si hay un último registro, incrementa su id en uno para obtener el siguiente número
        if (ultimoRegistro) {
            siguienteNumero = parseInt(ultimoRegistro.id) + 1;
        }

        // Asegúrate de que el siguiente número esté en el rango de dos dígitos
        siguienteNumero = siguienteNumero % 100; // Solo nos quedamos con los dos últimos dígitos

        return siguienteNumero;
    } catch (error) {
        console.error('Error al obtener el siguiente número de registro:', error);
        throw error;
    }
}
//exportación de las funciones
module.exports = { consult_morfemas, consult_morfemas_asana, crearMorfema };
