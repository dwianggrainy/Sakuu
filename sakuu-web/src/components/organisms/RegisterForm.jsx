import { useState } from "react";
import InputField from "../molecules/InputField";
import PasswordInput from "../molecules/PasswordInput";
import Button from "../atoms/Button";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    transaction_pin: "",
    transaction_pin_confirmation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await apiClient.post("/register", form);

      navigate("/");
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors) {
        setError(Object.values(errors)[0][0]);
      } else {
        setError(error.response?.data?.message || "Registrasi gagal");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username */}
      <InputField label="Username" name="username" placeholder="Masukkan username" value={form.username} onChange={handleChange} />

      {/* Email */}
      <InputField label="Email" name="email" type="email" placeholder="Masukkan email" value={form.email} onChange={handleChange} />

      {/* Phone */}
      <InputField label="Nomor HP" name="phone" type="tel" placeholder="08xxxxxxxxxx" value={form.phone} onChange={handleChange} />

      {/* Password */}
      <PasswordInput label="Password" name="password" placeholder="Minimal 8 karakter" value={form.password} onChange={handleChange} />

      {/* Confirm Password */}
      <PasswordInput label="Konfirmasi Password" name="password_confirmation" placeholder="Ulangi password" value={form.password_confirmation} onChange={handleChange} />

      {/* PIN */}
      <InputField label="PIN Transaksi" name="transaction_pin" type="password" placeholder="Masukkan 6 digit PIN" value={form.transaction_pin} onChange={handleChange} />

      {/* Confirm PIN */}
      <InputField label="Konfirmasi PIN" name="transaction_pin_confirmation" type="password" placeholder="Ulangi 6 digit PIN" value={form.transaction_pin_confirmation} onChange={handleChange} />

      {/* Error */}
      {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>}

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? "Membuat akun..." : "Buat Akun"}
      </Button>
    </form>
  );
}

export default RegisterForm;
