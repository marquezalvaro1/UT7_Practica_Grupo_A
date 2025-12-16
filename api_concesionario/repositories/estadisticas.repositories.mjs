import { supabase } from "../config/supabaseClient.mjs"

export async function cochesPorEstado() {
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


export async function cochesPorVisibilidad() {
  const { data, error } = await supabase
    .from("coches")
    .select("visible")

  if (error) throw error

  const resultado = { visibles: 0, ocultos: 0 }

  data.forEach(coche => {
    coche.visible ? resultado.visibles++ : resultado.ocultos++
  })

  return resultado
}

export async function cochesPorMarca() {
  const { data, error } = await supabase
    .from("coches")
    .select("marca")

  if (error) throw error

  const resultado = {}

  data.forEach(coche => {
    resultado[coche.marca] = (resultado[coche.marca] || 0) + 1
  })

  return resultado
}

export async function precioMedioPorMarca() {
  const { data, error } = await supabase
    .from("coches")
    .select("marca, precio")

  if (error) throw error

  const acumulado = {}
  const contador = {}

  data.forEach(coche => {
    acumulado[coche.marca] = (acumulado[coche.marca] || 0) + coche.precio
    contador[coche.marca] = (contador[coche.marca] || 0) + 1
  })

  const resultado = []

  for (const marca in acumulado) {
    resultado.push({
      marca,
      precio_medio: Math.round(acumulado[marca] / contador[marca])
    })
  }

  return resultado
}

export async function topMarcas() {
  const conteo = await cochesPorMarca()

  const resultado = Object.entries(conteo)
    .map(([marca, total]) => ({ marca, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)

  return resultado
}
