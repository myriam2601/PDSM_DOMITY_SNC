<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libelle;
use Inertia\Inertia;

class LibelleController extends Controller
{
    public function store(Request $request)
    {
        
        $request->validate([
            'lib_designation' => 'required|string|max:255',
            'lib_code' => 'required|string|max:255',
            'lib_montant' => 'required|numeric',
            'lib_ajustement' => 'sometimes|boolean'
        ]); 
        
        $libelle = new Libelle();
        
        $libelle->lib_designation = $request->lib_designation;
        $libelle->lib_code = $request->lib_code;
       
        $libelle->lib_montant = $request->lib_montant;
        $libelle->lib_ajustement = $request->lib_ajustement ?? false;
       
        $libelle->save();
        
        return redirect()->route('devis.index')->with('reussi', 'Le libellé a été créé avec succès!');
    }

    public function index()
    {
        $libelles = Libelle::all(); // Récupération de tous les libellés
        dd($libelles);
        return Inertia::render('Libelles/LibelleModal', ['libelles' => $libelles]);
    }
}
