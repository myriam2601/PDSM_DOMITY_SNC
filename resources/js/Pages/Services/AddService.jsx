import React, {useEffect, useState} from 'react';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout";

//pour le rich text
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import "../../../css/serviceStyle.css"

//pour la fleche pour passer de modalite et condition de reglement
import {
    ArrowRightIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';



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

    //pour la fleche
    const [step, setStep] = useState("modalite")

    const fieldCompleted = function () {
        return(data.ser_categorie.length>0 && data.ser_modalite.length>0 && data.ser_conditions_reglements.length>0 && data.ser_nom.length>0)
    }


    const renderRichTextInput = function ({name, label, goTo, arrowDirection}){
        return(
            <div className="step-wrap">
                <div className="step-wrap-header">
                    <label>
                        {label}
                    </label>
                    <div>
                        <button className="step-arrow" onClick={goTo}> {arrowDirection==="left" && <ArrowLeftIcon width={40}/>}
                            {arrowDirection==="right" && <ArrowRightIcon width={40}/>}
                        </button>
                    </div>
                </div>
                <ReactQuill className="step-editor" height="15rem" theme="snow" value={data[name]} onChange={(value)=>{
                    setData(name, value)
                    if(value==="<p><br></p>") {
                        setData(name, ""); //hardcode a cause de la librarie, pour cacher texte
                    }
                }}/>
                <InputError message={errors[name]} className="mt-2"/>
            </div>
        )
    }


    return (
        <DefaultDashboardLayout user={auth.user}>
            <Head title="Ajouter un Service"/>

            <div className="divide-y divide-white/5 bg-white">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div className="md:col-span-12">
                        <h2 className="text-base font-semibold leading-7 text-primaryDarkBlue">
                            Ajouter un nouveau Service
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Création du service
                        </p>
                    </div>

                    <form onSubmit={submit} className="md:col-span-12 space-y-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">

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

                            {step==="modalite" && (
                                <div className="sm:col-span-12 mt-2">
                                    {renderRichTextInput({name:"ser_modalite", label:"Modalité", arrowDirection:"right", goTo:(e) => {
                                        e.preventDefault()
                                        setStep("condition")
                                    }})}
                                </div>
                            )}

                            {step==="condition" && (
                                <div className="sm:col-span-12 mt-2">
                                    {renderRichTextInput({name:"ser_conditions_reglements", label:"Condition de règlement", arrowDirection:"left", goTo:(e) =>{
                                        e.preventDefault()
                                            setStep("modalite")
                                        }})}
                                </div>
                            )}


                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing||!fieldCompleted()}>Ajouter</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
