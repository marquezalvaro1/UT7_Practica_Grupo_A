export async function panelAdmin(req, res) {
  try {
    
    res.set("Cache-Control", "no-store")

    
    const response = await fetch("http://localhost:3000/api/coches")

    if (!response.ok) {
      throw new Error("La API no responde correctamente")
    }

    const coches = await response.json()

    
    res.render("admin", {
      coches,
      usuario: req.session?.usuario || null
    })

  } catch (error) {
    console.error("❌ Error en panelAdmin:", error.message)
    res.status(500).send("Error cargando el panel de administración")
  }
}
