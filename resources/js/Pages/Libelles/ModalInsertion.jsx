import React from "react";
import Modal from "react-modal";
import { router, useForm } from "@inertiajs/react";

Modal.setAppElement("#app");

const ModalInsertion = ({ isOpen, onRequestClose, onSuccess, zIndex }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        lib_designation: "",
        lib_code: "",
        lib_montant: "",
        lib_ajustement: false,
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setData(name, type === "checkbox" ? checked : value.toUpperCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/libelle/store", data, {
            onSuccess: (page) => {
                console.log("Insertion réussie, données reçues:", page);
                reset(); // Réinitialise le formulaire après succès
                onSuccess(page.props.libellesModal);
                onRequestClose(); // Ferme le modal si nécessaire
            },
            onError: (errors) => {
                console.error("Erreur lors de la requête:", errors);
            },
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Insertion Form"
            className={`fixed inset-0 flex items-center justify-center p-4 z-${zIndex}`}
            overlayClassName={`fixed inset-0 bg-gray-900 bg-opacity-50 z-${
                zIndex - 1
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Ajouter un Libellé
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Designation:
                        </label>
                        <input
                            type="text"
                            name="lib_designation"
                            value={data.lib_designation}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.lib_designation && (
                            <p className="text-red-500 text-xs italic">
                                {errors.lib_designation}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Code:
                        </label>
                        <input
                            type="text"
                            name="lib_code"
                            value={data.lib_code}
                            onChange={handleInputChange}
                            maxLength={4} // Limite à 4 caractères
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.lib_code && (
                            <p className="text-red-500 text-xs italic">
                                {errors.lib_code}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Montant:
                        </label>
                        <input
                            type="number"
                            name="lib_montant"
                            value={data.lib_montant}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.lib_montant && (
                            <p className="text-red-500 text-xs italic">
                                {errors.lib_montant}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="lib_ajustement"
                            checked={data.lib_ajustement}
                            onChange={handleInputChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">
                            Ajustement
                        </label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            disabled={processing}
                        >
                            Confirmer
                        </button>
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Fermer
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ModalInsertion;
