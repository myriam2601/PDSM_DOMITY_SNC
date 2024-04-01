<?php

namespace App\Http\Controllers\Parametre;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\Controller;
use App\Models\Parametre;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParamController extends Controller
{
    public function create()
    {
        $user = auth()->user();

        // Vérifiez si l'utilisateur a déjà un paramètre
        if ($user->parametre()->exists()) {
            return redirect()->route('parametres.edit', $user->parametre->id)->with([
                'message' => 'Vous avez déjà configuré vos paramètres. Vous pouvez les modifier ici.'
            ]);
        }
        return Inertia::render('Param/AddParams');
    }

    public function store(Request $request): RedirectResponse
    {

        $validated = $request->validate([
            'par_nom_societe' => 'required|string|max:255',
            'par_adresse' => 'required|string|max:255',
            'par_npa' => 'required|string|max:10',
            'par_localite' => 'required|string|max:255',
            'par_email' => 'required|email|max:255',
            'par_telephone' => 'required|string|max:255',
            'par_site_web' => 'nullable|string|max:255',
            'par_logo' => 'nullable|image|max:1024',
            'par_accord' => 'required|boolean',
        ]);

        // Traiter le téléchargement du logo s'il est présent dans la requête
        if ($request->hasFile('par_logo')) {
            $path = $request->file('par_logo')->store('logos', 'public');
        }

        // Créer un nouveau Parametre avec les données fournies
        $param = new Parametre([
            'user_id' => $request->user()->id,
            'par_nom_societe' => $validated['par_nom_societe'],
            'par_adresse' => $validated['par_adresse'],
            'par_npa' => $validated['par_npa'],
            'par_localite' => $validated['par_localite'],
            'par_email' => $validated['par_email'],
            'par_telephone' => $validated['par_telephone'],
            'par_site_web' => $validated['par_site_web'],
            'par_logo' => $validated['par_logo'],
            'par_accord' => $validated['par_accord'] ?? false,
        ]);
        $param->save();

        return redirect()->route('dashboard')->with([
            'success' => 'Paramétrage créé avec succès'
        ]);

    }

    public function edit(Parametre $parametre)
    {
        return Inertia::render('Param/Edit', [
            'parametre' => $parametre
        ]);
    }

    public function update(Request $request, Parametre $parametre): RedirectResponse
    {
        $validated = $request->validate([
            'par_nom_societe' => 'required|string|max:255',
            'par_adresse' => 'required|string|max:255',
            'par_npa' => 'required|string|max:255',
            'par_localite' => 'required|string|max:255',
            'par_email' => 'required|email|max:255',
            'par_telephone' => 'required|string|max:255',
            'par_site_web' => 'nullable|string|max:255',
            'par_logo' => 'nullable|image|max:30000', // Le logo peut être nullable
            'par_accord' => 'required|boolean',
        ]);

        try {
            if ($request->hasFile('par_logo')) {
                $path = $request->file('par_logo')->store('logos', 'public');
                $validated['par_logo'] = $path;
            }
            $param = Parametre::find($parametre->id);
            if (!$param) {
                throw new \Exception('Paramètre introuvable.');
            }
            $param->update($validated);
            return redirect()->route('dashboard')->with([
                'success' => 'Paramètre mis à jour avec succès.'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Capturer et rediriger les erreurs de validation
            return redirect()->route('parametres.edit', $parametre->id)->withErrors($e->validator->errors())->withInput();
        } catch (\Exception $e) {
            // Capturer et gérer toutes les autres erreurs
            Log::error($e->getMessage());
            return redirect()->route('parametres.edit', $parametre->id)->with([
                'error' => 'Une erreur s\'est produite lors de la mise à jour des paramètres.'
            ]);
        }
    }

}

