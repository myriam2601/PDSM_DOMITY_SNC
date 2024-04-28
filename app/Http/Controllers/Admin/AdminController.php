<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // Récupérez tous les utilisateurs
        $users = User::all();

        // Passez les utilisateurs à la vue d'administration
        return Inertia::render('Administrateur/Admin', [
            'users' => $users,
        ]);
    }

    public function delete(User $user)
    {
        // Supprimer l'utilisateur
        $user->delete();

        // Rediriger vers la page précédente
        return Redirect::back()->with('success', 'L\'utilisateur a été supprimé avec succès.');
    }


}
