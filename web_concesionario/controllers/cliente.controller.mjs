export async function panelCliente(req, res) {
  try {
    const response = await fetch("http://localhost:3000/api/coches", {
      cache: "no-store"
    })

    const coches = await response.json()

    res.render("cliente", {
      coches,
      usuario: req.session.usuario
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error cargando el área de clientes")
  }
}
