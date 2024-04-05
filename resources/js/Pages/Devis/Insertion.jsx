import React, { useEffect } from "react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import AddDevisForm from "./Partials/AddDevisForm";
import { Head, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import ModalCalcul from "@/Modal/ModalCalcul";
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
            <Head title="Formulaire Devis" />
            <AddDevisForm projectId={projectId}/>
            
            <ToastContainer />
            
        </DefaultDashboardLayout>
    );
}
