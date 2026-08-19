export const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
];

export const productDemand = [
  { name: "Laptops", demand: 300 },
  { name: "Phones", demand: 500 },
  { name: "Tablets", demand: 200 },
  { name: "Accessories", demand: 400 },
];

// Sample Data for Recent Orders
export const orderColumns = [
  { id: "id", label: "Order Id", align: "left", minWidth: 80 },
  { id: "customerName", label: "Customer", align: "left", minWidth: 150 },
  { id: "totalAmount", label: "Amount", align: "right", minWidth: 90 },
];

export const orderRows = [
  { id: "1001", product: "Laptop", customer: "John Doe", amount: "$1200" },
  {
    id: "1002",
    product: "Smartphone",
    customer: "Jane Smith",
    amount: "$800",
  },
  { id: "1003", product: "Tablet", customer: "Alice Brown", amount: "$500" },
];

// Sample Data for Newly Registered Users
export const userColumns = [
  { id: "id", label: "User Id", align: "left", minWidth: 80 },
  { id: "name", label: "Name", align: "left", minWidth: 140 },
  { id: "email", label: "Email", align: "left", minWidth: 160 },
  { id: "registeredAt", label: "Registered At", align: "right", minWidth: 120 },
];

export const userRows = [
  {
    id: "U001",
    name: "Michael Scott",
    email: "michael@dundermifflin.com",
    registeredAt: "2024-09-10",
  },
  {
    id: "U002",
    name: "Jim Halpert",
    email: "jim@dundermifflin.com",
    registeredAt: "2024-09-11",
  },
  {
    id: "U003",
    name: "Pam Beesly",
    email: "pam@dundermifflin.com",
    registeredAt: "2024-09-12",
  },
];
