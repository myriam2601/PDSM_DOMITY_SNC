<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use function Laravel\Prompts\error;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Vérifiez si l'utilisateur a un paramètre et générez l'URL de modification
        $parametreEditUrl = optional($user->parametre)->exists ? route('parametres.edit', $user->parametre->id) : null;

        return Inertia::render('Dashboard', [
            'parametreEditUrl' => $parametreEditUrl,
        ]);
    }
}
