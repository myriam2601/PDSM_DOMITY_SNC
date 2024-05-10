import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { LigneDevis } from "@/Components/LigneDevis";
import ModalCalcul from "@/Modal/ModalCalcul.jsx";

export default function AddDevisForm({ projectId, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        libelles: [],
        ajustements: [],
        projectId: projectId,
    });

    const handleAjouterLigne = () => {
        setData((currentData) => ({
            ...currentData,
            libelles: [...currentData.libelles, {
                id: Date.now().toString(36),
                designation: "",
                quantite: 1,
                prixUnitaire: 0,
                tva: 20,
            }],
        }));
    };
    const handleSaveData = (id, newData) => {
        setData(currentData => {
            const updatedLibelles = currentData.libelles.map(ligne => {
                if (ligne.id === id) {
                    return { ...ligne, ...newData };
                }
                return ligne;
            });
            return { ...currentData, libelles: updatedLibelles };
        });
    };

    const handleSupprimerLigne = (id) => {
        setData((currentData) => ({
            ...currentData,
            libelles: currentData.libelles.filter(ligne => ligne.id !== id)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/devis/store");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un Devis</h2>

            <div className="overflow-auto border border-gray-300 shadow rounded-lg my-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantité</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix Unitaire</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">TVA</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix HT</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix TTC</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {data.libelles.map((ligne, index) => (
                        <LigneDevis
                            key={ligne.id}
                            ligne={ligne}
                            onDelete={() => handleSupprimerLigne(ligne.id)}
                            onSave={(newData) => handleSaveData(ligne.id, newData)}
                            errors={errors}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={handleAjouterLigne}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Ajouter Ligne
                </button>
                <PrimaryButton disabled={processing} className="mt-4 bg-green-500 hover:bg-green-700">
                    Sauvegarder le Devis
                </PrimaryButton>
            </div>
            <ModalCalcul tab={data} />
        </form>
    );
}
