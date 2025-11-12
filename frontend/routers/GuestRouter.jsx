import { Routes, Route } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/Guest/Home/HomeScreen";
import AboutScreen from "../screens/Guest/About/AboutScreen";
import RegisterScreen from "../src/components/RegisterScreen";
import SignInScreen from "../src/components/SignInScreen";

const GuestRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
      </Route>
      <Route path="/sign-up" element={<RegisterScreen />} />
      <Route path="/sign-in" element={<SignInScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default GuestRouter;
