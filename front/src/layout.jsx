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
import Chat from "./pages/chat/Chat.jsx";
import AddInternships from "./pages/addInternships/AddInternships.jsx";
import InternshipForm from "./pages/Internships/InternshipForm.jsx";
import Internships from "./pages/interships/internships.jsx";
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
      case "entreprise":
        return "/internships";
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

          <Route element={<RequireAuth allowedRoles={[ROLES[0], ROLES[2]]} />}>
            <Route path="/internships" element={<Internships />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES[0]]} />}>
            <Route path="/Chat" element={<Chat />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
            <Route path="/AddInternships" element={<AddInternships />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES[0]]} />}>
            <Route path="/ApplyInternships" element={<InternshipForm />} />
          </Route>

          {/* <Route path="/settings" element={<Setting />} /> */}
          <Route path="/profil" element={<Setting />} />

          {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
