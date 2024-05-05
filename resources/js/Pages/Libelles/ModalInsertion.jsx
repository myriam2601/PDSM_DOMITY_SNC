import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from "@inertiajs/react";
Modal.setAppElement('#app'); // Assurez-vous de configurer cela correctement selon l'élément racine de votre application.

const ModalInsertion = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Utilisation de useForm pour gérer les données du formulaire et l'envoi
  const { data, setData, post, processing } = useForm({
    lib_designation: '',
    lib_code: '',
    lib_montant: '',
    lib_ajustement: false
  });

  // Gestion des changements dans les champs de formulaire
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setData(name, type === 'checkbox' ? checked : value);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    post("/libelle/store", data, {
      onSuccess: (response) => {
          console.log("Success:", response);
      },
  });
   // Chemin de votre endpoint, ajustez selon votre route
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Libelle Form"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white shadow-lg rounded p-8"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-bold text-lg">Fill Libelle Details</h2>
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
              onClick={() => setModalIsOpen(false)}
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

export default ModalInsertion;
