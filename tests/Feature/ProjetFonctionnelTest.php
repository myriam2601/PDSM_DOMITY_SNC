<?php


use App\Models\User;
use App\Models\Client;
use App\Models\Projet;
use App\Models\Service;
//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ProjetFonctionnelTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    public function user_creer_projet()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $this->actingAs($user);

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

        $projetData = [
            'user_id' => $user->id,
            'nom' => 'Nouveau projet client',
            'client_id' => $client->id,
            'service_id' => $service->id,
            'debut' => now()->toDateString(),
            'deadline' => now()->addMonth()->toDateString(),
            'description' => 'Description du nouveau projet'
        ];

        $response = $this->post('/projets', $projetData);
        $response->assertRedirect('/devis/form');
        $this->assertDatabaseHas('projet', $projetData);

    }


    /** @test */
    public function user_maj_projet()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $this->actingAs($user);

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

        $updatedData = [
            'user_id' => $user->id,
            'nom' => 'Nouveau projet client updated',
            'client_id' => $client->id,
            'service_id' => $service->id,
            'debut' => now()->toDateString(),
            'deadline' => now()->addMonth()->toDateString(),
            'description' => 'Description du nouveau projet updated'
        ];

        $response = $this->patch("/projets/{$id}", $updatedData);
        $response->assertRedirect("/projets/{$id}");
        $this->assertDatabaseHas('projet', $updatedData);

    }


    /** @test */
    public function user_supprime_projet()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $this->actingAs($user);

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

        $response = $this->delete("/projets/{$id}");
        $response->assertRedirect('/projets');
    }

}
