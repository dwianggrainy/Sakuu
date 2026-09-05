import { ArrowLeft, Mail, Phone, UserRound, ShieldCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/atoms/Logo";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition">
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <Logo variant="mobile" />
        </div>

        {/* Profile Header */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 mb-5">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <UserRound size={34} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mt-4">{user?.username || "-"}</h1>

            <p className="text-sm text-gray-400 mt-1">{user?.email || "-"}</p>

            <div className="flex items-center gap-2 mt-4 bg-green-50 text-green-600 px-3 py-2 rounded-xl">
              <ShieldCheck size={16} />
              <span className="text-xs font-medium">Akun Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 mb-5">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">Informasi Akun</h2>

            <p className="text-xs text-gray-400 mt-1">Informasi akun Sakuu kamu</p>
          </div>

          <div className="space-y-4">
            {/* Username */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-10 h-10 shrink-0 bg-white text-blue-600 rounded-xl flex items-center justify-center">
                <UserRound size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-400">Username</p>

                <p className="text-sm font-semibold text-slate-800 mt-1 truncate">{user?.username || "-"}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-10 h-10 shrink-0 bg-white text-purple-600 rounded-xl flex items-center justify-center">
                <Mail size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-400">Email</p>

                <p className="text-sm font-semibold text-slate-800 mt-1 truncate">{user?.email || "-"}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-10 h-10 shrink-0 bg-white text-green-600 rounded-xl flex items-center justify-center">
                <Phone size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-400">Nomor HP</p>

                <p className="text-sm font-semibold text-slate-800 mt-1">{user?.phone || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">Keamanan</h2>

              <p className="text-xs text-gray-400 mt-1">PIN transaksi digunakan untuk mengamankan transaksi kamu.</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div>
              <p className="text-sm font-semibold text-slate-800">PIN Transaksi</p>

              <p className="text-xs text-gray-400 mt-1">PIN aktif dan terlindungi</p>
            </div>

            <span className="text-sm font-bold tracking-widest text-gray-500">••••••</span>
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-white border border-red-100 text-red-500 px-5 py-3.5 rounded-2xl font-semibold text-sm hover:bg-red-50 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
