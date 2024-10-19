// UpdateUserForm.jsx
import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function UpdateUserForm({ user, onClose }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        // Ajoutez d'autres champs selon vos besoins
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.update', { id: user.id }));
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Mettre à jour les informations de l'utilisateur</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nom"/>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.email}/>
                </div>

                {/* Champ pour l'administrateur */}
                <div>
                    <InputLabel htmlFor="isAdmin" value="Administrateur"/>
                    <select
                        id="isAdmin"
                        className="mt-1 block w-full"
                        value={data.isAdmin.toString()}
                        onChange={(e) => setData('isAdmin', e.target.value === 'true')}
                        required
                    >
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                </div>


                {/* Ajoutez d'autres champs ici pour la mise à jour des informations de l'utilisateur */}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Enregistrer</PrimaryButton>

                    {recentlySuccessful && (
                        <p className="text-sm text-gray-600">Modifications enregistrées !</p>
                    )}
                </div>
            </form>
        </section>
    );
}
