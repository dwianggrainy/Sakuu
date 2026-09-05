import Logo from "../components/atoms/Logo";
import TopUpForm from "../components/organisms/TopUpForm";

function TopUp() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo variant="mobile" />
        </div>

        <TopUpForm />
      </div>
    </div>
  );
}

export default TopUp;
