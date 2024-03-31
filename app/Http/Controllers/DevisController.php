<?php

namespace App\Http\Controllers;

use App\Models\Devis;
use Illuminate\Contracts\Validation\Validator as ValidationValidator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class DevisController extends Controller
{
    public function store(Request $request)
    {
        $lignesDevisArray = $request->input('lignesDevis');
        $projectId = $request->input('projectId');

        $jsonDataArray = [];       

        $validator = Validator::make($lignesDevisArray, [
            '*.designation' => 'required|unique|string',
            '*.quantite' => 'required|numeric|min:1',
            '*.prixUnitaire' => 'required|numeric|min:0',
            '*.tva' => 'required|numeric|min:0|max:100',
            // 'projectId' => 'required|exists:projets,id', // Décommentez si nécessaire
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        foreach ($lignesDevisArray as $ligne) {

            $quantite = (float) $ligne['quantite'];
            $prixUnitaire = (float) $ligne['prixUnitaire'];
            $tva = (float) $ligne['tva'];
            $prixHT = $quantite * $prixUnitaire;

            $prixTTC = $prixHT + ($prixHT * ($tva / 100));
            $prixTTC = round($prixTTC, 2);

            $devNom = 'DV' . now()->format('YmdHis');
            $devDate = now();
            $devFinValidite = now()->addMonth(); // Ajoute un mois à la date actuelle

            $data = [
                'designation' => $ligne['designation'],
                'quantite' => $quantite,
                'prixUnitaire' => $prixUnitaire,
                'tva' => $tva,
                'prixHT' => $prixHT,
                'prixTTC' => $prixTTC,
            ];

            $jsonDataArray[] = $data;
        }

        $jsonData = json_encode($jsonDataArray);

        $devis = new Devis();
        $devis->dev_liste_prestation = $jsonData;
        $devis->dev_nom = $devNom; // Assurez-vous que ces champs existent dans votre modèle Devis
        $devis->dev_date = $devDate;
        $devis->dev_fin_validite = $devFinValidite;
        $devis->projet_id = $projectId;

        $devis->save();

        return Redirect::back()->with('success', 'Les devis ont été créés avec succès!');
    }

    /* Affiche tous les devis existants */
    public function index()
    {
        // Récupère tous les devis
        $devis = Devis::with('projet.client')->get();

        return Inertia::render('Devis/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'devis' => $devis,
        ]);
    }

    public function form()
    {
        return Inertia::render('Devis/FormulaireInsertion', [
            'auth' => [
                'user' => auth()->user()
            ],
            'success' => session('success'),
            'projectId' => session('projectId')
        ]);
    }

    public function edit($id)
    {
        $devis = Devis::find($id);
        $designation = $devis->dev_liste_prestation;

        return Inertia::render('Devis/Edit', [
            'auth' => [
                'user' => auth()->user()
            ],
            'designation' => $designation,
            'idDevis' => $devis,
            'success' => session('success'),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'LignesDevis.*.id' => 'required|integer',
            'LignesDevis.*.designation' => 'required|string',
            'LignesDevis.*.quantite' => 'required|integer',
            'LignesDevis.*.prixUnitaire' => 'required|numeric',
            'LignesDevis.*.tva' => 'required|numeric',
            'LignesDevis.*.prixHT' => 'required|numeric',
            'LignesDevis.*.prixTTC' => 'required|numeric',
        ]);
        $jsonData = json_encode($request->input('LignesDevis'));

        Devis::where('id', $request->id)->update([
            'dev_liste_prestation' => $jsonData,
        ]);
        // Optionally, flash a success message to session
        //session()->flash('message', 'Projet mis à jour avec succès.');

        // Redirect back or to a specific route
        //return redirect()->route('projets.show', $projet);
    }

    public function destroy(Devis $devis)
    {
        $devis->delete();

        return redirect()->route('devis.index');
    }
}
