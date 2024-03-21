<?php

namespace App\Http\Controllers;
use App\Models\Devis;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DevisController extends Controller
{
    public function store(Request $request)
    {
        $lignesDevis = $request->input('lignesDevis');
        $projectId = $request->input('projectId');
        
        $jsonDataArray = []; 
        
        foreach ($lignesDevis as $ligne) {
            
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
        $devis = Devis::all();
        return Inertia::render('Devis/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'devis' => $devis,
        ]);
    }

    public function form(){
        return Inertia::render('Devis/FormulaireInsertion', [
            'auth' => [
                'user' => auth()->user()
            ],
            'success'=>session('success'),
            'projectId' => session('projectId')
        ]);        
    }
}