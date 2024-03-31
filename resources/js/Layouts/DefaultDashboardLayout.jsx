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
import {Link} from "@inertiajs/react";

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

export default function DefaultDashboardLayout({ children, parametreEditUrl  }) {
    // TODO : Ouvrir sidemenu avec bars3icon et fermer avec xmarkicon
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
            href: '/parametres/1/edit', // Utilisation de 'parametreEditUrl' passée en tant que prop
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
                                    <button className="text-gray-400 hover:text-gray-500">
                                        <UsersIcon className="h-6 w-6"/>
                                    </button>
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
