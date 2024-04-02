import React from "react";
import { Head } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import UpdateDevisForm from "./Partials/UpdateDevisForm.jsx"; //prblm avec les raccourcis @ chemin
import DeleteDevisForm from "./Partials/DeleteDevisForm.jsx";

export default function EditDevis({ auth, designation, idDevis }) {
    return (
        <DefaultDashboardLayout user={auth.user} title={`Édition du Devis`}>
            <Head title={`${idDevis.dev_nom}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateDevisForm
                            auth={auth}
                            designation={designation}
                            idDevis={idDevis}
                        />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteDevisForm idDevis={idDevis} />
                    </div>
                </div>
            </div>
        </DefaultDashboardLayout>
    );
}
