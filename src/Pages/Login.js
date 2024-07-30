import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, InputAdornment, IconButton, Grid, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { styled } from '@mui/system';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const AnimatedImage = styled('div')({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      });

    const CreateButtonClick = () => {
        navigate('/Register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const AnimatedTypography = styled(Typography)({
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          });

        try {
            const response = await axios.post('http://localhost:59817/api/Login/Login', {
                userName: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            }) .then(response => {
                const token = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                fetchUser();
                console.log('Login successful, token:', token); 
                navigate('/home');
            });


         
           
        } catch (error) {
            if (error.response) {
                setError('Login failed: ' + error.response.data.title);
                console.error('Login failed:', error.response.data);
            } else if (error.request) {
                setError('No response received from server.');
                console.error('No response received:', error.request);
            } else {
                setError('Error setting up request: ' + error.message);
                console.error('Error setting up request:', error.message);
            }
        }
    };

    
    const fetchUser = () => {
        const yourtoken = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        axios.get('http://localhost:59817/api/Users/GetUserByUserName/'+username, {
            headers: {
                authorization: `Bearer ${yourtoken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                localStorage.setItem('userID', response.data.userID);
                localStorage.setItem('firstName',response.data.firstName)
                localStorage.setItem('lastName',response.data.lastName);
                localStorage.setItem('isAdmin',response.data.isAdmin)

            })
            .catch(error => {
                console.error('There was an error fetching the grocery items!', error);
            });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

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
                                Please enter your details
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
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: 'black', color: 'white', mb: 2, py: 1.5 }}
                                >
                                    Log In
                                </Button>

                                <Typography variant="body2" color="text.secondary" onClick={CreateButtonClick} sx={{ mt: 2, cursor: 'pointer', textDecoration: 'underline' }}>
                                    Create new Account
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimatedImage>
                        <img 
                            src={`${process.env.PUBLIC_URL}/Black_and_Red_Minimalist_Modern_Registration_Gym_Website_Prototype-removebg-preview.png`} 
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

export default Login;
