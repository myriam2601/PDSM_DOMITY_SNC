import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SearchInput } from "@/Components/SearchInput"; // Ensure correct import

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
        const adjustedIds = tab.ajustements
            ? tab.ajustements.flatMap((ajust) => ajust.identifiantDesignation)
            : [];
        const newDisableCheck = tab.libelles
            ? tab.libelles.map((libelle) => adjustedIds.includes(libelle.id))
            : [];
        setDisableCheck(newDisableCheck);
    }, [tab.ajustements, tab.libelles]);

    const handleAdjustment = () => {
        const isAnyItemSelected = checkedItems.some((item) => item);
        const isFormValid =
            adjustmentNameInput &&
            adjustmentNameInput.trim() &&
            percentage > 0 &&
            isAnyItemSelected;

        if (!isFormValid) {
            if (!isAnyItemSelected) {
                toast.error("Vous devez sélectionner au moins un libellé.");
            } else if (
                !adjustmentNameInput ||
                !adjustmentNameInput.trim() ||
                percentage <= 0
            ) {
                toast.error(
                    "Tous les champs doivent être remplis correctement."
                );
            }
            return;
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

        ajustement(result);
        toast.success("Ajustement ajouté avec succès !");
        setIsOpen(false);
        resetModalState();
    };

    const resetModalState = () => {
        setCheckedItems(new Array(tab.libelles?.length ?? 0).fill(false));
        setAdjustmentType("majoration");
        setPercentage(0); // Ensure this is a number
        setAdjustmentNameInput("");
        setAdjustedTotal(0);
    };

    const toggleModal = () => {
        const hasLibelles = tab.libelles && tab.libelles.length > 0;
        const allLibellesFilled =
            hasLibelles &&
            tab.libelles.every(
                (libelle) =>
                    libelle.designation &&
                    libelle.prixUnitaire &&
                    libelle.quantite
            );

        if (!hasLibelles || !allLibellesFilled) {
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
        setPercentage(value ? parseFloat(value) : 0); // Ensure this is a number
    };

    const handleAdjustmentNameSelect = (ajustement) => {
        setAdjustmentNameInput(ajustement.lib_designation);
        setPercentage(ajustement.lib_montant);
    };

    return (
        <div>
            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
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
                    <div className="modal-container bg-white w-3/4 md:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
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
                            <ul className="mb-4">
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
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Appellation de l'ajustement :
                                </label>
                                <SearchInput
                                    value={adjustmentNameInput}
                                    onChange={setAdjustmentNameInput}
                                    onSelect={handleAdjustmentNameSelect}
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="majoration"
                                        name="adjustment"
                                        value="majoration"
                                        checked={
                                            adjustmentType === "majoration"
                                        }
                                        onChange={() =>
                                            setAdjustmentType("majoration")
                                        }
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor="majoration"
                                        className="mr-4"
                                    >
                                        Majoration
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="rabais"
                                        name="adjustment"
                                        value="rabais"
                                        checked={adjustmentType === "rabais"}
                                        onChange={() =>
                                            setAdjustmentType("rabais")
                                        }
                                        className="mr-2"
                                    />
                                    <label htmlFor="rabais">Rabais</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="percentage"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Pourcentage :
                                </label>
                                <input
                                    type="number"
                                    id="percentage"
                                    value={percentage}
                                    onChange={handlePercentageChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <p className="text-xl font-semibold">
                                Montant total après ajustement :{" "}
                                {adjustedTotal.toFixed(2)}
                            </p>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                    onClick={handleAdjustment}
                                >
                                    Valider l'ajustement
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
