import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "../src/features/accounts/accountSlice";
import customerReducer from "../src/features/customer/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
