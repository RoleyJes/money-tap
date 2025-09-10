import { useSelector } from "react-redux";

function BalanceDisplay() {
  const { balance } = useSelector((store) => store.account);

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
      <h3 className="text-lg font-semibold">Current Balance</h3>
      <p className="text-3xl font-bold text-blue-700">${balance}</p>
    </div>
  );
}

export default BalanceDisplay;
