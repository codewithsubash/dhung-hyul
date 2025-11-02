import { Route, Routes } from "react-router-dom";
import CRMRouter from "../routers/CRMRouter";
import GuestRouter from "../routers/GuestRouter";
import ProtectedRoutes from "../routers/middlewares/ProtectedRoutes";
import NotFoundScreen from "../screens/NotFoundScreen";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/*" element={<GuestRouter />} />

      {/* Protected */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/app/*" element={<CRMRouter />} />
      </Route>
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}
