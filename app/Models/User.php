<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function conversation()
    {
        if ($this->role->name === 'Saler') {
            return $this->hasMany(Conver::class,'seller_id')->with('conversationClent');
        }elseif($this->role->name === 'Client') {
            return $this->hasMany(Conver::class, 'clent_id')->with('conversationClent');
        }
    }


    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class,'role_id');
    }

    public function isAdmin()
    {
        if($this->role?->name=='Admin'){
            return true;
        }
        return false;
    }

    public function isSaler()
    {
        if($this->role?->name=='Saler'){
            return true;
        }
        return false;
    }

    public function isClient()
    {
        if($this->role?->name=='Client'){
            return true;
        }
        return false;
    }
}
