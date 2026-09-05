import React from "react";
import {
  DashboardTwoTone,
  ManageAccountsTwoTone,
  FastfoodTwoTone,
  DeliveryDiningTwoTone,
  PaymentsTwoTone,
  ContactMailTwoTone,
} from "@mui/icons-material";

export const adminMenuItems = [
  { text: "Dashboard", icon: <DashboardTwoTone />, path: "/" },
  {
    text: "User Management",
    icon: <ManageAccountsTwoTone />,
    path: "/user-management",
  },
  {
    text: "Dish Management",
    icon: <FastfoodTwoTone />,
    path: "/dish-management",
  },
  {
    text: "Order Management",
    icon: <DeliveryDiningTwoTone />,
    path: "/order-management",
  },
  {
    text: "Payment Management",
    icon: <PaymentsTwoTone />,
    path: "/payment-management",
  },
  {
    text: "Contact Inquiries",
    icon: <ContactMailTwoTone />,
    path: "/inquiries",
  },
];
