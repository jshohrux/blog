<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardPostController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RelatedPostController;
use App\Http\Controllers\ChatController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//////////////////////////////////////////////// PRIVATE ROUTES ////////////////////////////////////////////////
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('logout', [AuthenticatedSessionController::class, 'destroy']);





Route::group(['prefix'=>'v1/auth'], function (){
    Route::post('register',[AuthController::class, 'register']);
    Route::post('login',[AuthController::class, 'login']);
    Route::post('logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
});
Route::get('roles',[UserController::class, 'roles']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('me',[AuthController::class, 'user']);
    Route::get('posts/{post:slug}', [PostController::class, 'show']);
    Route::get('posts', [PostController::class, 'index']);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('home-posts', [HomeController::class, 'index']);
    Route::get('related-posts/{post:slug}', [RelatedPostController::class, 'index']);
    Route::get('dashboard-posts', [DashboardPostController::class, 'index']);

    // posts
    Route::post('posts', [PostController::class, 'store']);
    Route::put('posts/{post:slug}', [PostController::class, 'update']);
    Route::delete('posts/{post:slug}', [PostController::class, 'destroy']);

    // categories
    Route::post('categories/create', [CategoryController::class, 'store']);
    Route::get('categories/{category}', [CategoryController::class, 'show']);
    Route::put('categories/{category}', [CategoryController::class, 'update']);
    Route::delete('categories/{category}', [CategoryController::class, 'destroy']);
    Route::get('users',[UserController::class, 'users']);

    // chat
    Route::get('chatUserList',[ChatController::class, 'index']);
    Route::get('roomInformation/{id}',[ChatController::class, 'showRoom']);
    Route::post('send_message',[ChatController::class, 'sendMessage']);
});

