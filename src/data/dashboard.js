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
  { id: "id", label: "ID", align: "left" },
  // { id: "product", label: "Product", align: "left" },
  { id: "customerName", label: "Customer", align: "left" },
  { id: "totalAmount", label: "Amount", align: "right" },
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
  { id: "id", label: "ID", align: "left" },
  { id: "name", label: "Name", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "registeredAt", label: "Registered At", align: "right" },
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
