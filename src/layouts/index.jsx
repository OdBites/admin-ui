import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import packageJson from "../../package.json";

import { AdminLayout } from "OdBitesMfUI/layouts";
import { useCookies } from "OdBitesMfUI/hooks";

import { adminMenuItems } from "../constant";
import { OrderQueueNotifier } from "../sharedComponents";
import SignIn from "../view/auth/pages/SignIn";

import { useGetProfileDetailsQuery } from "../store/rtkServices";

function Layout() {
  const { getCookie } = useCookies();
  const isAuthenticated = !!getCookie("admin_auth_token");
  const userId = getCookie("admin_id");

  const { data: profileDetails = {} } = isAuthenticated
    ? useGetProfileDetailsQuery(userId)
    : { data: {} };

  return (
    <>
      {isAuthenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <AdminLayout
            version={packageJson.version}
            profileData={profileDetails}
            menuItems={adminMenuItems}
          >
            <Outlet />
          </AdminLayout>
          <OrderQueueNotifier />
        </Suspense>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default Layout;
