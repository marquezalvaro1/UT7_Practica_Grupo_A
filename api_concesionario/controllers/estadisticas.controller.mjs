import {
  cochesPorEstado,
  cochesPorVisibilidad,
  cochesPorMarca,
  precioMedioPorMarca,
  topMarcas
} from "../repositories/estadisticas.repositories.mjs"


export async function getCochesPorEstado(req, res) {
  try {
    const resultado = await cochesPorEstado()
    res.json(resultado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo coches por estado" })
  }
}


export async function getCochesPorVisibilidad(req, res) {
  try {
    const resultado = await cochesPorVisibilidad()
    res.json(resultado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo visibilidad" })
  }
}


export async function getCochesPorMarca(req, res) {
  try {
    const resultado = await cochesPorMarca()
    res.json(resultado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo coches por marca" })
  }
}

export async function getTopMarcas(req, res) {
  try {
    const resultado = await topMarcas()
    res.json(resultado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo top marcas" })
  }
}
