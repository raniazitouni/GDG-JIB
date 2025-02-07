/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpStudent from "./pages/login/SignUpStudent";
import SignUpClub from "./pages/login/SignUpClub";
import SignUpCompany from "./pages/login/SignUpCompany";
import InternshipForm from "./pages/Internships/InternshipForm";
import Layout from "./layout";
import LoginPage from "./pages/login/LoginPage";
import GetStarted from "./pages/login/GetStarted";
import Settings from "./pages/Settings/Settings"; // Adjust path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/GetStarted" element={<GetStarted />} />
        <Route path="/SignUpStudent" element={<SignUpStudent />} />
        <Route path="/SignUpClub" element={<SignUpClub />} />
        <Route path="/SignUpCompany" element={<SignUpCompany />} />
        <Route path="/InternshipForm" element={<InternshipForm />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
