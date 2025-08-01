<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MessegesModel extends Model
{
    protected $table = 'messeges';
       protected $fillable = [
        'sender_id',
        'receiver_id',
        'content',
    ];


    public function sender(){
        return $this->belongsTo(User::class , 'sender_id');
    }
    
    public function receiver(){
        return $this->belongsTo(User::class , 'receiver_id');
    }




}
