function Input({ type = "text", name, placeholder = "", value, onChange }) {
  return <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" />;
}

export default Input;
