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

    // Fonction pour formater le nombre avec deux décimales après la virgule
    const formatNumber = (number) => {
        return number.toFixed(2);
    };

    const calculTVA_TTC = () => {
        const prixTVA = prixHT * (tva / 100);
        let prixTTC = prixHT + prixTVA;
        // Arrondir le résultat à deux décimales, si nécessaire
        prixTTC = Math.round(prixTTC * 100) / 100;
        return prixTTC;
    };
    
    return (
        
        <div
            className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            data-id={id}
        >
           
            <div className="sm:col-span-1">
                <p className="text-sm">Désignation</p>
                <InputDesignation
                    value={designation}
                    onChange={setDesignation}
                />
                {console.log(id)}
                {console.log(errors)}
                {errors[`${index}.designation`] && (
                    <p className="text-red-500 text-xs italic">
                        {errors[`${index}.designation`]}
                    </p>
                )}
            </div>
            <div className="sm:col-span-1">
                <p className="text-sm">Quantité</p>
                <InputFloat value={quantite} onChange={setQuantite} step={1} />
                
                {errors[`${index}.quantite`] && (
                    <p className="text-red-500 text-xs italic">
                        {errors[`${index}.quantite`]}
                    </p>
                )}
            </div>
            <div className="sm:col-span-1">
                <p className="text-sm">P.U</p>
                <InputFloat
                    value={prixUnitaire}
                    onChange={setPrixUnitaire}
                    step={0.5}
                />
            </div>
            <div className="sm:col-span-1">
                <p className="text-sm">TVA</p>
                <InputFloat value={tva} onChange={setTva} step={0.1} />
            </div>
            <div className="sm:col-span-1">
                <p className="text-sm">Prix HT</p>
                <p>{formatNumber(prixHT)}</p>
            </div>
            <div className="sm:col-span-1">
                <p className="text-sm">Prix TTC</p>
                <p>{formatNumber(prixTTC)}</p>
            </div>
            <button
                className="ml-4 py-2 px-4 bg-red-500 text-white rounded"
                onClick={handleDelete}
            >
                Supprimer
            </button>
            
        </div>
        
    );
}
