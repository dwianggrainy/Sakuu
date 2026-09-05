import Input from "../atoms/Input";

function InputField({ label, type = "text", name, placeholder = "", value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <Input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export default InputField;
