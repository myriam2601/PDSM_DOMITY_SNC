<?php

namespace Tests\Unit;

use App\Models\Client;
use App\Models\Projet;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class ProjetTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    public function insertion_projet_dans_bdd()
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
            'ser_categorie' => 'PRG',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ]);

        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $projetData = [
            'user_id' => $user->id,
            'nom' => 'Nouveau projet client',
            'client_id' => $client->id,
            'service_id' => $service->id,
            'debut' => now()->toDateString(),
            'deadline' => now()->addMonth()->toDateString(),
            'description' => 'Description du nouveau projet'
        ];

        Projet::create($projetData);

        $this->assertDatabaseHas('projet', $projetData);
    }

    /** @test */
    public function maj_projet_dans_bdd()
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
            'ser_categorie' => 'PRG',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ]);

        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $projet = Projet::create([
            'user_id' => $user->id,
            'nom' => 'Nouveau projet client',
            'client_id' => $client->id,
            'service_id' => $service->id,
            'debut' => now()->toDateString(),
            'deadline' => now()->addMonth()->toDateString(),
            'description' => 'Description du nouveau projet'
        ]);

        $projet->update([
            'description' => 'Description du nouveau projet qui a été mis à jour'
        ]);

        $this->assertDatabaseHas('projet', [
           'id' => $projet->id,
           'description' =>  'Description du nouveau projet qui a été mis à jour'
        ]);
    }

    /** @test */
    public function supprimer_projet_dans_bdd()
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
            'ser_categorie' => 'PRG',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ]);

        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $projet = Projet::create([
            'user_id' => $user->id,
            'nom' => 'Nouveau projet client',
            'client_id' => $client->id,
            'service_id' => $service->id,
            'debut' => now()->toDateString(),
            'deadline' => now()->addMonth()->toDateString(),
            'description' => 'Description du nouveau projet'
        ]);

        $id = $projet->id;
        Projet::destroy($id);

        $this->assertSoftDeleted('projet', ['id' => $id]);
    }

    /** @test */
    public function get_projets_avec_client()
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
            'ser_categorie' => 'PRG',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ]);

        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $projet = Projet::create([
            'user_id' => $user->id,
            'nom' => 'Nouveau projet client',
            'client_id' => $client->id,
            'service_id' => $service->id,
            'debut' => now()->toDateString(),
            'deadline' => now()->addMonth()->toDateString(),
            'description' => 'Description du nouveau projet'
        ]);

        //query pour récupérer les projets du client et le service associés
        $projetsAvecClient = Projet::with(['client', 'service'])->find($projet->id);

        //différents tests pour vérifier si projet, client et service existe
        $this->assertNotNull($projetsAvecClient);
        $this->assertNotNull($projetsAvecClient->client);
        $this->assertEquals('Montana', $projetsAvecClient->client->cli_nom);
        $this->assertNotNull($projetsAvecClient->service);
        $this->assertEquals('Consulting IT', $projetsAvecClient->service->ser_nom);

    }

}
