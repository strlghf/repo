import { useState, type ChangeEvent } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function App() {
  const [url, setUrl] = useState("");
  const { movies, loading, error } = useMovies({ url });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setUrl(value);
  }

  return (
    <div className='page'>

      <header>
        <h1>MoviFlix</h1>
        <form className='form'>
          <input onChange={handleChange} value={url} placeholder='Matrix, Avatar, Star Wars...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>Ha ocurrido un error</p>}
      </header>
      
      <main>
        { loading ? <p>Loading...</p> : <Movies movies={movies} /> }
      </main>
    </div>
  )
}

export default App
