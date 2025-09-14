import { useDispatch, useSelector } from "react-redux";
import ActionForm from "./ActionForm";
import { repayLoan } from "./accountSlice";
import Alert from "../../ui/Alert";
import useTimedMessage from "../../hooks/useTimedMessage";
import { formatCurrency } from "../../utils/helpers";
import LoadingSpinner from "../../ui/LoadingSpinner";

function PayLoan() {
  const [success, setSuccess] = useTimedMessage();
  // const [error, setError] = useTimedMessage();

  const { loan, loanPurpose, isLoading } = useSelector(
    (store) => store.account,
  );
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    // if (loan === 0) return setError("You don't have any loan to repay");

    dispatch({ type: "account/startLoading" });

    setTimeout(() => {
      dispatch(repayLoan());
      dispatch({ type: "account/stopLoading" });
      setSuccess("Loan repaid successfully!");
    }, 3000);
  }

  return (
    <>
      {success && <Alert type="Success" message={success} />}
      {/* {error && <Alert type="Error" message={error} />} */}

      <div className="relative">
        {/* Overlay */}
        {isLoading && <LoadingSpinner />}
        {loan > 0 ? (
          <ActionForm
            title={
              <>
                <span>Repay your</span>{" "}
                <span className="text-red-500">{formatCurrency(loan)}</span>{" "}
                <span>loan borrowed for</span>{" "}
                <span className="text-red-500">&quot;{loanPurpose}&quot;</span>{" "}
                <span>(it&apos;s just a click away)</span>
              </>
            }
            color="red"
            onclick={handleClick}
          />
        ) : (
          <p className="text-gray-500">You have no active loan to repay.</p>
        )}
      </div>
    </>
  );
}

export default PayLoan;
