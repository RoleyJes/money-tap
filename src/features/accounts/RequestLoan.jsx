import { useState } from "react";
import ActionForm from "./ActionForm";
import { useDispatch, useSelector } from "react-redux";
import ErrorInput from "../../ui/ErrorInput";
import { requestLoan, startLoading, stopLoading } from "./accountSlice";
import { formatCurrency, formatNumber } from "../../utils/helpers";
import LoadingSpinner from "../../ui/LoadingSpinner";
import toast from "react-hot-toast";

function RequestLoan() {
  const [loanAmt, setLoanAmt] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [errorAmt, setErrorAmt] = useState("");
  const [errorPurpose, setErrorPurpose] = useState("");

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
    setErrorAmt("");
    setErrorPurpose(false);

    if (!loanPurpose) {
      setErrorPurpose("You need to give a reason for the loan.");
      valid = false;
    }
    if (loanAmt === "" || loanAmt >= balance) {
      setErrorAmt("Amount must be less than your balance, and not empty.");
      valid = false;
    }

    if (!valid) return;

    dispatch(startLoading());

    setTimeout(() => {
      dispatch(requestLoan(Number(loanAmt), loanPurpose));
      dispatch(stopLoading());
      toast.success("Loan request granted successfully!");
      setLoanAmt("");
      setLoanPurpose("");
    }, 2000);
  }

  return (
    <>
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
                  value={formatNumber(loanAmt)}
                  onChange={(e) =>
                    setLoanAmt(Number(e.target.value.replace(/,/g, "")) || 0)
                  }
                  type="text"
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
