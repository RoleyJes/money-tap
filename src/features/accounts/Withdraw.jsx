import { useState } from "react";
import ActionForm from "./ActionForm";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading, withdraw } from "./accountSlice";
import Alert from "../../ui/Alert";
import useTimedMessage from "../../hooks/useTimedMessage";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { formatCurrency } from "../../utils/helpers";

function Withdraw() {
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [success, setSuccess] = useTimedMessage();
  const [error, setError] = useTimedMessage();

  const { balance, isLoading } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    if (!withdrawAmt) return setError("You have to withdraw something");
    if (withdrawAmt > balance)
      return setError("You can't withdraw more than your balance");
    if (withdrawAmt < 0)
      return setError("Your withdraw amount can't be below zero");

    dispatch(startLoading());

    setTimeout(() => {
      dispatch(withdraw(withdrawAmt));
      dispatch(stopLoading());
      setSuccess(
        `You've withdrawn ${formatCurrency(withdrawAmt)} successfully`,
      );
      setWithdrawAmt("");
    }, 2000);
  }

  return (
    <>
      {success && <Alert type="Success" message={success} />}
      {error && <Alert type="Error" message={error} />}

      <div className="relative">
        {/* Overlay */}
        {isLoading && <LoadingSpinner />}

        <ActionForm title="Withdraw Money" color="yellow" onclick={handleClick}>
          <input
            type="number"
            value={withdrawAmt}
            onChange={(e) => setWithdrawAmt(e.target.value)}
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
