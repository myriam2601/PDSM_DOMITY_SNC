import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    DocumentTextIcon,
    UserGroupIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";

export default function DevisCards({ devis }) {
    const [recherche, setRecherche] = useState("");

    const filtreDevis = () => {
        const rechercheMinuscule = recherche.toLowerCase();
        return devis.filter((d) => {
            return (
                d.dev_nom.toLowerCase().includes(rechercheMinuscule) ||
                d.projet.nom.toLowerCase().includes(rechercheMinuscule) ||
                (d.projet.client.cli_nom + " " + d.projet.client.cli_prenom)
                    .toLowerCase()
                    .includes(rechercheMinuscule) ||
                d.dev_status.toLowerCase().includes(rechercheMinuscule)
            );
        });
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="search my-4">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    className="input w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtreDevis().map((devis) => (
                    <div
                        key={devis.id}
                        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                    >
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {devis.dev_nom}
                                    </h3>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Projet : {devis.projet.nom}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Client: {devis.projet.client.cli_nom}{" "}
                                    {devis.projet.client.cli_prenom}
                                </p>
                            </div>
                            <Link
                                href={`/devis/generer-pdf/${devis.id}`}
                                className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            >
                                <DocumentTextIcon
                                    className="h-6 w-6 mr-2"
                                    aria-hidden="true"
                                />
                                <span>Générer PDF</span>
                            </Link>
                        </div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <Link
                                    href={`/devis/edit/${devis.id}`}
                                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                >
                                    <PencilIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-3">Modifier Devis</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
