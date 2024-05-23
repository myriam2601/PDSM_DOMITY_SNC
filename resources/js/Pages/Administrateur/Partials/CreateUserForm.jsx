import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function CreateUserForm() {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('create.user'), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    name: '',
                    email: '',
                    password: '',
                    isAdmin: false,
                });
            },
        });
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Créer un utilisateur</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Remplissez le formulaire pour créer un nouvel utilisateur.
                </p>
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

                <div>
                    <InputLabel htmlFor="password" value="Mot de passe"/>

                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.password}/>
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmation du mot de passe"/>
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.password_confirmation}/>
                </div>

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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Créer</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Utilisateur créé avec succès !</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
