const adminPath = (path = "") => `/admin${path}`;

export const adminApiEndpoints = {
  auth: {
    login: adminPath("/auth/login"),
    forgotPassword: adminPath("/auth/forgot-password"),
    changePassword: adminPath("/auth/change-password"),
  },
  dashboard: adminPath("/dashboard"),
  users: adminPath("/users"),
  user: (id) => adminPath(`/users/${id}`),
  userStatus: (id) => adminPath(`/users/${id}/status`),
  userProfilePicture: (id) => adminPath(`/users/${id}/profile-picture`),
  products: adminPath("/products"),
  product: (id) => adminPath(`/products/${id}`),
  productToggleStatus: (id) => adminPath(`/products/${id}/toggle-status`),
  payments: adminPath("/payments"),
  payment: (id) => adminPath(`/payments/${id}`),
  profile: (id) => adminPath(`/profile/${id}`),
  profilePhoto: (id) => adminPath(`/profile/${id}/photo`),
  orders: adminPath("/orders"),
  order: (id) => adminPath(`/orders/${id}`),
  orderStatus: (id) => adminPath(`/orders/${id}/status`),
};
