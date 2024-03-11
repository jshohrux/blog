<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conver;
use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
        $mess = Room::create([
            'sender_id' => $request->get('userId'),
            'getter_id' => $conversation->clent_id,
            'conver_id' => $request->get('param'),
            'message' => $request->get('message'),
        ]);
        // return $mess;
    }
}
