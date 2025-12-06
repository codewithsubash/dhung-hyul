import { Routes, Route } from "react-router-dom";
import RegisterScreen from "../components/RegisterScreen";
import SignInScreen from "../components/SignInScreen";
import HomeScreen from "../screens/Guest/Home/HomeScreen";
import AboutScreen from "../screens/Guest/About/AboutScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import GuestLayout from "../layouts/GuestLayout";
import GuestOnly from "./middlewares/GuestOnly";
import GalleryScreen from "../screens/Guest/Gallery/GalleryScreen";
import BlogScreen from "../screens/Guest/Blog/BlogScreen";
import EventScreen from "../screens/Guest/Events/EventScreen";
import GetInvolved from "../screens/Guest/GetInvolved/GetInvolved";
import GetInvolvedScreen from "../screens/Guest/GetInvolved/GetInvolvedScreen";
import EventDetails from "../screens/Guest/Events/EventDetails";
import ContactScreen from "../screens/Guest/Contact/ContactScreen";
import BlogDetailPage from "../screens/Guest/Blog/components/BlogDetailPage";
import ForgotPasswordScreen from "../components/ForgotPasswordScreen";
import ResetPasswordScreen from "../components/ResetPasswordScreen";

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
        <Route
          path="/contact"
          element={
            <GuestOnly>
              <ContactScreen />
            </GuestOnly>
          }
        />

        <Route
          path="/gallery"
          element={
            <GuestOnly>
              <GalleryScreen />
            </GuestOnly>
          }
        />
        <Route
          path="/getinvolved"
          element={
            <GuestOnly>
              <GetInvolvedScreen />
            </GuestOnly>
          }
        />

        <Route
          path="/blog"
          element={
            <GuestOnly>
              <BlogScreen />
            </GuestOnly>
          }
        />
        <Route
          path="/blog/:slug/detail"
          element={
            <GuestOnly>
              <BlogDetailPage />
            </GuestOnly>
          }
        />
        <Route
          path="/event/:slug/detail"
          element={
            <GuestOnly>
              <EventDetails />
            </GuestOnly>
          }
        />
        <Route
          path="/events"
          element={
            <GuestOnly>
              <EventScreen />
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
      <Route
        path="/forgot-password"
        element={
          <GuestOnly>
            <ForgotPasswordScreen />
          </GuestOnly>
        }
      />
      <Route
        path="/reset-password"
        element={
          <GuestOnly>
            <ResetPasswordScreen />
          </GuestOnly>
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default GuestRouter;
