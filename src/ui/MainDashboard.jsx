import { useSelector } from "react-redux";
import BalanceDisplay from "../features/accounts/BalanceDisplay";
import Deposit from "../features/accounts/Deposit";
import PayLoan from "../features/accounts/PayLoan";
import RequestLoan from "../features/accounts/RequestLoan";
import TransactionItem from "../features/accounts/TransactionItem";
import Withdraw from "../features/accounts/Withdraw";

function MainDashboard({ activeAction }) {
  const { transactionHistory } = useSelector((store) => store.account);
  const { username } = useSelector((store) => store.customer);

  return (
    <main className="mx-auto max-w-5xl flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
      <p className="text-4xl font-bold">
        Welcome to Your Dashboard,{" "}
        {username.split("")[0].toUpperCase() + username.slice(1)}
      </p>

      <BalanceDisplay />

      {/* Conditionally render forms */}
      {activeAction === "deposit" && <Deposit />}
      {activeAction === "withdraw" && <Withdraw />}
      {activeAction === "request loan" && <RequestLoan />}
      {activeAction === "repay loan" && <PayLoan />}

      {/* Transactions */}
      {transactionHistory.length > 0 ? (
        <div>
          <h3 className="mb-3 text-lg font-semibold">Transaction History</h3>
          <ul className="max-h-[400px] space-y-2 overflow-y-auto rounded-xl bg-white p-4 shadow">
            {transactionHistory.map((tx, index) => (
              <TransactionItem key={index} {...tx} />
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No transaction history available.</p>
      )}
    </main>
  );
}

export default MainDashboard;
