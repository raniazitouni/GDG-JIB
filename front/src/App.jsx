import SideBar from "./components/shared/sideBar.jsx";
import Events from "./pages/events/Events.jsx";
import AddEvent from "./pages/addEvent/AddEvent.jsx";
import Setting from "./pages/Settings/Settings.jsx";
import Profil from "./pages/profil/Profil.jsx";
import LoginPage from "./components/shared/LoginPage.jsx"; // Import LoginPage

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        {/* Conditional rendering of Sidebar */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <>
                <SideBar Role="Club" />
                <div className="flex-1 p-6">
                  <Routes>
                    <Route path="/events" element={<Events />} />
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/profil" element={<Profil />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      
    </Router>
  );
}

export default App;
