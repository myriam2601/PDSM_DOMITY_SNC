<?php

namespace Tests\Feature;


use App\Models\User;
use App\Models\Client;
use App\Models\Projet;
use App\Models\Service;
//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ServiceFonctionnelTest extends TestCase
{

    /**
     * TODO: DANS LE DOSSIER FEATURE NOUS AURONS TOUS NOS TEST FONCTIONNELS, CAD REDIRECTION DES PAGES ETC
    */
    use RefreshDatabase; // vide la base de données avant chaque test


    /** @test */
    public function user_cree_service()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'), // Pour chiffrer le mot de passe
        ]);

        $this->actingAs($user);

        $serviceData =[
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois',
        ];

        $response = $this->post('/add-service', $serviceData);
        $response->assertRedirect('/services');
        $this->assertDatabaseHas('service', $serviceData);
    }

    /** @test */
    public function user_maj_service()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);

        $service = Service::create([
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois',
        ]);

        $id = $service->id;

        $updatedData = [
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Mettre à jour Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois',
        ];

        $response = $this->put("/services/{$id}", $updatedData);
        $response->assertRedirect('/services');
        $this->assertDatabaseHas('service', $updatedData);
    }


    //TODO : MARCHE AVEC PHPUNIT, MAIS PAS AVEC LA COMMANDE php artisan test --env=testing
    /** @test */
    public function user_supprime_service()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);

        $service = Service::create([
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois',
        ]);

        $id = $service->id;

        //$response = $this->delete("/services/{$id}");
        $response = $this->withMiddleware()->delete("/services/{$id}");
        //$response->assertRedirect('/services');
        $this->assertDatabaseMissing('service', ['id' => $id]);
    }


    /** @test */
    public function user_get_service()
    {
        $user = User::create([
            'name' => 'User Domity',
            'email' => 'user@domity.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);

        $service = Service::create([
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois',
        ]);

        $id = $service->id;

        $response = $this->get("/services/{$id}");
        $response->assertStatus(200);
    }

}
