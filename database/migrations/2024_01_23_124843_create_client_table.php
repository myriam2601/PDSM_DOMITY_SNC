<?php

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
        Schema::create('client', function (Blueprint $table) {
            $table->id();
            $table->string('cli_nom');
            $table->string('cli_prenom');
            $table->string('cli_email')->unique();
            $table->integer('cli_telephone');
            $table->string('cli_societe');
            $table->string('cli_adresse');
            $table->integer('cli_npa');
            $table->timestamps(); // Cette ligne ajoute les colonnes 'updated_at' et 'created_at'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client');
    }
};
