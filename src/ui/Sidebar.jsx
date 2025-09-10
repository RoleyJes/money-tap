function Sidebar({ onLogout, setActiveAction, activeAction }) {
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
    <aside className="flex min-h-[200px] w-full flex-col justify-between bg-white p-6 shadow-lg md:min-h-screen md:w-64">
      <div>
        <h2 className="mb-8 text-xl font-bold">🏦 MoneyTap</h2>
        <nav className="grid grid-cols-2 gap-4 md:grid-cols-1">
          {navLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveAction(item.link)}
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
    </aside>
  );
}

export default Sidebar;
