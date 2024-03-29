import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout";
import 'react-quill/dist/quill.snow.css';
import "../../../css/serviceStyle.css"
import {PhotoIcon} from "@heroicons/react/16/solid/index.js";

export default function ParamApp({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        par_nom_societe: '',
        par_adresse: '',
        par_npa: '',
        par_localite: '',
        par_email: '',
        par_site_web: '',
        par_telephone: '',
        par_logo: null, // Ajoutez le champ pour le logo
        par_accord: false,
    });
    const [preview, setPreview] = useState(null);
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));

        post(route('parametres.store'), formData, {
            onSuccess: () => {
                reset();
                setPreview(null); // Réinitialisez la prévisualisation après la soumission réussie
            },
            forceFormData: true,
        });
    };
    const fieldCompleted = function () {
        return data.par_nom_societe.length > 0 &&
            data.par_adresse.length > 0 &&
            data.par_npa.length > 0 &&
            // Assurez-vous que tous les champs nécessaires sont remplis
            data.par_localite.length > 0;
    }
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
            <Head title="Ajouter un Paramètre"/>

            <div className="divide-y divide-white/5 bg-white">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div className="md:col-span-12">
                        <h2 className="text-base font-semibold leading-7 text-primaryDarkBlue">
                            Ajouter un nouveau Paramètre
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Création du paramètre
                        </p>
                    </div>

                    <form onSubmit={submit} className="md:col-span-12 space-y-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                            {/* Exemple de champ */}
                            <div className="sm:col-span-6">
                                <label htmlFor="par_nom_societe"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Nom de la société
                                </label>
                                <input
                                    type="text"
                                    name="par_nom_societe"
                                    id="par_nom_societe"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                    value={data.par_nom_societe}
                                    onChange={(e) => setData('par_nom_societe', e.target.value)}
                                />
                                <InputError message={errors.par_nom_societe} className="mt-2"/>
                            </div>

                            {/* Section de téléchargement du logo */}
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
                                                <span>Télécharger un fichier</span>
                                                <input id="par_logo" name="par_logo" type="file" className="sr-only" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF jusqu'à 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="par_adresse"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Adresse
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="par_adresse"
                                        id="par_adresse"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                                        value={data.par_adresse}
                                        onChange={(e) => setData('par_adresse', e.target.value)}
                                    />
                                    <InputError message={errors.par_nom_societe} className="mt-2"/>
                                </div>
                            </div>

                            {/* NPA */}
                            <div className="sm:col-span-3">
                                <label htmlFor="par_npa"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    NPA
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="par_npa"
                                        id="par_npa"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                                        value={data.par_npa}
                                        onChange={(e) => setData('par_npa', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Localité */}
                            <div className="sm:col-span-3">
                                <label htmlFor="par_localite"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Localité
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="par_localite"
                                        id="par_localite"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                                        value={data.par_localite}
                                        onChange={(e) => setData('par_localite', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="sm:col-span-6">
                                <label htmlFor="par_email"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="par_email"
                                        id="par_email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                                        value={data.par_email}
                                        onChange={(e) => setData('par_email', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Site Web */}
                            <div className="sm:col-span-6">
                                <label htmlFor="par_site_web"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Site web
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="par_site_web"
                                        id="par_site_web"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                                        value={data.par_site_web}
                                        onChange={(e) => setData('par_site_web', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Téléphone */}
                            <div className="sm:col-span-6">
                                <label htmlFor="par_telephone"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Téléphone
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="par_telephone"
                                        id="par_telephone"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                                        value={data.par_telephone}
                                        onChange={(e) => setData('par_telephone', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="par_accord"
                                       className="block text-sm font-medium leading-6 text-primaryDarkBlue">
                                    Accepter les conditions
                                </label>
                                <input
                                    type="checkbox"
                                    name="par_accord"
                                    id="par_accord"
                                    checked={data.par_accord}
                                    onChange={(e) => setData('par_accord', e.target.checked)}
                                    className="mt-1 h-4 w-4 text-primaryDarkBlue focus:ring-primaryDarkBlue border-gray-300 rounded"
                                />
                                <InputError message={errors.par_accord} className="mt-2"/>
                            </div>

                            <div className="col-span-full">
                                <button
                                    type="submit"
                                    className="rounded-md bg-primaryDarkBlue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-greySecond hover:text-primaryDarkBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryDarkBlue"
                                >
                                    Enregistrer les informations
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
