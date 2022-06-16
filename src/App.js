import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from './component/Home';
import "./App.css";
import Restaurant from "./component/Restaurant";

function App() {
  return (
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<NavBar />} />
        <Route path="/contact" element={<NavBar />} />
        <Route path="/registerrestaurant" element={<NavBar/>} />
        <Route path="/login" element={<NavBar />} />
        <Route path="/signup" element={<NavBar />} />
        <Route path="/:restaurant_name" element={<Restaurant/>} />
      </Routes>
    </div>
  );
}

export default App;
