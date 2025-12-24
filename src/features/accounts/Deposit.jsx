import { useDispatch, useSelector } from "react-redux";
import ActionForm from "./ActionForm";
import {
  deposit,
  depositAsync,
  startLoading,
  stopLoading,
} from "./accountSlice";
import Alert from "../../ui/Alert";

import { useState } from "react";
import ErrorInput from "../../ui/ErrorInput";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { formatCurrency, formatNumber } from "../../utils/helpers";
import toast from "react-hot-toast";

const localeMap = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
};

function Deposit() {
  const [depositAmt, setDepositAmt] = useState("");
  const [currency, setCurrency] = useState("USD");
  // const [success, setSuccess] = useTimedMessage();
  const [error, setError] = useState("");

  const localeCode = localeMap[currency];

  const { isLoading, globalError } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  async function handleClick(e) {
    e.preventDefault();
    setError("");
    if (!depositAmt) return toast.error("Enter a deposit amount");
    if (depositAmt < 0) return toast.error("Your deposit can't be below zero");

    try {
      if (currency === "USD") {
        dispatch(startLoading());

        setTimeout(() => {
          dispatch(deposit(depositAmt));
          toast.success(
            `You've deposited ${formatCurrency(depositAmt)} successfully.`,
          );
          setDepositAmt("");
          dispatch(stopLoading());
        }, 2000);
      } else {
        const { data, convertedAmt } = await dispatch(
          depositAsync(depositAmt, currency),
        );

        toast.success(
          `You've deposited ${formatCurrency(depositAmt, localeCode, currency)} (${formatCurrency(convertedAmt)}) at an exchange rate of ${data[currency].toFixed(4)}.`,
        );
        setDepositAmt("");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      {globalError && toast.error(error)}
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
                type="text"
                value={formatNumber(depositAmt)}
                onChange={(e) =>
                  setDepositAmt(Number(e.target.value.replace(/,/g, "")) || 0)
                }
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
