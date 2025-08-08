import React, { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import packageJson from "../../package.json";

// // mf import
import { AdminLayout } from "SpiseBowlMfUI/layouts";
import { useCookies } from "SpiseBowlMfUI/hooks";

import { LogoutModal } from "../pages/profile/components";
import SignIn from "../pages/auth/SignIn";
import { useGetProfileDetailsQuery } from "../store/rtkServices";

function Layout() {
  const { getCookie } = useCookies();
  let isAuthenticated = !!getCookie("auth_token");
  const userId = getCookie("user_id");

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
