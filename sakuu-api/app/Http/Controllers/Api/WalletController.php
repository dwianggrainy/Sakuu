<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\TopUpRequest;
use App\Http\Requests\TransferRequest;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class WalletController extends Controller
{
    public function balance(Request $request)
    {
        $user = $request->user();
        $wallet = $user->wallet;

        return response()->json([
            'success' => true,
            'wallet' => $wallet,
        ],200);

    }

    public function topUp(TopUpRequest $request)
    {
        $user = $request->user();
        $wallet = $user->wallet;
        $validated = $request->validated();

        // Check PIN
        if (
            !$user->transaction_pin ||
            !Hash::check($validated['pin'], $user->transaction_pin)
        ) {
        return response()->json([
            'success' => false,
            'message' => 'PIN transaksi salah'
        ], 422);
        }

        DB::transaction(function () use ($wallet, $validated) {

            $wallet->balance = $wallet->balance + $validated['amount'];
            $wallet->save();

        Transaction::create([
            'wallet_id' => $wallet->id,
            'type' => 'TOPUP',
            'direction' => 'IN',
            'amount' => $validated['amount'],
            'related_wallet_id' => null,
            'status' => 'SUCCESS',
            'description' => 'Top up',
        ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Top Up berhasil',
            'wallet' => $wallet,
        ]);
    }

    public function transfer(TransferRequest $request)
    {
        $validated = $request->validated();

        // sender
        $user = $request->user();
        $wallet = $user->wallet;

        // check PIN
        if (
            !$user->transaction_pin ||
            !Hash::check($validated['pin'], $user->transaction_pin)
        ) {
        return response()->json([
            'success' => false,
            'message' => 'PIN transaksi salah'
        ], 422);
        }

        // receiver berdasarkan email atau nomor HP
        $receiver = User::where('email', $validated['recipient'])
            ->orWhere('phone', $validated['recipient'])
            ->first();

        // check receiver
        if (!$receiver) {
        return response()->json([
            'success' => false,
            'message' => 'Email atau nomor HP penerima tidak ditemukan'
        ], 422);
        }

        // check self transfer
        if ($receiver->id === $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak dapat melakukan transfer ke akun sendiri'
            ], 422);
        }

        $receiverWallet = $receiver->wallet;

        // check balance
        if ($wallet->balance < $validated['amount']) {
            return response()->json([
                'success' => false,
                'message' => 'Saldo tidak mencukupi'
            ], 422);
        }

        DB::transaction(function () use (
            $wallet,
            $receiverWallet,
            $validated,
            $receiver,
            $user
        ) {
            // update balance
        $wallet->balance = $wallet->balance - $validated['amount'];
        $receiverWallet->balance = $receiverWallet->balance + $validated['amount'];

        $wallet->save();
        $receiverWallet->save();

        // transaction sender
        Transaction::create([
            'wallet_id' => $wallet->id,
            'type' => 'TRANSFER',
            'direction' => 'OUT',
            'amount' => $validated['amount'],
            'related_wallet_id' => $receiverWallet->id,
            'status' => 'SUCCESS',
            'description' => 'Transfer ke ' . $receiver->username,
        ]);

        // transaction receiver
        Transaction::create([
            'wallet_id' => $receiverWallet->id,
            'type' => 'TRANSFER',
            'direction' => 'IN',
            'amount' => $validated['amount'],
            'related_wallet_id' => $wallet->id,
            'status' => 'SUCCESS',
            'description' => 'Transfer dari ' . $user->username,
        ]);
    });

    return response()->json([
        'success' => true,
        'message' => 'Transfer berhasil',
        'wallet' => $wallet,
        'receiver_wallet' => $receiverWallet,
    ]);
    }
}
