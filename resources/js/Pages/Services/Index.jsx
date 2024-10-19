/*
Ce composant React affiche la page principale des clients, avec une mise en page utilisant DefaultDashboardLayout pour la disposition et le style.
Il comprend également un lien pour ajouter un nouveau client avec InertiaLink, et affiche la liste des clients à l'aide du composant ClientsDisplay.
*/

import React, {useMemo, useState} from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import { PlusIcon } from "@heroicons/react/20/solid";
import ServicesDisplay from "@/Components/ServicesDisplay.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import "../../../css/serviceStyle.css"
import Modal from "@/Components/Modal";
import AddService from "./AddService";

export default function MainService({ auth, services, url }) {
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceName, setServiceName] = useState('');
    
    const serviceFiltered = useMemo(()=>{ //usememo return variable pour le filtre
        return services.filter((service)=>{
            return service.ser_nom.toLowerCase().includes(serviceName.toLowerCase())
        })
    },[services, serviceName])

    return (
        <DefaultDashboardLayout user={auth.user} title="Services" url={url} parametreId={parametreId}>

            <Head title="Services"/>


            <Head title="Services"/>
            <div className="flex justify-between p-4 sm:p-6 lg:p-8">
                <div>
                    <a href="javascript:history.back()"
                       className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                        <ArrowLeftIcon className="w-4 h-4 mr-3"/> Retour
                    </a>

                    <h2 className="text-2xl font-semibold leading-7 text-primaryDarkBlue mt-4">
                        Services
                    </h2>
                </div>
                <div>
                <div>
                {/* Bouton pour ouvrir la modal */}
                <button className="bouton-add-service mb-4" onClick={openModal}>
                    Ajouter un Service
                </button>

                {/* Modal */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AddService />
                </Modal>
            </div>
                </div>

            </div>
            <div className="service-search flex justify-start">
                <input className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-8 ml-8" type="text" placeholder="Rechercher un service..." onChange={(event) => {//onChange nous renvoi une evt
                    setServiceName(event.target.value)
                }}/>
            </div>
            <ServicesDisplay services={serviceFiltered} auth={auth}/>
        </DefaultDashboardLayout>
    );
}
