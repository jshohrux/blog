<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $table = 'rooms';
    protected $primaryKey = 'id';

    protected $fillable = ['sender_id', 'getter_id', 'conver_id', 'message'];

    public function conver()
    {
        return $this->belongsTo(Conver::class);
    }
    public function senderUser()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function getterUser()
    {
        return $this->belongsTo(User::class, 'getter_id');
    }
}
