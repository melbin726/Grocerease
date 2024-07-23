// src/Pages/Profile.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Grid, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditProfile from '../Components/EditProfile';
import axios from 'axios';

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: '100%',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

const Profile = () => {
    const [profile, setProfile] = useState({
        uname: '',
        firstName: '',
        lastName: '',
        address: '',
        pincode: '',
        mobile: '',
        email: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const fetchProfile = async () => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:59817/api/Users/GetUserByUserName/${storedUsername}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setProfile({
                uname: response.data.userName,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                address: response.data.address,
                pincode: response.data.pincode,
                mobile: response.data.mobile,
                email: response.data.email
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleEditToggle = () => {
        setIsEditMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <StyledBox>
            <StyledAvatar alt={profile.uname} />
            <Typography component="h1" variant="h5">
                {profile.uname}
            </Typography>
            <Divider sx={{ width: '100%', my: 2 }} />
            <StyledPaper elevation={3}>
                {isEditMode ? (
                    <EditProfile profile={profile} setProfile={setProfile} handleEditToggle={handleEditToggle} />
                ) : (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <StyledTypography variant="subtitle1">
                                    First Name: {profile.firstName || 'N/A'}
                                </StyledTypography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTypography variant="subtitle1">
                                    Last Name: {profile.lastName || 'N/A'}
                                </StyledTypography>
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTypography variant="subtitle1">
                                    Address: {profile.address || 'N/A'}
                                </StyledTypography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTypography variant="subtitle1">
                                    Pincode: {profile.pincode || 'N/A'}
                                </StyledTypography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTypography variant="subtitle1">
                                    Mobile: {profile.mobile || 'N/A'}
                                </StyledTypography>
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTypography variant="subtitle1">
                                    Email: {profile.email}
                                </StyledTypography>
                            </Grid>
                        </Grid>
                        <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white', mt: 2 }} onClick={handleEditToggle}>
                            Edit Profile
                        </Button>
                    </>
                )}
            </StyledPaper>
        </StyledBox>
    );
};

export default Profile;
