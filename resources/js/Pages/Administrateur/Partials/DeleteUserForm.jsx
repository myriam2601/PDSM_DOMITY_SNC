// DeleteUserForm.jsx
import React, { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';

export default function DeleteUserForm({ userId, onClose }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('users.destroy', { id: userId }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
        onClose(); // Ferme également la fenêtre modale parente
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900">Supprimer l'utilisateur</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Une fois l'utilisateur supprimé, toutes ses ressources et données seront définitivement effacées.
                    Assurez-vous de sauvegarder toutes les informations que vous souhaitez conserver avant de continuer.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Supprimer l'utilisateur</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Une fois l'utilisateur supprimé, toutes ses ressources et données seront définitivement effacées.
                        Veuillez entrer votre mot de passe pour confirmer que vous souhaitez supprimer cet utilisateur.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Mot de passe" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Mot de passe"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Supprimer l'utilisateur
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
