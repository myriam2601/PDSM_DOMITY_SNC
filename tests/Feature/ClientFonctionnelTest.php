<?php


use App\Models\User;
use App\Models\Client;
use App\Models\Projet;
use App\Models\Service;
//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ClientFonctionnelTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    public function user_creer_client()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $this->actingAs($user);

        $clientData = [
            'cli_nom' => 'Montana',
            'cli_prenom' => 'Antonio',
            'cli_email' => 'montana@email.com',
            'cli_telephone' => '1234567890',
            'cli_societe' => 'Scarface SA',
            'cli_adresse' => 'Route de la Havane',
            'cli_cli_npa' => '1200',
        ];

        $response = $this->post('/add-client', $clientData);

        $response->assertRedirect('/clients');
        $this->assertDatabaseHas('client', $clientData);
    }

    /** @test */
    public function user_maj_client()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'),
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

        $id = $client->id;

        $updatedData = [
            'cli_nom' => 'Montana updated',
            'cli_prenom' => 'Antonio updated',
            'cli_email' => 'montanaUpdated@email.com',
            'cli_telephone' => '1234567890',
            'cli_societe' => 'Scarface SA',
            'cli_adresse' => 'Route de la Havane Updated',
            'cli_cli_npa' => '1200',
        ];

        $response = $this->patch("/clients/{$id}", $updatedData);
        $this->assertDatabaseHas('client', $updatedData);
    }

    /** @test */
    public function user_supprime_client()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'),
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

        $id = $client->id;
        $response = $this->delete("/clients/{$id}");
        $response->assertRedirect('/clients');
        $this->assertSoftDeleted('client', ['id' => $id]);
    }

    /** @test */
    public function user_get_client()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'),
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

        $id = $client->id;
        $response = $this->get("/clients/{$id}");
        $response->assertStatus(200);
    }
}
