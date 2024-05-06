<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
class AdminController extends Controller
{
    public function index()
    {
        $currentUser = Auth::user();
        $users = User::all();
        return Inertia::render('Administrateur/Admin', compact('users', 'currentUser'));
    }

    public function delete(User $user)
    {
        // Supprimer l'utilisateur
        $user->delete();

        // Rediriger vers la page précédente
        return Redirect::back()->with('success', 'L\'utilisateur a été supprimé avec succès.');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Administrateur/Partials/UpdateUserForm', ['user' => $user]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($id),
            ],
            'isAdmin' => 'required|boolean',
        ]);

        try {
            $user = User::findOrFail($id);
            $user->update($validatedData);
            return Redirect::route('admin.index')->with('success', 'Utilisateur mis à jour avec succès');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

}
