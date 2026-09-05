import { History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TransactionItem from "../molecules/TransactionItem";

function TransactionList({ transactions = [] }) {
  const navigate = useNavigate();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-lg">Transaksi Terakhir</h2>

          <p className="text-xs text-gray-400 mt-1">Aktivitas transaksi terbaru</p>
        </div>

        <button onClick={() => navigate("/transactions")} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
          Lihat Semua
        </button>
      </div>

      {recentTransactions.length === 0 ? (
        <div className="py-10 text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
            <History size={22} />
          </div>

          <p className="text-sm font-medium text-gray-600 mt-3">Belum ada transaksi</p>

          <p className="text-xs text-gray-400 mt-1">Transaksi kamu akan muncul di sini.</p>
        </div>
      ) : (
        <div className="space-y-1">
          {recentTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
