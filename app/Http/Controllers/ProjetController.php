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
// Front : Projets/Index.jsx et Components/ProjectsDisplay.jsx
class ProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $parametreId = optional(Auth::user()->parametre)->id;

        return Inertia::render('Projets/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'projets' => Projet::with(['user:id,name', 'devis'])->latest()->get(), // Assurez-vous d'inclure 'devis' ici
            'parametreId' => $parametreId,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Projets/AddProject', [

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



        $serviceId = $request->input('service_id');

        $projet->save();
        $idProjet = $projet->id;


        return redirect()->route('devis.form')->with([
            'success'=>'Projet créé avec succès',
            'projectId' => $idProjet,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Projet $projet)
    {
        // Charger des données supplémentaires si nécessaire
        $projet->load('user', 'client', 'service', 'devis');

        return Inertia::render('Projets/Show', [
            'projet' => $projet,
        ]);
    }




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Projet $projet)
    {
        $clients = Client::all();
        $services = Service::all();
        return Inertia::render('Projets/Edit', [
            'projet' => $projet,
            'clients' => $clients,
            'services' => $services,
        ]);
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Projet $projet): RedirectResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'client_id' => 'required|integer|exists:client,id',
            'service_id' => 'required|integer|exists:service,id',
            'debut' => 'required|date',
            'deadline' => 'required|date|after:debut',
            'description' => 'required|string',
        ]);

        // Update the project with validated data
        $projet->update([
            'nom' => $validated['nom'],
            'client_id' => $validated['client_id'],
            'service_id' => $validated['service_id'],
            'debut' => $validated['debut'],
            'deadline' => $validated['deadline'],
            'description' => $validated['description'],
        ]);

        // Optionally, flash a success message to session
        session()->flash('message', 'Projet mis à jour avec succès.');

        // Redirect back or to a specific route
        return redirect()->route('projets.show', $projet);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Projet $projet)
    {
        // Logique pour supprimer le projet
        //$projet->delete();

        // Redirection ou réponse après la suppression
        return redirect()->route('projets.index')->with('success', 'Projet supprimé avec succès');
    }

}
