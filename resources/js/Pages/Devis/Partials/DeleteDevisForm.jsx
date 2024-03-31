// DeleteDevisForm.jsx
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal"; // Assurez-vous d'avoir ce composant
import DangerButton from "@/Components/DangerButton"; // Assurez-vous d'avoir ce composant

export default function DeleteDevisForm({ idDevis }) {
    const [showModal, setShowModal] = useState(false);
    const { delete: destroy, processing } = useForm();

    const deleteDevis = () => {
        destroy(route("devis.destroy", idDevis), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <DangerButton onClick={() => setShowModal(true)}>
                Supprimer le devis
            </DangerButton>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <p>
                    Êtes-vous sûr de vouloir supprimer ce devis ? Cette action
                    est irréversible.
                </p>
                <DangerButton onClick={deleteDevis} disabled={processing}>
                    Confirmer
                </DangerButton>
            </Modal>
        </>
    );
}
