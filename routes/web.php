<?php

use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\Service\ServiceController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\ProfileController;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route pour afficher un projet
Route::get('/projets/{projet}', [ProjetController::class, 'show'])->name('projets.show');

Route::get('/projets/{projet}/edit', [ProjetController::class, 'edit'])->name('projets.edit')->middleware(['auth', 'verified']);

Route::patch('/projets/{projet}', [ProjetController::class, 'update'])->name('projets.update');

Route::delete('/projets/{projet}', [ProjetController::class, 'destroy'])->name('projets.destroy')->middleware(['auth', 'verified']);


// Route du tableau de bord
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route pour afficher le formulaire d'ajout d'un projet
Route::get('/add-project', [ProjetController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('projets.create');

// Routes pour les opérations CRUD sur les projets
Route::resource('projets', ProjetController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

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



// Importation des routes d'authentification générées automatiquement
require __DIR__.'/auth.php';
