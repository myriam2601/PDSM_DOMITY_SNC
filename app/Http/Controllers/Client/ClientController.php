<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        return Inertia::render('Clients/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'clients' => $clients,
        ]);
    }

    public function getClients(){
        $clients = Client::all();
        return response()->json($clients);
    }

    public function create()
    {
        return Inertia::render('Clients/AddClient');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'cli_nom' => 'required|string|max:255',
            'cli_prenom' => 'required|string|max:255',
            'cli_email' => 'required|email|unique:clients,cli_email', // Adjust to your client table name and email field
            'cli_telephone' => 'required|integer',
            'cli_societe' => 'required|string',
            'cli_adresse' => 'required|string',
            'cli_cli_npa' => 'required|integer',
        ]);

        Client::create([
            'cli_nom' => $validated['cli_nom'],
            'cli_prenom' => $validated['cli_prenom'],
            'cli_email' => $validated['cli_email'],
            'cli_telephone' => $validated['cli_telephone'],
            'cli_societe' => $validated['cli_societe'],
            'cli_adresse' => $validated['cli_adresse'],
            'cli_cli_npa' => $validated['cli_cli_npa'],
        ]);

        return redirect()->route('clients.index'); // Adjust the route name accordingly
    }

    public function show(Client $client)
    {
        $clientWithProjets = $client->load('projets'); // Cela charge les projets associés au client

        return Inertia::render('Clients/Show', [
            'client' => $clientWithProjets,
        ]);
    }
    public function edit($id)
    {
        try {
            $client = (new Client)->getClientById($id);
            if ($client) {
                return Inertia::render('Clients/Edit', [
                    'client' => $client,
                ]);
            } else {
                return Redirect::route('clients.index')->with('error', 'Client non trouvé');
            }
        } catch (\Exception $e) {
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
       //
    }

    public function destroy($id)
    {
        //
    }
}
