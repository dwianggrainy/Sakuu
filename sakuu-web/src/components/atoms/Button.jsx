const Button = ({ children, variant = "primary", type = "button", onClick, disabled = false }) => {
  let buttonStyle = "";

  if (variant === "primary") {
    buttonStyle = "bg-gradient-to-r from-blue-500 to-purple-500 text-white";
  }

  if (variant === "secondary") {
    buttonStyle = "bg-white text-blue-600 border border-blue-500";
  }

  if (variant === "danger") {
    buttonStyle = "bg-red-500 text-white";
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${buttonStyle} w-full px-6 py-3 rounded-xl font-medium disabled:opacity-50`}>
      {children}
    </button>
  );
};

export default Button;
