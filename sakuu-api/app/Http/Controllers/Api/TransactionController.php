<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $wallet = $user->wallet;

        $transactions = Transaction::where('wallet_id', $wallet->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'transactions' => $transactions,
        ]);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();
        $wallet = $user->wallet;

        $transaction = Transaction::where('wallet_id', $wallet->id)
            ->find($id);

        if (!$transaction) {
        return response()->json([
            'success' => false,
            'message' => 'Transaksi tidak ditemukan'
        ], 404);
    }

        return response()->json([
            'success' => true,
            'transaction' => $transaction,
        ]);
    }
}
