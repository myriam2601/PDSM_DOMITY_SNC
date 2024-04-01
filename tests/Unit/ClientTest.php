<?php

namespace Tests\Unit;


use App\Models\Client;
use App\Models\Service;
use App\Models\User;
use App\Models\Projet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientTest extends TestCase
{

    use RefreshDatabase; // vide la base de données avant chaque test

    /** @test */
    public function insertion_client_dans_bdd()
    {
        $clientData = [
            'cli_nom' => 'Montana',
            'cli_prenom' => 'Antonio',
            'cli_email' => 'montana@email.com',
            'cli_telephone' => '1234567890',
            'cli_societe' => 'Scarface SA',
            'cli_adresse' => 'Route de la Havane',
            'cli_cli_npa' => '1200',
        ];

        //Création
        Client::create($clientData);

        $this->assertDatabaseHas('client', $clientData);
    }

    /** @test */
    public function maj_client_dans_bdd()
    {
        $client = Client::create([
            'cli_nom' => 'Montana',
            'cli_prenom' => 'Antonio',
            'cli_email' => 'montana@email.com',
            'cli_telephone' => '1234567890',
            'cli_societe' => 'Scarface SA',
            'cli_adresse' => 'Route de la Havane',
            'cli_cli_npa' => '1200',
        ]);

        $client->update([
            'cli_adresse' => 'Nouvelle adresse',
            'cli_cli_npa' => '1222',
        ]);

        $this->assertDatabaseHas('client', [
            'id'=>$client->id,
            'cli_adresse' => 'Nouvelle adresse',
            'cli_cli_npa' => '1222',
        ]);
    }


    /** @test */
    public function supprimer_client_dans_bdd()
    {
        $client = Client::create([
            'cli_nom' => 'Montana',
            'cli_prenom' => 'Antonio',
            'cli_email' => 'montana@email.com',
            'cli_telephone' => '1234567890',
            'cli_societe' => 'Scarface SA',
            'cli_adresse' => 'Route de la Havane',
            'cli_cli_npa' => '1200',
        ]);

        $id = $client->id;
        Client::destroy($id);

        //SoftDeleted => pour ne pas complètement la retirée de la bdd, elle aura une nouvelle valeur de timestamp deleted_at
        $this->assertSoftDeleted('client', ['id' => $id]);
    }

    /** @test */
    public function get_client()
    {
        $client = Client::create([
            'cli_nom' => 'Montana',
            'cli_prenom' => 'Antonio',
            'cli_email' => 'montana@email.com',
            'cli_telephone' => '1234567890',
            'cli_societe' => 'Scarface SA',
            'cli_adresse' => 'Route de la Havane',
            'cli_cli_npa' => '1200',
        ]);

        $getClient = Client::find($client->id);

        $this->assertNotNull($getClient);
        $this->assertEquals($client->id, $getClient->id);
    }


    /** @test */
    public function  get_client_avec_projets()
    {
        $client = Client::create([
            'cli_nom' => 'Montana',
            'cli_prenom' => 'Antonio',
            'cli_email' => 'montana@email.com',
            'cli_telephone' => '1234567890',
            'cli_societe' => 'Scarface SA',
            'cli_adresse' => 'Route de la Havane',
            'cli_cli_npa' => '1200',
        ]);

        $service = Service::create([
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ]);


        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);


        Projet::create([
            'user_id' => $user->id,
            'nom' => 'Nouveau projet client',
            'client_id' => $client->id,
            'service_id' => $service->id,
            'debut' => now()->toDateString(),
            'deadline' => now()->addMonth()->toDateString(),
            'description' => 'Description du nouveau projet'
        ]);

        Projet::create([
            'user_id' => $user->id,
            'nom' => 'Deuxième projet client',
            'client_id' => $client->id,
            'service_id' => $service->id,
            'debut' => now()->toDateString(),
            'deadline' => now()->addMonth()->toDateString(),
            'description' => 'Description du deuxième projet'
        ]);


        //query pour récupérer client spécifique avec l'id dans la bdd et with(projets) = on veut recupérer le client avec les projets qui lui sont liés
        $clientAvecSesProjets = Client::with('projets')->find($client->id);

        $this->assertEquals(2, $clientAvecSesProjets->projets->count());
        //On recup les projets du client et on verifie chaque nom du projet
        $this->assertEquals('Nouveau projet client', $clientAvecSesProjets->projets->first()->nom);
        $this->assertEquals('Deuxième projet client', $clientAvecSesProjets->projets->get(1)->nom);
        //idem qu'en haut, mais on vérifie si l'id du projet est bien celui du service
        $this->assertEquals($clientAvecSesProjets->projets->first()->service_id, $service->id);
    }

}
