import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import "./App.css";
<<<<<<< HEAD
import AddItem from "./component/AddItem";
import StoreMenu from "./component/StoreMenu";
=======
import RegisterRestaurant from "./component/RegisterRestaurant";
>>>>>>> e743eea18a1b69528f0f5f8e6f896155c8888b00

function App() {
  return (
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<NavBar />} />
<<<<<<< HEAD
        <Route path="/request" element={<NavBar />} />
        <Route path="/menu" element={<StoreMenu />} />
        <Route path="/addItem" element={<AddItem/>} />
        <Route path="/registerrestaurant" element={<NavBar/>} />
=======
        <Route path="/about" element={<NavBar />} />
        <Route path="/contact" element={<NavBar />} />
        <Route path="/registerrestaurant" element={<RegisterRestaurant/>} />
>>>>>>> e743eea18a1b69528f0f5f8e6f896155c8888b00
        <Route path="/login" element={<NavBar />} />
        <Route path="/signup" element={<NavBar />} />
      </Routes>
    </div>
  );
}

export default App;
