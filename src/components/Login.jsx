/* eslint-disable no-unused-vars */
// src/components/Login.js
import { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // src/components/Login.js
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post('http://localhost:3001/user/login', {
                email,
                password,
            });
    
            const data = response.data.user;
            console.log(data);
    
            if (response.status === 200) {
                // Store user data and role in localStorage
                localStorage.setItem('userData', JSON.stringify(data));
                localStorage.setItem('userRole', data.role); // Store role separately
              
                // Redirect based on user role
                if (data.role === 'admin') {
                    navigate('/admin-dashboard');
                } else if(data.role==='normal') {
                    navigate('/normal-dashboard');
                }
                else{
                    navigate('/login');
                }
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'An error occurred. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" align="center">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;