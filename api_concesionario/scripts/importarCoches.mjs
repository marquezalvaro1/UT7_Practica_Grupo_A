import "dotenv/config"
import { supabase } from "../config/supabaseClient.mjs"

async function importarCoches() {
  
  const marcas = ["Toyota", "BMW", "Audi", "Ford", "Honda"]

  for (const marca of marcas) {
    try {
      
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${marca}?format=json`
      )

      if (!response.ok) {
        console.error(` ${marca}: HTTP ${response.status}`)
        continue
      }

      const data = await response.json()
      const modelos = data.Results.slice(0, 10) // solo 10 por marca

      for (const modelo of modelos) {
        await supabase.from("coches").insert([
          {
            marca: marca,
            modelo: modelo.Model_Name,
            precio: Math.floor(Math.random() * 20000) + 10000,
            tipo: "Turismo",
            estado: "disponible"
          }
        ])
      }

      console.log(` ${marca}: ${modelos.length} coches importados`)
    } catch (error) {
      console.error(` Error con ${marca}:`, error.message)
    }
  }

  console.log(" Importación finalizada")
}

importarCoches()
