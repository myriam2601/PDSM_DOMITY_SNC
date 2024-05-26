import { useState, useEffect } from "react";
import axios from "axios";

export function useAjustementSearch(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query && query.length > 0) {
            setLoading(true);
            axios
                .get(`/ajustement/search/${query}`)
                .then((response) => {
                    setResults(response.data.libelles || []); // Ensure results is always an array
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setResults([]);
        }
    }, [query]);

    return { results, loading };
}
