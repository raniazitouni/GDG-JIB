import SideBar from "./components/shared/sideBar.jsx"
import Navbar from "./components/shared/navbar.jsx";
import Events from "./pages/events/Events.jsx";
import AddEvent from "./pages/addEvent/AddEvent.jsx";
import Setting from "./pages/Settings/Settings.jsx";
import Profil from "./pages/profil/Profil.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import Layout from "./layout.jsx";


function App() {

  return (
    <Router>
      {/* <div className="flex">
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
      </div> */}
      <Layout/>
    </Router>
  );
}

export default App
