import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/footer';
import { styled } from '@mui/system';

const ManageProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const AnimatedImage = styled('div')({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      });
      
      

      const AnimatedTypography = styled(Typography)({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      });

      const HoverButton = styled('button')({
        backgroundColor: 'black',
        color: 'white',
        width: '100%',
        marginTop: '16px',
        padding: '12px 0',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: 'gray',
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const yourtoken = localStorage.getItem('token');
            const response = await axios.post('http://localhost:59817/api/Products/CreateProduct', {
                ProductID: '',
                ProductName: productName,
                ProductPrice: productPrice,
                productQuantity: 1,
                isActive: true,
                isDeleted: false
            }, {
                headers: {
                    authorization: `Bearer ${yourtoken}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });
            console.log('Added successfully:', response.data);
            navigate('/Home');
        } catch (error) {
            if (error.response) {
                setError('Add failed: ' + error.response.data.title);
                console.error('Add failed:', error.response.data);
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container component="main" maxWidth="md" sx={{ flexGrow: 1 }}>
                <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <AnimatedTypography variant="h4" component="h1" fontFamily={'Marker Felt'} mb={2}>
                                    Add Product
                                </AnimatedTypography>
                                {error && (
                                    <Typography color="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Typography>
                                )}
                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Product Name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="productprice"
                                        label="Product Price"
                                        name="productprice"
                                        autoComplete="price"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                     <HoverButton type="submit">
                                        Add
                                        </HoverButton>
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
                                    src={`${process.env.PUBLIC_URL}/Untitled_design-removebg-previeww.png`}
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
        </div>
    );
};

export default ManageProducts;
