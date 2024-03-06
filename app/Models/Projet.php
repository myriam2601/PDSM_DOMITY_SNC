<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Projet extends Model
{
    use HasFactory;

    protected $table = 'projet';

    protected $fillable = [
        'user_id', 'client_id','nom', 'debut', 'deadline', 'description',
        // Assurez-vous que 'client_id' n'est pas inclus ici tant que la table clients n'est pas en place
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
    // Vous pouvez ajouter la relation avec Client plus tard ici

}
