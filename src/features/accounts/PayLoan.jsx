import { useDispatch, useSelector } from "react-redux";
import ActionForm from "./ActionForm";
import { repayLoan, startLoading, stopLoading } from "./accountSlice";
import { formatCurrency } from "../../utils/helpers";
import LoadingSpinner from "../../ui/LoadingSpinner";
import toast from "react-hot-toast";

function PayLoan() {
  const { loan, loanPurpose, isLoading } = useSelector(
    (store) => store.account,
  );
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(startLoading());

    setTimeout(() => {
      dispatch(repayLoan());
      dispatch(stopLoading());
      toast.success("Loan repaid successfully!");
    }, 2000);
  }

  return (
    <>
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
