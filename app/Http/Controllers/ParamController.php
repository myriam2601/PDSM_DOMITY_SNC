<?php

namespace App\Http\Controllers;

use App\Models\Parametre;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParamController extends Controller
{
    public function create()
    {
        return Inertia::render('Param/AppParams');
    }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'par_nom_societe' => 'required|string|max:255',
            'par_adresse' => 'required|string|max:255',
            'par_npa' => 'required|string|max:255',
            'par_email' => 'required|email|max:255',
            'par_telephone' => 'required|string|max:255',
            'par_site_web' => 'nullable|string|max:255',
            'par_logo' => 'nullable|image|max:1024',
            'par_accord' => 'required|boolean',
        ]);

        // Traiter le téléchargement du logo s'il est présent dans la requête
        if ($request->hasFile('par_logo')) {
            $path = $request->file('par_logo')->store('logos', 'public');
        }

        // Créer un nouveau Parametre avec les données fournies
        $param = new Parametre([
            'user_id' => $request->user()->id,
            'par_nom_societe' => $validated['par_nom_societe'],
            'par_adresse' => $validated['par_adresse'],
            'par_npa' => $validated['par_npa'],
            'par_email' => $validated['par_email'],
            'par_telephone' => $validated['par_telephone'],
            'par_site_web' => $validated['par_site_web'],
            'par_logo' => $validated['par_logo'],
            'par_accord' => $validated['par_accord'] ?? false,
        ]);
        $param->save();

        return redirect()->route('dashboard')->with([
            'success' => 'Paramétrage créé avec succès'
        ]);
    }

}
