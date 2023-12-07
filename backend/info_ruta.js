import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/Posturas/Info/:sanscrito", async (req, res) => {
  const nombreAsana = req.params.sanscrito;
  try {
    const asana_resultado = await prisma.asanas.findFirst({
      where: { sanscrito: nombreAsana },
    });

    // Obtener los IDs de morfemas asociados a la asana
    const morfemaIdsAsociados = await prisma.decomposition.findMany({
      where: {
        asana: asana_resultado.asanasID,
      },
      select: {
        morfema: true,
      },
    });

    // Extraer los IDs de morfemas
    const morfemaIdsAConsultar = morfemaIdsAsociados.map((item) => item.morfema);
    // Consulta principal para obtener los detalles de los morfemas
    const resultado = await prisma.morfemas.findMany({
      where: {
        morfemaID: {
          in: morfemaIdsAConsultar,
        },
      },
      select: {
        morfema: true,
        significado : true,
      },
    });
    const morfemasAsociados = resultado.map((item) => ({
        morfema: item.morfema,
        significado : item.significado,
    }));

    const asanaJSON = {
      asana: asana_resultado,
      morfemas: morfemasAsociados,
    };

    return res.json(asanaJSON);
  } catch (error) {
    console.error('Error al obtener morfemas:', error);
    return res.status(500).json({ error: 'Error al obtener morfemas' });
  } finally {
    await prisma.$disconnect();
  }
});




export default router;