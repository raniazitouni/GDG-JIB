import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SideBar from "./components/shared/sideBar.jsx";
import Navbar from "./components/shared/navbar.jsx";
import Events from "./pages/events/Events.jsx";
import AddEvent from "./pages/addEvent/AddEvent.jsx";
import Setting from "./pages/Settings/Settings.jsx";
import Profil from "./pages/profil/Profil.jsx";

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "");

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex">
      <SideBar Role={user?.role || "user"} />
      <div className="flex-1">
        <Navbar page={currentPage} name={user?.name || "Guest"} />
        <Routes>
          <Route path="/events" element={<Events />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
