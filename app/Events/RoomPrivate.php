<?php

namespace App\Events;

use App\Models\User;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RoomPrivate implements ShouldBroadcast
{
    use Dispatchable, SerializesModels, InteractsWithSockets;

    /**
     * Create a new event instance.
     */
    public $user;
    public $mess;
    // public function __construct($user)
    // {
    //     $this->user = $user;
    // }
    public function __construct($user,$mess)
    {
        $this->user = $user;
        $this->mess = $mess;
    }

    public function broadcastWith(){
        return ['mess' => $this->mess];
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('channel.'.$this->user->id);
    }
}
