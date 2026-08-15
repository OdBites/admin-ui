export const tableColumns = {
  userMgmt: [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
    { id: "orders", label: "Orders" },
    { id: "totalSpent", label: "Total Spent (₹)" },
    { id: "createdBy", label: "Created By" },
    { id: "createdAt", label: "Created At" },
    { id: "updatedAt", label: "Updated At" },
    { id: "actions", label: "Actions" },
  ],
  productMgmt: [
    { id: "_id", label: "Item ID" },
    { id: "name", label: "Dish Name" },
    { id: "category", label: "Category" },
    { id: "subCategory", label: "Cuisine Type" },
    { id: "price", label: "Price (₹)" },
    { id: "discountPrice", label: "Offer Price (₹)" },
    { id: "stock", label: "Available Qty" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Added On" },
    { id: "updatedAt", label: "Updated On" },
    { id: "actions", label: "Actions" },
  ],
  orderMgmt: [
    { id: "orderId", label: "Order ID" },
    { id: "customerName", label: "Customer Name" },
    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
    { id: "totalAmount", label: "Total (₹)" },
    { id: "paymentMethod", label: "Payment Method" },
    { id: "orderDate", label: "Order Date" },
    { id: "actions", label: "Actions" },
  ],
  paymentMgmt: [
    { id: "_id", label: "Payment ID" },
    { id: "orderId", label: "Order ID" },
    { id: "customerName", label: "Customer Name" },
    { id: "method", label: "Payment Method" },
    { id: "status", label: "Status" },
    { id: "amount", label: "Amount (₹)" },
    { id: "paidAt", label: "Paid At" },
    { id: "actions", label: "Actions" },
  ],
};

export const dropDownOptions = {
  userMgmt: {
    status: [
      { value: "", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "blocked", label: "Blocked" },
      { value: "pending", label: "Pending" },
    ],
    orders: [
      { value: "", label: "All" },
      { value: "withOrders", label: "With Orders" },
      { value: "noOrders", label: "No Orders" },
    ],
    dateInterval: [
      { value: "", label: "None" },
      { value: "today", label: "Today" },
      { value: "last7Days", label: "Last 7 Days" },
      { value: "last30Days", label: "Last 30 Days" },
      { value: "last90Days", label: "Last 90 Days" },
    ],
    createdBy: [
      { value: "", label: "All Users" },
      { value: "admin", label: "Created By Admin" },
      { value: "user", label: "Created By User" },
    ],

    sort: [
      { value: "nameA-Z", label: "Name (A-Z)" },
      { value: "nameZ-A", label: "Name (Z-A)" },
      { value: "createdAtNew-Old", label: "Created User (New-Old)" },
      {
        value: "createdAtOld-New",
        label: "Created User (Old-New)",
        default: true,
      },
    ],
  },

  productMgmt: {
    status: [
      { value: "", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "inActive", label: "Inactive" },
      { value: "outOfStock", label: "Out of Stock" },
      { value: "blocked", label: "Blocked" },
    ],
    category: [
      { value: "", label: "All Categories" },
      { value: "mainCourse", label: "Main Course" },
      { value: "starters", label: "Starters" },
      { value: "beverages", label: "Beverages" },
      { value: "desserts", label: "Desserts" },
    ],
    subCategory: {
      mainCourse: [
        { value: "biryani", label: "Biryani" },
        { value: "curry", label: "Curry" },
        { value: "rice", label: "Rice Items" },
      ],
      starters: [
        { value: "appetizer", label: "Appetizer" },
        { value: "chinese", label: "Chinese" },
      ],
      beverages: [
        { value: "coffee", label: "Coffee" },
        { value: "tea", label: "Tea" },
        { value: "mocktails", label: "Mocktails" },
        { value: "softDrinks", label: "Soft Drinks" },
      ],
      desserts: [
        { value: "sweets", label: "Sweets" },
        { value: "iceCream", label: "Ice Cream" },
      ],
    },
    dateInterval: [
      { value: "", label: "None" },
      { value: "today", label: "Today" },
      { value: "last7Days", label: "Last 7 Days" },
      { value: "last30Days", label: "Last 30 Days" },
      { value: "last90Days", label: "Last 90 Days" },
    ],
    sort: [
      { value: "nameA-Z", label: "Name (A-Z)" },
      { value: "nameZ-A", label: "Name (Z-A)" },
      { value: "priceLow-High", label: "Price (Low to High)" },
      { value: "priceHigh-Low", label: "Price (High to Low)" },
      { value: "createdAtNew-Old", label: "Created At (New - Old)" },
      {
        value: "createdAtOld-New",
        label: "Created At (Old - New)",
        default: true,
      },
    ],
  },

  orderMgmt: {
    status: [
      { value: "", label: "All Statuses" },
      { value: "Processing", label: "Processing" },
      { value: "Shipped", label: "Shipped" },
      { value: "Delivered", label: "Delivered" },
      { value: "Cancelled", label: "Cancelled" },
      { value: "Returned", label: "Returned" },
    ],
    paymentMethods: [
      { value: "", label: "All Payment Methods" },
      { value: "Online", label: "Online" },
      { value: "COD", label: "Cash on Delivery" },
      { value: "UPI", label: "UPI" },
      { value: "Wallet", label: "Wallet" },
    ],
    dateInterval: [
      { value: "", label: "None" },
      { value: "today", label: "Today" },
      { value: "last7Days", label: "Last 7 Days" },
      { value: "last30Days", label: "Last 30 Days" },
      { value: "last90Days", label: "Last 90 Days" },
    ],
    sort: [
      { value: "orderDateNew-Old", label: "Order Date (New - Old)" },
      { value: "orderDateOld-New", label: "Order Date (Old - New)" },
      { value: "totalAmountHigh-Low", label: "Amount (High - Low)" },
      { value: "totalAmountLow-High", label: "Amount (Low - High)" },
      {
        value: "customerNameA-Z",
        label: "Customer Name (A-Z)",
        default: true,
      },
      { value: "customerNameZ-A", label: "Customer Name (Z-A)" },
    ],
  },

  paymentMgmt: {
    status: [
      { value: "", label: "All Statuses" },
      { value: "success", label: "Success" },
      { value: "failed", label: "Failed" },
      { value: "pending", label: "Pending" },
      { value: "refunded", label: "Refunded" },
    ],
    paymentMethods: [
      { value: "", label: "All Payment Methods" },
      { value: "online", label: "Online" },
      { value: "COD", label: "Cash on Delivery" },
      { value: "UPI", label: "UPI" },
      { value: "wallet", label: "Wallet" },
    ],
    dateInterval: [
      { value: "", label: "None" },
      { value: "today", label: "Today" },
      { value: "last7Days", label: "Last 7 Days" },
      { value: "last30Days", label: "Last 30 Days" },
      { value: "last90Days", label: "Last 90 Days" },
    ],
    sort: [
      { value: "paidAtNew-Old", label: "Paid Date (New - Old)" },
      { value: "paidAtOld-New", label: "Paid Date (Old - New)" },
      { value: "amountHigh-Low", label: "Amount (High - Low)" },
      { value: "amountLow-High", label: "Amount (Low - High)" },
      {
        value: "customerNameA-Z",
        label: "Customer Name (A-Z)",
        default: true,
      },
      { value: "customerNameZ-A", label: "Customer Name (Z-A)" },
    ],
  },
};
