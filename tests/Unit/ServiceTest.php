<?php

namespace Tests\Unit;

use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
//use PHPUnit\Framework\TestCase;
use Tests\TestCase;


/**voir si un service existe, update et delete
 * voir si un service est bien lié à un projet
 */
class ServiceTest extends TestCase
{

    use RefreshDatabase; // vide la base de données avant chaque test

    /** @test */
    public function insertion_service_dans_bdd()
    {
        $serviceData = [
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ];

        //Création
        Service::create($serviceData);

        // Assert: Vérifie que l'action a eu l'effet attendu
        $this->assertDatabaseHas('service', $serviceData);
    }


    /** @test */
    public function maj_service_dans_bdd()
    {
        $service = Service::create([
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ]);

        $service->update([
            'ser_nom' => 'Mettre à jour le nom du Service'
        ]);

        //$this = instance acutelle
        $this->assertDatabaseHas('service', [
            'id'=>$service->id,
            'ser_nom'=>'Mettre à jour le nom du Service',
        ]);
    }

    /** @test */
    public function supprimer_service_dans_bdd()
    {
        $service = Service::create([
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ]);

        $id = $service->id;
        Service::destroy($id);

        $this->assertDatabaseMissing('service', ['id' => $id]);
    }



    /** @test */
    public function get_service()
    {
        $service = Service::create([
            'ser_categorie' => 'Consultation',
            'ser_nom' => 'Consulting IT',
            'ser_modalite' => 'à distance',
            'ser_conditions_reglements' => '30 jours fin de mois'
        ]);

        $getService = Service::find($service->id);

        $this->assertNotNull($getService);
        $this->assertEquals($service->id, $getService->id);

    }

}
