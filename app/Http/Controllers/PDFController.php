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
        $devisEntries = Devis::findOrFail($id);
           
        $data = $devisEntries->dev_liste_prestation;
        
        // Passer directement le tableau PHP à Inertia; il le convertira en JSON pour vous
        return Inertia::render('PDFTest_react', ['data' => $data]);
    }
}
