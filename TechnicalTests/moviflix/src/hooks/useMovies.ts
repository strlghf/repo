import { useState, useRef, useCallback } from "react";
import type { Movie, MovieT } from "../types";

interface Search {
  search: string;
}

const fixedUrl = `https://www.omdbapi.com/?apikey=71b3b753&s=`;

export const useMovies = ({ search }: Search) => {
  const [movies, setMovies] = useState<MovieT[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<Error | null>(null);
  const previousSearch = useRef(search);

  async function findMovies({ search }: Search) {
    if (!search || search.trim() === "") return null;

    try {
      const response = await fetch(`${fixedUrl}${search}`);
      if (!response.ok) throw new Error("Failed fetching movie");

      const data = await response.json();
      const searchMovies: Movie[] = data.Search;

      const mappedMovies: MovieT[] = searchMovies.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }));

      return mappedMovies;
    } catch (err) {
      setError((err as Error));
    }
  }

  const searchMovies = useCallback(async({ search }: Search) => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null)
      previousSearch.current = search;
      const newMovies = await findMovies({ search });
      setMovies(newMovies as MovieT[]);
    } catch (err) {
      setError((err as Error));
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, searchMovies }
}