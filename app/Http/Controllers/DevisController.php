<?php

namespace App\Http\Controllers;

use App\Models\Devis;
use App\Models\Projet;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class DevisController extends Controller
{
    public function store(Request $request)
    {

        $existingDevis = Devis::where('projet_id', $request->input('projectId'))->first();

        if ($existingDevis) {
            $projetNom = Projet::find($existingDevis->projet_id)->nom; // Assurez-vous d'obtenir le nom directement ici

            // Gérer l'erreur, par exemple, en renvoyant un message d'erreur.
            return redirect()->route('devis.index')->withInput()->with('echec', 'Echec de l\'insertion, le projet ' . $projetNom . ' existe déjà.');
        }
        $lignesDevisArray = $request->input('libelles');
        // Ici, vous devez également récupérer les ajustements depuis la requête, si vous les envoyez depuis le front-end
        $ajustementsArray = $request->input('ajustements'); // Assurez-vous que le nom de l'input correspond à ce que vous avez dans le front-end
        $idProjet = $request->input('projectId');

        $projet = Projet::find($idProjet);
        $service = Service::find($projet->service_id);

        $devNom = 'Devis n°' . date('Y') . '-' . $service->ser_categorie;
        $devDate = now();
        $devFinValidite = now()->addMonth(); // Ajoute un mois à la date actuelle

        $messagesError = [
            'required' => 'Ce champ ne peut pas être vide.',
            '*.quantite.min' => 'La quantité doit être au minimum 1',
        ];

        $validator = Validator::make($lignesDevisArray, [
            '*.designation' => 'required|string',
            '*.quantite' => 'required|numeric|min:1',
        ], $messagesError);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput()->with('echec', 'Echec de l\'insertion, veuillez remplir tous les champs obligatoires');
        }
        $libelles = [];
        foreach ($lignesDevisArray as $ligne) {

            $quantite = (float) $ligne['quantite'];
            $prixUnitaire = (float) $ligne['prixUnitaire'];
            $tva = (float) $ligne['tva'];
            $prixHT = $quantite * $prixUnitaire;

            $prixTTC = round($prixHT + ($prixHT * ($tva / 100)), 2);

            $libelles[] = [
                'id' => $ligne['id'],

                'designation' => $ligne['designation'],
                'quantite' => $quantite,
                'prixUnitaire' => $prixUnitaire,
                'tva' => $tva,
                'prixHT' => $prixHT,
                'prixTTC' => $prixTTC,
            ];

        }

        // Construire la structure JSON finale
        $jsonData = json_encode([
            'libelles' => $libelles,
            'ajustements' => $ajustementsArray, // Assurez-vous que cette partie corresponde à la structure attendue
        ]);


        $devis = new Devis();
        $devis->dev_liste_prestation = $jsonData;
        $devis->dev_nom = $devNom;
        $devis->dev_date = $devDate;
        $devis->dev_fin_validite = $devFinValidite;

        $devis->projet_id = $projet->id;


        $devis->save();

        return redirect()->route('devis.index')->with('reussi', 'Le devis a été créé avec succès!');
    }

    /* Affiche tous les devis existants */
    public function index()
    {
        // Récupère tous les devis
        $devis = Devis::with('projet.client')->get();
        $parametreId = Auth::user()->parametre->id;



        return Inertia::render('Devis/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'reussi' => session('reussi'),
            'info' => session('info'),
            'echec'=> session('echec'),
            'devis' => $devis,
            'parametreId' => $parametreId,
        ]);
    }

    public function form()
    {

        return Inertia::render('Devis/Insertion', [
            'auth' => [
                'user' => auth()->user()
            ],
            'reussi' => session('reussi'),
            'echec' => session('echec'),
            'projectId' => session('projectId')
        ]);

    }

    public function edit($id)
    {
        $devis = Devis::find($id);

        return Inertia::render('Devis/Edit', [
            'auth' => [
                'user' => auth()->user()
            ],
            'devis' => $devis,
            'reussi' => session('reussi'),
            'echec' => session('echec'),
        ]);
    }

    public function update(Request $request)
    {

        $lignesDevisArray = $request->input('libelles');

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
                ->with('echec', 'Echec de la mise à jour, veuillez remplir tous les champs obligatoires')
                ->withErrors($validator)
                ->withInput();
        }

        $devis = Devis::findOrFail($request->id);

        $dataToUpdate = [
            'libelles' => $request->input('libelles', []), // Utilisez une valeur par défaut vide si non présent
            'ajustements' => $request->input('ajustements', []), // Utilisez null comme valeur par défaut si non présent
        ];

        $currentData = json_decode($devis->dev_liste_prestation, true);

        // Comparaison des tableaux PHP
        $isModified = $currentData !== $dataToUpdate;

        if ($isModified) {
            // Il y a eu des modifications
            $devis->dev_liste_prestation = json_encode($dataToUpdate);
            $devis->dev_status = $request->input('statutData');

            $devis->save();
            return redirect()->route('devis.index')->with('reussi', 'La mise à jour du devis a bien été effectuée.');
        } else {
            // Aucune modification détectée
            return redirect()->route('devis.index')->with('info', 'Aucune modification n\'a été detectée.');
        }
    }

    public function destroy(Devis $devis)
    {
        $devis->delete();

        return redirect()->route('devis.index');

    }
}
