import { Wallet, Send, History, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Top Up",
      description: "Tambah saldo",
      icon: Wallet,
      path: "/topup",
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      label: "Transfer",
      description: "Kirim saldo",
      icon: Send,
      path: "/transfer",
      iconStyle: "bg-purple-50 text-purple-600",
    },
    {
      label: "Riwayat",
      description: "Lihat transaksi",
      icon: History,
      path: "/transactions",
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Profil",
      description: "Akun kamu",
      icon: UserRound,
      path: "/profile",
      iconStyle: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 h-full">
      <div className="mb-5">
        <h2 className="font-bold text-lg">Quick Action</h2>
        <p className="text-xs text-gray-400 mt-1">Akses fitur favoritmu</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button key={action.label} onClick={() => navigate(action.path)} className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gray-50 transition">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition group-hover:scale-105 ${action.iconStyle}`}>
                <Icon size={21} />
              </div>

              <p className="text-sm font-semibold mt-2">{action.label}</p>

              <p className="text-[11px] text-gray-400 mt-0.5">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
