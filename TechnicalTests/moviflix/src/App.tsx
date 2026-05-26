/* eslint-disable react-hooks/use-memo */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, type ChangeEvent, type FormEvent } from 'react';
import { Movies } from './components';
import { useMovies, useSearch } from './hooks';
import debounce from 'just-debounce-it';
import './App.css';

function App() {
  const { search, setSearch, error } = useSearch();
  const { movies, loading, searchMovies } = useMovies({ search });

  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      searchMovies({ search })
    }, 500)
    , [searchMovies]
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearch(value);
    debouncedGetMovies(value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMovies({ search });
  }

  return (
    <div className='page'>
      <header>
        <h1>MoviFlix</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} placeholder='Matrix, Avatar, Star Wars...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      
      <main>
        { loading ? <p>Loading...</p> : <Movies movies={movies} /> }
      </main>
    </div>
  )
}

export default App
