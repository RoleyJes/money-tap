import { CgClose } from "react-icons/cg";
import { LuX } from "react-icons/lu";

function Sidebar({
  onLogout,
  onDesktopNav,
  activeAction,
  showMobileNav,
  onCloseMobileMenu,
}) {
  const navLinks = [
    {
      link: "deposit",
      color: "bg-green-100 hover:bg-green-200",
      ring: "ring-green-400",
    },
    {
      link: "withdraw",
      color: "bg-yellow-100 hover:bg-yellow-200",
      ring: "ring-yellow-400",
    },
    {
      link: "request loan",
      color: "bg-purple-100 hover:bg-purple-200",
      ring: "ring-purple-400",
    },
    {
      link: "repay loan",
      color: "bg-red-100 hover:bg-red-200",
      ring: "ring-red-400",
    },
  ];

  return (
    <aside>
      <div
        className={`fixed flex h-full w-full flex-col justify-between bg-white p-6 shadow-lg transition-all duration-300 md:min-h-screen md:w-64 md:translate-x-0 ${showMobileNav ? "inset-0 z-50 translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <div className="flex items-start justify-between">
            {/* Logo */}
            <div className="mb-8 w-20 md:w-full">
              <img src="/logo.webp" alt="money tap" className="h-auto" />
            </div>

            <LuX
              onClick={onCloseMobileMenu}
              className="size-6 cursor-pointer text-green-800 md:hidden"
            />
          </div>
          <nav className="grid grid-cols-1 gap-4 md:grid-cols-1">
            {navLinks.map((item, index) => (
              <button
                key={index}
                onClick={() => onDesktopNav(item.link)}
                className={`w-full cursor-pointer rounded-lg px-4 py-2 text-left capitalize transition-all duration-300 ${item.color} ${activeAction === item.link ? `ring-2 ${item.ring} font-semibold` : ""} `}
              >
                {item.link}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={onLogout}
          className="mt-6 w-full cursor-pointer rounded-lg bg-red-500 py-2 text-white transition-all duration-300 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
