import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <Router>
      {/* Toast Popup */}
      <Toaster position="top-center" />

      {/* Navbar always visible */}
      <Navbar />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
};

export default App;
