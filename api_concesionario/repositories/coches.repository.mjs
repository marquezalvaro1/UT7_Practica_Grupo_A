import { supabase } from "../config/supabaseClient.mjs"

export async function obtenerCoches() {
  const { data, error } = await supabase
    .from("coches")
    .select("*")
    .order("id")

  if (error) throw error
  return data
}

export async function crearCoche(coche) {
  const { data, error } = await supabase
    .from("coches")
    .insert([coche])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function actualizarEstadoCoche(id, estado) {
  const { error } = await supabase
    .from("coches")
    .update({ estado })
    .eq("id", id)

  if (error) throw error
}

export async function actualizarVisibilidadCoche(id, visible) {
  const { error } = await supabase
    .from("coches")
    .update({ visible })
    .eq("id", id)

  if (error) throw error
}

export async function eliminarCochePorId(id) {
  const { error } = await supabase
    .from("coches")
    .delete()
    .eq("id", id)

  if (error) throw error
}


// Alias claro para reservas
export async function cambiarEstadoCoche(id, estado) {
  return actualizarEstadoCoche(id, estado)
}

// Obtener coche por ID (validaciones)
export async function obtenerCochePorId(id) {
  const { data, error } = await supabase
    .from("coches")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function contarCochesPorEstado() {
  const { data, error } = await supabase
    .from("coches")
    .select("estado")

  if (error) throw error

  const resultado = {
    disponible: 0,
    reservado: 0,
    vendido: 0
  }

  data.forEach(coche => {
    if (resultado[coche.estado] !== undefined) {
      resultado[coche.estado]++
    }
  })

  return resultado
}

