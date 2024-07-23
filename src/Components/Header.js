import React, { useState, useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Switch, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from './ThemeProvider';
import Profile from '../Pages/Profile';

const Header = () => {
    const navigate = useNavigate(); 
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [username, setUsername] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleHomeClick = () => {
        navigate('/Home'); 
    };

    const handleCartClick = () => {
        navigate('/cart'); 
    };

    const handleManageClick = () => {
        navigate('/ManageProducts'); 
    };

    const handleOrderClick = () => {
        navigate('/Orders'); 
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#333', color: '#fff' }} elevation={0}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                            flexGrow: 1, 
                            cursor: 'pointer', 
                            color: 'orange', 
                            fontFamily: 'Pacifico, cursive', 
                            fontSize: '1.5rem', 
                            '&:hover': {
                                color: 'white',
                                transition: 'color 0.3s ease'
                            } 
                        }} 
                        onClick={handleHomeClick}
                    > 
                        Grocer Ease 
                        <Switch checked={darkMode} onChange={toggleTheme} color="default" />
                    </Typography>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        Welcome {username}
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            marginRight: 2, 
                            cursor: 'pointer', 
                            '&:hover': {
                                color: 'orange',
                                transition: 'color 0.3s ease'
                            }
                        }} 
                        onClick={handleManageClick}
                    >
                        Manage Product
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit"> 
                            <SearchIcon />
                        </IconButton>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                marginRight: 2, 
                                cursor: 'pointer', 
                                '&:hover': {
                                    color: 'orange',
                                    transition: 'color 0.3s ease'
                                }
                            }} 
                            onClick={handleCartClick}
                        > 
                            Cart
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                marginRight: 2, 
                                cursor: 'pointer', 
                                '&:hover': {
                                    color: 'orange',
                                    transition: 'color 0.3s ease'
                                }
                            }} 
                            onClick={handleOrderClick}
                        >
                            Orders
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                marginRight: 2, 
                                cursor: 'pointer', 
                                '&:hover': {
                                    color: 'orange',
                                    transition: 'color 0.3s ease'
                                }
                            }} 
                            onClick={handleLogoutClick}
                        >
                            Logout
                        </Typography>
                        <IconButton color="inherit" onClick={toggleDrawer(true)} sx={{
                                '&:hover': {
                                    color: 'orange',
                                    transition: 'color 0.3s ease'
                                }}}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 300 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Profile />
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
