import {useState} from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from './component/Home';
import LoginModal from "./component/LoginModal";
import SignUpModal from "./component/SignUpModal";
import "./App.css";
import RegisterRestaurant from "./component/RegisterRestaurant";

function App() {

  return (
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<NavBar />} />
        <Route path="/contact" element={<NavBar />} />
        <Route path="/registerrestaurant" element={<RegisterRestaurant />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/signup" element={<SignUpModal />} />
      </Routes>
    </div>
  );
}

export default App;
