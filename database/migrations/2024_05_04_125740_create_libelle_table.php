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
        Schema::create('libelle', function (Blueprint $table) {
            $table->id();
            $table->string('lib_designation');
            $table->string('lib_code')->unique();
            $table->string('lib_montant');
            $table->boolean('lib_ajustement')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('libelle');
    }
};
