import { useState } from "react";
import ActionForm from "./ActionForm";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading, withdraw } from "./accountSlice";

import LoadingSpinner from "../../ui/LoadingSpinner";
import { formatCurrency, formatNumber } from "../../utils/helpers";
import toast from "react-hot-toast";

function Withdraw() {
  const [withdrawAmt, setWithdrawAmt] = useState("");

  const { balance, isLoading } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    if (!withdrawAmt) return toast.error("You have to withdraw something");
    if (withdrawAmt > balance)
      return toast.error("You can't withdraw more than your balance");
    if (withdrawAmt < 0)
      return toast.error("Your withdraw amount can't be below zero");

    dispatch(startLoading());

    setTimeout(() => {
      dispatch(withdraw(withdrawAmt));
      dispatch(stopLoading());
      toast.success(
        `You've withdrawn ${formatCurrency(withdrawAmt)} successfully`,
      );
      setWithdrawAmt("");
    }, 2000);
  }

  return (
    <>
      <div className="relative">
        {/* Overlay */}
        {isLoading && <LoadingSpinner />}

        <ActionForm title="Withdraw Money" color="yellow" onclick={handleClick}>
          <input
            type="text"
            value={formatNumber(withdrawAmt)}
            onChange={(e) => setWithdrawAmt(Number(e.target.value.replace(/,/g, '')) || 0)}
            placeholder="Enter amount"
            className="flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            autoFocus
          />
        </ActionForm>
      </div>
    </>
  );
}

export default Withdraw;
