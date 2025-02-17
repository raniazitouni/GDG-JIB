/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpStudent from "./pages/login/SignUpStudent";
import SignUpClub from "./pages/login/SignUpClub";
import SignUpCompany from "./pages/login/SignUpCompany";

import Layout from "./layout";
import LoginPage from "./pages/login/LoginPage";
import GetStarted from "./pages/login/GetStarted";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/GetStarted" element={<GetStarted />} />
        <Route path="/SignUpStudent" element={<SignUpStudent />} />
        <Route path="/SignUpCompany" element={<SignUpCompany />} />
        <Route path="/SignUpClub" element={<SignUpClub />} />

        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
