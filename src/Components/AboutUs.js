import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import Header from './Header';
import Footer from './footer';
import { styled } from '@mui/system';

const AboutUs = () => {
    const AnimatedImage = styled('div')({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      });
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
                                    About Us
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Welcome to Grocer Ease, your number one source for all things grocery. We're dedicated to providing you the best of grocery items, with a focus on dependability, customer service, and uniqueness.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    We're working to turn our passion for grocery into a booming online store. We hope you enjoy our products as much as we enjoy offering them to you.
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

export default AboutUs;
