import { Route, Routes } from "react-router-dom";
import GuestRouter from "./routers/GuestRouter";
import NotFoundScreen from "./screens/NotFoundScreen";
import ProtectedRoutes from "./routers/middlewares/ProtectedRoutes";
import AppRouter from "./routers/AppRouter";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/*" element={<GuestRouter />} />
     


      {/* Protected */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/app/*" element={<AppRouter />} />
      </Route>
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}
