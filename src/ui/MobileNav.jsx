import { BiMoneyWithdraw } from "react-icons/bi";

const navs = [
  { name: "Deposit", action: "deposit" },
  { name: "Withdraw", action: "withdraw" },
  { name: "Request Loan", action: "request loan" },
  { name: "Repay Loan", action: "repay loan" },
];

function MobileNav({ activeAction, setActiveAction }) {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full justify-center border-t bg-white p-4 shadow-lg md:hidden">
      {navs.map((item) => (
        <button
          key={item.action}
          onClick={() => setActiveAction(item.action)}
          className={`flex-1 ${
            activeAction === item.action ? "font-semibold" : ""
          }`}
        >
          <BiMoneyWithdraw className="mx-auto mb-1 h-6 w-6" />
          {/* <PiHandDeposit className="mx-auto mb-1 h-6 w-6" /> */}
        </button>
      ))}
    </div>
  );
}

export default MobileNav;
