// Gère un formulaire d'ajout de projet

import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";

export default function AddProject({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        client: '', // Note: Assurez-vous que cela correspond au nom de l'attribut attendu par votre backend
        debut: '',
        deadline: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projets.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <DefaultDashboardLayout user={auth.user}>
            <Head title="Ajouter un Projet" />

            <div className="divide-y divide-white/5 bg-white">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div className="md:col-span-1">
                        <h2 className="text-base font-semibold leading-7 text-primaryDarkBlue">
                            Ajouter un nouveau Projet
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Création de projet
                        </p>
                    </div>

                    <form onSubmit={submit} className="md:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="nom" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Nom / Désignation du projet
                                </label>
                                <input
                                    type="text"
                                    name="nom"
                                    id="nom"
                                    autoComplete="nom"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                />
                                <InputError message={errors.nom} className="mt-2" />
                            </div>

                            {/* LIE UN PROJET AVEC UN CLIENT
                            <div className="sm:col-span-6">
                                <label htmlFor="client_id" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Choisir un client
                                </label>
                                <select
                                    id="client_id"
                                    name="client_id"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.client_id} // Ajustez pour utiliser client_id
                                    onChange={(e) => setData('client_id', e.target.value)} // Ajustez pour utiliser client_id
                                >
                                    <option value="">Sélectionnez un client</option>
                                    <option value="1">Client 1</option>  Utilisez les ID réels de vos clients ici
                                    <option value="2">Client 2</option>
                                    <option value="3">Client 3</option>
                                </select>
                                <InputError message={errors.client_id} className="mt-2" />  Ajustez pour utiliser client_id
                            </div>*/}


                            {/* Project Start Date */}
                            <div className="sm:col-span-3">
                                <label htmlFor="debut" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Début du projet
                                </label>
                                <input
                                    type="date"
                                    name="debut"
                                    id="debut"
                                    autoComplete="debut-projet"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.debut}
                                    onChange={(e) => setData('debut', e.target.value)}
                                />
                                <InputError message={errors.debut} className="mt-2" />
                            </div>

                            {/* Project Deadline */}
                            <div className="sm:col-span-3">
                                <label htmlFor="deadline" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Deadline
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    id="deadline"
                                    autoComplete="fin-projet"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.deadline}
                                    onChange={(e) => setData('deadline', e.target.value)}
                                />
                                <InputError message={errors.deadline} className="mt-2" />
                            </div>

                            {/* Project Description */}
                            <div className="sm:col-span-6">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    autoComplete="description"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>Ajouter</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
