import { useState, useEffect } from "react";
import { InputDesignation } from "./InputDesignation";
import { InputFloat } from "./InputFloat";

export function LigneDevis({
    id,
    index,
    prest_designation = "",
    prest_quantite = 0,
    prest_prix = 0,
    prest_tva = 0,
    onDelete = () => {},
    onSave = () => {},
    errors,
    libelles,
}) {
    const [designation, setDesignation] = useState(prest_designation);
    const [quantite, setQuantite] = useState(prest_quantite);
    const [prixUnitaire, setPrixUnitaire] = useState(prest_prix);
    const [tva, setTva] = useState(prest_tva);
    const [prixHT, setPrixHT] = useState(0);
    const [prixTTC, setPrixTTC] = useState(0);

    // Mettre à jour le prix HT à chaque changement de quantité ou de prix unitaire
    useEffect(() => {
        const newPrixHT = quantite * prixUnitaire;
        setPrixHT(newPrixHT);
    }, [quantite, prixUnitaire]);

    // Mettre à jour le prix TTC à chaque changement de prix HT ou de TVA
    useEffect(() => {
        const newPrixTTC = calculTVA_TTC();
        setPrixTTC(newPrixTTC);
    }, [prixHT, tva]);

    useEffect(() => {
        // Appeler la fonction onSave avec les données des états à chaque changement
        onSave({ designation, quantite, prixUnitaire, tva, prixHT, prixTTC });
    }, [designation, quantite, prixUnitaire, tva, prixHT, prixTTC]);

    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(id);
    };

    const handleSelect = (libelle) => {
        setDesignation(libelle.lib_designation);
        setPrixUnitaire(parseFloat(libelle.lib_montant));
        setQuantite(1);
        setTva(libelle.lib_tva || 20); // Assurez-vous d'avoir une valeur par défaut pour la TVA
    };

    // Fonction pour formater le nombre avec deux décimales après la virgule
    const formatNumber = (number) => {
        return number.toFixed(2);
    };

    const calculTVA_TTC = () => {
        const prixTVA = prixHT * (tva / 100);
        let prixTTC = prixHT + prixTVA;
        prixTTC = Math.round(prixTTC * 100) / 100;
        return prixTTC;
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <tr className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <InputDesignation
                    value={designation}
                    onChange={setDesignation}
                    onSelect={handleSelect}
                    onKeyDown={handleKeyDown}
                />
                {errors[`${index}.designation`] && (
                    <p className="text-red-500 text-xs italic">
                        {errors[`${index}.designation`]}
                    </p>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <InputFloat
                    value={quantite}
                    onChange={setQuantite}
                    step={1}
                    onKeyDown={handleKeyDown}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <InputFloat
                    value={prixUnitaire}
                    onChange={setPrixUnitaire}
                    step={0.01}
                    onKeyDown={handleKeyDown}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <InputFloat
                    value={tva}
                    onChange={setTva}
                    step={0.1}
                    onKeyDown={handleKeyDown}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {prixHT.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {prixTTC.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-900"
                >
                    Supprimer
                </button>
            </td>
        </tr>
    );
}
