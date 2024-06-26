import React from 'react';

import { Head } from '@inertiajs/react';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout';
import UpdateClientInformationForm from "@/Pages/Clients/Partials/UpdateClientInformationsForm.jsx";
import DeleteClientForm from "@/Pages/Clients/Partials/DeleteClientForm.jsx";
import {ArrowLeftIcon} from "@heroicons/react/24/outline/index.js";

export default function EditClient({ auth, client }) {
    return (
        <DefaultDashboardLayout
            user={auth.user}
            title={`Édition du Client - ${client.cli_nom} ${client.cli_prenom}`}
        >
            <Head title={`Édition du Client - ${client.cli_nom} ${client.cli_prenom}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <a href="javascript:history.back()"
                       className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                        <ArrowLeftIcon className="w-4 h-4 mr-3"/> Retour
                    </a>
                        <UpdateClientInformationForm client={client} className="max-w-xl"/>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteClientForm client={client} className="max-w-xl"/>
                    </div>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
