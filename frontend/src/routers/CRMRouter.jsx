import { Navigate, Route, Routes } from "react-router-dom";
import CRMDashboardScreen from "../screens/App/CRMDashboardScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

// routers

export const CRMRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<CRMDashboardScreen />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default CRMRouter;
