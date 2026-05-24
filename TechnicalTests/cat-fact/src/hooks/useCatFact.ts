import { useState, useEffect } from "react";

const CAT_RANDOM_FACT = "https://catfact.ninja/fact";

export const useCatFact = () => {
  const [catFact, setCatFact] = useState<string | null>(null);

  async function getFactCat () {
    const response = await fetch(CAT_RANDOM_FACT);
    const data = await response.json();
    const { fact } = data;
    return fact
  }

  const refreshCatFact = () => {
    getFactCat().then(newFact => setCatFact(newFact));
  }

  useEffect(refreshCatFact, [])

  return { catFact, refreshCatFact }
}