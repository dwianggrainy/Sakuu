import { ArrowDownLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

function TransactionItem({ transaction }) {
  const isIncome = transaction.direction === "IN";

  const formattedDate = new Date(transaction.created_at).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-b-0">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center ${isIncome ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>{isIncome ? <ArrowDownLeft size={19} /> : <ArrowUpRight size={19} />}</div>

        <div className="min-w-0">
          <p className="font-semibold text-sm text-slate-800 truncate">{transaction.description || transaction.type}</p>

          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-gray-400">{formattedDate}</p>

            {transaction.status === "SUCCESS" && (
              <>
                <span className="text-gray-300">•</span>

                <span className="flex items-center gap-1 text-[11px] text-green-600">
                  <CheckCircle2 size={12} />
                  Berhasil
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Amount */}
      <p className={`font-bold text-sm whitespace-nowrap ${isIncome ? "text-green-600" : "text-red-500"}`}>
        {isIncome ? "+" : "-"} Rp {Number(transaction.amount).toLocaleString("id-ID")}
      </p>
    </div>
  );
}

export default TransactionItem;
