<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conver extends Model
{
    use HasFactory;
    protected $table = 'conversation';
    protected $primaryKey = 'id';

    protected $fillable = ['room_name','seller_id', 'clent_id'];
}
