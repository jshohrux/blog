<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conver;
use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Events\RoomPrivate;
use App\Events\PublicTest;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function index()
    {
        $conversation = Auth::user()->conversation;
        return $conversation;
    }
    public function showRoom(Request $request, $id)
    {
        $conversation = Conver::find($id)->room;
        return $conversation;
    }
    public function sendMessage(Request $request)
    {
        $conversation = Conver::find($request->get('param'));
        $user = User::find(1);
        // broadcast(new PublicTest($user));
        RoomPrivate::dispatch($user);
        $mess = Room::create([
            'sender_id' => $request->get('userId'),
            'getter_id' => $conversation->clent_id,
            'conver_id' => $request->get('param'),
            'message' => $request->get('message'),
        ]);

        return response()->json(['status' => true]);

    }
    public function test(){
        $user = User::find(1);
        // broadcast(new PublicTest($user));
        RoomPrivate::dispatch($user);
        PublicTest::dispatch();
        return "Event has been sent!";
    }

    public function newConversation(Request $request)
    {
        $client = $request->get('client_id');
        $seller = $request->get('seller_id');
        $conversation = Conver::where(['clent_id'=>$client,'seller_id'=>$seller])->first();
        if(!$conversation){
            $conversation = Conver::create(array(
                'room_name'=>Str::random(10).$client.$seller,
                'seller_id'=>$seller,
                'clent_id'=>$client,
            ));
        }

        return response()->json([
            'conversation_id'=>$conversation->id
        ]);

    }
}
