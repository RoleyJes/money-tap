import { useState } from "react";
import ActionForm from "./ActionForm";
import { useDispatch, useSelector } from "react-redux";
import ErrorInput from "../../ui/ErrorInput";
import { requestLoan } from "./accountSlice";
import Alert from "../../ui/Alert";
import useTimedMessage from "../../hooks/useTimedMessage";
import { formatCurrency } from "../../utils/helpers";
import LoadingSpinner from "../../ui/LoadingSpinner";

function RequestLoan() {
  const [loanAmt, setLoanAmt] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [errorAmt, setErrorAmt] = useState("");
  const [errorPurpose, setErrorPurpose] = useState("");
  const [success, setSuccess] = useTimedMessage();

  const {
    loan,
    loanPurpose: loanPurposeFromStore,
    balance,
    isLoading,
  } = useSelector((store) => store.account);

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    let valid = true;
    setSuccess("");
    setErrorAmt("");
    setErrorPurpose(false);

    if (!loanPurpose) {
      setErrorPurpose("You need to give a reason for the loan.");
      valid = false;
    }
    if (loanAmt === "" || loanAmt >= balance) {
      setErrorAmt("Amount must be less than your balance and not empty.");
      valid = false;
    }

    if (!valid) return;

    dispatch({ type: "account/startLoading" });

    setTimeout(() => {
      dispatch(requestLoan(Number(loanAmt), loanPurpose));
      dispatch({ type: "account/stopLoading" });
      setSuccess("Loan request granted successfully!");
      setLoanAmt("");
      setLoanPurpose("");
    }, 3000);
  }

  return (
    <>
      {success && <Alert type="Success" message={success} />}

      <div className="relative">
        {/* Overlay */}
        {isLoading && <LoadingSpinner />}
        {loan === 0 ? (
          <ActionForm
            multipleInput
            title="Request Loan"
            color="purple"
            onclick={handleClick}
          >
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <input
                  value={loanAmt}
                  onChange={(e) => setLoanAmt(e.target.value)}
                  type="number"
                  required
                  placeholder="Enter amount"
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  autoFocus
                />
                {errorAmt && <ErrorInput message={errorAmt} />}
              </div>
              <div>
                <input
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  type="text"
                  required
                  placeholder="Loan purpose (required)"
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                {errorPurpose && <ErrorInput message={errorPurpose} />}
              </div>
            </div>
          </ActionForm>
        ) : (
          <div>
            <p className="">
              <span>Pay up your </span>
              <strong className="text-red-600">{`${formatCurrency(loan)} (${loanPurposeFromStore})`}</strong>{" "}
              <span>loan before requesting for another.</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default RequestLoan;
