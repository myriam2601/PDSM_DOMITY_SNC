import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout";
import { PhotoIcon } from "@heroicons/react/24/solid";


export default function Edit({ auth, parametre }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        par_nom_societe: parametre.par_nom_societe || '',
        par_adresse: parametre.par_adresse || '',
        par_npa: parametre.par_npa || '',
        par_localite: parametre.par_localite || '',
        par_email: parametre.par_email || '',
        par_site_web: parametre.par_site_web || '',
        par_telephone: parametre.par_telephone || '',
       par_logo: parametre.par_logo || '',
        par_accord: parametre.par_accord || false,
    });

    const [preview, setPreview] = useState(parametre.par_logo); // Assumer que vous avez un chemin d'accès pour l'image


    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        console.log(data); // Vérification console pour les données
        console.log(formData); // Vérification console pour formData

        formData.append('_method', 'put'); // Ajoutez ceci pour simuler la méthode PUT

        post(route('parametres.update', parametre.id), formData, {
            onSuccess: () => {
                reset();
                setPreview(parametre.par_logo);
            },
            forceFormData: true,
        });
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('par_logo', file);
            setPreview(URL.createObjectURL(file)); // Mettez à jour l'URL de prévisualisation
        } else {
            setPreview(null);
        }
    };
    return (
        <DefaultDashboardLayout user={auth.user}>
            <Head title={`Édition des Paramètres - ${parametre.par_nom_societe}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                            {/* Form fields here */}
                            {/* Exemple de champ: Nom de la société */}
                            <div>
                                <label htmlFor="par_nom_societe" className="block text-sm font-medium text-gray-700">
                                    Nom de la société
                                </label>
                                <input
                                    type="text"
                                    name="par_nom_societe"
                                    id="par_nom_societe"
                                    autoComplete="par_nom_societe"
                                    value={data.par_nom_societe}
                                    onChange={e => setData('par_nom_societe', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.par_nom_societe} className="mt-2"/>
                            </div>
                            <div>
                                <label htmlFor="par_nom_societe" className="block text-sm font-medium text-gray-700">
                                    Adresse de la société
                                </label>
                                <input
                                    type="text"
                                    name="par_adresse"
                                    id="par_adresse"
                                    autoComplete="par_adresse"
                                    value={data.par_adresse}
                                    onChange={e => setData('par_adresse', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.par_adresse} className="mt-2"/>
                            </div>
                            <div>
                                <label htmlFor="par_npa" className="block text-sm font-medium text-gray-700">
                                    NPA
                                </label>
                                <input
                                    type="text"
                                    name="par_npa"
                                    id="par_npa"
                                    autoComplete="par_npa"
                                    value={data.par_npa}
                                    onChange={e => setData('par_npa', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                                />
                                <InputError message={errors.par_npa} className="mt-2"/>
                            </div>
                            <div>
                                <label htmlFor="par_localite" className="block text-sm font-medium text-gray-700">
                                    Localité
                                </label>
                                <input
                                    type="text"
                                    name="par_localite"
                                    id="par_localite"
                                    autoComplete="par_localite"
                                    value={data.par_localite}
                                    onChange={e => setData('par_localite', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.par_localite} className="mt-2"/>

                            </div>
                            <div>
                                <label htmlFor="par_email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="par_email"
                                    id="par_email"
                                    autoComplete="par_email"
                                    value={data.par_email}
                                    onChange={e => setData('par_email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.par_email} className="mt-2"/>
                            </div>
                            <div>
                                <label htmlFor="par_site_web" className="block text-sm font-medium text-gray-700">
                                    Site Web
                                </label>
                                <input
                                    type="text"
                                    name="par_site_web"
                                    id="par_site_web"
                                    autoComplete="par_site_web"
                                    value={data.par_site_web}
                                    onChange={e => setData('par_site_web', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.par_site_web} className="mt-2"/>
                            </div>
                            <div>
                                <label htmlFor="par_telephone" className="block text-sm font-medium text-gray-700">
                                    Téléphone
                                </label>
                                <input
                                    type="text"
                                    name="par_telephone"
                                    id="par_telephone"
                                    autoComplete="par_telephone"
                                    value={data.par_telephone}
                                    onChange={e => setData('par_telephone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.par_telephone} className="mt-2"/>
                            </div>
                            {/* Section de prévisualisation du logo */}
                            <div className="sm:col-span-6">
                                <label htmlFor="par_logo"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Logo de la société
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {preview ? (
                                            <img src={preview} alt="Prévisualisation du logo" className="mx-auto h-20 w-20 text-gray-400" />
                                        ) : (
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        )}
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="par_logo" className="relative cursor-pointer bg-white rounded-md font-medium text-primaryDarkBlue hover:text-primaryDarkBlue focus-within:outline-none">
                                                <span>Modifier le logo</span>
                                                <input id="par_logo" name="par_logo" type="file" className="sr-only" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF jusqu'à 10MB
                                        </p>
                                    </div>
                                </div>
                                <InputError message={errors.par_logo} className="mt-2"/>
                            </div>

                            <div>
                                <label htmlFor="par_accord" className="block text-sm font-medium text-gray-700">
                                    Accord
                                </label>
                                <input
                                    type="checkbox"
                                    name="par_accord"
                                    id="par_accord"
                                    autoComplete="par_accord"
                                    checked={data.par_accord}
                                    onChange={e => setData('par_accord', e.target.checked)}
                                    className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <InputError message={errors.par_accord} className="mt-2"/>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Enregistrer les modifications
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
