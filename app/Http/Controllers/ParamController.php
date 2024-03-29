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
            'par_logo' => 'nullable|string|max:255',
            'par_accord' => 'nullable|boolean',
            // Ajoutez d'autres règles de validation si nécessaire
        ]);

        // Créer un nouveau Parametre avec les données fournies
        Parametre::create([
            'par_nom_societe' => $request->par_nom_societe,
            'par_adresse' => $request->par_adresse,
            'par_npa' => $request->par_npa,
            'par_email' => $request->par_email,
            'par_telephone' => $request->par_telephone,
            'par_site_web' => $request->par_site_web,
            'par_logo' => $request->par_logo,
            'par_accord' => $request->par_accord,
            // Ajoutez d'autres champs si nécessaire
        ]);
        return redirect()->route('parametres.create');

    }
}

