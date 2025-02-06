import SideBar from "./components/shared/sideBar.jsx"
import Events from "./pages/events/Events.jsx";
import AddEvent from "./pages/addEvent/AddEvent.jsx";
import Setting from "./pages/Settings/Settings.jsx";
import Profil from "./pages/profil/Profil.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="flex">
        <SideBar Role="Club" />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/events" element={<Events />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
