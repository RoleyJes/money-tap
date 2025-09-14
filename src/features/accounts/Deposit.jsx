import { useDispatch, useSelector } from "react-redux";
import ActionForm from "./ActionForm";
import { deposit, depositAsync } from "./accountSlice";
import Alert from "../../ui/Alert";
import useTimedMessage from "../../hooks/useTimedMessage";
import { useState } from "react";
import ErrorInput from "../../ui/ErrorInput";
import LoadingSpinner from "../../ui/LoadingSpinner";

function Deposit() {
  const [depositAmt, setDepositAmt] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [success, setSuccess] = useTimedMessage();
  const [error, setError] = useState("");

  const { isLoading, globalError } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  async function handleClick(e) {
    e.preventDefault();
    setError("");
    if (!depositAmt) return setError("Enter a deposit amount");
    if (depositAmt < 0) return setError("Your deposit can't be below zero");

    try {
      if (currency === "USD") {
        dispatch(deposit(depositAmt)); // ✅ send raw number
        setSuccess(`You've deposited $${depositAmt} successfully.`);
        setDepositAmt("");
      } else {
        dispatch(depositAsync(depositAmt, currency));
        setSuccess(`You've deposited ${depositAmt} ${currency} successfully.`);
        setDepositAmt("");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      {success && <Alert type="Success" message={success} />}
      {error && <Alert type="Error" message={error} />}
      {globalError && <Alert type="Error" message={error} />}
      <div className="relative">
        {/* Overlay */}
        {isLoading && <LoadingSpinner />}
        <ActionForm
          multipleInput
          title="Deposit Money"
          color="green"
          onclick={handleClick}
        >
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <label className="mb-1 block font-medium">Amount</label>
              <input
                type="number"
                value={depositAmt}
                onChange={(e) => setDepositAmt(+e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
              {error && <ErrorInput message={error} />}
            </div>

            <div>
              <label className="mb-1 block font-medium">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="USD">$ - USD</option>
                <option value="EUR">€ - EUR</option>
                <option value="GBP">£ - GBP</option>
              </select>
              <small className="text-gray-500">
                Deposits in other currencies will be converted to USD
              </small>
            </div>
          </div>
        </ActionForm>
      </div>
    </>
  );
}

export default Deposit;
