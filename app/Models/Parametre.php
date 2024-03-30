<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Parametre extends Model
{
    use HasFactory;

    protected $table = 'parametre';

    // Spécifiez les colonnes que vous souhaitez remplir massivement
    protected $fillable = ['user_id','par_nom_societe', 'par_adresse', 'par_npa','par_localite', 'par_email', 'par_telephone', 'par_site_web', 'par_logo', 'par_accord'];

    // Définir la relation avec l'utilisateur
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
