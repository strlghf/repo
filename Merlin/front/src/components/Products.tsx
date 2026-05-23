import { useFetchProducts } from "../hooks/useFetchProducts"
import "./Products.css"

export function Products () {
  const { data, loading, error } = useFetchProducts("https://fakestoreapi.com/products")

  return (
    <div className="container">
      {/* {error && <p>An error has ocurred</p>} */}
      {loading && <p>Loading products...</p>}
      {data && 
        <ul>
          {
            data?.map(p => (
              <li key={p.id}>
                <img src={p.image} />
                <h2>{p.title}</h2>
                <p>{p.price}</p>
              </li>
            ))
          }
      </ul>}
    </div>
  )
}