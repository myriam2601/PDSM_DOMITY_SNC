import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import {Link} from "@inertiajs/react";

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export default function ServicesDisplay({ services }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ml-7">
            {services.map((service) => (
                <div key={service.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-xl">
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900">{service.ser_nom}</h3>
                            <p className="mt-1 text-sm text-gray-500">Catégorie {service.ser_categorie}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Link href={route('services.edit', { service: service.id })} className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-greySecond hover:ring-primaryDarkBlue flex items-center justify-center">
                                <span>Détail du service</span>
                                <ArrowIcon className="ml-2"/>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
