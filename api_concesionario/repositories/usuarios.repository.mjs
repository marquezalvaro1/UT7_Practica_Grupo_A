import { supabase } from "../config/supabaseClient.mjs"

// ===============================
// Obtener usuario por email
// ===============================
export async function obtenerUsuarioPorEmail(email) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single()

  if (error) return null
  return data
}

// ===============================
// Crear usuario
// ===============================
export async function crearUsuario({ nombre, email }) {
  const { data, error } = await supabase
    .from("usuarios")
    .insert([{
      nombre,
      email,
      rol: "cliente"
    }])
    .select()
    .single()

  if (error) throw error
  return data
}

// ===============================
// Obtener usuario por ID
// ===============================
export async function obtenerUsuarioPorId(id) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data
}
