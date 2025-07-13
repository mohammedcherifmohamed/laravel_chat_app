<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messeges', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sender_id');
            $table->bigInteger('receiver_id');
            $table->text('content')->nullable();
            $table->tinyInteger('seen')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messeges');
    }
};
