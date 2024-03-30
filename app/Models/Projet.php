<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Projet extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'projet';

    protected $fillable = [
        'user_id','nom','client_id','service_id','debut', 'deadline', 'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
