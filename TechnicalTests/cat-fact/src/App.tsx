import './App.css';
import { useCatFact, useCatImage } from './hooks';

function App() {
  const { catFact, getCatFact, error } = useCatFact();
  const { catImage } = useCatImage({ catFact });

  return (
    <main>
      <h1>Catify</h1>
      
      {error && <p>An error has ocurred</p>}
      {catImage && <img src={catImage} alt="Cat Fact" />}
      {catFact && <h3>{catFact}</h3>}
      
      <button onClick={getCatFact}>Retrieve more cat facts!</button>
    </main>
  )
}

export default App
