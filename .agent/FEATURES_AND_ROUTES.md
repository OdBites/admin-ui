# Features And Routes

Routes are defined in `src/routes/index.js`.

| Path | Screen | Data Source |
| --- | --- | --- |
| `/` | Dashboard | API: `/admin/dashboard` |
| `/user-management` | Customer/User Management | API: `/admin/users` |
| `/user-management/:id` | Customer/User Details | API: `/admin/users/:id` |
| `/dish-management` | Dish Management | API: `/admin/products` |
| `/dish-management/:id` | Dish Details | API: `/admin/products/:id` |
| `/dish-management/add-dish` | Add Dish | API: `POST /admin/products` |
| `/dish-management/edit-dish/:id` | Edit Dish | API: `PUT /admin/products/:id` |
| `/order-management` | Order Management | API: `/admin/orders` |
| `/order-management/:orderId` | Order Details | API: `/admin/orders/:orderId` |
| `/payment-management` | Payment Management | API: `/admin/payments` |
| `/payment-management/:paymentId` | Payment Details | API: `/admin/payments/:id` |
| `/support` | Support | Static placeholder |
| `/profile` | Profile | API: `/admin/profile/:id` |
| `/forgot-password` | Forgot Password | API: `/admin/auth/forgot-password` |

## Important Behavior

- Sign-in is rendered by the layout when `auth_token` is missing.
- User management means customer management, not admin account management.
- Customer block/unblock/delete/edit actions call the `/admin/users` API.
- Order list/detail/status actions call the `/admin/orders` API.
- Product and payment flows are API-backed.
