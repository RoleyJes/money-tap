function TransactionItem({ type, amount, date, time }) {
  const typeColors = {
    deposit: "text-green-600",
    withdraw: "text-yellow-600",
    loan: "text-purple-600",
    repay: "text-red-600",
  };

  return (
    <li className="flex flex-col gap-2 border-b pb-2 sm:grid sm:grid-cols-4">
      <span className={`font-medium capitalize ${typeColors[type]}`}>
        {type}
      </span>
      <span className="font-semibold sm:place-self-center">${amount}</span>
      <span className="text-sm text-gray-500 sm:place-self-end">{date}</span>
      <span className="text-sm text-gray-500 sm:place-self-end">{time}</span>
    </li>
  );
}

export default TransactionItem;
