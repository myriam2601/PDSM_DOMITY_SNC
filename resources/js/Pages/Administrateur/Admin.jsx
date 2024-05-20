import React, { useState, useMemo } from 'react';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout.jsx';
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Link, usePage, useForm } from "@inertiajs/react";
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdateUserForm from "@/Pages/Administrateur/Partials/UpdateUserForm.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Admin({ users }) {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { currentUser } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [showOnlyAdmins, setShowOnlyAdmins] = useState(false);

    const openUpdateModal = (user) => {
        setSelectedUser(user);
        setIsUpdateModalOpen(true);
    };

    const deleteUser = (userId) => {
        setSelectedUserId(userId);
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesQuery = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const isAdmin = showOnlyAdmins ? user.isAdmin : true;
            return matchesQuery && isAdmin;
        });
    }, [users, searchQuery, showOnlyAdmins]);

    return (
        <DefaultDashboardLayout>
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-between mb-4">
                    <div>
                        <a href="javascript:history.back()"
                           className="rounded-full p-2 hover:bg-gray-200 inline-flex justify-center items-center">
                            <ArrowLeftIcon className="w-4 h-4 mr-3"/> Retour
                        </a>
                        <h1 className="text-2xl font-semibold mt-4 mb-3">Liste des utilisateurs</h1>
                    </div>
                    <Link href="/create-user">
                        <button
                            type="button"
                            className="my-3 flex items-center rounded-full bg-primaryDarkBlue px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-greySecond hover:text-primaryDarkBlue"
                        >
                            <span>Ajouter un Utilisateur</span>
                            <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true"/>
                        </button>
                    </Link>
                </div>

                <div className="flex items-center space-x-4 mb-8">
                    <input
                        type="text"
                        placeholder="Rechercher un user..."
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                            checked={showOnlyAdmins}
                            onChange={e => setShowOnlyAdmins(e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Afficher seulement les admins</span>
                    </label>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.isAdmin ? 'Oui' : 'Non'}</td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                <button onClick={() => openUpdateModal(user)}
                                        className="text-indigo-600 hover:text-indigo-900 transition-transform duration-200 transform hover:scale-110">
                                    <PencilIcon className="h-5 w-5 text-primaryDarkBlue" aria-hidden="true" />                                </button>
                                {user.id !== currentUser.id && (
                                    <button onClick={() => deleteUser(user.id)}
                                            className="text-red-600 hover:text-red-900 transition-transform duration-200 transform hover:scale-110">
                                        <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                                    </button>
                                )}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {isUpdateModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div className="relative bg-white p-6 rounded-lg max-w-md">
                        <div className="absolute top-0 right-0 pt-2 pr-4">
                            <button onClick={() => setIsUpdateModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <UpdateUserForm
                            user={selectedUser}
                            onClose={() => setIsUpdateModalOpen(false)}
                        />
                    </div>
                </div>
            )}

            {selectedUserId && !isUpdateModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div className="relative bg-white p-6 rounded-lg max-w-md">
                        <div className="absolute top-0 right-0 pt-2 pr-4">
                            <button onClick={() => setSelectedUserId(null)} className="text-gray-500 hover:text-gray-700">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <DeleteUserForm
                            userId={selectedUserId}
                            onClose={() => setSelectedUserId(null)}
                        />
                    </div>
                </div>
            )}
        </DefaultDashboardLayout>
    );
}
