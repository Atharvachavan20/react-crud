// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import './App.css';
import AddEmployee from "./pages/Admin/AddEmployee";
import Home from "./pages/Home";
import EmployeeList from "./pages/Admin/EmployeeList";
import UpdateEmployee from "./pages/Admin/UpdateEmp";
import Login from "./components/Login"; // Import Login component
import RegistrationForm from "./components/RegisterForm";
import AdminProfile from "./pages/Admin/AdminProfile"; // Import AdminProfile component
import UserProfile from "./pages/User/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/admin-dashboard" element={<Dashboard />}>
            <Route path="" index element={<Home />} />
            <Route path="addEmp" element={<AddEmployee />} />
            <Route path="empList" element={<EmployeeList />} />
            <Route path="updateEmp/:id" element={<UpdateEmployee />} />
            <Route path="admin-profile" element={<AdminProfile />} /> {/* Add AdminProfile route */}
          </Route>
          <Route path="/normal-dashboard" element={<Dashboard />}>
            <Route path="" index element={<Home />} />
            <Route path="user-profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;