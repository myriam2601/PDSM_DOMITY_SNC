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
        Schema::create('parametre', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('par_nom_societe');
            $table->string('par_adresse');
            $table->string('par_npa');
            $table->string('par_email');
            $table->string('par_telephone');
            $table->string('par_site_web');
            $table->string('par_logo')->nullable();
            $table->boolean('par_accord')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parametre');
    }
};
