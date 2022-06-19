import { Routes, Route } from "react-router-dom";
import PendingRequest from './components/PendingRequest';
import AdminNavbar from "./components/AdminNavbar";
import ApprovedRestaurants from "./components/ApprovedRestaurants";
import Customers from "./components/Customers";
import DeliveryMen from "./components/DeliveryMen";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<AdminNavbar />} />
        <Route path="/pendingrequests" element={<PendingRequest />} />
        <Route path="/approvedrestaurants" element={<ApprovedRestaurants />} />
        <Route path="/deliveryperson" element={<DeliveryMen />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/login" element={<AdminNavbar />} />
        <Route path="/signup" element={<AdminNavbar />} />
      </Routes>
    </div>
  );
}

export default App;
