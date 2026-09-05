import { Eye, EyeOff, Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BalanceCard({ balance = 0 }) {
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  const formattedBalance = Number(balance).toLocaleString("id-ID");

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-3xl p-6 sm:p-7 min-h-55">
      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute right-20 -bottom-16 w-36 h-36 bg-purple-300/10 rounded-full" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3">
          <p className="text-sm text-white/80">Saldo Anda</p>

          <button onClick={() => setShowBalance(!showBalance)} className="text-white/80 hover:text-white">
            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mt-3 tracking-tight">{showBalance ? `Rp ${formattedBalance}` : "Rp •••••••"}</h2>

        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 px-3 py-1.5 rounded-lg text-xs">
            <ShieldCheck size={14} />
            Saldo Aman
          </span>
        </div>

        <button onClick={() => navigate("/topup")} className="mt-6 w-fit flex items-center gap-2 bg-white text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition">
          Top Up Sekarang
          <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
            <Plus size={15} />
          </span>
        </button>
      </div>
    </div>
  );
}

export default BalanceCard;
