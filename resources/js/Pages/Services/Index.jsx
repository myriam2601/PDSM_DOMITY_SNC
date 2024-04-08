/*
Ce composant React affiche la page principale des clients, avec une mise en page utilisant DefaultDashboardLayout pour la disposition et le style.
Il comprend également un lien pour ajouter un nouveau client avec InertiaLink, et affiche la liste des clients à l'aide du composant ClientsDisplay.
*/

import React, {useMemo, useState} from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import { PlusIcon } from "@heroicons/react/20/solid";
import ServicesDisplay from "@/Components/ServicesDisplay.jsx";
import { Head, useForm } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import "../../../css/serviceStyle.css"
import {ArrowLeftIcon} from "@heroicons/react/24/outline/index.js";

export default function MainService({ auth, services, url, parametreId }) {
    const [serviceName, setServiceName] = useState("");//hook
    const serviceFiltered = useMemo(()=>{ //usememo return variable pour le filtre
        return services.filter((service)=>{
            return service.ser_nom.toLowerCase().includes(serviceName.toLowerCase())
        })
    },[services, serviceName])

    return (
        <DefaultDashboardLayout user={auth.user} title="Services" url={url} parametreId={parametreId}>

            <Head title="Services" />
            <div className="service-search">
                <input type="text" placeholder="Rechercher service" onChange={(event)=>{//onChange nous renvoi une evt
                    setServiceName(event.target.value)
                }}/>
            </div>

            <div className="flex justify-between p-4 sm:p-6 lg:p-8">
                <div>
                    <a href="javascript:history.back()"
                       className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                        <ArrowLeftIcon className="w-4 h-4"/>
                    </a>
                    <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">
                        Services
                    </h2>
                </div>
                <div>
                    <a href={route('services.create')}>
                        <button
                            type="button"
                            className="my-3 flex items-center bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                        >
                            <span>Nouveau Service</span>
                            <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                        </button>
                    </a>
                </div>
            </div>
            <ServicesDisplay services={serviceFiltered} auth={auth} />
        </DefaultDashboardLayout>
    );
}
