<?php
//Cette migration crée une table "projets" avec les colonnes suivantes : "id" (clé primaire), "user_id" (clé étrangère liée à la table des utilisateurs avec suppression en cascade),
// "nom", "debut", "deadline", "description", et les horodatages "created_at" et "updated_at". La colonne "client_id" est commentée mais peut être décommentée si nécessaire,
// et elle est également liée à une table de clients avec suppression en cascade.
// La méthode "down" permet de supprimer la table "projets" si la migration est annulée.

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projet', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('nom');
            $table->foreignId('client_id')->constrained('client')->cascadeOnDelete(); // Assurez-vous que cela correspond à votre structure de base de données
            $table->date('debut');
            $table->date('deadline');
            $table->text('description');
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projet');
    }
};