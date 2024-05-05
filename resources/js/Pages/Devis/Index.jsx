import React, { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import DefaultDashboardLayout from "@/Layouts/DefaultDashboardLayout.jsx";
import DevisDisplay from "@/Components/DevisDisplay";
import { Switch } from '@headlessui/react';
import { ToastContainer, toast } from "react-toastify";
import DevisCards from "@/Components/DevisCard";
import {ArrowLeftIcon} from "@heroicons/react/24/outline/index.js";
import ModalIndex from "../Libelles/ModalIndex";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }


  export default function MainDevis({ auth, devis, url, parametreId, libelles }) {
    const { flash } = usePage().props;
    const [displayCards, setDisplayCards] = useState(false);
    console.log(flash)
    useEffect(() => {
        if (flash.reussi) {
            toast.success(flash.reussi);
        } else if (flash.info) {
            toast.warn(flash.info);
        }else if(flash.echec){
          toast.error(flash.echec);
        }
    }, [flash]);


    return (
        <DefaultDashboardLayout user={auth.user} title="Devis" url={url} parametreId={parametreId}>
            <Head title="Devis" />
            <ModalIndex libelles={libelles}/>
            <div className="flex justify-between items-center p-4 sm:p-6 lg:p-8">
                <a href="javascript:history.back()"
                   className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                    <ArrowLeftIcon className="w-4 h-4"/>
                </a>
                <h2 className="text-lg font-semibold leading-7 text-primaryDarkBlue">Devis</h2>
                <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 mr-4">
                        {displayCards ? "Basculer sur Vue Datagrid" : "Basculer sur Vue Cartes"}
                    </p>
                    <Switch
                        checked={displayCards}
                        onChange={setDisplayCards}
                        className={classNames(
                            displayCards ? 'bg-indigo-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out'
                        )}
                    >
                        <span className="sr-only">Switch View</span>
                        <span
                            className={classNames(
                                displayCards ? 'translate-x-6' : 'translate-x-1',
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out'
                            )}
                        />
                    </Switch>
                </div>
            </div>

            {displayCards ? (
                <DevisCards devis={devis} auth={auth}/>
            ) : (
                <DevisDisplay devis={devis} auth={auth}/>
            )}

            <ToastContainer/>
        </DefaultDashboardLayout>
    );
}
