<?php
//Ce contrôleur PHP gère les opérations liées aux projets. La méthode "index" affiche une liste des projets en passant les données d'authentification et
// les projets eux-mêmes à la vue Inertia "Projets/Index".
// La méthode "create" affiche le formulaire pour ajouter un nouveau projet.
// La méthode "store" valide et stocke un nouveau projet dans la base de données.

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Projet;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProjetController extends Controller
{
    public function index(): Response
    {
        $parametreId = optional(Auth::user()->parametre)->id;

        return Inertia::render('Projets/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'projets' => Projet::with(['user:id,name', 'devis'])->latest()->get(),
            'parametreId' => $parametreId,
        ]);
    }

    public function create()
    {
        $clients = Client::all();
        $services = Service::all();

        return Inertia::render('Projets/AddProject', [
            'clients' => $clients,
            'services' => $services,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'client_id' => 'required|integer|exists:client,id',
            'service_id' => 'required|integer|exists:service,id',
            'debut' => 'required|date',
            'deadline' => 'required|date|after:debut',
            'description' => 'required|string',
        ]);

        $projet = new Projet([
            'user_id' => $request->user()->id,
            'nom' => $validated['nom'],
            'client_id' => $validated['client_id'],
            'service_id' => $validated['service_id'],
            'debut' => $validated['debut'],
            'deadline' => $validated['deadline'],
            'description' => $validated['description'],
        ]);

        $serviceId = $request->input('service_id');

        $projet->save();
        $idProjet = $projet->id;

        return redirect()->route('devis.form')->with([
            'success' => 'Projet créé avec succès',
            'projectId' => $idProjet,
        ]);
    }

    // ... autres méthodes du contrôleur
}
