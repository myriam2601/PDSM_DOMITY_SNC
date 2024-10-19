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
        <DefaultDashboardLayout user={auth.user} title="Services" url={url}>

            <Head title="Services" />
            <div className="service-search">
                <input type="text" placeholder="Rechercher service" onChange={(event)=>{//onChange nous renvoi une evt
                    setServiceName(event.target.value)
                }}/>
            </div>

            <div className="flex justify-between p-4 sm:p-6 lg:p-8">
                <div>
                    <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">
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
            <ServicesDisplay services={serviceFiltered} auth={auth} />
        </DefaultDashboardLayout>
    );
}
