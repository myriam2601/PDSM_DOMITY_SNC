<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        \Log::info('Received data:', $request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'isAdmin' => 'required|boolean',
        ]);
        ;
        ;
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'isAdmin' => $request->input('isAdmin', false), // Utiliser input() avec une valeur par défaut // Utilise l'opérateur null coalescent pour définir la valeur par défaut
        ]);

        event(new Registered($user));

        Auth::login($user);
if ($user->isAdmin) {
            return redirect('/parametres/create');

        }
        return redirect(RouteServiceProvider::HOME);
    }

    public function showCreateUserForm(): Response
    {
        return Inertia::render('Administrateur/CreateUser');
    }

    public function createUser(Request $request): RedirectResponse
    {
        // Validation des données du formulaire
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'isAdmin' => 'required|boolean',
        ]);

        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'isAdmin' => $request->input('isAdmin', false), // Utilisation de la valeur par défaut
        ]);

        // Déclenchement de l'événement Registered pour l'utilisateur créé
        event(new Registered($user));

        return redirect('/admin');
    }
}
