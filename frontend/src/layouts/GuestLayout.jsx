import { Outlet } from "react-router-dom";
import Header from "../screens/Header";
import Footer from "../screens/Footer";

export default function GuestLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
