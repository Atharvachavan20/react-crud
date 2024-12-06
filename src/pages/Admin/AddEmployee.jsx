import { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        birthdate: '',
        password: '',
        role: 'normal' // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/user/register', formData);
            console.log('User  registered:', response.data);
            setFormData({
                name: '',
                surname: '',
                email: '',
                birthdate: '',
                password: '',
                role: 'normal' // Reset to default role
            });
        } catch (error) {
            console.error('There was an error registering the user!', error);
            // Optionally, show an error message
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 500,
                margin: 'auto',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h4" sx={{margin:'auto'}} component="h2" gutterBottom>
                Add Emloyee
            </Typography>
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl variant="outlined" margin="normal" required>
                <InputLabel>Role</InputLabel>
                <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Role"
                >
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
            />

            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
               Add Employee
            </Button>
        </Box>
    );
};

export default AddEmployee;