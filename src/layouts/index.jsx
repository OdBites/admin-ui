import React, { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import packageJson from "../../package.json";

// // mf import
import { AdminLayout } from "OdBitesMfUI/layouts";
import { useCookies } from "OdBitesMfUI/hooks";

import { LogoutModal } from "../view/profile/components";
import SignIn from "../view/auth/pages/SignIn";
import { useGetProfileDetailsQuery } from "../store/rtkServices";

function Layout() {
  const { getCookie } = useCookies();
  let isAuthenticated = !!getCookie("admin_auth_token");
  const userId = getCookie("admin_id");

  // // rtk query
  const { data: profileDetails = {}, isFetching } = isAuthenticated
    ? useGetProfileDetailsQuery(userId)
    : { data: {} };

  const [logoutModal, setLogoutModal] = useState({ open: false });
  return (
    <>
      {isAuthenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <AdminLayout
            version={packageJson.version}
            openLogoutDialog={() => setLogoutModal({ open: true })}
            profileData={profileDetails}
          >
            <Outlet />
          </AdminLayout>
        </Suspense>
      ) : (
        <SignIn />
      )}
      <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
    </>
  );
}

export default Layout;
