<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::get('/', function () {
    return view('nav');
});

Route::get('/login',[Authcontroller::class,"login"])->name('login');
Route::get('/register',[Authcontroller::class,"register"])->name('register');
Route::get('/logout',[Authcontroller::class,"logout"])->name('logout');



