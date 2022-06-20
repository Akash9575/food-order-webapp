import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import DeliveryRequests from './component/DeliveryRequests';
import "./App.css";
import AcceptedOrders from "./component/AcceptedOrders";

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