/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useState } from "react";
import '../../styles/EmpTable.css';

const EmployeeTable = ({ data, fetchData }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const handleEdit = (id) => {
        navigate("/admin-dashboard/updateEmp/" + id);
    };

    const handleAddBtn = () => {
        navigate("/admin-dashboard/addEmp");
    };

    const handleDeleteClick = (id) => {
        setCurrentUserId(id);
        setOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (currentUserId) {
            try {
                await axios.delete('http://localhost:3001/user/delete/' + currentUserId);
                fetchData();
                handleClose();
            } catch (error) {
                console.error('Error deleting user data:', error);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentUserId(null);
    };

    // Define columns for DataGrid
    const columns = [
        { field: 'userId', headerName: 'User  ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'surname', headerName: 'Surname', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'birthdate',
            headerName: 'Birth Date',   
            width: 150,
        },
        { field: 'role', headerName: 'Role', width: 120 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color='primary'
                        onClick={() => handleEdit(params.row.userId)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={() => handleDeleteClick(params.row.userId)}
                        style={{ marginLeft: '10px' }}
                    >
                        Delete
                    </Button>
                </>
            )
        },

    ];

    
    // Map the data to the required format for DataGrid
    const rowsData = Array.isArray(data) ? data.map((user, index) => ({
        id: user.userId, // Use 'id' instead of 'Id'
        userId: user.userId,
        name: user.name,
        surname: user.surname,
        email: user.email,
        birthdate: user.birthdate.split('T')[0],
        role: user.role.toUpperCase(),
    })) : [];


    console.log('Rows Data:', rowsData);
    console.log(data);

    return (
        <div>
            <div className='addBtn'>
                <Button variant="contained" sx={{ margin: '5px' }} onClick={handleAddBtn}>Add User</Button>
            </div>

            <Box sx={{ height: 400, width: '100%', marginBottom: '20px' }}>
                <DataGrid
                    rows={rowsData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EmployeeTable;