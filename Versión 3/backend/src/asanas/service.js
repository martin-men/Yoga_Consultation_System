// importación de librerá de prisma 
const { PrismaClient } = require("@prisma/client");

//creación de objeto prisma 
const prisma = new PrismaClient();

//función para consultar todas las posturas o asanas
async function consult_asanas() {
    try {
        // ejecución de la query
        const asanas = await prisma.asanas.findMany();
        return asanas;
        // control de excepciones
    } catch (error) {
        console.log(error)
        return { error: "Error al consultar la base de datos" };
    } finally {
        await prisma.$disconnect();
    }
}

async function consult_des() {
    try {
        // ejecución de la query
        const asanas = await prisma.decomposition.findMany();
        return asanas;
        // control de excepciones
    } catch (error) {
        console.log(error)
        return { error: "Error al consultar la base de datos" };
    } finally {
        await prisma.$disconnect();
    }
}

async function guardarAsana(asanaData, morfemaIDs) {
    try {
        // Verificar si la asana ya existe
        let asana = await prisma.asanas.findFirst({
            where: {
                sanscrito: asanaData.sanscrito,
            },
        });

        if (asana) {
            return { error: "asana ya existente" };
        }
        const nuevoID = await obtenerSiguienteID();
        await prisma.asanas.create({data:
        {
            asanasID: nuevoID,
            sanscrito : asanaData.sanscrito,
            nombre_es: asanaData.nombre_es,
            nombre_in: asanaData.nombre_in,
            imagen: asanaData.imagen,
            video : asanaData.video
        }});

        // Crear las descomposiciones
        let siguiente = await obtenerSiguienteIDDescomposicion();

        for (const idMorfema of morfemaIDs) {
            await prisma.decomposition.create({
                data: {
                    asana: nuevoID,
                    morfema: idMorfema,
                    decomID: siguiente
                },
            });
            let ultimoNumero = parseInt(siguiente.slice(1)); // Extraer solo los dígitos
            let siguienteNumero = ultimoNumero + 1;
            siguiente = "D"+siguienteNumero.toString().padStart(2, '0'); // Formatear el nuevo ID

        }
        return { mesagge: "Asana guardada exitosamente" };
    } catch (error) {
        console.log(error);
        return { error: "Error al guardar asana" };
    } finally {
        await prisma.$disconnect();
    }
}

async function obtenerSiguienteID() {
    try {
        // Consultar la base de datos para obtener el último ID de Asana
        const ultimoRegistro = await prisma.asanas.findFirst({orderBy: {  asanasID: 'desc' }  });

        let siguienteID = 'AS001'; // Valor predeterminado si no hay registros

        // Si hay un último registro, extraer el número, incrementarlo en uno y formatear el nuevo ID
        if (ultimoRegistro && ultimoRegistro.asanasID) {
            const ultimoNumero = parseInt(ultimoRegistro.asanasID.slice(2)); // Extraer solo los dígitos
            const siguienteNumero = ultimoNumero + 1;
            siguienteID = 'AS' + siguienteNumero.toString().padStart(3, '0'); // Formatear el nuevo ID
        }

        return siguienteID;
    } catch (error) {
        console.error('Error al obtener el siguiente ID:', error);
        throw error;
    }
}

async function obtenerSiguienteIDDescomposicion() {
    try {
        // Consultar la base de datos para obtener el último ID
        const ultimoRegistro = await prisma.decomposition.findFirst({orderBy: {  decomID: 'desc' }  });

        let siguienteID = 'D01'; // Valor predeterminado si no hay registros

        // Si hay un último registro, extraer el número, incrementarlo en uno y formatear el nuevo ID
        if (ultimoRegistro && ultimoRegistro.decomID) {
            const ultimoNumero = parseInt(ultimoRegistro.decomID.slice(1)); // Extraer solo los dígitos
            const siguienteNumero = ultimoNumero + 1;
            siguienteID = 'D' + siguienteNumero.toString().padStart(2, '0'); // Formatear el nuevo ID
        }

        return siguienteID;
    } catch (error) {
        console.error('Error al obtener el siguiente ID:', error);
        throw error;
    }
}

async function eliminarAsanaYDescomposiciones(idAsana) {
    try {
        // Eliminar todas las descomposiciones asociadas al idAsana proporcionado
        const eliminacionDescomposiciones = await prisma.decomposition.deleteMany({
            where: {
                asana: idAsana
            }
        });

        // Eliminar la asana correspondiente
        const eliminacionAsana = await prisma.asanas.delete({
            where: {
                asanasID: idAsana
            }
        });

        return {
            descomposicionesEliminadas: eliminacionDescomposiciones.count,
            asanaEliminada: eliminacionAsana
        };
    } catch (error) {
        console.error('Error al eliminar la asana y las descomposiciones:', error);
        throw error;
    }
}
// exportar la función
module.exports = { consult_asanas, guardarAsana, eliminarAsanaYDescomposiciones, consult_des };

