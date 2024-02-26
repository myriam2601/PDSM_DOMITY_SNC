/*
Ce composant React affiche les détails d'un client spécifique. Il utilise DefaultDashboardLayout pour la disposition et le style.
*/

import React from "react";
import { Head } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";

export default function ShowClient({ auth, client }) {
    return (
        // Utilisation du layout par défaut pour la disposition et le style de la page
        <DefaultDashboardLayout user={auth.user} title={`Détails du Client - ${client.cli_nom} ${client.cli_prenom}`}>
            {/* Configuration du titre de la page dans l'en-tête du navigateur */}
            <Head title={`Détails du Client - ${client.cli_nom} ${client.cli_prenom}`}/>

            {/* Section de contenu avec les détails du client */}
            <div className="p-6">
                {/* Titre de la page avec le nom et le prénom du client */}
                <h2 className="text-2xl font-semibold leading-7 text-primaryDarkBlue">
                    {client.cli_nom} {client.cli_prenom}
                </h2>

                {/* Informations spécifiques du client, par exemple: email, téléphone, etc. */}
                <div className="mt-4">
                    <p className="text-sm leading-5 text-gray-500">
                        <span className="font-medium text-primaryDarkBlue">Email:</span> {client.cli_email}
                    </p>
                    <p className="text-sm leading-5 text-gray-500">
                        <span className="font-medium text-primaryDarkBlue">Téléphone:</span> {client.cli_telephone}
                    </p>
                    {/* Ajoutez d'autres informations du client selon les besoins */}
                </div>

                {/* Autres sections avec les détails du client, si nécessaire */}
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold leading-6 text-primaryDarkBlue">
                    Projets Associés
                </h3>
                {client.projets && client.projets.length > 0 ? (
                    <ul>
                        {client.projets.map(projet => (
                            <li key={projet.id}>{projet.nom}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun projet associé</p>
                )}
            </div>
        </DefaultDashboardLayout>
    );
}
