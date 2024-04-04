import React, { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import UpdateDevisForm from "./Partials/UpdateDevisForm.jsx"; //prblm avec les raccourcis @ chemin
import DeleteDevisForm from "./Partials/DeleteDevisForm.jsx";
import { ToastContainer, toast } from "react-toastify";

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
            <Head title={`${devis.dev_nom}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateDevisForm
                            auth={auth}
                            devis={devis}
                        />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteDevisForm devis={devis} />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </DefaultDashboardLayout>
    );
}
