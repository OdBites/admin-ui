import React, { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import packageJson from "../../package.json";

// // mf import
import { AdminLayout } from "nexCartMfUI/layouts";
import { useCookies } from "nexCartMfUI/hooks";

import LogoutModal from "../pages/profile/components/LogoutModal";
import SignIn from "../pages/auth/SignIn";

function Layout() {
  const { getCookie } = useCookies();
  let isAuthenticated = !!getCookie("auth_token");

  const [logoutModal, setLogoutModal] = useState({ open: false });
  return (
    <>
      {isAuthenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
          <AdminLayout
            version={packageJson.version}
            openLogoutDialog={() => setLogoutModal({ open: true })}
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
