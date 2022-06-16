import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from './component/Home';
import "./App.css";
import Register_Restaurant from "./component/Register-Restaurant";

function App() {
  return (
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<NavBar />} />
        <Route path="/contact" element={<NavBar />} />
        <Route path="/registerrestaurant" element={<Register_Restaurant/>} />
        <Route path="/login" element={<NavBar />} />
        <Route path="/signup" element={<NavBar />} />
        <Route path="/:restaurant_name" element={<NavBar />} />
      </Routes>
    </div>
  );
}

export default App;
