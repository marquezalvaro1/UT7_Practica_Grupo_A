import "dotenv/config"
import { supabase } from "../config/supabaseClient.mjs"

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY

if (!UNSPLASH_KEY) {
  throw new Error(" UNSPLASH_ACCESS_KEY no está definida en .env")
}

async function generarImagenes() {
  
  const { data: coches, error } = await supabase
    .from("coches")
    .select("id, marca, modelo, imagen")
    .ilike("imagen", "%loremflickr%")

  if (error) {
    console.error(" Error obteniendo coches:", error.message)
    return
  }

  if (!coches || coches.length === 0) {
    console.log("ℹ No hay coches pendientes de actualizar imágenes")
    return
  }

  console.log(` Coches a actualizar: ${coches.length}`)

  for (const coche of coches) {
    try {
      const query = `${coche.marca} ${coche.modelo} car`

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_KEY}`
          }
        }
      )

      if (!response.ok) {
        console.error(` Unsplash error (${response.status})`)
        continue
      }

      const data = await response.json()

      if (!data.results || data.results.length === 0) {
        console.log(` Sin imagen para ${query}`)
        continue
      }

      const imagenUrl = data.results[0].urls.regular

      
      const { error: updateError } = await supabase
        .from("coches")
        .update({ imagen: imagenUrl })
        .eq("id", coche.id)

      if (updateError) {
        console.error(" Error guardando imagen:", updateError.message)
        continue
      }

      console.log(` Imagen actualizada: ${query}`)

      
      await new Promise(r => setTimeout(r, 1200))

    } catch (err) {
      console.error(` Error con ${coche.marca} ${coche.modelo}:`, err.message)
    }
  }


}


