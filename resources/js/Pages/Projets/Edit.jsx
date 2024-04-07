import React from 'react';
import { Head } from '@inertiajs/react';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout';
import UpdateProjectForm from '@/Pages/Projets/Partials/UpdateProjectForm';
import DeleteProjectForm from '@/Pages/Projets/Partials/DeleteProjectForm';
import {ArrowLeftIcon} from "@heroicons/react/24/outline";

export default function EditProject({ auth, projet, clients, services }) {
    return (
        <DefaultDashboardLayout user={auth.user} title={`Édition du Projet - ${projet.nom}`}>
            <Head title={`Édition du Projet - ${projet.nom}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <a href="javascript:history.back()"
                           className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                            <ArrowLeftIcon className="w-4 h-4"/>
                        </a>
                        <UpdateProjectForm projet={projet} clients={clients} services={services}/>
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteProjectForm projet={projet}/>
                    </div>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
