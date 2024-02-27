/*
Ce composant React affiche la page principale des clients, avec une mise en page utilisant DefaultDashboardLayout pour la disposition et le style.
Il comprend également un lien pour ajouter un nouveau client avec InertiaLink, et affiche la liste des clients à l'aide du composant ClientsDisplay.
*/

import React from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import { PlusIcon } from "@heroicons/react/20/solid";
import ClientsDisplay from "@/Components/ClientsDisplay";
import {Head, Link, useForm} from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";

export default function MainClient({ auth, clients, url }) {
    return (
        // Utilisation du layout par défaut pour la disposition et le style de la page
        <DefaultDashboardLayout user={auth.user} title="Clients" url={url}>
            {/* Configuration du titre de la page dans l'en-tête du navigateur */}
            <Head title="Clients" />

            {/* Section d'en-tête avec un titre et un espace pour le lien Ajouter un Client */}
            <div className="flex justify-between p-4 sm:p-6 lg:p-8">
                <div>
                    {/* Titre de la page */}
                    <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">
                        Clients
                    </h2>
                </div>
                <div>
                    {/* Lien Inertia pour rediriger vers la page de création d'un nouveau client */}
                    <Link href={route('clients.create')}>
                        {/* Bouton pour ajouter un client avec une icône Plus */}
                        <button
                            type="button"
                            className="my-3 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                        >
                            <span>Ajouter un Client</span>
                            <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Affichage de la liste des clients à l'aide du composant ClientsDisplay */}
            <ClientsDisplay clients={clients} auth={auth} />
        </DefaultDashboardLayout>
    );
}
