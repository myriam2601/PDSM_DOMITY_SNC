import React from 'react';
import DefaultDashboardLayout from '@/Layouts/DefaultDashboardLayout.jsx';
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid/index.js";
import { Link, usePage, useForm } from "@inertiajs/react";

export default function Admin({ users }) {
    const { delete: destroy } = useForm();
    const { data, setData } = useForm();

    const deleteUser = (userId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            destroy(`/admin/users/${userId}`, {
                onSuccess: () => {
                    // Rafraîchissez la page après la suppression de l'utilisateur
                    window.location.reload();
                },
            });
        }
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
                        {/* Ajoutez d'autres colonnes selon les informations que vous souhaitez afficher */}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.isAdmin ? 'Oui' : 'Non'}</td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                {/* Bouton pour éditer l'utilisateur */}
                                <Link href={`/admin/edit/${user.id}`}>
                                    <button className="text-indigo-600 hover:text-indigo-900">
                                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </Link>
                                {/* Bouton pour supprimer l'utilisateur */}
                                <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900">
                                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                </button>

                            </td>
                            {/* Ajoutez d'autres colonnes selon les informations que vous souhaitez afficher */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </DefaultDashboardLayout>
    );
}
