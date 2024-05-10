import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { LigneDevis } from "@/Components/LigneDevis";
import { Head } from "@inertiajs/react";
import DeleteDevisForm from "./DeleteDevisForm";
import ModalCalcul from "@/Modal/ModalCalcul";

/* import { PlusIcon } from '@heroicons/react/24/solid'; */

// Le composant de la page
export default function UpdateDevisForm({ auth, devis }) {
    const dev_liste_prestation = JSON.parse(devis.dev_liste_prestation);

    const libelles = dev_liste_prestation["libelles"];
    const ajustements = dev_liste_prestation["ajustements"];

    const [statut, setStatut] = useState(devis.dev_status);
    const { data, setData, patch, processing, errors } = useForm({
        id: devis.id,
        ajustements: ajustements
            ? ajustements.map((item) => ({ ...item }))
            : [],
        libelles: libelles.map((item, index) => ({
            ...item,
        })),
        statutData: statut,
    });

    function getUID() {
        return Date.now().toString(36);
    }
    console.log(data);
    useEffect(() => {
        setData((data) => ({
            ...data,
            statutData: statut,
        }));
    }, [statut]);

    const handleAjouterLigne = () => {
        const nouvelleLigne = {
            id: getUID(), // Assurez-vous que cette ID est unique dans le tableau
            designation: "", // Valeur par défaut
            quantite: 1, // Valeur par défaut
            prixUnitaire: 0, // Valeur par défaut
            tva: 20, // Valeur par défaut, peut être ajustée selon vos besoins
            // Ajoutez d'autres champs nécessaires avec des valeurs par défaut ici
        };

        // Ajoutez la nouvelle ligne au tableau existant dans 'data.LignesDevis'
        setData((currentData) => ({
            ...currentData,
            libelles: [...currentData.libelles, nouvelleLigne],
        }));
    };

    const handleSupprimerLigne = (id) => {
        const lignesMiseAJour = data.libelles.filter(
            (ligne) => ligne.id !== id
        );
        setData({ ...data, libelles: lignesMiseAJour });
    };

    const handleSupprimerAjustement = (indexToRemove) => {
        setData((currentData) => ({
            ...currentData,
            ajustements: currentData.ajustements.filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

    const handleStatutChange = (e) => {
        setStatut(e.target.value);
    };

    const handleSaveData = (id, newData) => {
        setData((currentData) => {
            const updatedLignesDevis = currentData.libelles.map((ligne) =>
                ligne.id === id ? { ...ligne, ...newData } : ligne
            );
            // Retourne un nouvel objet data avec les LignesDevis mises à jour
            return { ...currentData, libelles: updatedLignesDevis };
        });
    };

    // Dans le composant parent
    function handleAjustement(newAjustement) {
        // Ajoutez le nouvel ajustement au tableau existant d'ajustements
        setData((prevData) => ({
            ...prevData,
            ajustements: [...prevData.ajustements, newAjustement],
        }));
    }

    // Soumettre les modifications
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route("devis.update"));
    };

    return (
        <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Modifier le Devis: {devis.dev_nom}</h2>

            <div className="mb-4">
                <label htmlFor="statut" className="block text-sm font-medium text-gray-700">Statut du devis :</label>
                <select id="statut" value={data.statutData} onChange={(e) => setData('statutData', e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option value="en attente">En attente</option>
                    <option value="accepté">Accepté</option>
                    <option value="refusé">Refusé</option>
                </select>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Désignation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantité
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix Unitaire
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TVA
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix HT
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix TTC
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.libelles.map((ligne, index) => (
                    <LigneDevis key={ligne.id} ligne={ligne} index={index} setData={setData} errors={errors} />
                ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={handleAjouterLigne}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Ajouter Ligne
                </button>
                <PrimaryButton disabled={processing} className="bg-green-500 hover:bg-green-700">
                    Sauvegarder les Modifications
                </PrimaryButton>
            </div>
        </form>
    );
}
