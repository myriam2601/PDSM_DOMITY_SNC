<?php

namespace App\Http\Controllers;

use App\Models\Devis;
use App\Models\Projet;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class DevisController extends Controller
{
    public function store(Request $request)
    {

        $lignesDevisArray = $request->input('lignesDevis');

        $projet = Projet::find($request->input('projectId'));
        $service = Service::find($projet->service_id);

        $jsonDataArray = [];

        $messagesError = [
            'required' => 'Ce champ ne peut pas être vide.',
            '*.quantite.min' => 'La quantité doit être au minimum 1',
        ];

        $validator = Validator::make($lignesDevisArray, [
            '*.designation' => 'required|string',
            '*.quantite' => 'required|numeric|min:1',
        ], $messagesError);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $devNom = 'Devis n°' . date('Y') . '-' . $service->ser_categorie;
        $devDate = now();
        $devFinValidite = now()->addMonth(); // Ajoute un mois à la date actuelle

        foreach ($lignesDevisArray as $ligne) {

            $quantite = (float) $ligne['quantite'];
            $prixUnitaire = (float) $ligne['prixUnitaire'];
            $tva = (float) $ligne['tva'];
            $prixHT = $quantite * $prixUnitaire;

            $prixTTC = $prixHT + ($prixHT * ($tva / 100));
            $prixTTC = round($prixTTC, 2);

            $data = [
                'id' => $ligne['id'],
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
        $devis->projet_id = $projet->id;
        //$devis->dev_status = 'en attente';
        $devis->save();

        return redirect()->route('devis.index')->with('reussi', 'Les devis ont été créés avec succès!');
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
            'reussi' => session('reussi'),
            'info' => session('info'),
            'devis' => $devis,
        ]);
    }

    public function form()
    {
        return Inertia::render('Devis/FormulaireInsertion', [
            'auth' => [
                'user' => auth()->user()
            ],
            'reussi' => session('reussi'),
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
            'reussi' => session('reussi'),
            'echec' => session('echec'),
        ]);
    }

    public function update(Request $request)
    {

        $lignesDevisArray = $request->input('LignesDevis');

        $messagesError = [
            'required' => 'Ce champ ne peut pas être vide.',
            '*.quantite.min' => 'La quantité doit être au minimum 1',
        ];

        $validator = Validator::make($lignesDevisArray, [
            '*.designation' => 'required|string',
            '*.quantite' => 'required|numeric|min:1',

        ], $messagesError);

        if ($validator->fails()) {
            return redirect()->back()
                ->with('echec', 'Echec de la mise à jour, veuillez remplir tous vos champs')
                ->withErrors($validator)
                ->withInput();
        }

        $devis = Devis::findOrFail($request->id);
        $originalJsonData = $devis->dev_liste_prestation;
        $originalStatut = $devis->dev_status;

        $jsonData = json_encode($request->input('LignesDevis'));
        $etat = $request->input('statutData');

        // Affecter les nouvelles valeurs
        $devis->dev_liste_prestation = $jsonData;
        $devis->dev_status = $etat;

        // Vérifier si des modifications ont été apportées
        if ($devis->isDirty()) {
            // Sauvegarder si des modifications ont été détectées
            $devis->save();

            // Rediriger avec un message de succès
            return redirect()->route('devis.index')->with('reussi', 'La mise à jour du devis a bien été effectuée.');
        } else {
            // Rediriger sans sauvegarder si rien n'a changé
            return redirect()->route('devis.index')->with('info', 'Aucune modification n\'a été detectée.');
        }
    }

    public function destroy(Devis $devis)
    {
        $devis->delete();

        return redirect()->route('devis.index');
    }
}
