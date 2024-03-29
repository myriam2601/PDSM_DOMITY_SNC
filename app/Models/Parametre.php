<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parametre extends Model
{
    use HasFactory;
    protected $fillable=['par_nom_societe','par_adresse','par_npa','par_email','par_telephone','par_site_web','par_logo','par_accord',];
}
