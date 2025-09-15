import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { getExchangeRate } from "../../services/apiExchange";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

function BalanceDisplay({ activeAction }) {
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState({ EUR: null, GBP: null });
  const [displayExchangeRate, setDisplayExchangeRate] = useState(false);

  const { balance } = useSelector((store) => store.account);

  async function fetchExchangeRate() {
    !displayExchangeRate ? setLoading(true) : setLoading(false);
    const { EUR, GBP } = await getExchangeRate();

    setRates({ EUR, GBP });
    setLoading(false);
    setDisplayExchangeRate((prev) => !prev);
  }

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div>
          <h3 className="text-lg font-semibold">Current Balance</h3>
          <p className="text-3xl font-bold text-blue-700">
            {formatCurrency(balance)}
          </p>
        </div>

        {activeAction === "deposit" && (
          <button
            onClick={fetchExchangeRate}
            className="mt-4 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 md:mt-0"
          >
            {`${displayExchangeRate ? "Hide" : "See"} current exchange rates`}
          </button>
        )}
      </div>

      {loading && (
        <LuLoaderCircle className="mt-4 size-5 animate-spin text-slate-600" />
      )}

      {displayExchangeRate && activeAction === "deposit" && (
        <div className="mt-4 flex flex-col gap-1 text-sm text-blue-500 md:flex-row md:gap-3">
          <span>1 USD = {rates.EUR?.toFixed(4)} EUR</span>
          <span className="hidden md:block">|</span>
          <span>1 USD = {rates.GBP?.toFixed(4)} GBP</span>
        </div>
      )}
    </div>
  );
}

export default BalanceDisplay;
