<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devis extends Model
{
    use HasFactory;

    protected $fillable = [
        // Ajoutez tous les attributs fillable que vous avez
        'projet_id',
        // autres attributs...
    ];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
