// ClientCard.jsx

import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import {Link} from "@inertiajs/react";
import {EnvelopeIcon, PhoneIcon} from "@heroicons/react/16/solid/index.js";

export default function ClientCard({ client, auth }) {
    const ArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );
    return (
        <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900 text-center">
                            {client.cli_nom} {client.cli_prenom}
                        </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {client.cli_societe}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {client.cli_email}
                    </p>
                </div>
                <div className="flex flex-col">
                    <Link
                        href={route("clients.show", { client: client.id })}
                        className="ml-auto rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-greySecond hover:ring-primaryDarkBlue flex items-center justify-center"
                    >
                        <span>Détail du client</span>
                        <ArrowIcon className="ml-2" />
                    </Link>
                    <Link href={route('projets.create')}>
                        <button
                            type="button"
                            className="ml-auto w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-greySecond hover:ring-primaryDarkBlue mt-2 flex items-center justify-center"
                        >
                            <span>Ajouter un projet</span>
                            <ArrowIcon className="ml-2" />
                        </button>
                    </Link>
                </div>
            </div>
            <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                    <a
                        href={`mailto:${client.cli_email}`}
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                        <EnvelopeIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        Email
                    </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                    <a
                        href={`tel:${client.cli_telephone}`}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                        <PhoneIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        Call
                    </a>
                </div>

            </div>
        </div>
    );
}
