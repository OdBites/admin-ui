import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "./reducers";
import {
  authService,
  dashboardService,
  productService,
  userService,
  paymentsService,
  profileService,
} from "./rtkServices";

// create root reducer
const rootReducer = {
  auth: authReducer,
  [authService.reducerPath]: authService.reducer,
  [dashboardService.reducerPath]: dashboardService.reducer,
  [userService.reducerPath]: userService.reducer,
  [productService.reducerPath]: productService.reducer,
  [paymentsService.reducerPath]: paymentsService.reducer,
  [profileService.reducerPath]: profileService.reducer,
};

// setup store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      dashboardService.middleware,
      userService.middleware,
      productService.middleware,
      paymentsService.middleware,
      profileService.middleware
    ),
});

export default store;
setupListeners(store.dispatch);
