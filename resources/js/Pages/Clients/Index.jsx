import React, { useState, useMemo } from "react";
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
    const [displayGrid, setDisplayGrid] = useState(true); // Initialisation en mode grille (carte) par défaut
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClients = useMemo(() => {
        return clients.filter(client =>
            client.cli_nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.cli_prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.cli_societe.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.cli_email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [clients, searchQuery]);

    return (
        <DefaultDashboardLayout user={auth.user} title="Clients" url={url} parametreId={parametreId}>
            <Head title="Clients"/>

            <div className="flex justify-between p-4 sm:p-6 lg:p-8">
                <div>
                    <a href="javascript:history.back()"
                       className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                        <ArrowLeftIcon className="w-4 h-4 mr-3"/> Retour
                    </a>

                    <h2 className="text-2xl font-semibold leading-7 text-primaryDarkBlue mt-4">
                        Clients
                    </h2>
                </div>

                <div className="flex items-center -mt-10">
                    <p className="text-sm font-medium text-gray-900 mr-4">
                        {displayGrid ? "Basculer sur Vue Tableau" : "Basculer sur Vue Grille"}
                    </p>
                    <Switch
                        checked={displayGrid}
                        onChange={setDisplayGrid}
                        className={classNames(
                            displayGrid ? 'bg-gray-200' : 'bg-indigo-600',  // Inversé pour afficher la vue de base désactivée
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out'
                        )}
                    >
                        <span className="sr-only">Switch View</span>
                        <span
                            className={classNames(
                                displayGrid ? 'translate-x-1' : 'translate-x-6',  // Inversé pour afficher la vue de base désactivée
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out'
                            )}
                        />
                    </Switch>
                </div>

                <div>
                    <Link href={route('clients.create')}>
                        <button
                            type="button"
                            className="my-3 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                        >
                            <span>Ajouter un Client</span>
                            <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true"/>
                        </button>
                    </Link>
                </div>

            </div>

            <div className="flex items-center space-x-4 mb-8 ml-8">
                <input
                    type="text"
                    placeholder="Rechercher un client..."
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            {displayGrid ? (
                <ClientsDisplay clients={filteredClients} auth={auth}/>
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
                    {filteredClients.map((client, index) => (
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
