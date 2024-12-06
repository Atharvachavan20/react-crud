import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
    const [values, setValues] = useState({
        userId: '',
        name: '',
        surname: '',
        email: '',
        birthdate: '',
        password: '',
        role: 'normal' // Default role
    });

    const [originalValues, setOriginalValues] = useState({});
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/${id}`);
                setValues(response.data);
                setOriginalValues(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setMessage("Error fetching user data.");
                setIsError(true);
            }
        };
        fetchData();
    }, [id]);

    const handleChanges = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (JSON.stringify(values) === JSON.stringify(originalValues)) {
            setMessage("Nothing updated. Please make changes to update the user.");
            setIsError(true);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3001/user/update/`, values);
            console.log('User  Updated:', response.data);
            setMessage("User  Updated Successfully");
            setIsError(false);
            navigate('/admin-dashboard/empList');
        } catch (error) {
            console.error('Error updating user:', error);
            setMessage("Error updating user");
            setIsError(true);
        }
    };

    return (
        <>
            <Box sx={{display: 'flex',
                flexDirection: 'column',
                maxWidth: 500,
                margin: 'auto',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>

                <h1 className="empTitle">Update User {values.userId} - {values.name}</h1>
                <form onSubmit={handleSubmit} className='formBody' >
                    <TextField 
                        disabled 
                        type="text" 
                        fullWidth
                        name="userId" 
                        value={values.userId} 
                        onChange={handleChanges} 
                        placeholder='Enter your Employee Id' 
                        variant="outlined" 
                    />
                    <TextField 
                        type="text" 
                        sx={{ marginTop: '10px' }} 
                        fullWidth 
                        name="name" 
                        value={values.name} 
                        onChange={handleChanges} 
                        placeholder='Enter your Name' 
                        variant="outlined" 
                    />
                    <TextField 
                        type="text" 
                        sx={{ marginTop: '10px' }} 
                        fullWidth 
                        name="surname" 
                        value={values.surname} 
                        onChange={handleChanges} 
                        placeholder='Enter your Surname' 
                        variant="outlined" 
                    />
                    <TextField 
                        type="email" 
                        sx={{ marginTop: '10px' }} 
                        fullWidth 
                        name="email" 
                        value={values.email} 
                        onChange={handleChanges} 
                        placeholder='Enter your Email' 
                        variant="outlined" 
                    />
                    <TextField 
                        type="date" 
                        sx={{ marginTop: '10px' }} 
                        fullWidth 
                        name="birthdate" 
                        value={values.birthdate.split('T')[0]} 
                        onChange={handleChanges} 
                        variant="outlined" 
                    />
                    <FormControl sx={{width:'100%'}} variant="outlined" margin="normal" required>
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={values.role}
                            onChange={handleChanges}
                            label="Role"
                        >
                            <MenuItem value="normal">Normal</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{ marginTop: '10px',width:'100%' }} type='submit'>Update Employee</Button>
                    </form>
                <p className={isError ? "error" : "message"}>{message}</p>
            </Box>
        </>
    );
};

export default UpdateEmployee;