
import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import axios from 'axios';

const EditProfile = ({ profile, setProfile, handleEditToggle }) => {
    const [localProfile, setLocalProfile] = useState(profile);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:59817/api/Users/EditUser', localProfile, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setProfile(localProfile);
            handleEditToggle();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        value={localProfile.firstName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="lastName"
                        label="Last Name"
                        value={localProfile.lastName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="address"
                        label="Address"
                        value={localProfile.address}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="pincode"
                        label="Pincode"
                        value={localProfile.pincode}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="mobile"
                        label="Mobile"
                        value={localProfile.mobile}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        label="Email"
                        value={localProfile.email}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'black', color: 'white', mt: 2 }}>
                Save
            </Button>
            <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={handleEditToggle}>
                Cancel
            </Button>
        </form>
    );
};

export default EditProfile;
