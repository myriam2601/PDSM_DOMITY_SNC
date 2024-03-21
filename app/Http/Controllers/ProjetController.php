<?php
//Ce contrôleur PHP gère les opérations liées aux projets. La méthode "index" affiche une liste des projets en passant les données d'authentification et
// les projets eux-mêmes à la vue Inertia "Projets/Index".
// La méthode "create" affiche le formulaire pour ajouter un nouveau projet.
// La méthode "store" valide et stocke un nouveau projet dans la base de données.

namespace App\Http\Controllers;

use App\Models\Projet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
// Front : Projets/Index.jsx et Components/ProjectsDisplay.jsx
class ProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Projets/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            // Add the projects data, assuming you have a 'user' relationship defined on your Projet model
            'projets' => Projet::with('user:id,name')->latest()->get(), // Adjust 'user:id,name' based on your actual relationship and fields you want to select
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Assurez-vous que le chemin 'Projets/AddProject' correspond au fichier de votre composant React dans resources/js/Pages/Projets/AddProject.jsx
        return Inertia::render('Projets/AddProject', [
            // Vous pouvez passer ici des données supplémentaires nécessaires pour le formulaire, par exemple, une liste de clients si vous en avez besoin
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
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
            'user_id' => $request->user()->id, // Assurez-vous que votre table projets a une colonne `user_id` pour stocker l'utilisateur qui crée le projet
            'nom' => $validated['nom'],
            'client_id' => $validated['client_id'], // Utilisez `client_id` ici
            'service_id' => $validated['service_id'],
            'debut' => $validated['debut'],
            'deadline' => $validated['deadline'],
            'description' => $validated['description'],
        ]);
        
        $projet->save();
        
        return redirect()->route('devis.form')->with([
            'success'=>'Projet créé avec succès',
            'projectId' => $projet->id,
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Projet $projet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Projet $projet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Projet $projet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Projet $projet)
    {
        //
    }
}
