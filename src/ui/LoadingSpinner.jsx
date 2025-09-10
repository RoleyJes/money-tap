import { LuDisc2, LuLoader, LuLoaderCircle } from "react-icons/lu";

function LoadingSpinner({ text }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/70">
      <LuLoaderCircle className="size-10 animate-spin text-slate-600" />
      {/* <div className="size-12 animate-spin rounded-full bg-red-600"></div> */}
    </div>
  );
}

export default LoadingSpinner;
