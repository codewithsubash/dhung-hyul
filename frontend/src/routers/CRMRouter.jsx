import { Navigate, Route, Routes } from "react-router-dom";
import CRMDashboardScreen from "../screens/App/CRMDashboardScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import BlogRouter from "./BlogRouter/BlogRouter";
import CustomizeRouter from "./CustomizeRouter/CustomizeRouter";
import EventRouter from "./EventRouter/EventRouter";
import UserRouter from "./User/UserRouter";

// routers

export const CRMRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<CRMDashboardScreen />} />
      <Route path="blog*" element={<BlogRouter />} />
      <Route path="event*" element={<EventRouter />} />
      <Route path="customize-list*" element={<CustomizeRouter />} />
      <Route path="user*" element={<UserRouter />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default CRMRouter;
