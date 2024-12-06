// src/pages/Admin/AdminProfile.js
import { Box, Typography, Paper } from '@mui/material';

const AdminProfile = () => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
        return <Typography variant="h6">No user data found.</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Admin Profile
                </Typography>
                <Typography variant="h6">Name: {userData.name}</Typography>
                <Typography variant="h6">Email: {userData.email}</Typography>
                <Typography variant="h6">Birthdate: {userData.birthdate}</Typography>
                <Typography variant="h6">Role: {userData.role}</Typography>
            </Paper>
        </Box>
    );
};

export default AdminProfile;