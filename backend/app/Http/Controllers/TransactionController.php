<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Resources\TransactionCollection;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = QueryBuilder::for(Transaction::class)
            ->allowedFilters('txHash', 'fromAddress', 'toAddress', 'amount')
            ->defaultSort('-created_at')
            ->allowedSorts(['created_at'])
            ->paginate();

        return new TransactionCollection($transactions);
    }

    public function show(Request $request, Transaction $transaction)
    {
        return new TransactionResource($transaction);
    }

    public function store(StoreTransactionRequest $request)
    {
        $validated = $request->validated();
        $transaction = Auth::user()->transactions()->create($validated);
        return new TransactionResource($transaction);
    }
}
