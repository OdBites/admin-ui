import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "./reducers";
import {
  authService,
  dashboardService,
  productService,
  ordersService,
  userService,
  paymentsService,
  profileService,
  supportService,
  inquiriesService,
} from "./rtkServices";

// create root reducer
const rootReducer = {
  auth: authReducer,
  [authService.reducerPath]: authService.reducer,
  [dashboardService.reducerPath]: dashboardService.reducer,
  [userService.reducerPath]: userService.reducer,
  [productService.reducerPath]: productService.reducer,
  [ordersService.reducerPath]: ordersService.reducer,
  [paymentsService.reducerPath]: paymentsService.reducer,
  [profileService.reducerPath]: profileService.reducer,
  [supportService.reducerPath]: supportService.reducer,
  [inquiriesService.reducerPath]: inquiriesService.reducer,
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
      ordersService.middleware,
      paymentsService.middleware,
      profileService.middleware,
      supportService.middleware,
      inquiriesService.middleware
    ),
});

export default store;
setupListeners(store.dispatch);
