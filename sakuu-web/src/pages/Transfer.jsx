import Logo from "../components/atoms/Logo";
import TransferForm from "../components/organisms/TransferForm";

function Transfer() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        <div className="flex justify-center mb-6">
          <Logo variant="mobile" />
        </div>

        <TransferForm />
      </div>
    </div>
  );
}

export default Transfer;
