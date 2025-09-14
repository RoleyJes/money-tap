import { formatCurrency } from "../../utils/helpers";

function TransactionItem({ type, amount, date, time }) {
  const typeColors = {
    deposit: "text-green-600",
    withdraw: "text-yellow-600",
    "request loan": "text-purple-600",
    "repay loan": "text-red-600",
  };

  return (
    <li className="grid grid-cols-2 place-items-center gap-2 border-b pb-2 sm:grid-cols-4 sm:place-items-start">
      <span className={`font-medium capitalize ${typeColors[type]}`}>
        {type}
      </span>
      <span className="font-semibold lg:place-self-center">
        {formatCurrency(amount)}
      </span>
      <span className="text-sm text-gray-500 lg:place-self-end">{date}</span>
      <span className="text-sm text-gray-500 lg:place-self-end">{time}</span>
    </li>
  );
}

export default TransactionItem;
