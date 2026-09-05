import { useState } from "react";
import { Bell, LayoutDashboard, Wallet, Send, History, LogOut, Menu, X, User, ArrowDownToLine, ArrowUpRight, Lightbulb } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useWallet from "../hooks/useWallet";
import Logo from "../components/atoms/Logo";
import BalanceCard from "../components/organisms/BalanceCard";
import QuickActions from "../components/organisms/QuickActions";
import TransactionList from "../components/organisms/TransactionList";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const { wallet, transactions, loading } = useWallet();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  const totalTopUp = transactions.filter((transaction) => transaction.type === "TOPUP" && transaction.direction === "IN" && transaction.status === "SUCCESS").reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalTransfer = transactions.filter((transaction) => transaction.type === "TRANSFER" && transaction.direction === "OUT" && transaction.status === "SUCCESS").reduce((total, transaction) => total + Number(transaction.amount), 0);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleInvite = () => {
    const message = encodeURIComponent("Yuk coba Sakuu! 💙 Kelola saldo dan transfer jadi lebih mudah.");

    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Top Up", icon: Wallet, path: "/topup" },
    { label: "Transfer", icon: Send, path: "/transfer" },
    { label: "Riwayat Transaksi", icon: History, path: "/transactions" },
    { label: "Profil", icon: User, path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* MOBILE HEADER */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => setMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100">
            <Menu size={22} />
          </button>

          <Logo variant="mobile" />

          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </header>

      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />

          <aside className="relative w-72 h-full bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <Logo variant="small" />

              <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${item.path === "/dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <Icon size={19} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button onClick={handleLogout} className="absolute bottom-6 left-5 right-5 flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl">
              <LogOut size={19} />
              Logout
            </button>
          </aside>
        </div>
      )}

      <div className="flex">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex w-64 min-h-screen bg-white border-r border-gray-100 flex-col p-6 sticky top-0 h-screen">
          {/* Logo */}
          <div className="mb-10">
            <Logo variant="small" />
            <p className="text-xs text-gray-400 mt-1">Your money, your way</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${item.path === "/dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  <Icon size={19} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Invite Card */}
          <div className="mt-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 mb-5">
              <p className="font-semibold text-sm">Ajak temanmu! 🎁</p>

              <p className="text-xs text-gray-500 mt-1">Bagikan Sakuu ke temanmu</p>

              <button onClick={handleInvite} className="mt-3 px-3 py-2 text-xs font-medium text-blue-600 bg-white border border-blue-100 rounded-lg hover:bg-blue-50 transition">
                Invite Now
              </button>
            </div>

            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl">
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {/* HEADER */}
            <header className="hidden lg:flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-gray-500">Glad to see you again. Let's manage your money!</p>

                <h1 className="text-2xl font-bold mt-1">Hey, {user?.username}! 👋</h1>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center">
                  <Bell size={19} className="text-gray-600" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                <button onClick={() => navigate("/profile")} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-2 hover:bg-gray-50 transition cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <User size={17} />
                  </div>

                  <span className="text-sm font-medium">{user?.username}</span>
                </button>
              </div>
            </header>

            {/* MOBILE GREETING */}
            <div className="lg:hidden mb-6">
              <p className="text-sm text-gray-500">Welcome back 👋</p>
              <h1 className="text-xl font-bold mt-1">{user?.username}</h1>
            </div>

            {/* BALANCE + STATS */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
              <div className="xl:col-span-2">
                <BalanceCard balance={wallet?.balance || 0} />
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
                {/* Total Top Up */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Total Top Up</p>

                      <p className="text-lg font-bold mt-2">Rp {totalTopUp.toLocaleString("id-ID")}</p>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                      <ArrowDownToLine size={18} />
                    </div>
                  </div>

                  <p className="text-xs text-green-600 mt-2">Saldo masuk</p>
                </div>

                {/* Total Transfer */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Total Transfer</p>

                      <p className="text-lg font-bold mt-2">Rp {totalTransfer.toLocaleString("id-ID")}</p>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <p className="text-xs text-purple-600 mt-2">Saldo keluar</p>
                </div>
              </div>
            </div>

            {/* QUICK ACTION + TRANSACTIONS */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
              <div className="xl:col-span-2">
                <QuickActions />
              </div>

              <div className="xl:col-span-3">
                <TransactionList transactions={transactions} />
              </div>
            </div>

            {/* TIPS */}
            <div className="mt-5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 bg-white rounded-xl flex items-center justify-center text-yellow-500">
                <Lightbulb size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">Tips: Kelola saldo dengan bijak 💡</p>

                <p className="text-xs text-gray-500 mt-1">Pastikan selalu mengecek riwayat transaksi kamu.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
