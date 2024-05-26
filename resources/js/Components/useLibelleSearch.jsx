import { useState, useEffect } from "react";
import axios from "axios";

/*
 * Ceci est un Hook personnalisé pour récupérer le code libellé dans l'input de designation du devis
 */

export function useLibelleSearch(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length > 0) {
            setLoading(true);
            axios
                .get(`/libelle/search/${query}`)
                .then((response) => {
                    setResults(response.data.libelles);
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
