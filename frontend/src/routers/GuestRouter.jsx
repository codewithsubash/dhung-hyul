import { Routes, Route } from "react-router-dom";
import RegisterScreen from "../components/RegisterScreen";
import SignInScreen from "../components/SignInScreen";
import HomeScreen from "../screens/Guest/Home/HomeScreen";
import AboutScreen from "../screens/Guest/About/AboutScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import GuestLayout from "../layouts/GuestLayout";
import GuestOnly from "./middlewares/GuestOnly";

const GuestRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestOnly>
            <GuestLayout />
          </GuestOnly>
        }
      >
        <Route
          index
          element={
            <GuestOnly>
              <HomeScreen />
            </GuestOnly>
          }
        />
        <Route
          path="/about"
          element={
            <GuestOnly>
              <AboutScreen />
            </GuestOnly>
          }
        />
      </Route>
      <Route
        path="/sign-up"
        element={
          <GuestOnly>
            <RegisterScreen />
          </GuestOnly>
        }
      />
      <Route
        path="/sign-in"
        element={
          <GuestOnly>
            <SignInScreen />
          </GuestOnly>
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default GuestRouter;
