@extends('layouts.app')
@section('nav')
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                
                <div class="flex-shrink-0 text-2xl font-bold text-indigo-600">
                    Chat App
                </div>

                <!-- Navigation -->
                <div class="flex space-x-4 items-center">
                    @if(isset($user))
                        <span class="text-gray-700">Welcome, <strong>{{ $user->name }}</strong></span>
                        <a href="{{ route('logout') }}" 
                           class="text-red-500 hover:text-red-700 font-semibold transition duration-300">
                            Logout
                        </a>
                    @else
                        <a href="{{ route('login') }}" 
                           class="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
                            Login
                        </a>
                        <a href="{{ route('register') }}" 
                           class="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition duration-300">
                            Register
                        </a>
                    @endif
                </div>

            </div>
        </div>
    </nav>
@endsection

@section('content')
    <div class="max-w-3xl mx-auto mt-10 text-center">
        <h1 class="text-3xl font-bold">Welcome to the Chat App 👋</h1>
        <p class="text-gray-600 mt-2">Start chatting in real-time!</p>
    </div>
@endsection

