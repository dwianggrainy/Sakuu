import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";

import Button from "../atoms/Button";
import InputField from "../molecules/InputField";
import PasswordInput from "../molecules/PasswordInput";
import apiClient from "../api/apiClient";

function TopUpForm() {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const quickAmounts = [100000, 200000, 500000, 1000000];

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!amount || Number(amount) < 1) {
      setError("Masukkan nominal Top Up.");
      return;
    }

    if (!pin || pin.length !== 6) {
      setError("PIN transaksi harus 6 digit.");
      return;
    }

    setLoading(true);

    try {
      await apiClient.post("/wallet/topup", {
        amount: Number(amount),
        pin,
      });

      setMessage("Top Up berhasil!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors) {
        setError(Object.values(errors)[0][0]);
      } else {
        setError(error.response?.data?.message || "Top Up gagal");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-7">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <button type="button" onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Top Up</h1>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">Isi saldo wallet kamu</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Quick Amount */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Pilih nominal</label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {quickAmounts.map((value) => {
              const selected = Number(amount) === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleQuickAmount(value)}
                  className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-medium border transition ${
                    selected ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  Rp {value.toLocaleString("id-ID")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Amount */}
        <InputField
          label="Nominal lainnya"
          name="amount"
          type="number"
          placeholder="Masukkan nominal"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setMessage("");
            setError("");
          }}
        />

        {/* PIN */}
        <PasswordInput
          label="PIN Transaksi"
          name="pin"
          placeholder="Masukkan 6 digit PIN"
          value={pin}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");

            if (value.length <= 6) {
              setPin(value);
            }

            setMessage("");
            setError("");
          }}
        />

        {/* Info */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <div className="w-9 h-9 shrink-0 bg-white rounded-xl flex items-center justify-center text-blue-500">
            <Zap size={18} />
          </div>

          <div>
            <p className="text-xs font-semibold text-blue-700">Top Up mudah & aman</p>

            <p className="text-xs text-gray-500 mt-1">Masukkan nominal dan PIN transaksi untuk menambah saldo Sakuu kamu.</p>
          </div>
        </div>

        {/* Success */}
        {message && <div className="bg-green-50 border border-green-100 text-green-600 rounded-xl px-4 py-3 text-sm">{message}</div>}

        {/* Error */}
        {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>}

        {/* Submit */}
        <Button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Lanjutkan"}
        </Button>
      </form>
    </div>
  );
}

export default TopUpForm;
