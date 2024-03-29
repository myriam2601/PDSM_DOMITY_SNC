// Importations nécessaires
import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { LigneDevis } from '@/Components/LigneDevis';
import { Head } from '@inertiajs/react';
/* import { PlusIcon } from '@heroicons/react/24/solid'; */

// Le composant de la page
export default function UpdateDevisForm({ auth, designation }) {
    // Utilisez l'état pour stocker les modifications des désignations
    
    const designationJSON = JSON.parse(designation);
    
    //console.log(designationJSON)
    const [designations, setDesignations] = useState(() => designationJSON.map(ligne => ligne.designation));
    const [formData, setFormData] = useState({});
    const [ligneDevisTab, setLigneDevisTab] = useState(
        designationJSON.map((item, index) => ({
            ...item,
            id: index + 1, // Commencez les IDs à 1 pour suivre votre exemple initial
          }))
    );
    const { data, setData, post, processing, errors } = useForm({    
        libelle: designationJSON.designation
    });

    const handleAjouterLigne = () => {
        const newId = ligneDevisTab.length + 1;
        setLigneDevisTab([...ligneDevisTab, { id: newId }]);
    }

    const handleSupprimerLigne = (id) => {
        setLigneDevisTab(ligneDevisTab.filter(ligne => ligne.id !== id));
    }
    
    const handleSaveData = (id, data) => {
        setFormData(prevState => ({ ...prevState, [id]: data }));
        
         // Mettre à jour les données du formulaire avec les nouvelles données
        //setData(data=>({...data, lignesDevis: formData}))
        //setData(data=>({...data, projectId: localProjectId}))
    }
    // Gestionnaire pour mettre à jour les désignations dans l'état
    const handleDesignationChange = (index, newValue) => {
        const newDesignations = [...designations];
        newDesignations[index] = newValue;
        setDesignations(newDesignations);
    };

    // Soumettre les modifications
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('devis.update', { id: projet.id }));
        // Ici, utilisez Inertia.js pour soumettre les modifications
        // Exemple: Inertia.post('/path-to-update-designations', { designations });
    };
    console.log(designationJSON);
    return (
        

        <DefaultDashboardLayout user={auth.user}>
            <Head title="Formulaire Devis" />
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="min-h-[400px] max-h-[400px] overflow-auto border border-gray-300 shadow rounded-lg w-full max-w-6xl my-10">

                    {ligneDevisTab.map((ligne) => (
                        <div key={ligne.id}>
                        <LigneDevis 
                            id={ligne.id}
                            prest_designation={ligne.designation}
                            prest_quantite={ligne.quantite}
                            prest_prix={ligne.prixUnitaire}
                            prest_tva={ligne.tva}
                            onDelete={() => handleSupprimerLigne(ligne.id)}
                            onSave={(data) => handleSaveData(ligne.id, data)}
                        />
                        </div>
                    ))}
                </div>
                <div className="space-x-4">
                    <button
                        onClick={handleAjouterLigne}
                        type="button"
                        className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {/* <PlusIcon className="h-5 w-5" aria-hidden="true" /> */}
                    </button>
                    <PrimaryButton disabled={processing} className="mt-4">Ajouter</PrimaryButton>
                </div>
                {/* <ModalGenerationPDF 
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => {
                        setShowModal(false);
                        window.location.href = `/devis/generate-pdf/${createdDevisId}`;
                    }}
                /> */}
            </form>
            {/* <ModalCalcul tab={formData}/>  */}
        </DefaultDashboardLayout>
    );
}
