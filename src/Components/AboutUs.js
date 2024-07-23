import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from './Header';
import Footer from './footer';

const AboutUs = () => {
    return (
        <>
            <Header />
            <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
       minHeight: '100vh',
        padding: '20px',
        marginRight:'4',
        marginLeft: '4',
        backgroundColor: 'white',
      }}
    >
                <Typography variant="h4" gutterBottom align='center'>
                    About Us
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to Grocer Ease, your number one source for all things grocery. We're dedicated to providing you the best of grocery items, with a focus on dependability, customer service, and uniqueness.
                </Typography>
                <Typography variant="body1" paragraph>
                    We're working to turn our passion for grocery into a booming online store. We hope you enjoy our products as much as we enjoy offering them to you.
                </Typography>
            </Box>
            <Footer />
        </>
    );
};

export default AboutUs;
