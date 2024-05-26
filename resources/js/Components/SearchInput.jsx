import { useState, useEffect, useRef } from "react";
import { useAjustementSearch } from "./useAjustementSearch";

export function SearchInput({ value, onChange, onSelect }) {
    const [query, setQuery] = useState(value || "");
    const { results, loading } = useAjustementSearch(query);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setQuery(newValue);
        onChange(newValue);
    };

    const handleSelect = (libelle) => {
        onSelect(libelle);
        setIsFocused(false);
        setQuery(libelle.appellationAjustement);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={inputRef}>
            <input
                type="text"
                value={query}
                placeholder="Recherche..."
                onChange={handleChange}
                onFocus={handleFocus}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
            />
            {isFocused && query && results.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 mt-1 w-full z-10">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSelect(item)}
                        >
                            {item.lib_designation} ({item.lib_code})
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
