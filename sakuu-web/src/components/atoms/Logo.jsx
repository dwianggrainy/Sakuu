import logo from "../../assets/Logo.png";

const Logo = ({ variant = "default" }) => {
  let logoStyle = "";

  if (variant === "default") logoStyle = "w-40";
  if (variant === "small") logoStyle = "w-24";
  if (variant === "mobile") logoStyle = "w-16";

  return <img src={logo} alt="Sakuu" className={`${logoStyle} h-auto`} />;
};

export default Logo;
