/* eslint-disable react/prop-types */

import { useState } from "react";
import { useLibelleSearch } from "./useLibelleSearch"; // Assurez-vous d'importer correctement le hook

export function InputDesignation({ value, onChange, onSelect }) {
    const [query, setQuery] = useState("");
    const { results, loading } = useLibelleSearch(query);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setQuery(newValue);
        onChange(newValue);
    };

    const handleSelect = (libelle) => {
        onSelect(libelle);
        setQuery("");
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                placeholder="Nouvelle Désignation"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
            />
            {query && results.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 mt-1 w-full z-10">
                    {results.map((libelle) => (
                        <li
                            key={libelle.id}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSelect(libelle)}
                        >
                            {libelle.lib_designation} ({libelle.lib_code})
                        </li>
                    ))}
                </ul>
            )}
            {loading && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 p-2">
                    Loading...
                </div>
            )}
        </div>
    );
}
/*  --> STD = mettre les propTyps quand même*/

/* , qte, pu, prixTotal, TVA */
