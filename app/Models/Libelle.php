<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libelle extends Model
{
    use HasFactory;
    protected $table = 'libelle';
    protected $fillable = ['lib_designation', 'lib_code', 'lib_montant', 'lib_ajustement'];
}
