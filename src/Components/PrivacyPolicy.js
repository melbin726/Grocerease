import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from './Header';
import Footer from './footer';

const PrivacyPolicy = () => {
    return (
        <>
            <Header />
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom align='center'> 
                    Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    Your privacy is important to us. It is Grocer Ease's policy to respect your privacy regarding any information we may collect from you across our website, http://www.grocerease.com, and other sites we own and operate.
                </Typography>
                <Typography variant="body1" paragraph>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                </Typography>
                <Typography variant="body1" paragraph>
                    We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                </Typography>
            </Box>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
