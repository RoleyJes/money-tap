import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../services/apiExchange";

const initialState = {
  balance: 5000,
  loan: 0,
  loanPurpose: "",
  transactionHistory: [],
  isLoading: false,
  globalError: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    startGlobalError(state) {
      state.globalError = true;
    },
    stopGlobalError(state) {
      state.globalError = false;
    },

    deposit: {
      prepare(amount) {
        return {
          payload: {
            amount,
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        };
      },

      reducer(state, action) {
        state.balance += action.payload.amount;
        state.isLoading = false;
        state.transactionHistory.unshift({
          type: "deposit",
          amount: action.payload.amount,
          date: action.payload.date,
          time: action.payload.time,
        });
      },
    },

    withdraw: {
      prepare(amount) {
        return {
          payload: {
            amount,
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        };
      },

      reducer(state, action) {
        state.balance -= action.payload.amount;
        state.transactionHistory.unshift({
          type: "withdraw",
          amount: action.payload.amount,
          date: action.payload.date,
          time: action.payload.time,
        });
      },
    },

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        };
      },

      reducer(state, action) {
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
        state.transactionHistory.unshift({
          type: "request loan",
          amount: action.payload.amount,
          date: action.payload.date,
          time: action.payload.time,
        });
      },
    },

    repayLoan: {
      prepare() {
        return {
          payload: {
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        };
      },
      reducer(state, action) {
        if (state.loan <= 0) return;

        state.transactionHistory.unshift({
          type: "repay loan",
          amount: state.loan,
          date: action.payload.date,
          time: action.payload.time,
        });
        state.balance -= state.loan;
        state.loan = 0;
        state.loanPurpose = "";
      },
    },

    logOut() {
      return initialState;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  withdraw,
  requestLoan,
  repayLoan,
  deposit,
  logOut,
} = accountSlice.actions;

export function depositAsync(amount, currency) {
  // if (currency === "USD") {
  //   dispatch(deposit(amount)); // ✅ triggers prepare()
  //   return;
  // }

  return async function (dispatch) {
    dispatch(startLoading());

    try {
      if (currency === "USD") {
        dispatch(deposit(amount)); // ✅ triggers prepare()
        return;
      }

      const res = await fetch(API_URL);

      if (!res.ok) {
        dispatch({ type: "account/startGlobalError" });
        throw new Error(`${res.status} Couldn't convert currency`);
      }

      const { data } = await res.json();

      const convertedAmt = Number((amount / data[currency]).toFixed(2));
      // console.log(data, convertedAmt);

      dispatch({ type: "account/stopGlobalError" });
      dispatch(deposit(convertedAmt)); // ✅ triggers prepare()

      return { data, convertedAmt };
    } catch (err) {
      console.error(`Something went wrong: ${err.message}`);
      dispatch({ type: "account/stopLoading" });
      throw err;
    }
    // finally {
    //   dispatch({ type: "account/stopLoading" });
    // }
  };
}

export default accountSlice.reducer;
