import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "./reducers";
import { authService } from "./services";

// create root reducer
const rootReducer = {
  auth: authReducer,
  [authService.reducerPath]: authService.reducer,
};

// setup store
const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware),
});

export default Store;
setupListeners(Store.dispatch);
