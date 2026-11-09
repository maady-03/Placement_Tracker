import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function BackToHome() {
  return (
    <Link
      to="/"
      className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-[#111] shadow-sm backdrop-blur transition hover:-translate-x-0.5 hover:bg-white sm:left-6 sm:top-6"
    >
      <ArrowLeft size={15} />
      Back to home
    </Link>
  );
}

export default BackToHome;