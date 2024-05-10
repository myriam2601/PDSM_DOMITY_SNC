import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    Cog6ToothIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    DocumentPlusIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { InertiaLink } from '@inertiajs/inertia-react';
import {Link, usePage} from "@inertiajs/react";

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Clients', href: '/clients', icon: UsersIcon },
    { name: 'Projets', href: '/projets', icon: FolderIcon },
    { name: 'Services', href: '/services', icon: DocumentPlusIcon },
    { name: 'Devis', href: '/devis', icon: DocumentTextIcon },
];


const userNavigation = [
    { name: 'Profile', href: '/my-profile' },
    { name: 'Se déconnecter', href: '/' },
];

export default function DefaultDashboardLayout({ children  }) {
    const [parametreEditUrl, setParametreEditUrl] = useState(null);
    const { parametreId } = usePage().props;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        })
            .then(() => {
                window.location.href = '/';
            })
            .catch(error => console.error('Erreur de déconnexion:', error));
    };


    useEffect(() => {
        setParametreEditUrl(parametreId ? `/parametres/${parametreId}/edit` : null);
    }, [parametreId]);

    const administrations = [
        {
            id: 1,
            name: 'Administrateurs',
            href: '/admins',
            icon: Cog6ToothIcon,
        },
        {
            id: 2,
            name: 'Paramètrage',
            href: parametreEditUrl, // Utilisation de 'parametreEditUrl' passée en tant que prop
            icon: Cog6ToothIcon,
        },
    ];
    return (
        <>
            <div>
                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow pt-5 bg-gray-800 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img
                                className="h-8 w-auto"
                                src="/logo_white.png"
                                alt="Your Company"
                            />

                        </div>

                        <div className="mt-5 flex-grow flex flex-col">
                            <nav className="flex-1 px-2 space-y-1 bg-gray-800">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    >
                                        <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" />
                                        {item.name}
                                    </Link>

                                ))}
                                {/* Add a separator or a header for administration links */}
                                <div className="px-2">
                                    <div className="text-xs text-gray-400">
                                        Administration
                                    </div>
                                    {administrations.map((admin) => (
                                        <Link
                                            key={admin.name}
                                            href={admin.href}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                        >
                                            <admin.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" />
                                            {admin.name}
                                        </Link>
                                    ))}
                                </div>
                                {/* Additional sections for the sidebar */}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col">
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={null}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="flex-1 px-4 flex justify-between">
                            <div className="flex-1 px-4 flex justify-start">
                            </div>
                            <div className="flex items-center">
                                <form className="relative">
                                    <input
                                        type="text"
                                        className="block w-full border-gray-200 rounded-md shadow-sm py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Rechercher un projet, un client"
                                    />
                                </form>
                                <div className="ml-4 flex items-center space-x-4 lg:space-x-6">
                                    <button className="text-gray-400 hover:text-gray-500">
                                        <BellIcon className="h-6 w-6"/>
                                    </button>
                                    {/* Conteneur pour l'icône utilisateur et le menu déroulant */}
                                    <div className="relative ml-4 flex items-center space-x-4 lg:space-x-6">
                                        {/* Bouton pour afficher le menu déroulant */}
                                        <button onClick={() => setShowDropdown(!showDropdown)}
                                                className="text-gray-400 hover:text-gray-500">
                                            <UsersIcon className="h-7 w-7"/>
                                        </button>

                                        {/* Menu déroulant*/}
                                        {showDropdown && (
                                            <div
                                                className="absolute right-0 mt-40 w-48 bg-white rounded-md shadow-xl z-10">
                                                <div className="py-1">
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => {
                                                        }}>Profile
                                                    </button>
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setShowLogoutConfirmation(true)}>Se déconnecter
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                    {/* Boîte de dialogue de confirmation de déconnexion */}
                                    {showLogoutConfirmation && (
                                        <Dialog open={showLogoutConfirmation}
                                                onClose={() => setShowLogoutConfirmation(false)}
                                                className="fixed z-10 inset-0 overflow-y-auto">
                                            <div
                                                className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                <Dialog.Overlay
                                                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                                                <div
                                                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <div
                                                                className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                <Dialog.Title as="h3"
                                                                              className="text-lg leading-6 font-medium text-gray-900">
                                                                    Déconnexion
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500">
                                                                        Êtes-vous sûr de vouloir vous déconnecter ?
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                        <button type="button"
                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                                                                onClick={() => {
                                                                    handleLogout()
                                                                }}>Se déconnecter
                                                        </button>
                                                        <button type="button"
                                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                onClick={() => setShowLogoutConfirmation(false)}>Annuler
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog>
                                    )}


                                </div>

                                {/* Profile dropdown */}
                                <div className="ml-3 relative">
                                    {/* Trigger for dropdown or link to profile */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {children}
                    {/* /End replace */}
                </div>
            </div>
        </>

    );
}
