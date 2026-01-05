async function reservarCoche(id) {
  try {
    const response = await fetch("http://localhost:3000/api/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coche_id: id
      })
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || "No se pudo reservar el coche")
      return
    }

    const card = document.getElementById(`coche-${id}`)
    if (card) {
      card.querySelector(".estado-text").textContent = "reservado"
      card.querySelector("button")?.remove()

      const p = document.createElement("p")
      p.className = "reservado"
      p.textContent = "⏳ Reservado"
      card.querySelector("div").appendChild(p)
    }

  } catch (error) {
    console.error(error)
    alert("Error de conexión con el servidor")
  }
}
