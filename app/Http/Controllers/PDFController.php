<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Devis;

use Dompdf\Dompdf;

class PDFController extends Controller
{
    //
    public function generatePDF($id)
    {
        // Supposons que 'dev_liste_prestation' contient une chaîne JSON représentant un tableau
        $devisEntries = Devis::with('projet.client')->findOrFail($id);
        //$devis = Devis::with('projet.client')->findOrFail($id);
        $dev_liste_prestation = $devisEntries->dev_liste_prestation;
        $client = $devisEntries->projet->client;
        //dd($client);
        // Passer directement le tableau PHP à Inertia; il le convertira en JSON pour vous
        return Inertia::render('PDF/PDFDisplay', [
            'dev_liste_prestation' => $dev_liste_prestation,
            'client' => $client
        ]);
    }
}
