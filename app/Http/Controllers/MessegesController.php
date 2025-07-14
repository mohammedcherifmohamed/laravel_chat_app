<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MessegesModel;
class MessegesController extends Controller
{
    public function storeMessage(Request $req){
        // dd($req->all());
        $req->validate([
            "message_content" => "required|max:255|min:1",
        ]);

        $message = new MessegesModel();
        $message->sender_id = auth()->user()->id ;
        $message->receiver_id = $req->receiver_id ;
        $message->content = $req->message_content ;
        $message->save();

        return response()->json(['status' => true , "message" => $message] , 201);
        
        // dd($message);

    }

    public function getMessages($receiver_id){
        $messages = MessegesModel::where(function($query) use ($receiver_id) {
            $query->where('sender_id', auth()->user()->id)
                  ->where('receiver_id', $receiver_id);
        })->orWhere(function($query) use ($receiver_id) {
            $query->where('sender_id', $receiver_id)
                  ->where('receiver_id', auth()->user()->id);
        })->get();

        return response()->json(['messages' => $messages]);

    }
}
