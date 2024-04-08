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
        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->string('dev_nom')->nullable();
            $table->enum('dev_status', ['en attente', 'accepté', 'refusé'])->default('en attente');
            $table->dateTime('dev_date')->nullable();
            $table->dateTime('dev_fin_validite')->nullable();
            $table->json('dev_liste_prestation');
/* <<<<<<< HEAD */
            $table->foreignId('projet_id')->constrained('projet')->unique();
/* =======
            $table->unsignedBigInteger('projet_id'); // Assurez-vous que cette ligne existe.
            $table->foreign('projet_id')->references('id')->on('projet')->onDelete('cascade');
>>>>>>> ee085cf23c4b2297d5e608e3246d3e2883de59f4 */
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};
