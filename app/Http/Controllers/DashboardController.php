<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use function Laravel\Prompts\error;

class DashboardController extends Controller
{
    public function index()
    {
            $user = Auth::user();
            $parametreId = optional($user->parametre)->id;

            return Inertia::render('Dashboard', [
                'parametreId' => $parametreId,
            ]);
    }
}
