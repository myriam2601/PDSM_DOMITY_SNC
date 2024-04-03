<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Devis;
use App\Models\Projet;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use function Laravel\Prompts\error;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $parametreId = optional($user->parametre)->id;

        // Récupérer le nombre de clients depuis la base de données
        $clientsCount = Client::count();

        // Récupérer le nombre de projets depuis la base de données
        $projetsCount = Projet::count();

        // Récupérer le nombre de devis depuis la base de données
        $devisCount = Devis::count();

        // Ajouter les données à passer à la vue
        $additionalData = [
            'parametreId' => $parametreId,
            'clientsCount' => $clientsCount,
            'projetsCount' => $projetsCount,
            'devisCount' => $devisCount,
        ];


        return Inertia::render('MainDashboard', $additionalData);
    }

}
