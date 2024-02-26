<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $table = 'client'; // Specify the correct table name

    protected $fillable = [
        'cli_nom', 'cli_prenom', 'cli_email', 'cli_telephone', 'cli_societe', 'cli_adresse', 'cli_cli_npa',
    ];

    public function projets()
    {
        return $this->hasMany(Projet::class, 'client_id');
    }

}
