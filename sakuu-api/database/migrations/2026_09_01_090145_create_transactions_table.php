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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained('wallets');
            $table->enum('type', ['TOPUP','TRANSFER']);
            $table->enum('direction', ['IN','OUT']);
            $table->decimal('amount',15,2);
            $table->foreignId('related_wallet_id')->nullable()->constrained('wallets');
            $table->enum('status', ['SUCCESS','FAILED']);
            $table->string('description',255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
