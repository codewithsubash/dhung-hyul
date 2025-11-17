import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SidebarLayout from "../components/SidebarLayout/SidebarLayout";
import CRMRouter from "./CRMRouter";
import { useAuth } from "../hooks/useAuth";
import CRMSidebar from "../components/Sidebar/CRMSidebar";
import NotFoundScreen from "../screens/NotFoundScreen";
import CRMOnly from "./middlewares/CRMOnly";

const AppRouter = () => {
  const { isAdmin } = useAuth();

  const sidebarProps = React.useMemo(() => {
    let sidebar,
      appBarContent = null;

    if (isAdmin) {
      sidebar = CRMSidebar;
      // appBarContent = CRMAppBar;
    }

    return { sidebar, appBarContent };
  }, [isAdmin]);

  // React.useEffect(() => {
  //   if (loggedInUser) onUserOnline(loggedInUser);
  // }, [loggedInUser]);

  return (
    <Routes>
      <Route element={<SidebarLayout {...sidebarProps} />}>
        <Route index element={<Navigate to="crm" replace />} />

        <Route
          path="crm/*"
          element={
            <CRMOnly>
              <CRMRouter />
            </CRMOnly>
          }
        />

        <Route path="*" element={<NotFoundScreen />} />
      </Route>

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default AppRouter;
