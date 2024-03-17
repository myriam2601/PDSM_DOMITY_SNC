import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from "@/Components/TextInput.jsx";
import InputError from '@/Components/InputError';

export default function DeleteProjectForm({ projet }) {
    const [confirmingProjectDeletion, setConfirmingProjectDeletion] = useState(false);
    const passwordInput = useRef();
    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        password: '',
    });

    const confirmProjectDeletion = () => {
        setConfirmingProjectDeletion(true);
    };

    const deleteProject = (e) => {
        e.preventDefault();

        destroy(route('projets.destroy', { id: projet.id }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset('password'), // Make sure to reset the password field only
        });
    };

    const closeModal = () => {
        setConfirmingProjectDeletion(false);
        reset(); // Reset the form, clearing the password
    };

    return (
        <div>
            <DangerButton onClick={confirmProjectDeletion}>
                Supprimer le Projet
            </DangerButton>

            <Modal show={confirmingProjectDeletion} onClose={closeModal}>
                <form onSubmit={deleteProject} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Êtes-vous sûr de vouloir supprimer ce projet ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Une fois le projet supprimé, toutes ses données seront définitivement effacées.
                        Veuillez entrer votre mot de passe pour confirmer que vous souhaitez supprimer ce projet.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Mot de passe" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>

                        <DangerButton className="ms-2" disabled={processing}>
                            Supprimer le Projet
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
