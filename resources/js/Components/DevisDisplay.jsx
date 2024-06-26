import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

import "react-toastify/dist/ReactToastify.css";

export default function DevisDisplay({ devis: initialDevis }) {
    const [devis, setDevis] = useState(initialDevis);
    const [recherche, setRecherche] = useState("");
    const [tri, setTri] = useState({ colonne: null, direction: "asc" });

    const demanderTri = (colonne) => {
        const estAscendant = tri.colonne === colonne && tri.direction === "asc";
        setTri({
            colonne,
            direction: estAscendant ? "desc" : "asc",
        });
    };
    const filtreEtTriDevis = () => {
        const rechercheMinuscule = recherche.toLowerCase();
        return devis
            .filter((d) => {
                return (
                    d.dev_nom.toLowerCase().includes(rechercheMinuscule) ||
                    d.projet.nom.toLowerCase().includes(rechercheMinuscule) ||
                    (d.projet.client.cli_nom + " " + d.projet.client.cli_prenom)
                        .toLowerCase()
                        .includes(rechercheMinuscule) ||
                    d.dev_status.toLowerCase().includes(rechercheMinuscule)
                );
            })
            .sort((a, b) => {
                if (!tri.colonne) return 0;
                let valA = a[tri.colonne];
                let valB = b[tri.colonne];
                // Pour gérer les propriétés imbriquées, vous devez ajuster la logique ici
                if (tri.direction === "asc") {
                    return valA < valB ? -1 : 1;
                } else {
                    return valA > valB ? -1 : 1;
                }
            });
    };

    const handleStatusChange = (id, newStatus) => {
        fetch(`/devis/update-status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // assuming you're using Laravel and have a CSRF token in a meta tag
            },
            body: JSON.stringify({ id, newStatus })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update the local state with the new status
                setDevis(prevDevis => prevDevis.map(devisItem =>
                    devisItem.id === id ? { ...devisItem, dev_status: newStatus } : devisItem
                ));
            })
            .catch(error => {
                // Handle error
                console.error("Error updating status:", error);
            });
    };


    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center" style={{marginTop: '-32px'}}></div>

            <h2 className="text-2xl font-semibold leading-7 text-primaryDarkBlue mt-4">
                Devis
            </h2>

            <div className="mt-8 flow-root">


            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

                    <div className="search">
                        <input
                            type="text"
                            placeholder="Rechercher un devis..."
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-2 ml-8 mb-4"

                        />
                    </div>
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th
                                    onClick={() => demanderTri("dev_nom")}
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    Identification
                                </th>
                                <th
                                    onClick={() =>
                                        demanderTri("devis.projet.nom")
                                    }
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    Nom projet
                                </th>
                                <th
                                    onClick={() =>
                                        demanderTri("devis.projet.client")
                                    }
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    Nom Client
                                </th>
                                <th
                                    onClick={() => demanderTri("dev_date")}
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Date de création
                                </th>
                                <th
                                    onClick={() =>
                                        demanderTri("dev_fin_validite")
                                    }
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Date de fin de validité
                                </th>
                                <th
                                    onClick={() =>
                                        demanderTri("dev_status")
                                    }
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Statut
                                </th>
                                <th
                                    scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                >
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filtreEtTriDevis().map((devis, index) => (
                                <tr
                                    key={devis.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    }
                                >
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {devis.dev_nom}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                                        {devis.projet.nom}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {devis.projet.client.cli_nom +
                                            " Prenom : " +
                                            devis.projet.client.cli_prenom}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {new Date(
                                            devis.dev_date
                                        ).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                        {new Date(
                                            devis.dev_fin_validite
                                        ).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <select
                                            value={devis.dev_status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    devis.id,
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                        >
                                            <option value="en attente">En attente</option>
                                            <option value="accepté">Accepté</option>
                                            <option value="refusé">Refusé</option>
                                        </select>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <Link
                                            href={`/devis/edit/${devis.id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                            <span className="sr-only">
                                                    , {devis.dev_nom}
                                                </span>
                                        </Link>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <Link
                                            href={`/devis/generer-pdf/${devis.id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            PDF
                                            <span className="sr-only">
                                                    , {devis.dev_nom}
                                                </span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
