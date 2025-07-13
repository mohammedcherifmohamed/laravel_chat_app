<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $req){
        return view('login');
    }
    public function register(Request $req){
        return view('register');
    }
    public function logout(Request $req){
        auth()->logout();
        return redirect('/');
    }
}
