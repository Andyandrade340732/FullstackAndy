export const buscarJuego = async (nombre) => {
    try {
        const apiKey = process.env.RAWG_API_KEY;
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${nombre}&page_size=5`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(juego => ({
            nombre: juego.name,
            lanzamiento: juego.released,
            rating: juego.rating,
            imagen: juego.background_image,
            generos: juego.genres.map(g => g.name)
        }));
    } catch (error) {
        throw new Error("Error al buscar juego en RAWG");
    }
}