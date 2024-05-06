// Admin.jsx

import React, { useState } from 'react';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout.jsx';
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid/index.js";
import { Link, usePage, useForm } from "@inertiajs/react";
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdateUserForm from "@/Pages/Administrateur/Partials/UpdateUserForm.jsx"; // Importez le composant DeleteUserForm

export default function Admin({ users }) {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { delete: destroy } = useForm();
    const { currentUser } = usePage().props;

    const openUpdateModal = (user) => {
        setSelectedUser(user);
        setIsUpdateModalOpen(true);
    };

    const deleteUser = (userId) => {
        // Ouvrir le formulaire de suppression d'utilisateur
        setSelectedUserId(userId);
    };

    return (
        <DefaultDashboardLayout>
            <div className="container mx-auto">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-semibold">Liste des utilisateurs</h1>
                    <Link href="/create-user">
                        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Créer un utilisateur
                        </button>
                    </Link>
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
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.isAdmin ? 'Oui' : 'Non'}</td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                <button onClick={() => openUpdateModal(user)} className="text-indigo-600 hover:text-indigo-900">
                                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                {user.id !== currentUser.id && (
                                    <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900">
                                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/* Modale pour la mise à jour de l'utilisateur */}
            {isUpdateModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div className="relative bg-white p-6 rounded-lg max-w-md">
                        <div className="absolute top-0 right-0 pt-2 pr-4">
                            <button onClick={() => setIsUpdateModalOpen(false)} className="text-gray-500 hover:text-gray-700">
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

            {/* Modale pour la suppression de l'utilisateur */}
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
