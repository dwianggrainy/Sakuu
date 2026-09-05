import { useState } from "react";
import InputField from "../molecules/InputField";
import PasswordInput from "../molecules/PasswordInput";
import Button from "../atoms/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <InputField label="Email" type="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />

      {/* Password */}
      <PasswordInput label="Password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {/* Error */}
      {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>}

      {/* Login button */}
      <Button type="submit" disabled={loading}>
        {loading ? "Memproses..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
