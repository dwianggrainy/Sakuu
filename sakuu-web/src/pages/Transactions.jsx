import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, History, LoaderCircle, Wallet, Send } from "lucide-react";

import apiClient from "../components/api/apiClient";
import TransactionItem from "../components/molecules/TransactionItem";
import Logo from "../components/atoms/Logo";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiClient.get("/transactions");

        setTransactions(response.data.transactions);
      } catch (error) {
        setError(error.response?.data?.message || "Gagal mengambil riwayat transaksi");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const topUps = transactions.filter((transaction) => transaction.type === "TOPUP");

  const transfers = transactions.filter((transaction) => transaction.type === "TRANSFER");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition">
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <Logo variant="mobile" />
        </div>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <History size={21} />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Riwayat Transaksi</h1>

              <p className="text-sm text-gray-400 mt-1">Semua aktivitas wallet kamu</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Wallet size={16} />

                <span className="text-xs">Top Up</span>
              </div>

              <p className="text-xl font-bold mt-2">{topUps.length}</p>

              <p className="text-xs text-gray-400 mt-1">transaksi</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Send size={16} />

                <span className="text-xs">Transfer</span>
              </div>

              <p className="text-xl font-bold mt-2">{transfers.length}</p>

              <p className="text-xs text-gray-400 mt-1">transaksi</p>
            </div>
          </div>
        )}

        {/* Transaction Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-lg">Semua Transaksi</h2>

              {!loading && <p className="text-xs text-gray-400 mt-1">{transactions.length} transaksi</p>}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center">
              <LoaderCircle size={28} className="text-blue-500 animate-spin" />

              <p className="text-sm text-gray-400 mt-3">Memuat transaksi...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-10 text-center">
              <p className="text-sm text-red-500">{error}</p>

              <button onClick={() => window.location.reload()} className="mt-3 text-sm font-medium text-blue-600">
                Coba lagi
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && transactions.length === 0 && (
            <div className="py-12 text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
                <History size={24} />
              </div>

              <p className="font-medium text-gray-600 mt-4">Belum ada transaksi</p>

              <p className="text-xs text-gray-400 mt-1">Transaksi kamu akan muncul di sini.</p>
            </div>
          )}

          {/* List */}
          {!loading && !error && transactions.length > 0 && (
            <div>
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
