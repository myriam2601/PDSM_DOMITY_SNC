import React from "react";
import { useForm, Head, router } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AddService({ onServiceAdded, auth, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ser_categorie: "",
        ser_nom: "",
        ser_modalite: "",
        ser_conditions_reglements: "",
    });

    const submit = (e) => {
        e.preventDefault();
        router.post("services.store"), ({

            onSuccess: () => {
                console.log("ca success !")
                const newService = response.props.service; // Assurez-vous de retourner le service ajouté depuis la réponse du backend
                console.log(newService);
                onServiceAdded(newService); // Ajoute le nouveau service à la liste
                reset();
                onClose(); // Fermer le modal après l'ajout
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.patch("/libelle/update", data, {
            onSuccess: (page) => {
                console.log("Modification réussie, données reçues:", page);
                onSuccess(data); // Passez les données modifiées à la fonction de succès
                reset(); // Réinitialise le formulaire après succès
                onRequestClose(); // Ferme le modal si nécessaire
            },
            onError: (errors) => {
                console.error("Erreur lors de la requête:", errors);
            },
        });
    };

    return (
        <div className="modal-inner-content">
            <Head title="Ajouter un Service" />

            <div className="divide-y divide-gray-200 bg-white p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-semibold leading-7 text-primaryDarkBlue">
                        Ajouter un nouveau Service
                    </h2>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* Champs du formulaire */}
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="ser_nom"
                                className="block text-sm font-medium text-primaryDarkBlue"
                            >
                                Nom
                            </label>
                            <input
                                type="text"
                                name="ser_nom"
                                id="ser_nom"
                                autoComplete="ser_nom"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                value={data.ser_nom}
                                onChange={(e) =>
                                    setData("ser_nom", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.ser_nom}
                                className="mt-2"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="ser_categorie"
                                className="block text-sm font-medium text-primaryDarkBlue"
                            >
                                Catégorie
                            </label>
                            <input
                                type="text"
                                name="ser_categorie"
                                id="ser_categorie"
                                autoComplete="ser_categorie"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                value={data.ser_categorie}
                                onChange={(e) =>
                                    setData("ser_categorie", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.ser_categorie}
                                className="mt-2"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="ser_modalite"
                                className="block text-sm font-medium text-primaryDarkBlue"
                            >
                                Modalité
                            </label>
                            <input
                                type="text"
                                name="ser_modalite"
                                id="ser_modalite"
                                autoComplete="ser_modalite"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                value={data.ser_modalite}
                                onChange={(e) =>
                                    setData("ser_modalite", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.ser_modalite}
                                className="mt-2"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="ser_conditions_reglements"
                                className="block text-sm font-medium text-primaryDarkBlue"
                            >
                                Condition règlement
                            </label>
                            <input
                                type="text"
                                name="ser_conditions_reglements"
                                id="ser_conditions_reglements"
                                autoComplete="ser_conditions_reglements"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
                                value={data.ser_conditions_reglements}
                                onChange={(e) =>
                                    setData(
                                        "ser_conditions_reglements",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={errors.ser_conditions_reglements}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton disabled={processing}>
                            Ajouter
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
