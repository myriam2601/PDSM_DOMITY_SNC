import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function UpdateParametreForm({ parametre, className = '' }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        par_nom_societe: parametre.par_nom_societe,
        par_description: parametre.par_description,
        // Ajoutez d'autres champs selon vos besoins
    });

    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(parametre.par_logo_url);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
        setPreview(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('par_nom_societe', data.par_nom_societe);
        formData.append('par_description', data.par_description);
        if (logo) {
            formData.append('par_logo', logo);
        }

        patch(route('parametres.update', { user: parametre.id }), formData);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Informations du Paramètre</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Mettez à jour les informations du paramètre.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="par_nom_societe" value="Nom de la société" />
                    <TextInput
                        id="par_nom_societe"
                        className="mt-1 block w-full"
                        value={data.par_nom_societe}
                        onChange={(e) => setData('par_nom_societe', e.target.value)}
                        required
                        isFocused
                    />
                    <InputError className="mt-2" message={errors.par_nom_societe} />
                </div>

                <div>
                    <InputLabel htmlFor="par_description" value="Description" />
                    <TextInput
                        id="par_description"
                        className="mt-1 block w-full"
                        value={data.par_description}
                        onChange={(e) => setData('par_description', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.par_description} />
                </div>

                {/* Section de téléchargement du logo */}
                <div className="sm:col-span-6">
                    <label htmlFor="par_logo" className="block text-sm font-medium leading-6 text-primaryDarkBlue">
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
                            <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Enregistrer</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Modifications enregistrées !</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
