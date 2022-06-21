import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import "./App.css";
import AddItem from "./component/AddItem";
import StoreMenu from "./component/StoreMenu";
import RegisterRestaurant from "./component/RegisterRestaurant";
import Request from "./component/Request";


function App() {
  return (
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/request" element={<Request />} />
        <Route path="/menu" element={<StoreMenu />} />
        <Route path="/addItem" element={<AddItem/>} />
        {/* <Route path="/registerrestaurant" element={<NavBar/>} /> */}
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
