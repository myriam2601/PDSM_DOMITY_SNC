import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";

export default function DeleteClientForm({ client, className = '' }) {
    const [confirmingClientDeletion, setConfirmingClientDeletion] = useState(false);
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

    const confirmClientDeletion = () => {
        setConfirmingClientDeletion(true);
    };

    const deleteClient = (e) => {
        e.preventDefault();

        destroy(route('clients.destroy', { id: client.id }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingClientDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Supprimer le Client</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Une fois le client supprimé, toutes ses ressources et données seront définitivement effacées.
                    Avant de supprimer le client, assurez-vous de sauvegarder toutes les informations que vous souhaitez conserver.
                </p>
            </header>

            <DangerButton onClick={confirmClientDeletion}>Supprimer le Client</DangerButton>

            <Modal show={confirmingClientDeletion} onClose={closeModal}>
                <form onSubmit={deleteClient} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Êtes-vous sûr de vouloir supprimer ce client ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Une fois le client supprimé, toutes ses ressources et données seront définitivement effacées.
                        Veuillez entrer votre mot de passe pour confirmer que vous souhaitez supprimer ce client.
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
                            Supprimer le Client
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

