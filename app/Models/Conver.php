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
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function conversationClent()
    {
        return $this->belongsTo(User::class,'clent_id');
    }
    public function conversationSeller()
    {
        return $this->belongsTo(User::class,'seller_id');
    }
    public function room()
    {
        return $this->hasMany(Room::class)->with('senderUser','getterUser');
    }
}
