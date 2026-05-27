import { useState, useEffect } from "react";

interface UseCatImage {
  catFact: string | null;
}

const CAT_IMAGE = "https://cataas.com";

export const useCatImage = ({ catFact }: UseCatImage) => {
  const [catImage, setCatImage] = useState<string | null>(null);

  useEffect(() => {
    if (!catFact) return;

    const controller = new AbortController();
    const firstThreeWords = catFact.split(" ", 3).join(" ");

    async function fetchData() {
      try {
        const response = await fetch(`${CAT_IMAGE}/cat/says/${firstThreeWords}?size=50&color=red&json=true`, {
          signal: controller.signal
        });

        if (!response.ok) throw new Error("Error fetching image");

        const data = await response.json();

        if (!controller.signal.aborted) {
          const { id } = data;
          const url = `/cat/${id}/says/${firstThreeWords}`;
          setCatImage(url);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
        }
      }
    }

    fetchData();
  
    return () => controller.abort();
  }, [catFact])

  return { catImage: catImage ? `${CAT_IMAGE}${catImage}` : null };
}