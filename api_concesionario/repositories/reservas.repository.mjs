import { supabase } from "../config/supabaseClient.mjs"

export async function existeReservaActivaPorCoche(cocheId) {
  const { data, error } = await supabase
    .from("reservas")
    .select("id")
    .eq("coche_id", cocheId)
    .eq("activa", true)
    .limit(1)

  if (error) throw error
  return data.length > 0
}

export async function existeReservaActivaPorCliente(clienteId) {
  const { data, error } = await supabase
    .from("reservas")
    .select("id")
    .eq("cliente_id", clienteId)
    .eq("activa", true)
    .limit(1)

  if (error) throw error
  return data.length > 0
}

export async function obtenerReservaActivaPorCliente(clienteId) {
  const { data, error } = await supabase
    .from("reservas")
    .select(`
      id,
      importe,
      activa,
      coche:coches (
        id,
        marca,
        modelo,
        precio,
        imagen,
        estado
      )
    `)
    .eq("cliente_id", clienteId)
    .eq("activa", true)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function crearReserva({ cocheId, clienteId, importe }) {
  const { data, error } = await supabase
    .from("reservas")
    .insert([
      {
        coche_id: cocheId,
        cliente_id: clienteId,
        importe,
        activa: true
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function cancelarReserva(reservaId) {
  const { data, error } = await supabase
    .from("reservas")
    .update({ activa: false })
    .eq("id", reservaId)
    .select()
    .single()

  if (error) throw error
  return data
}
