import React, { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import UpdateDevisForm from "./Partials/UpdateDevisForm.jsx"; //prblm avec les raccourcis @ chemin
import DeleteDevisForm from "./Partials/DeleteDevisForm.jsx";
import { ToastContainer, toast } from "react-toastify";
import {ArrowLeftIcon} from "@heroicons/react/24/outline/index.js";

export default function EditDevis({ auth, devis }) {
    const { flash } = usePage().props;

    useEffect(() => {
        // Pour débogage
        if (flash.echec) {
            toast.error(flash.echec, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [flash]);
    return (
        <DefaultDashboardLayout user={auth.user} title={`Édition du Devis`}>
            <Head title={`${devis.dev_nom}`}/>
            <h2 className="text-2xl font-semibold leading-7 text-primaryDarkBlue mt-8 ml-16">
                Modifier le devis
            </h2>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <a href="javascript:history.back()"
                           className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                            <ArrowLeftIcon className="w-4 h-4 mr-3"/> Retour
                        </a>
                        <UpdateDevisForm
                            auth={auth}
                            devis={devis}
                        />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteDevisForm devis={devis}/>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </DefaultDashboardLayout>
    );
}
