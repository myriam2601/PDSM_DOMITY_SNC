import React from "react";
import { usePage } from "@inertiajs/react";

export default function DashboardStats() {
    const {props} = usePage();
    const {clientsCount, projetsCount, devisCount} = props;
    const stats = [
        {name: "Clients", stat: clientsCount}, // Utilisez clientsCount directement
        {name: "Projets en cours", stat: projetsCount},
        {name: "Devis", stat: devisCount},
    ];

    return (
        <div className="text-center">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
                Vue d'ensemble
            </h3>
            <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                    >
                        <dt className="truncate text-sm font-medium text-gray-500">
                            {item.name}
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {item.stat}
                        </dd>
                    </div>
                ))}
            </dl>
            <div className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Dashboard : Comment m'utiliser ?
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                    Vous pouvez utiliser ce tableau de bord pour suivre vos clients, projets en cours et devis. Les
                    statistiques sont mises à jour en temps réel à partir de votre base de données.
                </p>
            </div>
            {/* Nouvelle division de texte */}
            <div className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Comment créer un devis ?
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                    Pour créer un devis, suivez les étapes suivantes :
                    <ol>
                        <li> 1. Créer un client si celui-ci n'est pas encore créé dans votre base de données.</li>
                        <li> 2. Créer un service si celui-ci n'est pas encore existant dans votre base de données.</li>
                        <li> 3. Créer un projet si celui-ci n'est pas encore existant dans votre base de données.</li>
                        <li> 4. À partir de la création du projet, vous pourrez créer un devis.</li>
                    </ol>
                    Une fois ces étapes accomplies, vous pourrez cliquer sur le bouton "Créer un devis" pour ajouter un
                    nouveau devis.
                </p>
            </div>
        </div>

    )
        ;
}
