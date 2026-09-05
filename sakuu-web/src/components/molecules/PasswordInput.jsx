import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "../atoms/Input";

function PasswordInput({ label = "Password", name, placeholder = "Password", value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <Input type={showPassword ? "text" : "password"} name={name} placeholder={placeholder} value={value} onChange={onChange} />

        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
