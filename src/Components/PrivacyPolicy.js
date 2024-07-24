import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import Header from './Header';
import Footer from './footer';

const PrivacyPolicy = () => {
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
                    backgroundColor: 'white',
                }}
            >
                <Container maxWidth="md">
                    <Paper elevation={3} sx={{ padding: 4 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4" gutterBottom align="center">
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
                                <Typography variant="body1" paragraph>
                                    We don’t share any personally identifying information publicly or with third parties, except when required to by law.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    This policy is effective as of 1 January 2024.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box
                                    component="img"
                                    src={`${process.env.PUBLIC_URL}/yellowbackground-removebg-preview.png`}
                                    alt="Grocer Ease"
                                    sx={{ width: '100%', height: 'auto' }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
