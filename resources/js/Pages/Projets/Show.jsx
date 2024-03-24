import React from "react";
import { Head, Link } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import { PencilIcon } from "@heroicons/react/20/solid/index.js";

export default function ShowProject({ auth, projet }) {
    return (
        <DefaultDashboardLayout user={auth.user} title={`Détails du Projet - ${projet.nom}`}>
            <Head title={`Détails du Projet - ${projet.nom}`}/>

            <div className="flex justify-end">
                <Link href={route('projets.edit', {projet: projet.id})}>
                    <button
                        type="button"
                        className="my-3 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                    >
                        <span>Modifier le Projet</span>
                        <PencilIcon className="h-5 w-5 ml-2" aria-hidden="true"/>
                    </button>
                </Link>
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-semibold leading-7 text-primaryDarkBlue">{projet.nom}</h2>
                <p className="mt-2 text-sm text-gray-500">Créé par: {projet.user?.name}</p>
                <p className="mt-2 text-sm text-gray-500">Client: {projet.client?.cli_nom}</p>
                <p className="mt-2 text-sm text-gray-500">Service: {projet.service?.ser_nom}</p>
                <p className="mt-2 text-sm text-gray-500">Début: {projet.debut}</p>
                <p className="mt-2 text-sm text-gray-500">Deadline: {projet.deadline}</p>
                <p className="mt-2 text-sm text-gray-500">Description: {projet.description}</p>
            </div>
        </DefaultDashboardLayout>
    );
}
