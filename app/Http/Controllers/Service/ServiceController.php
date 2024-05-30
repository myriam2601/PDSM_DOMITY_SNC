<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    public function __construct()
    {
        // Middleware pour vérifier si l'utilisateur est un administrateur
        $this->middleware(function ($request, $next) {
            if (!Auth::user()->isAdmin) {
                return Redirect::route('dashboard')->with('error', 'Accès non autorisé');
            }
            return $next($request);
        });
    }

    public function index()
    {
        $services = Service::all();
        $parametreId = optional(Auth::user()->parametre)->id;
        return Inertia::render('Services/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'services' => $services,
            'parametreId' => $parametreId,
        ]);
    }

    public function getServices()
    {
        $services = Service::all();
        return response()->json($services);
    }

    public function create()
    {
        return Inertia::render('Services/AddService');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ser_categorie' => 'required|string|max:3',
            'ser_nom' => [
                'required',
                'string',
                'max:255',
                Rule::unique('service', 'ser_nom') // Assure que le ser_nom est unique dans la table services
            ],
            'ser_modalite' => 'required|string',
            'ser_conditions_reglements' => 'required|string',
        ], [
            'ser_categorie.max' => 'La catégorie ne doit pas dépasser 3 caractères.',
            'ser_nom.unique' => 'Le nom du service doit être unique.',
            'required' => 'Le champ :attribute est obligatoire.',
        ]);

        try {
            Service::create([
                'ser_categorie' => $validated['ser_categorie'],
                'ser_nom' => $validated['ser_nom'],
                'ser_modalite' => $validated['ser_modalite'],
                'ser_conditions_reglements' => $validated['ser_conditions_reglements'],
            ]);
            return redirect()->route('services.index')->with('reussi', 'Service ajouté avec succès');
        } catch (\Exception $e) {
            return redirect()->back()->with('echec', 'Erreur lors de l\'ajout du service : ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            Service::destroy($id);
            return Redirect::route('services.index');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    public function show(Service $service)
    {
        return Inertia::render('Services/Show', [
            'service' => $service,
        ]);
    }

    public function edit($id)
    {
        try {
            $service = Service::findOrFail($id);
            return Inertia::render('Services/Edit', [
                'auth' => [
                    'user' => auth()->user()
                ],
                'service' => $service,
                'reussi' => session('reussi'),
                'echec' => session('echec'),
            ]);
        } catch (\Exception $e) {
            return Redirect::route('services.index')->with('echec', 'Service non trouvé');
        }
    }

    public function update(Request $request, $id): RedirectResponse
    {
        // Messages de validation personnalisés
        $messages = [
            'ser_categorie.required' => 'Le champ catégorie est obligatoire.',
            'ser_categorie.max' => 'Le champ catégorie ne doit pas dépasser 255 caractères.',
            'ser_nom.required' => 'Le champ nom est obligatoire.',
            'ser_nom.max' => 'Le champ nom ne doit pas dépasser 255 caractères.',
            'ser_nom.unique' => 'Le nom du service doit être unique.',
            'ser_modalite.required' => 'Le champ modalité est obligatoire.',
            'ser_conditions_reglements.required' => 'Le champ conditions de règlement est obligatoire.',
        ];

        // Validation des champs avec les critères et messages personnalisés
        $validated = $request->validate([
            'ser_categorie' => 'required|string|max:255',
            'ser_nom' => [
                'required',
                'string',
                'max:255',
                Rule::unique('service', 'ser_nom')->ignore($id), // Ignorer cet ID lors de la vérification d'unicité
            ],
            'ser_modalite' => 'required|string',
            'ser_conditions_reglements' => 'required|string',
        ], $messages);

        try {
            $service = Service::find($id);

            if (!$service) {
                return Redirect::route('services.index')->with('error', 'Service non trouvé');
            }

            $service->update([
                'ser_categorie' => $validated['ser_categorie'],
                'ser_nom' => $validated['ser_nom'],
                'ser_modalite' => $validated['ser_modalite'],
                'ser_conditions_reglements' => $validated['ser_conditions_reglements'],
            ]);

            // Redirection vers la page du service mis à jour ou vers la liste des services
            return redirect()->route('services.index')->with('success', 'Service mis à jour avec succès');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la mise à jour du service : ' . $e->getMessage());
        }
    }
}
