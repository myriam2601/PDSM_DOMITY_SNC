import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";

export default function AddClient({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        cli_nom: '',
        cli_prenom: '',
        cli_email: '',
        cli_telephone: '',
        cli_societe: '',
        cli_adresse: '',
        cli_cli_npa: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('clients.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <DefaultDashboardLayout user={auth.user}>
            <Head title="Ajouter un Client" />

            <div className="divide-y divide-white/5 bg-white">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div className="md:col-span-1">
                        <h2 className="text-base font-semibold leading-7 text-primaryDarkBlue">
                            Ajouter un nouveau Client
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Création de client
                        </p>
                    </div>

                    <form onSubmit={submit} className="md:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="cli_nom" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    name="cli_nom"
                                    id="cli_nom"
                                    autoComplete="cli_nom"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.cli_nom}
                                    onChange={(e) => setData('cli_nom', e.target.value)}
                                />
                                <InputError message={errors.cli_nom} className="mt-2" />
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="cli_prenom" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    name="cli_prenom"
                                    id="cli_prenom"
                                    autoComplete="cli_prenom"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.cli_prenom}
                                    onChange={(e) => setData('cli_prenom', e.target.value)}
                                />
                                <InputError message={errors.cli_prenom} className="mt-2" />
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="cli_email" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="cli_email"
                                    id="cli_email"
                                    autoComplete="cli_email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.cli_email}
                                    onChange={(e) => setData('cli_email', e.target.value)}
                                />
                                <InputError message={errors.cli_email} className="mt-2" />
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="cli_telephone" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="cli_telephone"
                                    id="cli_telephone"
                                    autoComplete="cli_telephone"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.cli_telephone}
                                    onChange={(e) => setData('cli_telephone', e.target.value)}
                                />
                                <InputError message={errors.cli_telephone} className="mt-2" />
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="cli_societe" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Société
                                </label>
                                <input
                                    type="text"
                                    name="cli_societe"
                                    id="cli_societe"
                                    autoComplete="cli_societe"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.cli_societe}
                                    onChange={(e) => setData('cli_societe', e.target.value)}
                                />
                                <InputError message={errors.cli_societe} className="mt-2" />
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="cli_adresse" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    name="cli_adresse"
                                    id="cli_adresse"
                                    autoComplete="cli_adresse"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.cli_adresse}
                                    onChange={(e) => setData('cli_adresse', e.target.value)}
                                />
                                <InputError message={errors.cli_adresse} className="mt-2" />
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="cli_cli_npa" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    NPA
                                </label>
                                <input
                                    type="text"
                                    name="cli_cli_npa"
                                    id="cli_cli_npa"
                                    autoComplete="cli_cli_npa"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.cli_cli_npa}
                                    onChange={(e) => setData('cli_cli_npa', e.target.value)}
                                />
                                <InputError message={errors.cli_cli_npa} className="mt-2" />
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
