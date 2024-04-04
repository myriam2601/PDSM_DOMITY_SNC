import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function ModalCalcul({ tab, ajustement }) {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
        new Array(tab.libelles ? tab.libelles.length : 0).fill(false)
    );
    
    const [disableCheck, setDisableCheck] = useState(
        new Array(tab.libelles ? tab.libelles.length : 0).fill(false)
    );
    const [adjustmentType, setAdjustmentType] = useState("majoration");
    const [percentage, setPercentage] = useState(0);
    const [adjustedTotal, setAdjustedTotal] = useState(0);
    const [adjustmentNameInput, setAdjustmentNameInput] = useState("");
    // Actualiser le montant total ajusté à chaque changement pertinent
    useEffect(() => {
        const selectedItems = tab.libelles
            ? tab.libelles.filter((_, index) => checkedItems[index])
            : [];

        const totalAmount = selectedItems.reduce(
            (total, ligne) => total + parseFloat(ligne.prixTTC),
            0
        );
        const adjustmentFactor =
            adjustmentType === "majoration"
                ? 1 + percentage / 100
                : 1 - percentage / 100;
        setAdjustedTotal(totalAmount * adjustmentFactor);
    }, [checkedItems, percentage, adjustmentType, tab.libelles]);

    useEffect(() => {
        // Récupérer les IDs des lignes déjà ajustées
        const adjustedIds = tab.ajustements
            ? tab.ajustements.flatMap((ajust) => ajust.identifiantDesignation)
            : [];
        // Déterminer quelles cases à cocher doivent être désactivées
        const newDisableCheck = tab.libelles
            ? tab.libelles.map((libelle) => adjustedIds.includes(libelle.id))
            : [];
        setDisableCheck(newDisableCheck);
    }, [tab.ajustements, tab.libelles]);

    const handleAdjustment = () => {
        // Vérifiez si au moins un libellé est sélectionné
        const isAnyItemSelected = checkedItems.some((item) => item);
        // Vérifiez si les champs requis sont remplis
        const isFormValid =
            adjustmentNameInput.trim() && percentage > 0 && isAnyItemSelected;

        if (!isFormValid) {
            if (!isAnyItemSelected) {
                toast.error("Vous devez sélectionner au moins un libellé.");
            } else if (!adjustmentNameInput.trim() || percentage <= 0) {
                toast.error(
                    "Tous les champs doivent être remplis correctement."
                );
            }
            return; // Arrête l'exécution si le formulaire n'est pas valide
        }

        const selectedItems = tab.libelles.filter(
            (_, index) => checkedItems[index]
        );
        const adjustedItems = selectedItems.map((item) => ({ id: item.id }));
        const result = {
            appellationAjustement: adjustmentNameInput.trim(),
            nomAjustement: adjustmentType,
            taux: percentage,
            identifiantDesignation: adjustedItems.map((item) => item.id),
            montantTotalAjuste: adjustedTotal.toFixed(2),
        };

        ajustement(result); // Passez le nouvel ajustement
        toast.success("Ajustement ajouté avec succès !"); // Affichez un message de réussite
        setIsOpen(false); // Fermez le modal

        // Réinitialisez les états pour un nouvel ajustement
        resetModalState();
    };
    // Réinitialisez l'état du modal pour un nouvel ajustement
    const resetModalState = () => {
        setCheckedItems(new Array(tab.libelles?.length ?? 0).fill(false));
        setAdjustmentType("majoration");
        setPercentage(""); // Changez ceci pour permettre la saisie directe des chiffres
        setAdjustmentNameInput("");
        setAdjustedTotal(0);
    };

    const toggleModal = () => {
        // Vérifiez d'abord s'il existe des libelles
        const hasLibelles = tab.libelles && tab.libelles.length > 0;
        // Ensuite, vérifiez si tous les libelles sont remplis correctement (selon vos critères de 'rempli correctement')
        const allLibellesFilled =
            hasLibelles &&
            tab.libelles.every(
                (libelle) =>
                    libelle.designation &&
                    libelle.prixUnitaire &&
                    libelle.quantite
            );

        if (!hasLibelles || !allLibellesFilled) {
            // Si aucun libelle n'est présent ou si tous les libelles ne sont pas correctement remplis, affichez un message d'erreur
            toast.error(
                "Impossible d'ouvrir le calcul car il existe des lignes vides ou incomplètes."
            );
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
    };

    const handlePercentageChange = (e) => {
        const value = e.target.value;
        // Convertir la valeur en flottant seulement si elle n'est pas vide, sinon utiliser une chaîne vide
        setPercentage(value ? parseFloat(value).toString() : "");
    };

    return (
        <div>
            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleModal}
            >
                Calcul
            </button>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div
                        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
                        onClick={toggleModal}
                    ></div>
                    <div className="modal-container bg-white w-3/4 h-3/4 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Ajustement</p>
                                <div
                                    className="modal-close cursor-pointer z-50"
                                    onClick={toggleModal}
                                >
                                    <svg
                                        className="fill-current text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M16.22 14.74l-1.48 1.48L9 10.48l-5.74 5.74-1.48-1.48L7.52 9 1.78 3.26l1.48-1.48L9 7.52l5.74-5.74 1.48 1.48L10.48 9z"></path>
                                    </svg>
                                </div>
                            </div>
                            <ul>
                                {tab.libelles && tab.libelles.length > 0 ? (
                                    tab.libelles.map((ligne, index) => (
                                        <li
                                            key={index}
                                            className={`flex items-center ${
                                                disableCheck[index]
                                                    ? "text-gray-400"
                                                    : ""
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checkedItems[index]}
                                                disabled={disableCheck[index]}
                                                onChange={() =>
                                                    handleCheckboxChange(index)
                                                }
                                                className="mr-2"
                                            />
                                            <span
                                                className={`${
                                                    disableCheck[index]
                                                        ? "line-through"
                                                        : ""
                                                }`}
                                            >
                                                Designation: {ligne.designation}{" "}
                                                - Prix TTC: {ligne.prixTTC}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <p>Aucune ligne à afficher.</p>
                                )}
                            </ul>

                            <div className="mb-4">
                                <label
                                    htmlFor="adjustmentNameInput"
                                    className="block"
                                >
                                    Appellation de l'ajustement :
                                </label>
                                <input
                                    type="text"
                                    id="adjustmentNameInput"
                                    value={adjustmentNameInput}
                                    onChange={(e) =>
                                        setAdjustmentNameInput(e.target.value)
                                    }
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="majoration" className="ml-2">
                                    Majoration
                                </label>
                                <input
                                    type="radio"
                                    id="majoration"
                                    name="adjustment"
                                    value="majoration"
                                    checked={adjustmentType === "majoration"}
                                    onChange={() =>
                                        setAdjustmentType("majoration")
                                    }
                                />
                                <label htmlFor="rabais" className="ml-2">
                                    Rabais
                                </label>
                                <input
                                    type="radio"
                                    id="rabais"
                                    name="adjustment"
                                    value="rabais"
                                    checked={adjustmentType === "rabais"}
                                    onChange={() => setAdjustmentType("rabais")}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="percentage" className="block">
                                    Pourcentage :
                                </label>
                                <input
                                    type="number"
                                    id="percentage"
                                    value={percentage} // Assurez-vous que cela reflète l'état `percentage`
                                    onChange={handlePercentageChange}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            </div>
                            <p className="text-xl font-semibold">
                                Montant total après ajustement :{" "}
                                {adjustedTotal.toFixed(2)}
                            </p>
                            <button type="button" onClick={handleAdjustment}>
                                Valider l'ajustement
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
