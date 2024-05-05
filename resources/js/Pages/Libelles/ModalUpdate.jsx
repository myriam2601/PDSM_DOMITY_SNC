import React from 'react';
import Modal from 'react-modal';
import { useForm } from "@inertiajs/react";

const ModalUpdate = ({ isOpen, onRequestClose, libelle }) => {
    
    // Initialisation des données du formulaire directement avec les valeurs du libelle
    const { data, setData, patch, processing } = useForm({
        id: libelle ? libelle.id : '',
        lib_designation: libelle ? libelle.lib_designation : '',
        lib_code: libelle ? libelle.lib_code : '',
        lib_montant: libelle ? libelle.lib_montant : '',
        lib_ajustement: libelle ? libelle.lib_ajustement : false,
    });

    React.useEffect(() => {
        console.log("Mise à jour des données du formulaire :", libelle);
        setData({
            id: libelle ? libelle.id : '',
            lib_designation: libelle ? libelle.lib_designation : '',
            lib_code: libelle ? libelle.lib_code : '',
            lib_montant: libelle ? libelle.lib_montant : '',
            lib_ajustement: libelle ? libelle.lib_ajustement : false,
        });
    }, [isOpen, libelle]);
    
    // Gestion des changements dans les champs de formulaire
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch("/libelle/update", data, {
            onSuccess: (page) => {
                console.log('Message de succès:', page.props.message);
                // Autres actions après succès, comme fermer un modal ou afficher une notification
            }
        });
    };
    
    return (
        <div>
        
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Update Libelle"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-3xl h-1/2 bg-white shadow-lg rounded p-8 overflow-hidden"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-bold text-lg">Modifier Libellé</h2>
                <label className="block">
                    Designation:
                    <input
                        type="text"
                        name="lib_designation"
                        value={data.lib_designation}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block">
                    Code:
                    <input
                        type="text"
                        name="lib_code"
                        value={data.lib_code}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block">
                    Montant:
                    <input
                        type="text"
                        name="lib_montant"
                        value={data.lib_montant}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="flex items-center space-x-2">
                    Ajustement:
                    <input
                        type="checkbox"
                        name="lib_ajustement"
                        checked={data.lib_ajustement}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                </label>
                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        disabled={processing}
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => onRequestClose()}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </form>
        </Modal>
        </div>
    );
};

export default ModalUpdate;
