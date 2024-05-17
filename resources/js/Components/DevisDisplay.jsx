import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

import "react-toastify/dist/ReactToastify.css";

export default function DevisDisplay({ devis }) {
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

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center" style={{marginTop: '-32px'}}></div>

            <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">
                Devis
            </h2>

            <div className="mt-8 flow-root">


                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

                    <div className="search">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

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
                                        {devis.dev_status}
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
