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
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">
                {`${devis.dev_nom}`}
            </h2>
            <label htmlFor="statut">Statut du devis :</label>
            <select id="statut" value={statut} onChange={handleStatutChange}>
                <option value="en attente">En attente</option>
                <option value="accepté">Accepté</option>
                <option value="refusé">Refusé</option>
            </select>
            <div className="min-h-[400px] max-h-[400px] overflow-auto border border-gray-300 shadow rounded-lg w-full max-w-6xl my-10">
                {data.libelles.map((ligne, index) => (
                    <div key={ligne.id}>
                        <LigneDevis
                            id={ligne.id}
                            index={index}
                            prest_designation={ligne.designation}
                            prest_quantite={ligne.quantite}
                            prest_prix={ligne.prixUnitaire}
                            prest_tva={ligne.tva}
                            onDelete={(e) => handleSupprimerLigne(e, ligne.id)}
                            onSave={(data) => handleSaveData(ligne.id, data)}
                            errors={errors}
                        />
                    </div>
                ))}
                <div className="ajustements-section">
                    {data.ajustements &&
                        data.ajustements.length > 0 &&
                        data.ajustements.map((ajustement, index) => (
                            <div key={index} className="ajustement-item">
                                <p>
                                    Ajustement : {ajustement.nomAjustement} -
                                    Taux : {ajustement.taux}%
                                </p>
                                {/* Bouton pour supprimer un ajustement */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSupprimerAjustement(index)
                                    }
                                    className="delete-ajustement-btn"
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                </div>
            </div>
            <div className="space-x-4">
                <button
                    onClick={handleAjouterLigne}
                    type="button"
                    className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {/* <PlusIcon className="h-5 w-5" aria-hidden="true" /> */}
                </button>
                <PrimaryButton disabled={processing} className="mt-4">
                    Mettre à jour
                </PrimaryButton>
            </div>
            {/* <ModalGenerationPDF 
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => {
                        setShowModal(false);
                        window.location.href = `/devis/generate-pdf/${createdDevisId}`;
                    }}
                /> */}
            <ModalCalcul tab={data} ajustement={handleAjustement} />
        </form>
    );
}
