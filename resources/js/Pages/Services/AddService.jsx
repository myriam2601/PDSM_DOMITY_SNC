import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout";

export default function AddService({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ser_categorie:'',
        ser_nom:'',
        ser_modalite:'',
        ser_conditions_reglements:'',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('services.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <DefaultDashboardLayout user={auth.user}>
            <Head title="Ajouter un Service" />
            
            <div className="divide-y divide-white/5 bg-white">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div className="md:col-span-1">
                        <h2 className="text-base font-semibold leading-7 text-primaryDarkBlue">
                            Ajouter un nouveau Service
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Création du service
                        </p>
                    </div>

                    <form onSubmit={submit} className="md:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-6">
                                <label htmlFor="ser_nom"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    name="ser_nom"
                                    id="ser_nom"
                                    autoComplete="ser_nom"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.ser_nom}
                                    onChange={(e) => setData('ser_nom', e.target.value)}
                                />
                                <InputError message={errors.ser_nom} className="mt-2"/>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="ser_categorie"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Catégorie
                                </label>
                                <input
                                    type="text"
                                    name="ser_categorie"
                                    id="ser_categorie"
                                    autoComplete="ser_categorie"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.ser_categorie}
                                    onChange={(e) => setData('ser_categorie', e.target.value)}
                                />
                                <InputError message={errors.ser_categorie} className="mt-2"/>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="ser_modalite"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Modalité
                                </label>
                                <input
                                    type="text"
                                    name="ser_modalite"
                                    id="ser_modalite"
                                    autoComplete="ser_modalite"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.ser_modalite}
                                    onChange={(e) => setData('ser_modalite', e.target.value)}
                                />
                                <InputError message={errors.ser_modalite} className="mt-2"/>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="ser_conditions_reglements"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Condition règlement
                                </label>
                                <input
                                    type="text"
                                    name="ser_conditions_reglements"
                                    id="ser_conditions_reglements"
                                    autoComplete="ser_conditions_reglements"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.ser_conditions_reglements}
                                    onChange={(e) => setData('ser_conditions_reglements', e.target.value)}
                                />
                                <InputError message={errors.ser_conditions_reglements} className="mt-2"/>
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
