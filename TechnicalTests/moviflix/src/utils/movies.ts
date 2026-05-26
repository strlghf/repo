import type { MovieProps } from "../types";

const fixedUrl = `https://www.omdbapi.com/?apikey=71b3b753&s=`;

export async function fetchMovies ({ search }: { search: string }) {
  if (search === "") return null;

  try {
    const response = await fetch(fixedUrl);
    if (!response.ok) throw new Error("Failed fetching movies");

    const data = await response.json();
    const searchMovies: MovieProps[] = data.Search;

    return searchMovies.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (err) {
    throw new Error("Error searching movies")
  }
}