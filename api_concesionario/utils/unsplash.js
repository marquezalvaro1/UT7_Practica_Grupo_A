export async function obtenerImagenCoche(marca, modelo) {
  const query = `${marca} ${modelo} car`

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=1`

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
  })

  if (!response.ok) {
    throw new Error("Error consultando Unsplash")
  }

  const data = await response.json()

  if (data.results.length === 0) {
    
    return "https://via.placeholder.com/400x250?text=Sin+imagen"
  }

  return data.results[0].urls.regular
}
