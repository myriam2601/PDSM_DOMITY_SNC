import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

// pour le rich text
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "../../../css/serviceStyle.css";

// pour la fleche pour passer de modalite et condition de reglement
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function EditService({ auth, service }) {
    const {
        data,
        setData,
        put,
        delete: deleteService,
        processing,
        errors,
        reset,
    } = useForm({
        ser_categorie: service.ser_categorie,
        ser_nom: service.ser_nom,
        ser_modalite: service.ser_modalite,
        ser_conditions_reglements: service.ser_conditions_reglements,
    });

    const [localErrors, setLocalErrors] = useState({});
    const [confirmingServiceEdit, setConfirmingServiceEdit] = useState(false); // hook d'état
    const [confirmingServiceDeletion, setConfirmingServiceDeletion] =
        useState(false);

    const validateFields = () => {
        const newErrors = {};

        if (!data.ser_categorie || data.ser_categorie.length > 3) {
            newErrors.ser_categorie =
                "La catégorie doit contenir au maximum 3 caractères.";
        }

        if (!data.ser_nom) {
            newErrors.ser_nom = "Le nom est requis.";
        }

        if (!data.ser_modalite) {
            newErrors.ser_modalite = "La modalité est requise.";
        }

        if (!data.ser_conditions_reglements) {
            newErrors.ser_conditions_reglements =
                "Les conditions de règlement sont requises.";
        }

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            put(route("services.update", { service: service.id }), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEditClick = (event) => {
        event.preventDefault();
        if (validateFields()) {
            setConfirmingServiceEdit(true);
        }
    };

    const removeService = () => {
        deleteService(route("services.destroy", { service: service.id }), {
            // deleteService on a renomme delete car mot reserve
            onSuccess: () => reset(),
        });
    };

    const closeModalDeletion = () => {
        setConfirmingServiceDeletion(false);
        reset();
    };

    const closeModalEdit = () => {
        setConfirmingServiceEdit(false);
        reset();
    };

    // pour la fleche
    const [step, setStep] = useState("modalite");

    const renderRichTextInput = function ({
        name,
        label,
        goTo,
        arrowDirection,
    }) {
        return (
            <div className="step-wrap">
                <div className="step-wrap-header">
                    <label>{label}</label>
                    <div>
                        <button className="step-arrow" onClick={goTo}>
                            {" "}
                            {arrowDirection === "left" && (
                                <ArrowLeftIcon width={40} />
                            )}
                            {arrowDirection === "right" && (
                                <ArrowRightIcon width={40} />
                            )}
                        </button>
                    </div>
                </div>
                <ReactQuill
                    className="step-editor"
                    height="15rem"
                    theme="snow"
                    value={data[name]}
                    onChange={(value) => {
                        setData(name, value);
                        if (value === "<p><br></p>") {
                            setData(name, ""); // hardcode a cause de la librarie, pour cacher texte
                        }
                    }}
                />
                <InputError
                    message={localErrors[name] || errors[name]}
                    className="mt-2"
                />
            </div>
        );
    };

    return (
        <DefaultDashboardLayout user={auth.user}>
            <Head title="Modifier un Service" />

            <div className="divide-y divide-white/5 bg-white">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div className="md:col-span-12 -mt-8">
                        <a
                            href="javascript:history.back()"
                            className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center"
                        >
                            <ArrowLeftIcon className="w-4 h-4 mr-3" /> Retour
                        </a>
                        <h2 className="text-base font-semibold leading-7 text-primaryDarkBlue mt-8">
                            Détail du Service
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Editer service
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="md:col-span-12 space-y-6"
                    >
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="ser_nom"
                                    className="block text-sm font-medium leading-6 text-primaryDarkBlue"
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
                                    message={
                                        localErrors.ser_nom || errors.ser_nom
                                    }
                                    className="mt-2"
                                />
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="ser_categorie"
                                    className="block text-sm font-medium leading-6 text-primaryDarkBlue"
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
                                    message={
                                        localErrors.ser_categorie ||
                                        errors.ser_categorie
                                    }
                                    className="mt-2"
                                />
                            </div>

                            {step === "modalite" && (
                                <div className="sm:col-span-12 mt-2">
                                    {renderRichTextInput({
                                        name: "ser_modalite",
                                        label: "Modalité",
                                        arrowDirection: "right",
                                        goTo: (e) => {
                                            e.preventDefault();
                                            setStep("condition");
                                        },
                                    })}
                                </div>
                            )}

                            {step === "condition" && (
                                <div className="sm:col-span-12 mt-2">
                                    {renderRichTextInput({
                                        name: "ser_conditions_reglements",
                                        label: "Condition de règlement",
                                        arrowDirection: "left",
                                        goTo: (e) => {
                                            e.preventDefault();
                                            setStep("modalite");
                                        },
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <PrimaryButton
                                onClick={(event) => {
                                    event.preventDefault();
                                    setConfirmingServiceDeletion(true);
                                }}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                disabled={processing}
                            >
                                Supprimer
                            </PrimaryButton>
                            <PrimaryButton
                                onClick={handleEditClick}
                                disabled={processing}
                            >
                                Modifier
                            </PrimaryButton>
                        </div>
                        <Modal
                            show={confirmingServiceEdit}
                            onClose={closeModalEdit}
                        >
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Des modifications ont été apportées
                                    <br />
                                    Êtes vous sûr de vouloir continuer ?
                                </h2>
                                <div className="mt-6 flex justify-end">
                                    <SecondaryButton onClick={closeModalEdit}>
                                        Annuler
                                    </SecondaryButton>

                                    <PrimaryButton
                                        onClick={submit}
                                        className="ms-3"
                                        disabled={processing}
                                    >
                                        Enregistrer
                                    </PrimaryButton>
                                </div>
                            </div>
                        </Modal>
                    </form>

                    <Modal
                        show={confirmingServiceDeletion}
                        onClose={closeModalDeletion}
                    >
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Êtes vous sûr de vouloir supprimer ce service ?
                            </h2>
                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModalDeletion}>
                                    Annuler
                                </SecondaryButton>

                                <DangerButton
                                    onClick={removeService}
                                    className="ms-3"
                                    disabled={processing}
                                >
                                    Supprimer service
                                </DangerButton>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
