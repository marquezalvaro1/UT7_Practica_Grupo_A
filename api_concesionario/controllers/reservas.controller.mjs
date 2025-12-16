import {
  existeReservaActivaPorCoche,
  existeReservaActivaPorCliente,
  obtenerReservaActivaPorCliente,
  crearReserva
} from "../repositories/reservas.repository.mjs"

import {
  cambiarEstadoCoche,
  obtenerCochePorId
} from "../repositories/coches.repository.mjs"

import { obtenerUsuarioPorId } from "../repositories/usuarios.repository.mjs"
import { cancelarReserva } from "../repositories/reservas.repository.mjs"



export async function reservarCoche(req, res) {
  try {
    const { coche_id, cliente_id, importe } = req.body

    if (!coche_id || !cliente_id || !importe) {
      return res.status(400).json({ error: "Datos incompletos" })
    }

    const cliente = await obtenerUsuarioPorId(cliente_id)
    if (!cliente || cliente.rol !== "cliente") {
      return res.status(403).json({ error: "Solo clientes pueden reservar" })
    }

    const tieneReserva = await existeReservaActivaPorCliente(cliente_id)
    if (tieneReserva) {
      return res.status(400).json({
        error: "Solo puedes tener una reserva activa"
      })
    }

    const coche = await obtenerCochePorId(coche_id)
    if (!coche) {
      return res.status(404).json({ error: "Coche no encontrado" })
    }

    if (coche.estado === "vendido") {
      return res.status(400).json({ error: "El coche está vendido" })
    }

    const yaReservado = await existeReservaActivaPorCoche(coche_id)
    if (yaReservado) {
      return res.status(400).json({ error: "El coche ya está reservado" })
    }

    const reserva = await crearReserva({
      cocheId: coche_id,
      clienteId: cliente_id,
      importe
    })

    await cambiarEstadoCoche(coche_id, "reservado")

    res.status(201).json(reserva)

  } catch (error) {
    console.error("Error en reserva:", error)
    res.status(500).json({ error: "Error interno al reservar" })
  }
}


export async function obtenerReservaCliente(req, res) {
  try {
    const { id } = req.params

    const reserva = await obtenerReservaActivaPorCliente(id)
    res.json(reserva)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo la reserva" })
  }
}


export async function cancelarReservaCliente(req, res) {
  try {
    const { id } = req.params

    const reserva = await cancelarReserva(id)
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" })
    }

    await cambiarEstadoCoche(reserva.coche_id, "disponible")

    res.json({ mensaje: "Reserva cancelada correctamente" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error cancelando la reserva" })
  }
}