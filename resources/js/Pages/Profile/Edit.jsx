import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout';
import { Head } from '@inertiajs/react';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";


export default function Edit({ auth, mustVerifyEmail, status }) {
    return (

        <DefaultDashboardLayout user={auth.user} title="Profil">

            <Head title="Profil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex items-center space-x-4 mb-4">
                            <a href="javascript:history.back()"
                               className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                                <ArrowLeftIcon className="w-4 h-4 mr-3"/> Retour
                            </a>
                        </div>

                        <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue my-4">
                            Profil
                        </h2>

                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl"/>
                    </div>

                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
