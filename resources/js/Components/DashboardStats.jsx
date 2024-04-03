import React from "react";
import { usePage } from "@inertiajs/react";

export default function DashboardStats() {
    const { props } = usePage();
    const { clientsCount,projetsCount,devisCount } = props;
    const stats = [
        { name: "Clients", stat: clientsCount }, // Utilisez clientsCount directement
        { name: "Projets en cours", stat: projetsCount },
        { name: "Devis", stat: devisCount },
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
        </div>
    );
}
