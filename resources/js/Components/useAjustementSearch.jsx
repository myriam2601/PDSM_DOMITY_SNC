import { useState, useEffect } from "react";
import axios from "axios";

/*
 * Ceci est un Hook personnalisé pour récupérer les libellés pour les ajustements.
 * Il inclut uniquement les libellés où lib_ajustement est true.
 */

export function useAjustementSearch(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length > 0) {
            setLoading(true);
            axios
                .get(`/ajustement/search/${query}`)
                .then((response) => {
                    const filteredResults = response.data.libelles.filter(
                        (libelle) => libelle.lib_ajustement
                    );
                    setResults(filteredResults);
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
