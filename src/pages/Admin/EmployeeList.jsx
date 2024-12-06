// src/pages/Admin/EmployeeList.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access location state
import axios from 'axios';
import EmployeeTable from './EmployeeTable';
import '../../styles/EmpTable.css'


const EmployeeList = () => {
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState(''); // State for notification message
  const location = useLocation(); // Access location state

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/all'); // Fetch user data
      setData(response.data);
      console.log(response.data); // Log the response data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    

    // Check for message in location state
    if (location.state && location.state.message) {
      setNotification(location.state.message);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setNotification('');
      }, 5000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
    fetchData();
  }, [location.state]); // Add location.state as a dependency

  return (
    <>
      <h1>User List</h1> {/* Change header to User List */}
      {notification && <div className="notification">{notification}</div>} {/* Display notification */}
      <EmployeeTable data={data} fetchData={fetchData} />
    </>
  );
};

export default EmployeeList;