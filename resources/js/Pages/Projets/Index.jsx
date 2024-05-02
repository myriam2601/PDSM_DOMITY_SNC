import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import ProjectsDisplay from "@/Components/ProjectsDisplay";
import { Switch } from '@headlessui/react';
import { PlusIcon } from "@heroicons/react/20/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MainProject({ auth, projets, url, parametreId }) {
    const [displayGrid, setDisplayGrid] = useState(false);

    return (
        <DefaultDashboardLayout user={auth.user} title="Projets" url={url} parametreId={parametreId}>
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
                <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 mr-4">
                        {displayGrid ? "Basculer sur Vue Tableau" : "Basculer sur Vue Grille"}
                    </p>
                    <Switch
                        checked={displayGrid}
                        onChange={setDisplayGrid}
                        className={classNames(
                            displayGrid ? 'bg-indigo-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out'
                        )}
                    >
                        <span className="sr-only">Switch View</span>
                        <span
                            className={classNames(
                                displayGrid ? 'translate-x-6' : 'translate-x-1',
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out'
                            )}
                        />
                    </Switch>
                </div>
                <div>
                    <Link href={route('projets.create')}>
                        <button
                            type="button"
                            className="my-3 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                        >
                            <span>Ajouter un Projet</span>
                            <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true"/>
                        </button>
                    </Link>
                </div>
            </div>

            {displayGrid ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="col-span-full">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom
                                    du Projet
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créateur</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Début</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {projets.map((projet, index) => (
                                <tr key={projet.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{projet.nom}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{projet.user?.name || 'Inconnu'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{projet.debut}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{projet.deadline}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <Link href={`/projets/${projet.id}`} className="text-indigo-600 hover:text-indigo-900">Détail</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        {projet.devis ? (
                                            <Link href={`/devis/edit/${projet.devis.id}`}
                                                  className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-greySecond hover:ring-primaryDarkBlue flex items-center justify-center">
                                                <span>Modifier le devis</span>
                                            </Link>
                                        ) : (
                                            <Link href={`/devis/form?projectId=${projet.id}`}
                                                  className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-greySecond hover:ring-primaryDarkBlue flex items-center justify-center">
                                                <span>Ajouter un devis</span>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <ProjectsDisplay projets={projets}/>
            )}
        </DefaultDashboardLayout>
    );
}
