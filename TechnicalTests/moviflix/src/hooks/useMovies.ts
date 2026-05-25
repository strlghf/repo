import { useState, useEffect } from "react";
import type { MovieProps } from "../types";

const fixedUrl = `https://www.omdbapi.com/?apikey=71b3b753&s=`;

export const useMovies = ({ url }: { url: string }) => {
  const [movies, setMovies] = useState<MovieProps[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch(`${fixedUrl}${url}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error("Failed fetching movie");

        const data = await response.json();
        const searchMovies: MovieProps[] = data.Search;

        if (!controller.signal.aborted) {
          setMovies(searchMovies);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url])

  return { movies, loading, error }
}