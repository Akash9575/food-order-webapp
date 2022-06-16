import {useState} from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import LoginModal from "./component/LoginModal";
import SignUpModal from "./component/SignUpModal";
import "./App.css";

function App() {

  return (
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/about" element={<NavBar />} />
        <Route path="/contact" element={<NavBar />} />
        <Route path="/registerrestaurant" element={<NavBar/>} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/signup" element={<SignUpModal />} />
      </Routes>
    </div>
  );
}

export default App;
