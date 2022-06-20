import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import DeliveryRequests from './components/DeliveryRequests';
import AcceptedOrders from "./components/AcceptedOrders";
import "./App.css";

function App() {
  return (
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path='/deliveryrequests' element={<DeliveryRequests />} />
        <Route path='/acceptedorders' element={<AcceptedOrders />} />
        <Route path="/login" element={<NavBar />} />
        <Route path="/signup" element={<NavBar />} />
      </Routes>
    </div>
  );
}

export default App;