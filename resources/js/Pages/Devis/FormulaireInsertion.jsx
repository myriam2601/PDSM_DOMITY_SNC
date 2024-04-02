import React, { useState,useEffect  } from 'react';
import { LigneDevis } from "../../Components/LigneDevis";
import { Link, Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import ModalCalcul from '../../Modal/ModalCalcul.jsx';
import Conf from '../../Modal/ModalGenerationPDF.jsx';
import ModalGenerationPDF from '../../Modal/ModalGenerationPDF.jsx';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { PlusIcon } from '@heroicons/react/20/solid'

//G:\HEG_IG\projetGREP\PDSM_DOMITY_SNC\resources\js\Modal
export default function FormulaireInsertion({ success, projectId, auth }) {
    const [localProjectId, setLocalProjectId] = useState(projectId);
    const [showModal, setShowModal] = useState(false);
    const [createdDevisId, setCreatedDevisId] = useState(null);
    //const [indexId, setIndexId] = useState(0);
    const { data, setData, post, processing, errors } = useForm({
        lignesDevis: [{
            id: getUID(),
            designation: "", 
            quantite: 1, 
            prixUnitaire: 0,
            tva: 7.8,
        }], // Initialisez lignesDevis comme un tableau
        projectId: localProjectId, 
    });

    function getUID() {
        // Get the timestamp and convert 
        // it into alphanumeric input
        return Date.now().toString(36);
    }

    useEffect(() => {
        
        // Assurez-vous que cette mise à jour ne se produit que lorsque nécessaire
        if (localProjectId !== data.projectId) {
            setData(currentData => ({
                ...currentData,
                projectId: localProjectId,
            }));
        }
    }, [localProjectId]); // Dépend uniquement de localProjectId

    useEffect(() => {
        
        if (projectId) {
            localStorage.setItem('projectId', projectId);
            setLocalProjectId(projectId); // Mettre à jour l'état local
        } else {
            const storedProjectId = localStorage.getItem('projectId');
            if (storedProjectId) {
                setLocalProjectId(storedProjectId); // Utiliser l'état local pour conserver projectId
            }
        }
    }, [projectId]);

    const handleAjouterLigne = () => {
         // Obtenez le dernier ID et ajoutez 1
        const nouvelleLigne = {
            id: getUID(),
            designation: "", 
            quantite: 1, 
            prixUnitaire: 0,
            tva: 7.8,
        };
        
        setData((currentData) => ({
            ...currentData,
            lignesDevis: [...currentData.lignesDevis, nouvelleLigne],
        }));      
    };
    
    const handleSupprimerLigne = (id) => {
        const lignesMiseAJour = data.lignesDevis.filter(
            (ligne) => ligne.id !== id
        );
        setData({ ...data, lignesDevis: lignesMiseAJour });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post('/devis/store', data, {
            
            onSuccess: (response) => {
                // Supposons que votre API retourne l'ID du devis créé dans la réponse
                setCreatedDevisId(response.data.devisId);
                setShowModal(true);
            }
        });
    };
    
    // Fonction pour mettre à jour les données du formulaire
    const handleSaveData = (id, newData) => {
        setData((currentData) => {
            const updatedLignesDevis = currentData.lignesDevis.map((ligne) =>
                
                ligne.id === id ? { ...ligne, ...newData } : ligne
            
            );
            
            // Retourne un nouvel objet data avec les LignesDevis mises à jour
            return { ...currentData, lignesDevis: updatedLignesDevis };
        });
    };

    return (
        <DefaultDashboardLayout user={auth.user}>
            <Head title="Formulaire Devis" />
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                
                <div className="min-h-[400px] max-h-[400px] overflow-auto border border-gray-300 shadow rounded-lg w-full max-w-6xl my-10">
                {console.log(data.lignesDevis)}
                {data.lignesDevis.map((ligne, index)=>(
                    <div key={ligne.id}>
                        {console.log(ligne)}
                        <LigneDevis
                        id={ligne.id}
                        index={index}
                        prest_designation={ligne.designation}
                        prest_quantite={ligne.quantite}
                        prest_prix={ligne.prixUnitaire}
                        prest_tva={ligne.tva}
                        errors={errors}
                        onDelete={handleSupprimerLigne}
                        onSave={(newData) => handleSaveData(ligne.id, newData)}
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
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
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
