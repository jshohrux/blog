<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });
// Broadcast::channel('public', function ($user) {
//     return true;
// });

Broadcast::channel('channel.1', function () {
    // return (int) $user->id === (int) $id;
    return true;
    // return true;

});
Broadcast::channel('public', function ($user) {
    return true;
});
