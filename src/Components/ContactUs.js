// src/components/ContactUs.jsx

import React, { useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import emailjs from '@emailjs/browser';
import Header from './Header';
import Footer from './footer';

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

  return (
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
      <Header />
      <Typography variant="h4" gutterBottom sx={{paddingTop:4}}>
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
      <Footer />
    </Box>
  );
};

export default ContactUs;
