import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "../src/features/accounts/accountSlice";
import authReducer from "../src/features/auth/authSlice";
import { saveAccountToStorage } from "./utils/helpers";

const store = configureStore({
  reducer: {
    account: accountReducer,
    auth: authReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  // Only save account if a user is logged in
  if (!state.auth.isAuthenticated) return;

  if (state.auth.isAuthenticated) {
    saveAccountToStorage(
      {
        balance: state.account.balance,
        transactionHistory: state.account.transactionHistory,
        loan: state.account.loan,
        loanPurpose: state.account.loanPurpose,
      },
      state.auth.user.username,
    );
  }

  // saveAccountToStorage({
  //   balance: state.account.balance,
  //   transactionHistory: state.account.transactionHistory,
  //   loan: state.account.loan,
  //   loanPurpose: state.account.loanPurpose,
  // });
});

export default store;
