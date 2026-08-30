const adminPath = (path = "") => `/admin${path}`;

export const adminApiEndpoints = {
  auth: {
    login: adminPath("/auth/login"),
    forgotPassword: adminPath("/auth/forgot-password"),
    resetPassword: adminPath("/auth/reset-password"),
    changePassword: adminPath("/auth/change-password"),
  },
  dashboard: {
    base: adminPath("/dashboard"),
  },
  users: {
    base: adminPath("/users"),
    user: (id) => adminPath(`/users/${id}`),
    status: (id) => adminPath(`/users/${id}/status`),
    profilePicture: (id) => adminPath(`/users/${id}/profile-picture`),
    export: adminPath("/users/export"),
  },
  products: {
    base: adminPath("/products"),
    product: (id) => adminPath(`/products/${id}`),
    toggleStatus: (id) => adminPath(`/products/${id}/toggle-status`),
    export: adminPath("/products/export"),
  },
  orders: {
    base: adminPath("/orders"),
    order: (id) => adminPath(`/orders/${id}`),
    status: (id) => adminPath(`/orders/${id}/status`),
    export: adminPath("/orders/export"),
  },
  payments: {
    base: adminPath("/payments"),
    payment: (id) => adminPath(`/payments/${id}`),
    export: adminPath("/payments/export"),
  },
  profile: {
    base: (id) => adminPath(`/profile/${id}`),
    photo: (id) => adminPath(`/profile/${id}/photo`),
  },
};
