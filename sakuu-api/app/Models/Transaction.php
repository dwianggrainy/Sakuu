<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Wallet;

class Transaction extends Model
{
    protected $fillable = [
        'wallet_id',
        'type',
        'direction',
        'amount',
        'related_wallet_id',
        'status',
        'description',


    ];

    public function wallet(){
        return $this->belongsTo(Wallet::class);
    }

    public function relatedWallet(){
        return $this->belongsTo(Wallet::class, 'related_wallet_id');
    }
}
