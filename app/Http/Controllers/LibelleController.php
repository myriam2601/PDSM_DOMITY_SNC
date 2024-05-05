<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libelle;
use Illuminate\Support\Facades\Validator;
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

        return redirect()->route('devis.index')->with('reussi', 'Insertion a bien été effectuée.');
    }

    public function index()
    {
        $libelles = Libelle::all(); // Récupération de tous les libellés
        dd($libelles);
        return Inertia::render('Libelles/LibelleModal', ['libelles' => $libelles]);
    }

    public function update(Request $request)
    {
        // Récupération de l'ID du libellé à mettre à jour
        $libelleId = $request->input('id');


        // Définition des règles de validation et des messages d'erreur
        $messagesError = [
            'required' => 'Ce champ ne peut pas être vide.',
            'numeric' => 'Ce champ doit être un nombre.',
            'lib_designation.required' => 'La désignation est obligatoire.',
            'lib_code.required' => 'Le code est obligatoire.',
            'lib_montant.numeric' => 'Le montant doit être un nombre.',
        ];

        $validator = Validator::make($request->all(), [
            'lib_designation' => 'required|string',
            'lib_code' => 'required|string',
            'lib_montant' => 'nullable|numeric',
            'lib_ajustement' => 'nullable|boolean',
        ], $messagesError);

        // Gestion des erreurs de validation
        if ($validator->fails()) {
            return redirect()->back()
                ->with('echec', 'Echec de la mise à jour, veuillez remplir tous les champs obligatoires')
                ->withErrors($validator)
                ->withInput();
        }

        // Recherche du libellé dans la base de données
        $libelle = Libelle::findOrFail($libelleId);

        // Mise à jour du libellé avec les nouvelles valeurs
        $libelle->update([
            'lib_designation' => $request->lib_designation,
            'lib_code' => $request->lib_code,
            'lib_montant' => $request->lib_montant,
            'lib_ajustement' => $request->lib_ajustement ?? false,  // Utiliser false comme valeur par défaut si lib_ajustement n'est pas présent
        ]);

        // Réponse en cas de succès de la mise à jour
        return redirect()->route('devis.index')->with('reussi', 'La mise à jour du libellé a bien été effectuée.');

    }
}
