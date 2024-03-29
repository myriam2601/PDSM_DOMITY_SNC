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
    const [ligneDevisTab, setLigneDevisTab] = useState([{ id: 1 }]);
    const [formData, setFormData] = useState({}); // Etat local pour stocker les données du formulaire
    const [localProjectId, setLocalProjectId] = useState(projectId);
    const [showModal, setShowModal] = useState(false);
    const [createdDevisId, setCreatedDevisId] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        lignesDevis: [], // Initialisez lignesDevis comme un tableau
        projectId: localProjectId,
    });
    
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
        const newId = ligneDevisTab.length + 1;
        setLigneDevisTab([...ligneDevisTab, { id: newId }]);
    }

    const handleSupprimerLigne = (id) => {
        setLigneDevisTab(ligneDevisTab.filter(ligne => ligne.id !== id));
    }

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
    const handleSaveData = (id, data) => {
        setFormData(prevState => ({ ...prevState, [id]: data }));
        
         // Mettre à jour les données du formulaire avec les nouvelles données
        setData(data=>({...data, lignesDevis: formData}))
        setData(data=>({...data, projectId: localProjectId}))
    }

    return (
        <DefaultDashboardLayout user={auth.user}>
            <Head title="Formulaire Devis" />
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="min-h-[400px] max-h-[400px] overflow-auto border border-gray-300 shadow rounded-lg w-full max-w-6xl my-10">
                    {ligneDevisTab.map((ligne) => (
                        <div key={ligne.id}>
                            <LigneDevis 
                                id={ligne.id}
                                onDelete={handleSupprimerLigne}
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
