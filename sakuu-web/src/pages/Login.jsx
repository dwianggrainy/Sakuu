import Logo from "../components/atoms/Logo";
import LoginForm from "../components/organisms/LoginForm";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles } from "lucide-react";

function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <Logo variant="small" />
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <div className="flex items-center justify-center gap-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome back!</h1>

              <span className="text-xl">👋</span>
            </div>

            <p className="text-sm text-gray-500 mt-2">Login untuk melanjutkan ke Sakuu</p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Register */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:text-purple-600 transition">
              Daftar sekarang
            </Link>
          </p>

          {/* Security info */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
            <ShieldCheck size={14} />
            <span>Transaksi kamu aman bersama Sakuu</span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-400">
          <Sparkles size={13} />
          <span>Kelola uangmu dengan lebih mudah</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
