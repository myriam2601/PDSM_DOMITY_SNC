/*
Ce composant React affiche la page principale des projets, avec une mise en page utilisant DefaultDashboardLayout pour la disposition et le style.
Il comprend également un lien pour ajouter un nouveau projet avec InertiaLink, et affiche la liste des projets à l'aide du composant ProjectsDisplay.
*/

import React from "react";
import {Head, Link, useForm} from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import DevisDisplay from "@/Components/DevisDisplay";

export default function MainDevis({ auth, devis, url }) {
    return (
        <DefaultDashboardLayout user={auth.user} title="Devis" url={url}>
            <Head title="Devis" />

            <div className="flex justify-between p-4 sm:p-6 lg:p-8">
                <div>
                    <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">
                        Devis
                    </h2>
                </div>
            </div>
            <DevisDisplay devis={devis} auth={auth} />
        </DefaultDashboardLayout>
    );
}
