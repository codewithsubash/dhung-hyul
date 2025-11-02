import { Routes, Route } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/Guest/Home/HomeScreen";
import SignInScreen from "../screens/Guest/SignIn/SignInScreen";
import AboutScreen from "../screens/Guest/About/AboutScreen";

const GuestRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
      </Route>
      <Route path="/sign-in" element={<SignInScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default GuestRouter;
