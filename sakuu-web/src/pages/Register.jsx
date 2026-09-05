import Logo from "../components/atoms/Logo";
import RegisterForm from "../components/organisms/RegisterForm";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles } from "lucide-react";

function Register() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8 sm:py-10 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />

      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo variant="small" />
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Buat akun baru ✨</h1>

            <p className="text-sm text-gray-500 mt-2">Mulai kelola uangmu bersama Sakuu</p>
          </div>

          {/* Form */}
          <RegisterForm />

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Sudah punya akun?{" "}
            <Link to="/" className="text-blue-600 font-semibold hover:text-purple-600 transition">
              Login
            </Link>
          </p>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
            <ShieldCheck size={14} />
            <span>Data akun kamu tetap aman bersama Sakuu</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-400">
          <Sparkles size={13} />
          <span>Mulai perjalanan finansialmu</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
