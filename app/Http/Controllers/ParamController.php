<?php

namespace App\Http\Controllers;

use App\Models\Parametre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParamController extends Controller
{
    public function create()
    {
        return Inertia::render('Param/AppParams');
    }

    public function store(Request $request){
        $request->validate([
            'par_nom_societe' => 'required|string|max:255',
            'par_adresse' => 'required|string|max:255',
            'par_npa' => 'required|string|max:255',
            'par_email' => 'required|email|max:255',
            'par_telephone' => 'required|string|max:255',
            'par_site_web' => 'nullable|string|max:255',
            'par_logo' => 'nullable|image|max:1024',
            'par_accord' => 'required|boolean',
            // Ajoutez d'autres règles de validation si nécessaire
        ]);
        if ($request->hasFile('par_logo')) {
            $path = $request->file('par_logo')->store('logos', 'public');
            // Stockez $path dans votre base de données si nécessaire
        }


        // Créer un nouveau Parametre avec les données fournies
        Parametre::create([
            'par_nom_societe' => $request->par_nom_societe,
            'par_adresse' => $request->par_adresse,
            'par_npa' => $request->par_npa,
            'par_email' => $request->par_email,
            'par_telephone' => $request->par_telephone,
            'par_site_web' => $request->par_site_web,
            'par_logo' => $request->par_logo,
            'par_accord' => $request->par_accord ?? false,
            // Ajoutez d'autres champs si nécessaire
        ]);
        return redirect()->route('dashboard');

    }
}

