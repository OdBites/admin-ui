import React from "react";
import { RestrictedToGuests } from "nexCartMfUI/hoc";

export const userRoutes = [
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: React.lazy(() => import("../pages/dashboard")),
  },
  {
    path: "/user-management",
    name: "UserManagement",
    exact: true,
    component: React.lazy(() => import("../pages/userMgmt")),
  },
  {
    path: "/user-management/:id",
    name: "UserDetails",
    exact: true,
    component: React.lazy(() => import("../pages/userMgmt/details")),
  },
  {
    path: "/dish-management",
    name: "DishManagement",
    exact: true,
    component: React.lazy(() => import("../pages/productMgmt")),
  },
  {
    path: "/dish-management/:id",
    name: "DishDetails",
    exact: true,
    component: React.lazy(() => import("../pages/productMgmt/details")),
  },
  {
    path: "/dish-management/add-dish",
    name: "AddDish",
    exact: true,
    component: React.lazy(() => import("../pages/productMgmt/addProduct")),
  },
  {
    path: "/order-management",
    name: "OrderManagement",
    exact: true,
    component: React.lazy(() => import("../pages/orderMgmt")),
  },
  {
    path: "/order-management/:orderId",
    name: "OrderDetails",
    exact: true,
    component: React.lazy(() => import("../pages/orderMgmt/details")),
  },
  {
    path: "/payment-management",
    name: "PaymentManagement",
    exact: true,
    component: React.lazy(() => import("../pages/paymentMgmt")),
  },
  {
    path: "/payment-management/:paymentId",
    name: "PaymentDetails",
    exact: true,
    component: React.lazy(() => import("../pages/paymentMgmt/details")),
  },
  {
    path: "/support",
    name: "Support",
    exact: true,
    component: React.lazy(() => import("../pages/support")),
  },
  {
    path: "/profile",
    name: "Profile",
    exact: true,
    component: React.lazy(() => import("../pages/profile")),
  },
  {
    redirectRoute: true,
    name: "Dashboard",
    path: "/",
  },
];

export const guestRoutes = [
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    exact: true,
    component: RestrictedToGuests(
      React.lazy(() => import("../pages/auth/ForgetPassword"))
    ),
  },
  {
    redirectRoute: true,
    name: "ForgotPassword",
    path: "/forgot-password",
  },
];
