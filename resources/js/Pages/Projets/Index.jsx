/*
Ce composant React affiche la page principale des projets, avec une mise en page utilisant DefaultDashboardLayout pour la disposition et le style.
Il comprend également un lien pour ajouter un nouveau projet avec InertiaLink, et affiche la liste des projets à l'aide du composant ProjectsDisplay.
*/

import React from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import { PlusIcon } from "@heroicons/react/20/solid";
import ProjectsDisplay from "@/Components/ProjectsDisplay";
import ClientsDisplay from "@/Components/ClientsDisplay"; // Ajout de l'import pour ClientsDisplay
import {Head, Link, useForm} from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import {ArrowLeftIcon} from "@heroicons/react/24/outline/index.js";

export default function MainProject({ auth, projets, url,  parametreId }) {

    return (
        <DefaultDashboardLayout user={auth.user} title="Projets" url={url} parametreId={parametreId} >
            <Head title="Projets" />

            <div className="flex justify-between p-4 sm:p-6 lg:p-8">
                <div>
                    <a href="javascript:history.back()"
                       className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                        <ArrowLeftIcon className="w-4 h-4"/>
                    </a>

                    <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">
                        Projets
                    </h2>
                </div>
                <div>
                    <Link href={route('projets.create')}>
                        <button
                            type="button"
                            className="my-3 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                        >
                            <span>Ajouter un Projet</span>
                            <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                        </button>
                    </Link>
                </div>
            </div>
            <ProjectsDisplay projets={projets} auth={auth} />
        </DefaultDashboardLayout>
    );
}
