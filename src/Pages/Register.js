// File path: C:\grocery-delivery-f\src\Pages\Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, FormControlLabel, Checkbox, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const Register = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const CreateButtonClick = () => {
        navigate('/');
    };

    const AnimatedImage = styled('div')({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!acceptTerms) {
            setError('You must accept the terms and conditions to register.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:59817/api/Users/CreateUser', {
                userID: '',
                userName: userName,
                password: password,
                email: email,
                mobile: mobile,
                firstName: firstName,
                lastName: lastName,
                address: address,
                pincode: pincode,
                isAdmin: false,
                isActive: true,
                isDeleted: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });

            console.log('Registration successful:', response.data);

            navigate('/');
        } catch (error) {
            if (error.response) {
                setError('Registration failed: ' + error.response.data.title);
                console.error('Registration failed:', error.response.data);
            } else if (error.request) {
                setError('No response received from server.');
                console.error('No response received:', error.request);
            } else {
                setError('Error setting up request: ' + error.message);
                console.error('Error setting up request:', error.message);
            }
        }
    };

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 8 }}>
            <Paper elevation={6} sx={{ p: 4 }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h4" sx={{ color: 'orange', mb: 2 }}>
                                GrocerEase
                            </Typography>
                            <Typography component="p" sx={{ mb: 2 }}>
                                Create your account
                            </Typography>
                            {error && (
                                <Typography color="error" sx={{ mb: 2 }}>
                                    {error}
                                </Typography>
                            )}
                            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={userName}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="mobile"
                                    label="Mobile"
                                    name="mobile"
                                    autoComplete="mobile"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="pincode"
                                    label="Pincode"
                                    name="pincode"
                                    autoComplete="pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={acceptTerms}
                                            onChange={(e) => setAcceptTerms(e.target.checked)}
                                            name="acceptTerms"
                                            color="primary"
                                        />
                                    }
                                    label="I have read and accept the terms and conditions"
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: 'black', color: 'white', mb: 2, py: 1.5 }}
                                >
                                    Register
                                </Button>

                                <Typography variant="body2" color="text.secondary" onClick={CreateButtonClick} sx={{ mt: 2, cursor: 'pointer', textDecoration: 'underline' }}>
                                    LOGIN
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <AnimatedImage>
                        <img 
                            src={`${process.env.PUBLIC_URL}/Untitled_design-removebg-preview.png`} 
                            alt="GrocerEase" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                        </AnimatedImage>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Register;
