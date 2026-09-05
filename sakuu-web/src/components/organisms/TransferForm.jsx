import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ShieldCheck, UserRound } from "lucide-react";

import Button from "../atoms/Button";
import InputField from "../molecules/InputField";
import PasswordInput from "../molecules/PasswordInput";
import apiClient from "../api/apiClient";

function TransferForm() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!recipient.trim()) {
      setError("Masukkan email atau nomor HP penerima.");
      return;
    }

    if (!amount || Number(amount) < 1) {
      setError("Masukkan nominal transfer.");
      return;
    }

    if (!pin || pin.length !== 6) {
      setError("PIN transaksi harus 6 digit.");
      return;
    }

    setLoading(true);

    try {
      await apiClient.post("/wallet/transfer", {
        recipient: recipient.trim(),
        amount: Number(amount),
        pin,
      });

      setMessage("Transfer berhasil!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors) {
        setError(Object.values(errors)[0][0]);
      } else {
        setError(error.response?.data?.message || "Transfer gagal");
      }
    } finally {
      setLoading(false);
    }
  };

  const formattedAmount = Number(amount || 0).toLocaleString("id-ID");

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-7">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <button type="button" onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Transfer</h1>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">Kirim saldo ke pengguna lain</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          {/* Recipient */}
          <InputField
            label="Email / Nomor HP Penerima"
            name="recipient"
            placeholder="contoh@email.com / 081234567890"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setError("");
              setMessage("");
            }}
          />

          <div className="flex items-center gap-2 text-xs text-gray-400 -mt-2">
            <UserRound size={14} />
            <span>Gunakan email atau nomor HP yang terdaftar di Sakuu</span>
          </div>

          {/* Amount */}
          <InputField
            label="Nominal"
            name="amount"
            type="number"
            placeholder="Masukkan nominal"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
              setMessage("");
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

              setError("");
              setMessage("");
            }}
          />

          {/* Error */}
          {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>}

          {/* Success */}
          {message && <div className="bg-green-50 border border-green-100 text-green-600 rounded-xl px-4 py-3 text-sm">{message}</div>}

          <Button type="submit" disabled={loading}>
            {loading ? (
              "Memproses..."
            ) : (
              <>
                <span className="inline-flex items-center justify-center gap-2">
                  <Send size={17} />
                  Kirim Sekarang
                </span>
              </>
            )}
          </Button>

          <Button type="button" variant="secondary" onClick={() => navigate("/dashboard")}>
            Kembali
          </Button>
        </form>

        {/* SUMMARY */}
        <div className="lg:col-span-2">
          <div className="bg-slate-50 border border-gray-100 rounded-2xl p-5">
            <h2 className="font-bold text-base">Ringkasan Transfer</h2>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-gray-400">Penerima</p>

                <p className="text-sm font-medium mt-1 break-all">{recipient || "-"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Nominal</p>

                <p className="text-xl font-bold mt-1">Rp {formattedAmount}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Biaya Admin</p>

                <p className="text-sm font-medium mt-1 text-green-600">Gratis</p>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <span className="text-sm font-semibold">Total</span>

                <span className="text-lg font-bold">Rp {formattedAmount}</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mt-4 flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-2xl p-4">
            <div className="w-9 h-9 shrink-0 bg-white rounded-xl flex items-center justify-center text-purple-600">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-purple-700">Transaksi aman & terenkripsi</p>

              <p className="text-xs text-gray-500 mt-1">PIN digunakan untuk memastikan transfer dilakukan oleh kamu.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferForm;
