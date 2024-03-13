<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return Inertia::render('Services/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'services' => $services,
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
            'ser_categorie' => 'required|string|max:255',
            'ser_nom' => [
                'required',
                'string',
                'max:255',
                Rule::unique('service', 'ser_nom') // Assure que le ser_nom est unique dans la table services
            ],
            'ser_modalite' => 'required|string',
            'ser_conditions_reglements' => 'required|string',
        ]);

        Service::create([
            'ser_categorie' => $validated['ser_categorie'],
            'ser_nom' => $validated['ser_nom'],
            'ser_modalite' => $validated['ser_modalite'],
            'ser_conditions_reglements' => $validated['ser_conditions_reglements'],
        ]);

        return redirect()->route('services.index'); // Adjust the route name accordingly
    }

    public function destroy($id)
    {
        //on la delete de la bdd pour le moment
        try {
            Service::destroy( $id);
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
            $service = Service::where("id", $id)->first();
            if ($service) {
                return Inertia::render('Services/Edit', [
                    'service' => $service,
                ]);
            } else {
                return Redirect::route('services.index')->with('error', 'Service non trouvé');
            }
        } catch (\Exception $e) {
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, $id): RedirectResponse
    {
        //pour valider les champs avec les criteres
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
        ]);

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
    }

}
