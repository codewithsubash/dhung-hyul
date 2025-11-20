import { Routes, Route } from "react-router-dom";
import RegisterScreen from "../components/RegisterScreen";
import SignInScreen from "../components/SignInScreen";
import HomeScreen from "../screens/Guest/Home/HomeScreen";
import AboutScreen from "../screens/Guest/About/AboutScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import GuestLayout from "../layouts/GuestLayout";
import GalleryScreen from "../screens/Guest/Gallery/GalleryScreen";
import BlogScreen from "../screens/Guest/Blog/BlogScreen";
import EventScreen from "../screens/Guest/Events/EventScreen";
import GetInvolved from "../screens/Guest/GetInvolved/GetInvolved";

const GuestRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
      <Route index element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/gallery" element={<GalleryScreen />} />
      <Route path="/blog" element={<BlogScreen />} />
      <Route path="/events" element={<EventScreen />} />
      <Route path="/getinvolved" element={<GetInvolved />} />
      </Route>
      <Route path="/sign-up" element={<RegisterScreen />} />
      <Route path="/sign-in" element={<SignInScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default GuestRouter;
