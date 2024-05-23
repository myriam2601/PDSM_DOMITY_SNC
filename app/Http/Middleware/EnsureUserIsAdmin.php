<?php

namespace App\Http\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class EnsureUserIsAdmin extends Middleware
{
    public function handle(Request $request, Closure|\Closure $next)
    {
        if (!Auth::check() || !Auth::user()->isAdmin) {
            // Si l'utilisateur n'est pas connecté ou s'il n'est pas administrateur
            return redirect('home')->with('error', 'Access Denied');
        }
        return $next($request);
    }
}
