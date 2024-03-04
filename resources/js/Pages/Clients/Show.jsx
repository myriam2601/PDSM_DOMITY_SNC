/*
Ce composant React affiche les détails d'un client spécifique. Il utilise DefaultDashboardLayout pour la disposition et le style.
*/

import React from "react";
import {Head, Link} from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import { PlusIcon, PencilIcon } from "@heroicons/react/20/solid/index.js";

export default function ShowClient({ auth, client }) {
    return (
        // Utilisation du layout par défaut pour la disposition et le style de la page
        <DefaultDashboardLayout user={auth.user} title={`Détails du Client - ${client.cli_nom} ${client.cli_prenom}`}>
            {/* Configuration du titre de la page dans l'en-tête du navigateur */}
            <Head title={`Détails du Client - ${client.cli_nom} ${client.cli_prenom}`}/>
            <div className="flex justify-end">
                <Link href={route('clients.edit', {client: client.id})}>
                    <button
                        type="button"
                        className="my-3 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                    >
                        <span>Modifier le Client</span>
                        <PencilIcon className="h-5 w-5 ml-2" aria-hidden="true"/>
                    </button>
                </Link>
            </div>

            {/* Section de contenu avec les détails du client */}
            <div className="p-6">
                {/* Titre de la page avec le nom et le prénom du client */}
                <h2 className="text-2xl font-semibold leading-7 text-primaryDarkBlue">
                    {client.cli_nom} {client.cli_prenom}
                </h2>

                {/* Informations spécifiques du client, par exemple: email, téléphone, etc. */}
                <h2 className="text-lg font-semibold leading-6 text-primaryDarkBlue">
                    Projets Associés
                </h2>
                <hr/>
                <br/>
                {client.projets && client.projets.length > 0 ? (
                    <table className="table-auto mt-2">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Nom du Projet</th>
                            <th className="px-4 py-2">Début du Projet</th>
                            <th className="px-4 py-2">Deadline</th>
                            <th className="px-4 py-2">Description</th>
                            {/* Ajoutez d'autres colonnes selon les besoins */}
                        </tr>
                        </thead>
                        <tbody>
                        {client.projets.map(projet => (

                            <tr key={projet.id} className="border-b">
                                <td className="px-4 py-2">{projet.nom}</td>
                                <td className="px-4 py-2">{projet.debut}</td>
                                <td className="px-4 py-2">{projet.deadline}</td>
                                <td className="px-4 py-2">{projet.description}</td>
                                {/* Ajoutez d'autres cellules selon les besoins */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">Aucun projet associé</p>
                )}
            </div>
        </DefaultDashboardLayout>
    );
}
