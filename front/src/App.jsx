/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import Layout from "./layout.jsx";
import Login from "./pages/login/LoginPage.jsx";
import GetStartedPage from "./pages/login/GetStarted.jsx";
import SignUpStudent from "./pages/login/SignUpStudent.jsx";
import SignUpClub from "./pages/login/SignUpClub.jsx";
import SignUpCompany from "./pages/login/SignUpCompany.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/GetStarted" element={<GetStartedPage />} />
        <Route path="/SignUpStudent" element={<SignUpStudent />} />
        <Route path="/SignUpClub" element={<SignUpClub />} />
        <Route path="/SignUpCompany" element={<SignUpCompany />} />
        
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
