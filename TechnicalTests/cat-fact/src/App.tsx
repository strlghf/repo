import './App.css'
import { useCatFact, useCatImage } from './hooks';

function App() {
  const { catFact, refreshCatFact } = useCatFact();
  const { catImage } = useCatImage({ catFact });
  
  const handleClick = () => {
    refreshCatFact()
  }

  return (
    <main>
      <h1>Catify</h1>

      {catImage && <img src={catImage} /> }
      {catFact && <h3>{catFact}</h3> }
      
      <button onClick={handleClick}>Retrieve more cat facts!</button>
    </main>
  )
}

export default App
