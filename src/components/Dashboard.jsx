import {  useNavigate } from 'react-router-dom';
import MiniDrawer from './MiniDrawer';

export default function Dashboard() {
    const navigate = useNavigate();

    // Check if user data exists in localStorage
    const userData = localStorage.getItem('userData');
    console.log(userData);
    
    // Check if userData is falsy (null, undefined, or empty string)
    if (!userData) {
        navigate('/login');
        return null; 
    }

    return (
        <div>
            <MiniDrawer data={JSON.parse(userData)} />
        </div>
    );
}