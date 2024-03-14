<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    public function users(Request $request)
    {
        if(Auth::user()->isAdmin()){
            $users = User::all();
            return UserResource::collection(
                $users
            );
        }
        return response()->json([
            'message'=>"Forbidden",
        ],403);
    }

    public function roles(Request $request)
    {
        $roles = Role::where('name','<>','Admin')->get();
        return RoleResource::collection(
            $roles
        );
    }
}
