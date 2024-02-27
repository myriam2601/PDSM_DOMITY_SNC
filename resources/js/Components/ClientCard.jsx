// ClientCard.jsx

import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function ClientCard({ client, auth }) {
    return (
        <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-900 text-center">
                            {client.cli_nom} {client.cli_prenom}
                        </h3>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">
                        {client.cli_societe}
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-500">
                        {client.cli_email}
                    </p>
                </div>
                <div className="flex flex-col">
                    <InertiaLink
                        href={route('clients.show', { client: client.id })}
                        className="ml-auto w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-greySecond hover:ring-primaryDarkBlue mt-2 flex items-center justify-center"
                    >
                        <span>Détail du client</span>
                    </InertiaLink>
                    {/* Add more buttons or links for other client-related actions */}
                </div>
            </div>
            {/* Add any additional information you want to display for each client */}
        </div>
    );
}
