import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SideBar from "./components/shared/sideBar.jsx";
import Navbar from "./components/shared/navbar.jsx";
import Events from "./pages/events/Events.jsx";
import AddEvent from "./pages/addEvent/AddEvent.jsx";
import Setting from "./pages/Settings/Settings.jsx";
import Profil from "./pages/profil/Profil.jsx";
import RequireAuth from "./components/shared/required.jsx";

const Layout = () => {
  const ROLES = ["etudiant", "club", "entreprise"];

  const { auth } = useAuth();
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "");

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <SideBar Role={auth?.roles || "etudiant"} />
      <div className="flex-1">
        <Navbar page={currentPage} name={auth?.name || "Guest"} />
        <Routes>
          <Route element={<RequireAuth allowedRoles={[ROLES[0], ROLES[1]]} />}>
            <Route path="/events" element={<Events />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES[1]]} />}>
            <Route path="/add-event" element={<AddEvent />} />
          </Route>

          {/* add opportunities , interships , addinternships , chat */}

          <Route path="/settings" element={<Setting />} />
          <Route path="/profil" element={<Profil />} />

          <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
