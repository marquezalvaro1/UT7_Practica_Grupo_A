import {
  obtenerCoches,
  crearCoche,
  actualizarEstadoCoche,
  actualizarVisibilidadCoche,
  eliminarCochePorId,
  obtenerCochePorId
} from "../repositories/coches.repository.mjs"

import { obtenerImagenCoche } from "../utils/unsplash.js"

// =========================
// GET COCHES
// =========================
export async function getCoches(req, res) {
  try {
    const coches = await obtenerCoches()
    res.json(coches)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// =========================
// POST NUEVO COCHE (ADMIN)
// =========================
export async function postCoche(req, res) {
  try {
    let {
      marca,
      modelo,
      precio,
      tipo,
      estado,
      visible,
      imagen
    } = req.body

    if (!marca || !modelo || !precio) {
      return res.status(400).json({
        error: "Marca, modelo y precio son obligatorios"
      })
    }

    // 🔥 Si no viene imagen, se obtiene automáticamente
    if (!imagen) {
      imagen = await obtenerImagenCoche(marca, modelo)
    }

    const coche = await crearCoche({
      marca,
      modelo,
      precio,
      tipo: tipo || "Turismo",
      estado: estado || "disponible",
      visible: visible ?? true,
      imagen
    })

    res.status(201).json(coche)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

// =========================
// PUT ESTADO (ADMIN)
// =========================
export async function putEstadoCoche(req, res) {
  try {
    const { id } = req.params
    const { estado } = req.body

    const coche = await obtenerCochePorId(id)
    if (!coche) {
      return res.status(404).json({ error: "Coche no encontrado" })
    }

    await actualizarEstadoCoche(id, estado)
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// =========================
// PUT VISIBILIDAD (ADMIN)
// =========================
export async function putVisibilidadCoche(req, res) {
  try {
    const { id } = req.params
    const { visible } = req.body

    const coche = await obtenerCochePorId(id)
    if (!coche) {
      return res.status(404).json({ error: "Coche no encontrado" })
    }

    await actualizarVisibilidadCoche(id, visible)
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// =========================
// DELETE COCHE (ADMIN)
// =========================
export async function deleteCoche(req, res) {
  try {
    const { id } = req.params

    const coche = await obtenerCochePorId(id)
    if (!coche) {
      return res.status(404).json({ error: "Coche no encontrado" })
    }

    await eliminarCochePorId(id)
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
