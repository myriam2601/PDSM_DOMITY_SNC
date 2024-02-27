import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import {InertiaLink} from "@inertiajs/inertia-react";
import {Link} from "@inertiajs/react";

const navigation = [
    { name: "Dashboard", href: "dashboard" },
    { name: "Clients", href: "/clients" },
    { name: "Projects", href: "/projets" },
    { name: "Services", href: "/services" },
    { name: "Devis", href: "#" },
];

const administrations = [
    { id: 1, name: "Administrateurs", href: "/admins", initial: "A" },
    { id: 2, name: "Paramètrage", href: "/app-param", initial: "P" },
];

const userNavigation = [
    { name: "Profile", href: "/my-profile" },
    { name: "Se déconnecter", href: "/" },
];

export default function DefaultDashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);




    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-50 overflow-hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-300"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="flex flex-col w-64 bg-gray-900 h-screen pt-4">
                                <div className="flex items-center justify-between px-4">
                                    <Link href="/dashboard">
                                        <img
                                            className="h-8 w-auto cursor-pointer"
                                            src="/logo_white.png"
                                            alt="Infomity"
                                        />
                                    </Link>
                                    <div>
                                        <button
                                            className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                                <nav className="mt-10">
                                    <ul>
                                        {navigation.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="block py-2 px-4 text-gray-400 hover:text-white"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6">
                                        <p className="px-4 text-sm font-semibold text-gray-400 uppercase">
                                            Administration
                                        </p>
                                        <ul className="mt-2">
                                            {administrations.map((item, index) => (
                                                <li key={index}>
                                                    <Link
                                                        href={item.href}
                                                        className="py-2 px-4 text-gray-400 hover:text-white flex items-center"
                                                    >
                                                        <span className="h-6 w-6 bg-gray-800 text-gray-400 flex items-center justify-center rounded-md mr-2">
                                                            {item.initial}
                                                        </span>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <div className="flex flex-col w-full min-h-screen">
                    <div className="flex-shrink-0">
                        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
                            <button
                                className="text-gray-700"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Bars3Icon className="h-6 w-6" />
                            </button>
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
                                        <BellIcon className="h-6 w-6" />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-500">
                                        <UsersIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        </header>
                    </div>

                    <main className="flex-1 overflow-y-auto focus:outline-none">
                        <div className="py-6">
                            <div className="px-4 sm:px-6 md:px-8">{children}</div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
