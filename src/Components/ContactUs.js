// src/components/ContactUs.jsx

import React, { useRef } from 'react';
 
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import emailjs from '@emailjs/browser';
import Header from './Header';
import Footer from './footer';
import { styled } from '@mui/system';

const ContactUs = () => {
  const form = useRef();  

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_hieimqw', 'template_1eth4x9', form.current, {
        publicKey: '6rvv1BcMTNwnZDI2U',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const AnimatedImage = styled('div')({
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  });
  return (
    <>
    <Header />
    <Container component="main" maxWidth="md" sx={{ flexGrow: 1 }}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f0f0f0',
      }}
    >
      
      <Typography variant="h4" gutterBottom >
        Contact Us
      </Typography>
      <Box
        component="form"
        ref={form}
        onSubmit={sendEmail}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          label="Name"
          name="user_name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="user_email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Message"
          name="message"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        //   sx={{ mt: 2 }}
        //   fullWidth
          sx={{ backgroundColor: 'black', color: 'white', marginRight: 2, '&:hover': { backgroundColor: '#333' } }}
        >
          Send
        </Button>
      </Box>
     
    </Box>
    </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                <AnimatedImage>
                                <img
                                    src={`${process.env.PUBLIC_URL}/Contactus-removebg-preview.png`}
                                    alt="Product Illustration"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                </AnimatedImage>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
            </>
       
  );
};

export default ContactUs;
