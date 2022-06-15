import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import "./App.css";
import RegisterRestaurant from "./component/RegisterRestaurant";

function App() {
  return (
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/about" element={<NavBar />} />
        <Route path="/contact" element={<NavBar />} />
        <Route path="/registerrestaurant" element={<RegisterRestaurant/>} />
        <Route path="/login" element={<NavBar />} />
        <Route path="/signup" element={<NavBar />} />
      </Routes>
    </div>
  );
}

export default App;
