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
    { id: "id", label: "Item ID" },
    { id: "name", label: "Dish Name" },
    { id: "mainCategory", label: "Category" },
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
    { id: "id", label: "Payment ID" },
    { id: "orderId", label: "Order ID" },
    { id: "customerName", label: "Customer Name" },
    { id: "method", label: "Payment Method" },
    { id: "status", label: "Status" },
    { id: "amount", label: "Amount (₹)" },
    { id: "paidAt", label: "Paid At" },
    { id: "actions", label: "Actions" },
  ],
};

export const droDownOptions = {
  userMgmt: {
    status: [
      { value: "", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "blocked", label: "Blocked" },
    ],
    orders: [
      { value: "", label: "All" },
      { value: "with-orders", label: "With Orders" },
      { value: "no-orders", label: "No Orders" },
    ],
    dateInterval: [
      { value: "", label: "None" },
      { value: "today", label: "Today" },
      { value: "last-7-days", label: "Last 7 Days" },
      { value: "last-30-days", label: "Last 30 Days" },
      { value: "last-90-days", label: "Last 90 Days" },
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
      { value: "inactive", label: "Inactive" },
      { value: "out-of-stock", label: "Out of Stock" },
      { value: "blocked", label: "Blocked" },
    ],
    category: [
      { value: "", label: "All Categories" },
      { value: "main-course", label: "Main Course" },
      { value: "starters", label: "Starters" },
      { value: "beverages", label: "Beverages" },
      { value: "desserts", label: "Desserts" },
    ],
    subCategory: {
      "main-course": [
        { value: "biryani", label: "Biryani" },
        { value: "curry", label: "Curry" },
        { value: "rice", label: "Rice Items" },
      ],
      starters: [
        { value: "appetizer", label: "Appetizer" },
        { value: "chinese", label: "Chinese" },
      ],
      beverages: [
        { value: "mocktails", label: "Mocktails" },
        { value: "soft-drinks", label: "Soft Drinks" },
      ],
      desserts: [
        { value: "sweets", label: "Sweets" },
        { value: "ice-cream", label: "Ice Cream" },
      ],
    },
    dateInterval: [
      { value: "", label: "None" },
      { value: "today", label: "Today" },
      { value: "last-7-days", label: "Last 7 Days" },
      { value: "last-30-days", label: "Last 30 Days" },
      { value: "last-90-days", label: "Last 90 Days" },
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
      { value: "last-7-days", label: "Last 7 Days" },
      { value: "last-30-days", label: "Last 30 Days" },
      { value: "last-90-days", label: "Last 90 Days" },
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
      { value: "Success", label: "Success" },
      { value: "Failed", label: "Failed" },
      { value: "Pending", label: "Pending" },
      { value: "Refunded", label: "Refunded" },
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
      { value: "last-7-days", label: "Last 7 Days" },
      { value: "last-30-days", label: "Last 30 Days" },
      { value: "last-90-days", label: "Last 90 Days" },
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
