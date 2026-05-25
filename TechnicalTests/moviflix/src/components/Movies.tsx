import type { MovieProps } from "../types";

export function Movies ({ movies }: { movies: MovieProps[] | null }) {
  if (!(movies && movies.length > 0)) return null;

  return (
    <ul className='movies'>
      {movies.map(movie => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </li>
      ))}
    </ul>
  )
}