/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const CAT_RANDOM_FACT = "https://catfact.ninja/fact";

export const useCatFact = () => {
  const [catFact, setCatFact] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getCatFact = async () => {
    try {
      setError(null);

      const response = await fetch(CAT_RANDOM_FACT);
      if (!response.ok) throw new Error("Failed fetching resource");
      
      const data = await response.json();
      const { fact } = data;
      setCatFact(fact);
    } catch (err) {
      setError(err as Error);
    }
  }

  useEffect(() => {
    getCatFact();
  }, [])

  return { catFact, getCatFact, error }
}