import type { MovieT } from "../types";

export function Movies ({ movies }: { movies: MovieT[] | null }) {
  if (!(movies && movies.length > 0)) return null;

  return (
    <ul className='movies'>
      {movies.map(movie => (
        <li className="movie" key={movie.id}>
          <img src={movie.poster} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
        </li>
      ))}
    </ul>
  )
}