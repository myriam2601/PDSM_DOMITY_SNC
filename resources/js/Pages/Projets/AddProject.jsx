// Gère un formulaire d'ajout de projet

import React, {useEffect} from 'react';
import { useForm, Head, usePage, Link} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";


export default function AddProject({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        client_id:'', // Note: Assurez-vous que cela correspond au nom de l'attribut attendu par votre backend
        service_id:'',
        debut: '',
        deadline: '',
        description: '',
    });

    useEffect(() => {
        Promise.all([
            fetch('/AllClients').then(clientResponse => clientResponse.json()),
            fetch('/AllServices').then(serviceResponse => serviceResponse.json())
        ])
            .then(([clientsData, servicesData]) => {
                setData({
                    clients: clientsData,
                    services: servicesData
                });
            })
            .catch(error => console.error('Error fetching clients and services:', error));
    }, []);

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
                                <label htmlFor="nom"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
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
                                <InputError message={errors.nom} className="mt-2"/>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="client_id"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Choisir un client
                                </label>
                                <select
                                    id="client_id"
                                    name="client_id"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.client_id}
                                    onChange={(e) => setData('client_id', e.target.value)}
                                >
                                    <option value="">Sélectionnez un client</option>
                                    {data.clients && data.clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.cli_nom} {client.cli_prenom}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.client_id} className="mt-2"/>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="service_id"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Choisir un service
                                </label>
                                <select
                                    id="service_id"
                                    name="service_id"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.service_id}
                                    onChange={(e) => setData('service_id', e.target.value)}
                                >
                                    <option value="">Sélectionnez un service</option>
                                    {data.services && data.services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.ser_nom}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.service_id} className="mt-2"/>
                            </div>

                            {/* Project Start Date */}
                            <div className="sm:col-span-3">
                                <label htmlFor="debut"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
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
                                <InputError message={errors.debut} className="mt-2"/>
                            </div>

                            {/* Project Deadline */}
                            <div className="sm:col-span-3">
                                <label htmlFor="deadline"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
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
                                <InputError message={errors.deadline} className="mt-2"/>
                            </div>

                            {/* Project Description */}
                            <div className="sm:col-span-6">
                                <label htmlFor="description"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
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
                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>Ajouter</PrimaryButton>
                        </div>
                        
                        <Link href={route('devis.form')}>
                       
                        {/* Bouton pour ajouter un client avec une icône Plus */}
                        <button
                            type="button"
                            className="my-3 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                        >
                            <span>Devis</span>
                            
                        </button>
                    </Link>
                    </form>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
