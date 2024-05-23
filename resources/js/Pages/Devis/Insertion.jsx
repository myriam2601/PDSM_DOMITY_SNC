import React, { useEffect } from "react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import AddDevisForm from "./Partials/AddDevisForm";
import { Head, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import ModalCalcul from "@/Modal/ModalCalcul";
import {ArrowLeftIcon} from "@heroicons/react/24/outline/index.js";
export default function Insertion({ auth, projectId }) {
    const { flash } = usePage().props;
    console.log(flash);
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
        <DefaultDashboardLayout user={auth.user}>
            <div className="ml-48 mt-8"><a href="javascript:history.back()"
                                           className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                <ArrowLeftIcon className="w-4 h-4 mr-3"/> Retour
            </a></div>
            <Head title="Formulaire Devis"/>
            <AddDevisForm projectId={projectId}/>

            <ToastContainer/>

        </DefaultDashboardLayout>
    );
}
