import { useState, useEffect } from "react";
import { InputDesignation } from "./InputDesignation";
import { InputFloat } from "./InputFloat";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";

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
                                    }) {
    const [designation, setDesignation] = useState(prest_designation);
    const [quantite, setQuantite] = useState(prest_quantite);
    const [prixUnitaire, setPrixUnitaire] = useState(prest_prix);
    const [tva, setTva] = useState(prest_tva);
    const [prixHT, setPrixHT] = useState(0);
    const [prixTTC, setPrixTTC] = useState(0);

    useEffect(() => {
        const newPrixHT = quantite * prixUnitaire;
        setPrixHT(newPrixHT);
    }, [quantite, prixUnitaire]);

    useEffect(() => {
        const newPrixTTC = prixHT * (1 + tva / 100);
        setPrixTTC(newPrixTTC);
    }, [prixHT, tva]);

    useEffect(() => {
        onSave({ designation, quantite, prixUnitaire, tva, prixHT, prixTTC });
    }, [designation, quantite, prixUnitaire, tva, prixHT, prixTTC]);

    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(id);
    };

    return (
        <tr className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <InputDesignation value={designation} onChange={setDesignation} />
                {errors[`${index}.designation`] && (
                    <p className="text-red-500 text-xs italic">{errors[`${index}.designation`]}</p>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <InputFloat value={quantite} onChange={setQuantite} step={1} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <InputFloat value={prixUnitaire} onChange={setPrixUnitaire} step={0.01} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <InputFloat value={tva} onChange={setTva} step={0.1} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {prixHT.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {prixTTC.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
                    Supprimer
                </button>
            </td>
        </tr>
    );
}
