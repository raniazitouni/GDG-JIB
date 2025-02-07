import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import SideBar from "./components/shared/sideBar.jsx";
import Navbar from "./components/shared/NavBar.jsx";
import Events from "./pages/events/Events.jsx";
import AddEvent from "./pages/addEvent/AddEvent.jsx";
import Setting from "./pages/Settings/Settings.jsx";
import Profil from "./pages/profil/Profil.jsx";
import RequireAuth from "./components/shared/RequireAuth.jsx";
import { useState, useEffect } from "react";

const Layout = () => {
  const ROLES = ["etudiant", "club", "entreprise"];

  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.replace("/", "");

  const [redirected, setRedirected] = useState(false);

  // Fonction pour obtenir la première page selon le rôle
  const getFirstPage = (role) => {
    switch (role) {
      case "club":
        return "/events";
      case "etudiant":
        return "/events";
      default:
        return "/events";
    }
  };

  useEffect(() => {
    if (auth && !redirected) {
      const firstPage = getFirstPage(auth?.roles);
      navigate(firstPage);
      setRedirected(true);
    }
  }, [auth, redirected, navigate]);

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

          {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Layout;