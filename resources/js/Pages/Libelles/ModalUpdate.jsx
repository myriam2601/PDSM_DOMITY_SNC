import React from "react";
import Modal from "react-modal";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const ModalUpdate = ({ isOpen, onRequestClose, libelle, onSuccess }) => {
    const { data, setData, patch, processing, reset } = useForm({
        id: libelle ? libelle.id : "",
        lib_designation: libelle ? libelle.lib_designation : "",
        lib_code: libelle ? libelle.lib_code : "",
        lib_montant: libelle ? libelle.lib_montant : "",
        lib_ajustement: libelle ? libelle.lib_ajustement : false,
    });

    React.useEffect(() => {
        setData({
            id: libelle ? libelle.id : "",
            lib_designation: libelle ? libelle.lib_designation : "",
            lib_code: libelle ? libelle.lib_code : "",
            lib_montant: libelle ? libelle.lib_montant : "",
            lib_ajustement: libelle ? libelle.lib_ajustement : false,
        });
    }, [isOpen, libelle]);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setData(name, type === "checkbox" ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.patch("/libelle/update", data, {
            onSuccess: (page) => {
                console.log("Modification réussie, données reçues:", page);
                onSuccess(data); // Passez les données modifiées à la fonction de succès
                reset(); // Réinitialise le formulaire après succès
                onRequestClose(); // Ferme le modal si nécessaire
            },
            onError: (errors) => {
                console.error("Erreur lors de la requête:", errors);
            },
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
                            type="button"
                            onClick={onRequestClose}
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
