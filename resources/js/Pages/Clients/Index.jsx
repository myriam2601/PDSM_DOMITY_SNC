/*
Ce composant React affiche la page principale des clients, avec une mise en page utilisant DefaultDashboardLayout pour la disposition et le style.
Il comprend également un lien pour ajouter un nouveau client avec InertiaLink, et affiche la liste des clients à l'aide du composant ClientsDisplay.
*/


import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import ClientsDisplay from "@/Components/ClientsDisplay";
import { Switch } from '@headlessui/react';
import { PlusIcon } from "@heroicons/react/20/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MainClient({ auth, clients, url, parametreId }) {
    const [displayGrid, setDisplayGrid] = useState(true);

    return (
        <DefaultDashboardLayout user={auth.user} title="Clients" url={url} parametreId={parametreId}>
            <Head title="Clients"/>

            <div className="flex justify-between p-2 sm:p-4 lg:p-6">
                <div>
                    <a href="javascript:history.back()"
                       className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                        <ArrowLeftIcon className="w-4 h-4"/>
                    </a>
                    <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue my-4">
                        Clients
                    </h2>
                </div>
                <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 mr-2 my-4">
                        {displayGrid ? "Basculer sur Vue Grille" : "Basculer sur Vue Tableau"}
                    </p>
                    <Switch
                        checked={displayGrid}
                        onChange={setDisplayGrid}
                        className={classNames(
                            displayGrid ? 'bg-gray-200' : 'bg-indigo-600',
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
                    <Link href={route('clients.create')}>
                        <button
                            type="button"
                            className="my-12 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                        >
                            <span>Ajouter un Client</span>
                            <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true"/>
                        </button>
                    </Link>
                </div>
            </div>


            {
                displayGrid ? (
                    <ClientsDisplay clients={clients} auth={auth}/>
                ) : (
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Société
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {clients.map((client, index) => (
                            <tr key={client.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.cli_nom} {client.cli_prenom}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.cli_societe}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.cli_email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                    <Link href={route("clients.show", {client: client.id})}
                                          className="text-indigo-600 hover:text-indigo-900">Détail</Link>
                                </td>
                                <td><Link href={route('projets.create')}>
                                    <button
                                        type="button"
                                        className="ml-auto w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-greySecond hover:ring-primaryDarkBlue mt-2 flex items-center justify-center"
                                    >
                                        <span>Ajouter un projet</span>
                                    </button>
                                </Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
        </DefaultDashboardLayout>
    );
}
