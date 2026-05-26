/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("Can't search an empty movie");
      return;
    }

    if (search.length < 3) {
      setError("Search must be at least 3 characters");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("Search cannot start with a number");
      return;
    }
    setError(null);
  }, [search]);

  return { search, setSearch, error }
}