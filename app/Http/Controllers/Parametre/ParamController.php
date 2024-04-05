<?php

namespace App\Http\Controllers\Parametre;
use App\Http\Controllers\Concerns\RedirectIfParamExists;
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
            // Stocker le chemin du fichier téléchargé
            $path = $request->file('par_logo')->store('logos', 'public');
            // Ajouter le chemin du logo aux données validées
            $validated['par_logo'] = $path;
        }

        // Créer un nouveau Parametre avec les données fournies
        $param = new Parametre($validated);
        $param->user_id = $request->user()->id;
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
            'par_logo' => 'nullable|image|max:1024',// Le logo peut être nullable
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

    protected function createParametreView()
    {
        // TODO: Implement createParametreView() method.
    }
}

