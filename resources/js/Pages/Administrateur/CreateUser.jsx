import React from 'react';
import { Head } from '@inertiajs/react';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout';
import CreateUserForm from '@/Pages/Administrateur/Partials/CreateUserForm';
import { ArrowLeftIcon } from "@heroicons/react/24/outline/index.js";

export default function CreateUser({ auth }) {
    return (
        <DefaultDashboardLayout user={auth.user} title="Créer un utilisateur">
            <Head title="Créer un utilisateur" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <a href="javascript:history.back()"
                       className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                        <ArrowLeftIcon className="w-4 h-4 mr-3"/> Retour
                    </a>
                        <CreateUserForm />
                    </div>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
