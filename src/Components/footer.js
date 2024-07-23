import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const footer = () => {
    return (
        <Box sx={{ marginBottom:2,bgcolor: '#333', color: '#fff', p: 2, textAlign: 'center', mt: 4 }}>
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} Grocer Ease. All rights reserved.
            </Typography>
            <Typography variant="body2">
                <Link href="/about" color="inherit" underline="hover">About Us</Link> | 
                <Link href="/contact" color="inherit" underline="hover">Contact Us</Link> | 
                <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
            </Typography>
        </Box>
    );
};

export default footer;
