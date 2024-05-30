/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useLibelleSearch } from "./useLibelleSearch"; // Assurez-vous d'importer correctement le hook

export function InputDesignation({ value, onChange, onSelect, onKeyDown }) {
    const [query, setQuery] = useState(value || "");
    const [isFocused, setIsFocused] = useState(false);
    const { results, loading } = useLibelleSearch(query);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setQuery(newValue);
        onChange(newValue);
    };

    const handleSelect = (libelle) => {
        onSelect(libelle);
        setIsFocused(false);
        setQuery(libelle.lib_designation); // Mettre à jour le champ avec la désignation du libellé sélectionné
    };

    const handleBlur = (e) => {
        // Delay the blur effect pour allow click event on dropdown item
        setTimeout(() => {
            if (
                dropdownRef.current &&
                dropdownRef.current.contains(document.activeElement)
            ) {
                return;
            }
            setIsFocused(false);
        }, 100);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (
            results.length === 1 &&
            query.toLowerCase() === results[0].lib_code.toLowerCase()
        ) {
            handleSelect(results[0]);
        }
    }, [results, query]);

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder="Nouvelle Désignation ou Code"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={onKeyDown}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
            />
            {isFocused && results.length > 0 && (
                <ul
                    ref={dropdownRef}
                    className="dropdown absolute left-0 right-0 bg-white border border-gray-300 mt-1 z-10 max-h-60 overflow-auto"
                >
                    {results.map((libelle) => (
                        <li
                            key={libelle.id}
                            className="p-2 cursor-pointer hover:bg-gray-200 whitespace-nowrap overflow-hidden overflow-ellipsis"
                            onMouseDown={() => handleSelect(libelle)} // Change onClick to onMouseDown
                        >
                            {libelle.lib_code.toUpperCase()}
                        </li>
                    ))}
                </ul>
            )}
            {isFocused && loading && (
                <div className="absolute left-0 right-0 mt-1 w-full bg-white border border-gray-300 p-2">
                    Loading...
                </div>
            )}
        </div>
    );
}
