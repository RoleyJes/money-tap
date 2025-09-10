import { useDispatch, useSelector } from "react-redux";
import ActionForm from "./ActionForm";
import { repayLoan } from "./accountSlice";
import Alert from "../../ui/Alert";
import useTimedMessage from "../../hooks/useTimedMessage";

function PayLoan() {
  const [success, setSuccess] = useTimedMessage();
  const [error, setError] = useTimedMessage();

  const { loan, loanPurpose } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    if (loan === 0) return setError("You don't have any loan to repay");

    dispatch(repayLoan());
    setSuccess("Loan repaid successfully!");
  }

  return (
    <>
      {success && <Alert type="Success" message={success} />}
      {error && <Alert type="Error" message={error} />}
      {loan > 0 ? (
        <ActionForm
          title={
            <>
              <span>Repay your</span>{" "}
              <span className="text-red-500">${loan}</span>{" "}
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
    </>
  );
}

export default PayLoan;
