<?php

use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\Parametre\ParamController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Service\ServiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Les routes web pour votre application. Ces routes sont chargées par le
| RouteServiceProvider dans un groupe qui contient le groupe de middleware "web".
|
*/

// Route d'accueil
Route::get('/', function () {
    return redirect()->route('login');
});

// Route du tableau de bord
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Routes pour les opérations sur le profil de l'utilisateur
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes pour le contrôleur ClientController
Route::get('/clients', [ClientController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('clients.index');

Route::get('/AllClients', [ClientController::class, 'getClients']);

Route::get('/add-client', [ClientController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('clients.create');

Route::post('/add-client', [ClientController::class, 'store'])
   ->middleware(['auth', 'verified'])
  ->name('clients.store');

// Routes pour les opérations CRUD sur les clients
Route::resource('client', ProjetController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::get('/clients/{client}', [ClientController::class, 'show'])
    ->name('clients.show');

Route::get('/clients/{client}/edit', [ClientController::class, 'edit'])
    ->middleware(['auth', 'verified'])
    ->name('clients.edit');

Route::patch('/clients/{client}', [ClientController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('clients.update');

Route::delete('/clients/{client}', [ClientController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('clients.destroy');




//Antonio
// Routes pour le contrôleur ServiceController
Route::get('/services', [ServiceController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('services.index');

Route::get('/AllServices', [ServiceController::class, 'getServices']);


Route::get('/add-service', [ServiceController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('services.create');



Route::post('/add-service', [ServiceController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('services.store');

// Routes pour les opérations CRUD sur les services
//Route::resource('service', ServiceController::class)
//    ->only(['index', 'store'])
//    ->middleware(['auth', 'verified']);

Route::get('/services/{service}', [ServiceController::class, 'edit'])
    ->name('services.edit');

Route::put('/services/{service}', [ServiceController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('services.update');

Route::delete('/services/{service}', [ServiceController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('services.destroy');


//David
Route::prefix('/devis')->name('devis.')->group(function(){
    Route::get('/', [DevisController::class, 'index'])->name('index');

    Route::get('/form', [DevisController::class, 'form'])->name('form');
    Route::post('/store', [DevisController::class, 'store'])->name('store'); // Assurez-vous d'ajouter également un nom à cette route si vous y faites référence quelque part.
    Route::get('/generer-pdf/{id}', [PDFController::class, 'generatePDF'])->name('generatePDF'); // Pensez à nommer toutes vos routes.
    Route::get('/edit/{id}',[DevisController::class, 'edit'])->name('edit');
    Route::patch('/update',[DevisController::class, 'update'])->name('update');
    Route::delete('/delete/{devis}', [DevisController::class, 'destroy'])->name('destroy');

});


Route::prefix('/projets')->name('projets.')->group(function(){
    Route::get('/{projet}', [ProjetController::class, 'show'])->name('show');
    Route::get('/{projet}/edit', [ProjetController::class, 'edit'])->name('edit')->middleware(['auth', 'verified']);
    Route::patch('/{projet}', [ProjetController::class, 'update'])->name('update');
    Route::delete('/{projet}', [ProjetController::class, 'destroy'])->name('destroy')->middleware(['auth', 'verified']);
});

Route::get('/add-project', [ProjetController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('projets.create');
// Route pour afficher un projet

// Route pour afficher le formulaire d'ajout d'un projet

// Routes pour les opérations CRUD sur les projets
Route::resource('projets', ProjetController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);



Route::get('/generate-pdf', 'PdfController@generatePDF')
    ->name('generate-pdf');
// Importation des routes d'authentification générées automatiquement
require __DIR__.'/auth.php';

// Groupe de routes nécessitant que l'utilisateur soit un administrateur
Route::middleware(['admin'])->group(function () {
    // Route pour afficher le formulaire de création d'un Paramètre
    Route::get('/parametres/create', [ParamController::class, 'create'])
        ->name('parametres.create');

    // Route pour soumettre un nouveau Paramètre
    Route::post('/parametres', [ParamController::class, 'store'])
        ->name('parametres.store');

    // Route pour afficher le formulaire de modification d'un Paramètre existant
    Route::get('/parametres/{parametre}/edit', [ParamController::class, 'edit'])
        ->name('parametres.edit');

    // Route pour mettre à jour un Paramètre existant
    Route::match(['post', 'put'], '/parametres/{parametre}', [ParamController::class, 'update'])
        ->name('parametres.update');
});

